<script setup lang="ts">
import type { DoanloadLinkItem, DownloadLinkCreateRequest } from '~/api/admin'
import type { Platform } from '~/api/download';

definePageMeta({
    layout: "admin"
})

const { t } = useI18n()
const toast = useToast()
const dialog = useDialog()

const loading = ref(false)
const links = ref<DoanloadLinkItem[]>([])
const filter = reactive({
    platform: 'all' as Platform | 'all'
})

const platformIcons: Record<string, string> = {
    android: 'mingcute:android-fill',
    ios: 'mingcute:apple-fill',
    windows: 'mingcute:windows-fill',
    macos: 'mingcute:laptop-line',
    linux: 'mingcute:linux-fill'
}

const platformColors: Record<string, string> = {
    android: 'text-success',
    ios: 'text-base-content',
    windows: 'text-info',
    macos: 'text-base-content',
    linux: 'text-warning'
}

const loadData = async () => {
    loading.value = true
    try {
        const res = await ApiList.admin.download.listDoanloadLinks()
        const rawData = res.data.downloads as unknown as DoanloadLinkItem[]
        links.value = Array.isArray(rawData) ? rawData : []
    } catch (error) {
        console.error(error)
        toast.error(t('common.error'))
    } finally {
        loading.value = false
    }
}

const filteredLinks = computed(() => {
    if (filter.platform === 'all') return links.value
    return links.value.filter(link => link.platform === filter.platform)
})

const showModal = ref(false)
const isEdit = ref(false)
const editId = ref<number | null>(null)

const initialForm: DownloadLinkCreateRequest = {
    platform: 'android',
    name: '',
    version: '',
    downloadUrl: '',
    description: '',
    fileSize: '',
    isActive: true,
    sortOrder: 0
}

const formData = reactive<DownloadLinkCreateRequest>({ ...initialForm })

const openCreate = () => {
    isEdit.value = false
    editId.value = null
    Object.assign(formData, initialForm)
    showModal.value = true
}

const openEdit = (item: DoanloadLinkItem) => {
    isEdit.value = true
    editId.value = item.id
    Object.assign(formData, {
        platform: item.platform,
        name: item.name,
        version: item.version || '',
        downloadUrl: item.downloadUrl,
        description: item.description || '',
        fileSize: item.fileSize?.toString() || '',
        isActive: item.isActive,
        sortOrder: item.sortOrder
    })
    showModal.value = true
}

const handleSubmit = async () => {
    if (!formData.name || !formData.downloadUrl) {
        toast.warning(t('download.validate_error'))
        return
    }

    try {
        if (isEdit.value && editId.value) {
            await ApiList.admin.download.downloadLinkUPdate({ ...formData, id: editId.value } as any)
            toast.success(t('common.saved'))
        } else {
            await ApiList.admin.download.downloadLinkCreate(formData)
            toast.success(t('common.success'))
        }
        showModal.value = false
        loadData()
    } catch (error) {
        toast.error(t('common.error'))
    }
}

const handleDelete = async (item: DoanloadLinkItem) => {
    const confirm = await dialog.confirm({
        title: t('download.delete_title'),
        content: t('download.delete_content', { name: item.name }),
        type: 'error',
        confirmText: t('common.delete')
    })

    if (!confirm) return

    try {
        await ApiList.admin.download.downloadLinkDelete(item.id)
        toast.success(t('common.success'))
        loadData()
    } catch (error) {
        toast.error(t('common.error'))
    }
}

const { copy } = useClipboard()
const copyLink = (url: string) => {
    copy(url)
    toast.success(t('download.link_copied'))
}

onMounted(() => {
    loadData()
})
</script>

<template>
    <div class="flex flex-col gap-6 p-2 md:p-6">
        <title>life-下载管理</title>
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 relative z-40 shrink-0">
            <div class="w-full md:w-auto">
                <div class="join bg-base-100/80 backdrop-blur shadow-sm rounded-lg p-1 border border-base-200">
                    <button class="join-item btn btn-sm border-none shadow-none"
                        :class="filter.platform === 'all' ? 'bg-primary text-primary-content' : 'btn-ghost'"
                        @click="filter.platform = 'all'">
                        {{ t('common.all_status') }}
                    </button>
                    <button v-for="platform in ['android', 'ios', 'windows', 'macos', 'linux']" :key="platform"
                        class="join-item btn btn-sm border-none shadow-none gap-2"
                        :class="filter.platform === platform ? 'bg-primary text-primary-content' : 'btn-ghost'"
                        @click="filter.platform = platform as Platform">
                        <Icon :name="platformIcons[platform] ?? ''" size="16" />
                        <span class="hidden sm:inline">{{ t(`platform.${platform}`) }}</span>
                    </button>
                </div>
            </div>

            <button
                class="btn btn-primary text-primary-content shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all w-full md:w-auto gap-2 rounded-lg"
                @click="openCreate">
                <Icon name="mingcute:add-circle-line" size="20" />
                {{ t('download.add_new') }}
            </button>
        </div>

        <div
            class="card bg-base-100 shadow-sm border border-base-200 z-0 flex-1 min-h-0 flex flex-col rounded-2xl overflow-hidden">
            <div class="overflow-auto flex-1 w-full scrollbar-hide">
                <table class="table table-pin-rows">
                    <thead>
                        <tr class="bg-base-200/50 text-base-content/70">
                            <th class="py-4 pl-6 text-sm font-semibold w-16 text-center">#</th>
                            <th class="py-4 text-sm font-semibold min-w-[200px]">{{ t('download.app_info') }}</th>
                            <th class="py-4 text-sm font-semibold min-w-[150px]">{{ t('download.file_info') }}</th>
                            <th class="py-4 text-sm font-semibold min-w-[100px]">{{ t('download.version') }}</th>
                            <th class="py-4 text-sm font-semibold min-w-[100px]">{{ t('user.status') }}</th>
                            <th class="py-4 text-sm font-semibold min-w-[100px]">{{ t('download.stats') }}</th>
                            <th
                                class="sticky right-0 bg-base-200/50 shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)] text-center w-40 py-4 text-sm font-semibold">
                                {{ t('common.action') }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="loading">
                            <td colspan="7" class="h-64 text-center">
                                <span class="loading loading-spinner loading-lg text-primary/50"></span>
                            </td>
                        </tr>

                        <tr v-else-if="filteredLinks.length === 0">
                            <td colspan="7" class="h-64 text-center text-base-content/40">
                                <div class="flex flex-col items-center gap-3">
                                    <div class="bg-base-200 p-6 rounded-full">
                                        <Icon name="mingcute:box-3-line" class="text-5xl" />
                                    </div>
                                    <span class="text-lg">{{ t('common.no_data') }}</span>
                                </div>
                            </td>
                        </tr>

                        <tr v-else v-for="(item, index) in filteredLinks" :key="item.id"
                            class="hover:bg-base-200/30 transition-colors group border-b border-base-100">
                            <td class="text-center font-mono text-base-content/40">{{ item.sortOrder }}</td>
                            <td class="py-4">
                                <div class="flex items-center gap-4">
                                    <div
                                        class="w-12 h-12 rounded-xl bg-base-200 flex items-center justify-center shrink-0">
                                        <Icon :name="platformIcons[item.platform] ?? ''" size="28"
                                            :class="platformColors[item.platform]" />
                                    </div>
                                    <div>
                                        <div class="font-bold text-base">{{ item.name }}</div>
                                        <div class="text-xs text-base-content/50 mt-1 line-clamp-1">{{ item.description
                                            || t('download.no_desc') }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="py-4">
                                <div class="flex flex-col gap-1">
                                    <div class="badge badge-sm badge-accent badge-outline font-mono opacity-70">
                                        {{ item.fileSize || 'N/A' }}
                                    </div>
                                    <a @click.stop="copyLink(item.downloadUrl)"
                                        class="text-xs text-primary hover:underline cursor-pointer flex items-center gap-1">
                                        <Icon name="mingcute:link-line" />
                                        {{ t('download.copy_link') }}
                                    </a>
                                </div>
                            </td>
                            <td class="py-4">
                                <span class="font-mono bg-base-200 px-2 py-1 rounded text-sm">{{ item.version ||
                                    'Latest' }}</span>
                            </td>
                            <td class="py-4">
                                <div class="flex items-center gap-2">
                                    <div class="w-2 h-2 rounded-full"
                                        :class="item.isActive ? 'bg-success shadow-[0_0_8px_theme(colors.success)]' : 'bg-base-300'">
                                    </div>
                                    <span class="text-sm">{{ item.isActive ? t('status.active') : t('status.inactive')
                                        }}</span>
                                </div>
                            </td>
                            <td class="py-4">
                                <div class="flex items-center gap-1.5 text-base-content/70"
                                    :title="t('download.count')">
                                    <Icon name="mingcute:download-2-line" size="16" />
                                    <span class="font-mono">{{ item.downloadCount }}</span>
                                </div>
                            </td>
                            <td
                                class="sticky right-0 bg-base-100 shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)] text-center p-0 align-middle">
                                <div class="flex justify-center items-center h-full w-full px-2">
                                    <div class="join border border-base-200/60 shadow-sm bg-base-100 rounded-lg">
                                        <button
                                            class="btn btn-sm btn-square btn-ghost join-item text-primary hover:bg-primary/10 w-9 h-9"
                                            :title="t('common.edit')" @click="openEdit(item)">
                                            <Icon name="mingcute:edit-line" size="18" />
                                        </button>
                                        <button
                                            class="btn btn-sm btn-square btn-ghost join-item text-error/70 hover:bg-error/10 hover:text-error w-9 h-9"
                                            :title="t('common.delete')" @click="handleDelete(item)">
                                            <Icon name="mingcute:delete-2-line" size="18" />
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <common-modal v-model="showModal" :title="isEdit ? t('download.edit_link') : t('download.add_link')">
            <template #title-prefix>
                <div class="p-2 bg-primary/10 rounded-lg text-primary">
                    <Icon :name="isEdit ? 'mingcute:edit-2-line' : 'mingcute:add-circle-line'" size="20" />
                </div>
            </template>

            <div class="flex flex-col gap-6">
                <div>
                    <label class="text-xs font-bold text-base-content/50 uppercase tracking-wider mb-3 block px-1">{{
                        t('download.platform') }}</label>
                    <div class="grid grid-cols-5 gap-3">
                        <div v-for="p in ['android', 'ios', 'windows', 'macos', 'linux']" :key="p"
                            class="relative border rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:border-primary/50 group"
                            :class="formData.platform === p ? 'bg-primary/5 border-primary ring-1 ring-primary/20 shadow-sm' : 'bg-base-100 border-base-200 hover:shadow-sm'"
                            @click="formData.platform = p as Platform">
                            <Icon :name="platformIcons[p] ?? ''" size="24"
                                :class="formData.platform === p ? 'text-primary' : 'text-base-content/60 group-hover:text-base-content'" />
                            <span class="text-xs font-medium"
                                :class="formData.platform === p ? 'text-primary' : 'text-base-content/60'">{{
                                    t(`platform.${p}`)
                                }}</span>
                            <div v-if="formData.platform === p"
                                class="absolute -top-1.5 -right-1.5 bg-primary text-white rounded-full p-0.5">
                                <Icon name="mingcute:check-fill" size="12" />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label class="text-xs font-bold text-base-content/50 uppercase tracking-wider mb-3 block px-1">{{
                        t('download.app_info') }}</label>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="form-control w-full">
                            <div class="relative">
                                <input type="text" v-model="formData.name"
                                    class="input input-bordered w-full pl-10 h-11 bg-base-50 focus:bg-base-100 transition-colors"
                                    :placeholder="t('download.name_ph')" />
                                <div class="absolute left-3 top-3 text-base-content/40">
                                    <Icon name="mingcute:tag-line" size="20" />
                                </div>
                            </div>
                        </div>

                        <div class="form-control w-full">
                            <div class="relative">
                                <input type="text" v-model="formData.version"
                                    class="input input-bordered w-full pl-10 h-11 bg-base-50 focus:bg-base-100 transition-colors font-mono text-sm"
                                    placeholder="版本号：1.0.0" />
                                <div class="absolute left-3 top-3 text-base-content/40">
                                    <Icon name="mingcute:git-branch-line" size="20" />
                                </div>
                            </div>
                        </div>

                        <div class="form-control w-full md:col-span-2">
                            <div class="relative">
                                <input type="text" v-model="formData.downloadUrl"
                                    class="input input-bordered w-full pl-10 h-11 bg-base-50 focus:bg-base-100 transition-colors text-primary"
                                    placeholder="链接" />
                                <div class="absolute left-3 top-3 text-base-content/40">
                                    <Icon name="mingcute:link-line" size="20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label class="text-xs font-bold text-base-content/50 uppercase tracking-wider mb-3 block px-1">{{
                        t('download.file_info') }}</label>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="form-control w-full">
                            <div class="relative">
                                <input type="text" v-model="formData.fileSize"
                                    class="input input-bordered w-full pl-10 h-11 bg-base-50 focus:bg-base-100 transition-colors"
                                    placeholder="文件大小 MB" />
                                <div class="absolute left-3 top-3 text-base-content/40">
                                    <Icon name="mingcute:file-line" size="20" />
                                </div>
                            </div>
                        </div>

                        <div class="form-control w-full">
                            <div class="relative">
                                <input type="number" v-model="formData.sortOrder" placeholder="排序"
                                    class="input input-bordered w-full pl-10 h-11 bg-base-50 focus:bg-base-100 transition-colors" />
                                <div class="absolute left-3 top-3 text-base-content/40">
                                    <Icon name="mingcute:sort-ascending-line" size="20" />
                                </div>
                            </div>
                        </div>

                        <div class="form-control w-full flex items-center h-11 px-1">
                            <label class="label cursor-pointer justify-start gap-3 p-0 w-full h-full">
                                <input type="checkbox" class="toggle toggle-success toggle-sm"
                                    v-model="formData.isActive" />
                                <span class="font-medium text-sm"
                                    :class="formData.isActive ? 'text-success' : 'text-base-content/60'">
                                    {{ formData.isActive ? t('status.active') : t('status.inactive') }}
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="form-control w-full">
                    <textarea v-model="formData.description"
                        class="textarea textarea-bordered h-24 bg-base-50 focus:bg-base-100 transition-colors py-3 w-full"
                        :placeholder="t('download.desc_ph')"></textarea>
                </div>
            </div>

            <template #actions="{ close }">
                <button class="btn btn-ghost" @click="close">{{ t('common.cancel') }}</button>
                <button class="btn btn-primary px-8" @click="handleSubmit">{{ t('common.save') }}</button>
            </template>
        </common-modal>
    </div>
</template>


<i18n lang="json">{
    "zh-CN": {
        "download.add_new": "新建链接",
        "download.app_info": "应用信息",
        "download.file_info": "文件属性",
        "download.version": "版本号",
        "download.stats": "统计",
        "download.count": "下载次数",
        "download.copy_link": "复制链接",
        "download.link_copied": "链接已复制",
        "download.add_link": "添加下载链接",
        "download.edit_link": "编辑下载链接",
        "download.delete_title": "删除确认",
        "download.delete_content": "确认删除 {name} 的下载链接吗？",
        "download.platform": "适用平台",
        "download.name": "应用名称",
        "download.name_ph": "例如：Life Android Client",
        "download.url": "下载地址",
        "download.file_size": "文件大小",
        "download.sort": "排序权重",
        "download.desc": "更新说明",
        "download.desc_ph": "请输入版本更新日志或备注...",
        "download.validate_error": "名称和下载地址不能为空",
        "download.no_desc": "暂无描述",
        "platform.android": "安卓",
        "platform.ios": "iOS",
        "platform.windows": "Windows",
        "platform.macos": "macOS",
        "platform.linux": "Linux",
        "status.active": "启用",
        "status.inactive": "停用",
        "common.edit": "编辑",
        "common.delete": "删除",
        "common.action": "操作",
        "common.no_data": "暂无数据",
        "common.cancel": "取消",
        "common.save": "保存",
        "common.saved": "已保存",
        "common.success": "操作成功",
        "common.error": "操作失败",
        "common.all_status": "全部平台",
        "user.status": "状态"
    },
    "en": {
        "download.add_new": "Add Link",
        "download.app_info": "App Info",
        "download.file_info": "File Properties",
        "download.version": "Version",
        "download.stats": "Stats",
        "download.count": "Downloads",
        "download.copy_link": "Copy URL",
        "download.link_copied": "Copied to clipboard",
        "download.add_link": "New Download Link",
        "download.edit_link": "Edit Download Link",
        "download.delete_title": "Delete Confirmation",
        "download.delete_content": "Are you sure you want to delete {name}?",
        "download.platform": "Platform",
        "download.name": "App Name",
        "download.name_ph": "e.g. Life Android Client",
        "download.url": "Download URL",
        "download.file_size": "File Size",
        "download.sort": "Sort Order",
        "download.desc": "Description",
        "download.desc_ph": "Release notes...",
        "download.validate_error": "Name and URL are required",
        "download.no_desc": "No description",
        "platform.android": "Android",
        "platform.ios": "iOS",
        "platform.windows": "Windows",
        "platform.macos": "macOS",
        "platform.linux": "Linux",
        "status.active": "Active",
        "status.inactive": "Inactive",
        "common.edit": "Edit",
        "common.delete": "Delete",
        "common.action": "Actions",
        "common.no_data": "No data found",
        "common.cancel": "Cancel",
        "common.save": "Save",
        "common.saved": "Saved",
        "common.success": "Success",
        "common.error": "Failed",
        "common.all_status": "All Platforms",
        "user.status": "Status"
    },
    "zh-TW": {
        "download.add_new": "新建鏈接",
        "download.app_info": "應用信息",
        "download.file_info": "文件屬性",
        "download.version": "版本號",
        "download.stats": "統計",
        "download.count": "下載次數",
        "download.copy_link": "複製鏈接",
        "download.link_copied": "鏈接已複製",
        "download.add_link": "添加下載鏈接",
        "download.edit_link": "編輯下載鏈接",
        "download.delete_title": "刪除確認",
        "download.delete_content": "確認刪除 {name} 的下載鏈接嗎？",
        "download.platform": "適用平台",
        "download.name": "應用名稱",
        "download.name_ph": "例如：Life Android Client",
        "download.url": "下載地址",
        "download.file_size": "文件大小",
        "download.sort": "排序權重",
        "download.desc": "更新說明",
        "download.desc_ph": "請輸入版本更新日誌或備註...",
        "download.validate_error": "名稱和下載地址不能為空",
        "download.no_desc": "暫無描述",
        "platform.android": "安卓",
        "platform.ios": "iOS",
        "platform.windows": "Windows",
        "platform.macos": "macOS",
        "platform.linux": "Linux",
        "status.active": "啟用",
        "status.inactive": "停用",
        "common.edit": "編輯",
        "common.delete": "刪除",
        "common.action": "操作",
        "common.no_data": "暫無數據",
        "common.cancel": "取消",
        "common.save": "保存",
        "common.saved": "已保存",
        "common.success": "操作成功",
        "common.error": "操作失敗",
        "common.all_status": "全部平台",
        "user.status": "狀態"
    }
}</i18n>