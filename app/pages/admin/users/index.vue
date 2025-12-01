<script setup lang="ts">
import type { AdminUserListItem } from '~/api/admin'
import { UserStatus } from '~/api/admin'

definePageMeta({
  layout: "admin"
})

const { t } = useI18n()
const toast = useToast()
const dialog = useDialog()

const loading = ref(false)
const users = ref<AdminUserListItem[]>([])
const pagination = ref<Pagination>({
  currentPage: 1,
  totalPages: 1,
  totalBlogs: 0,
  hasNextPage: false,
  hasPrevPage: false,
  limit: 10
})

const filter = reactive({
  search: '',
  status: -1
})

const selectedIds = ref<Set<string>>(new Set())

const selectAll = computed({
  get: () => users.value.length > 0 && users.value.every(u => selectedIds.value.has(u.id)),
  set: (val) => {
    if (val) {
      users.value.forEach(u => selectedIds.value.add(u.id))
    } else {
      users.value.forEach(u => selectedIds.value.delete(u.id))
    }
  }
})

const loadData = async () => {
  loading.value = true
  try {
    const statusParam = filter.status === -1 ? undefined : filter.status as UserStatus
    const res = await ApiList.admin.user.listUser({
      page: pagination.value.currentPage,
      limit: pagination.value.limit,
      search: filter.search,
      status: statusParam as any
    })

    users.value = res.data.users
    pagination.value = res.data.pagination
    selectedIds.value.clear()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const debouncedSearch = useDebounceFn(() => {
  pagination.value.currentPage = 1
  loadData()
}, 500)

watch(() => filter.search, debouncedSearch)
watch(() => filter.status, () => {
  pagination.value.currentPage = 1
  loadData()
})

const changePage = (page: number) => {
  if (page < 1 || page > pagination.value.totalPages) return
  pagination.value.currentPage = page
  loadData()
}

const toggleSelection = (id: string) => {
  if (selectedIds.value.has(id)) {
    selectedIds.value.delete(id)
  } else {
    selectedIds.value.add(id)
  }
}

const handleBatch = async (operation: 'delete' | 'activate' | 'deactivate') => {
  if (selectedIds.value.size === 0) return

  const confirm = await dialog.confirm({
    title: t('admin.batch_confirm_title'),
    content: t('admin.batch_confirm_content', { count: selectedIds.value.size }),
    type: operation === 'delete' ? 'error' : 'warning',
    confirmText: t('common.confirm')
  })

  if (!confirm) return

  try {
    await ApiList.admin.batch({
      ids: Array.from(selectedIds.value),
      operation,
      type: 'users'
    })
    toast.success(t('common.success'))
    loadData()
  } catch (error) {
    toast.error(t('common.error'))
  }
}

const handleDelete = async (user: AdminUserListItem) => {
  const confirm = await dialog.confirm({
    title: t('admin.delete_user_title'),
    content: t('admin.delete_user_content', { name: user.username }),
    type: 'error',
    confirmText: t('common.delete')
  })

  if (!confirm) return

  try {
    await ApiList.admin.user.delUser(user.id)
    toast.success(t('common.success'))
    loadData()
  } catch (error) {
    toast.error(t('common.error'))
  }
}

const showEditModal = ref(false)
const editingUser = ref<{ id: string, isActive: boolean, isAdmin: boolean } | null>(null)

const openEdit = (user: AdminUserListItem) => {
  editingUser.value = {
    id: user.id,
    isActive: user.isActive,
    isAdmin: user.isAdmin
  }
  showEditModal.value = true
}

const saveEdit = async () => {
  if (!editingUser.value) return
  try {
    await ApiList.admin.user.updateUser(editingUser.value.id, {
      isActive: editingUser.value.isActive,
      isAdmin: editingUser.value.isAdmin
    })
    toast.success(t('common.saved'))
    showEditModal.value = false
    loadData()
  } catch (error) {
    toast.error(t('common.error'))
  }
}

const showPwdModal = ref(false)
const pwdForm = reactive({ userId: '', newPassword: '' })

const openPwdReset = (user: AdminUserListItem) => {
  pwdForm.userId = user.id
  pwdForm.newPassword = ''
  showPwdModal.value = true
}

const savePwd = async () => {
  if (!pwdForm.newPassword || pwdForm.newPassword.length < 6) {
    toast.warning(t('admin.password_min_length'))
    return
  }
  try {
    await ApiList.admin.user.updateUserPassword(pwdForm.userId, pwdForm.newPassword)
    toast.success(t('common.success'))
    showPwdModal.value = false
  } catch (error) {
    toast.error(t('common.error'))
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="flex flex-col gap-6 p-6 h-full pb-24">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 relative z-50">
      <div class="w-full md:w-96">
        <label
          class="input input-bordered bg-base-100/80 backdrop-blur shadow-sm flex items-center gap-3 w-full transition-all focus-within:shadow-md">
          <Icon name="mingcute:search-line" class="text-base-content/40 text-lg" />
          <input type="text" class="grow" :placeholder="t('common.search')" v-model="filter.search" />
        </label>
      </div>

      <div class="flex items-center gap-3 w-full md:w-auto justify-end">
        <select class="select select-bordered bg-base-100/80 backdrop-blur shadow-sm w-full md:w-40"
          v-model="filter.status">
          <option :value="-1">{{ t('common.all_status') }}</option>
          <option :value="0">{{ t('status.active') }}</option>
          <option :value="1">{{ t('status.inactive') }}</option>
          <option :value="2">{{ t('role.admin') }}</option>
        </select>

        <div class="dropdown dropdown-end dropdown-bottom" v-if="selectedIds.size > 0">
          <div tabindex="0" role="button"
            class="btn btn-primary text-primary-content shadow-md animate-in fade-in zoom-in duration-200">
            <Icon name="mingcute:layer-line" />
            {{ t('common.batch') }}
            <span class="badge badge-sm badge-neutral bg-white/20 border-none text-white">{{ selectedIds.size }}</span>
          </div>
          <ul tabindex="0"
            class="dropdown-content menu bg-base-100 rounded-xl z-[100] w-52 p-2 shadow-xl border border-base-200 mt-2">
            <li><a @click="handleBatch('activate')" class="hover:text-success">
                <Icon name="mingcute:check-circle-line" /> {{ t('action.activate') }}
              </a></li>
            <li><a @click="handleBatch('deactivate')" class="hover:text-warning">
                <Icon name="mingcute:close-circle-line" /> {{ t('action.deactivate') }}
              </a></li>
            <li class="divider my-1"></li>
            <li><a class="text-error hover:bg-error/10" @click="handleBatch('delete')">
                <Icon name="mingcute:delete-2-line" /> {{ t('common.delete') }}
              </a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-sm border border-base-200 overflow-visible z-0 flex-1 flex flex-col">
      <div class="overflow-x-auto overflow-y-hidden rounded-t-xl flex-1">
        <table class="table table-pin-rows h-full">
          <thead>
            <tr class="bg-base-200/50 text-base-content/70">
              <th class="w-12 text-center">
                <label>
                  <input type="checkbox" class="checkbox checkbox-sm checkbox-primary rounded-md" v-model="selectAll" />
                </label>
              </th>
              <th>{{ t('user.info') }}</th>
              <th>{{ t('user.role') }}</th>
              <th>{{ t('user.status') }}</th>
              <th>{{ t('user.stats') }}</th>
              <th>{{ t('common.created_at') }}</th>
              <th class="text-right pr-6">{{ t('common.action') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="7" class="h-64 text-center">
                <span class="loading loading-spinner loading-lg text-primary/50"></span>
              </td>
            </tr>

            <tr v-else-if="users.length === 0">
              <td colspan="7" class="h-64 text-center text-base-content/40">
                <div class="flex flex-col items-center gap-3">
                  <div class="bg-base-200 p-4 rounded-full">
                    <Icon name="mingcute:ghost-line" class="text-4xl" />
                  </div>
                  <span>{{ t('common.no_data') }}</span>
                </div>
              </td>
            </tr>

            <tr v-else v-for="user in users" :key="user.id" class="hover:bg-base-200/30 transition-colors group">
              <th class="text-center">
                <label>
                  <input type="checkbox" class="checkbox checkbox-sm checkbox-primary rounded-md"
                    :checked="selectedIds.has(user.id)" @change="toggleSelection(user.id)" />
                </label>
              </th>
              <td>
                <div class="flex items-center gap-4">
                  <div class="avatar">
                    <div class="mask mask-squircle w-10 h-10 bg-base-300 ring-1 ring-base-content/10">
                      <img :src="user.avatar || 'https://ui-avatars.com/api/?name=' + user.username"
                        :alt="user.username" loading="lazy" />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold truncate max-w-[140px]">{{ user.username }}</div>
                    <div class="text-xs text-base-content/50 truncate max-w-[180px]">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td>
                <span v-if="user.isAdmin"
                  class="badge badge-sm badge-primary badge-soft gap-1.5 font-medium px-3 py-2.5">
                  <Icon name="mingcute:shield-fill" class="w-3.5 h-3.5" /> Admin
                </span>
                <span v-else class="badge badge-sm badge-ghost gap-1.5 px-3 py-2.5 bg-base-200/50">
                  <Icon name="mingcute:user-3-line" class="w-3.5 h-3.5" /> User
                </span>
              </td>
              <td>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full ring-2 ring-opacity-20 ring-offset-1 ring-offset-base-100"
                    :class="user.isActive ? 'bg-success ring-success' : 'bg-error ring-error'"></div>
                  <span class="text-sm font-medium">{{ user.isActive ? t('status.active') : t('status.inactive')
                  }}</span>
                </div>
              </td>
              <td>
                <div class="flex gap-4 text-xs text-base-content/60">
                  <span class="flex items-center gap-1.5" :title="t('stats.blogs')">
                    <Icon name="mingcute:document-line" class="text-base-content/40" /> {{ user.blogCount }}
                  </span>
                  <span class="flex items-center gap-1.5" :title="t('stats.likes')">
                    <Icon name="mingcute:thumb-up-line" class="text-base-content/40" /> {{ user.totalLikes }}
                  </span>
                </div>
              </td>
              <td class="text-sm text-base-content/60 font-mono">
                {{ new Date(user.createdAt).toLocaleDateString() }}
              </td>
              <td class="text-right">
                <div class="join opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button class="btn btn-sm btn-ghost btn-square join-item hover:bg-primary/10 hover:text-primary"
                    :title="t('common.edit')" @click="openEdit(user)">
                    <Icon name="mingcute:edit-line" class="w-4 h-4" />
                  </button>
                  <button class="btn btn-sm btn-ghost btn-square join-item hover:bg-warning/10 hover:text-warning"
                    :title="t('user.reset_password')" @click="openPwdReset(user)">
                    <Icon name="mingcute:key-2-line" class="w-4 h-4" />
                  </button>
                  <button
                    class="btn btn-sm btn-ghost btn-square join-item text-error/70 hover:bg-error/10 hover:text-error"
                    :title="t('common.delete')" @click="handleDelete(user)">
                    <Icon name="mingcute:delete-2-line" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="p-4 border-t border-base-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-base-50/50">
        <div class="text-xs text-base-content/40 font-medium">
          {{ t('common.total_records', { count: pagination.totalBlogs || users.length }) }}
        </div>
        <div class="join bg-base-100 shadow-sm border border-base-200 rounded-lg overflow-hidden">
          <button class="join-item btn btn-sm btn-ghost border-r border-base-200 hover:bg-base-200"
            :disabled="!pagination.hasPrevPage" @click="changePage(pagination.currentPage - 1)">
            <Icon name="mingcute:left-line" />
          </button>
          <button
            class="join-item btn btn-sm bg-base-100 border-none no-animation text-xs font-normal cursor-default hover:bg-base-100">
            {{ pagination.currentPage }} / {{ pagination.totalPages }}
          </button>
          <button class="join-item btn btn-sm btn-ghost border-l border-base-200 hover:bg-base-200"
            :disabled="!pagination.hasNextPage" @click="changePage(pagination.currentPage + 1)">
            <Icon name="mingcute:right-line" />
          </button>
        </div>
      </div>
    </div>

    <dialog class="modal modal-bottom sm:modal-middle backdrop-blur-sm" :class="{ 'modal-open': showEditModal }">
      <div class="modal-box p-0 overflow-hidden shadow-2xl">
        <div class="p-5 border-b border-base-200 bg-base-200/30 flex justify-between items-center">
          <h3 class="font-bold text-lg flex items-center gap-2">
            <Icon name="mingcute:user-edit-line" class="text-primary" />
            {{ t('admin.edit_user') }}
          </h3>
          <button class="btn btn-sm btn-circle btn-ghost" @click="showEditModal = false">✕</button>
        </div>

        <div class="p-6" v-if="editingUser">
          <div class="grid gap-4">
            <div
              class="bg-base-100 border border-base-200 rounded-xl p-4 flex items-center justify-between hover:border-primary/30 transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center">
                  <Icon name="mingcute:power-line" class="text-xl"
                    :class="editingUser.isActive ? 'text-success' : 'text-base-content/40'" />
                </div>
                <div>
                  <div class="font-medium">{{ t('user.status') }}</div>
                  <div class="text-xs text-base-content/50">{{ editingUser.isActive ? t('status.active_desc') :
                    t('status.inactive_desc') }}</div>
                </div>
              </div>
              <input type="checkbox" class="toggle toggle-success" v-model="editingUser.isActive" />
            </div>

            <div
              class="bg-base-100 border border-base-200 rounded-xl p-4 flex items-center justify-between hover:border-primary/30 transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center">
                  <Icon name="mingcute:shield-line" class="text-xl"
                    :class="editingUser.isAdmin ? 'text-primary' : 'text-base-content/40'" />
                </div>
                <div>
                  <div class="font-medium">{{ t('user.role') }}</div>
                  <div class="text-xs text-base-content/50">{{ editingUser.isAdmin ? t('role.admin_desc') :
                    t('role.user_desc') }}</div>
                </div>
              </div>
              <input type="checkbox" class="toggle toggle-primary" v-model="editingUser.isAdmin" />
            </div>
          </div>
        </div>

        <div class="p-5 border-t border-base-200 bg-base-50 flex justify-end gap-2">
          <button class="btn btn-ghost" @click="showEditModal = false">{{ t('common.cancel') }}</button>
          <button class="btn btn-primary px-6" @click="saveEdit">{{ t('common.save') }}</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="showEditModal = false">close</button>
      </form>
    </dialog>

    <dialog class="modal modal-bottom sm:modal-middle backdrop-blur-sm" :class="{ 'modal-open': showPwdModal }">
      <div class="modal-box p-0 overflow-hidden shadow-2xl">
        <div class="p-5 border-b border-base-200 bg-warning/5 flex justify-between items-center">
          <h3 class="font-bold text-lg flex items-center gap-2 text-warning-content">
            <Icon name="mingcute:key-2-line" class="text-warning" />
            {{ t('user.reset_password') }}
          </h3>
          <button class="btn btn-sm btn-circle btn-ghost" @click="showPwdModal = false">✕</button>
        </div>

        <div class="p-6">
          <div class="alert alert-warning alert-soft mb-4 text-xs">
            <Icon name="mingcute:warning-line" />
            <span>{{ t('admin.password_warning') }}</span>
          </div>

          <div class="form-control w-full">
            <label class="label">
              <span class="label-text font-medium">{{ t('user.new_password') }}</span>
            </label>
            <div class="relative">
              <input type="text" v-model="pwdForm.newPassword" class="input input-bordered w-full font-mono pl-10"
                placeholder="New Password" />
              <Icon name="mingcute:lock-line" class="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
            </div>
            <label class="label">
              <span class="label-text-alt text-base-content/50">{{ t('admin.password_hint') }}</span>
            </label>
          </div>
        </div>

        <div class="p-5 border-t border-base-200 bg-base-50 flex justify-end gap-2">
          <button class="btn btn-ghost" @click="showPwdModal = false">{{ t('common.cancel') }}</button>
          <button class="btn btn-warning px-6" @click="savePwd">{{ t('common.confirm_reset') }}</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="showPwdModal = false">close</button>
      </form>
    </dialog>
  </div>
</template>

<i18n lang="json">{
  "zh-CN": {
    "admin.batch_confirm_title": "确认批量操作",
    "admin.batch_confirm_content": "即将对 {count} 位用户执行此操作，是否继续？",
    "admin.delete_user_title": "删除确认",
    "admin.delete_user_content": "删除用户 {name} 后将无法恢复相关数据。",
    "admin.edit_user": "编辑用户",
    "admin.password_min_length": "密码长度至少6位",
    "admin.password_hint": "如不修改请留空",
    "admin.password_warning": "重置密码后，用户之前的登录状态将失效。",
    "user.info": "用户信息",
    "user.role": "角色权限",
    "user.status": "账号状态",
    "user.stats": "统计数据",
    "user.reset_password": "重置密码",
    "user.new_password": "新密码",
    "role.admin": "管理员",
    "role.user": "普通用户",
    "role.admin_desc": "拥有系统最高管理权限",
    "role.user_desc": "仅拥有基础浏览和互动权限",
    "status.active": "正常",
    "status.inactive": "冻结",
    "status.active_desc": "用户可正常登录和使用功能",
    "status.inactive_desc": "禁止用户登录和进行操作",
    "status.banned": "封禁",
    "stats.blogs": "发布文章",
    "stats.likes": "获得点赞",
    "action.activate": "解除冻结",
    "action.deactivate": "冻结账号",
    "common.search": "搜索用户...",
    "common.all_status": "全部状态",
    "common.batch": "批量",
    "common.created_at": "注册日期",
    "common.action": "操作",
    "common.no_data": "暂无相关数据",
    "common.total_records": "共 {count} 条记录",
    "common.confirm": "确认",
    "common.cancel": "取消",
    "common.save": "保存更改",
    "common.delete": "删除",
    "common.edit": "编辑",
    "common.success": "操作成功",
    "common.error": "操作失败",
    "common.saved": "已保存",
    "common.confirm_reset": "确认重置"
  },
  "en": {
    "admin.batch_confirm_title": "Confirm Batch Action",
    "admin.batch_confirm_content": "Proceed with this action for {count} users?",
    "admin.delete_user_title": "Confirm Deletion",
    "admin.delete_user_content": "Deleting user {name} cannot be undone.",
    "admin.edit_user": "Edit User",
    "admin.password_min_length": "Min 6 chars required",
    "admin.password_hint": "Leave empty to keep current",
    "admin.password_warning": "Resetting password will revoke current sessions.",
    "user.info": "User",
    "user.role": "Role",
    "user.status": "Status",
    "user.stats": "Stats",
    "user.reset_password": "Reset Password",
    "user.new_password": "New Password",
    "role.admin": "Admin",
    "role.user": "User",
    "role.admin_desc": "Full system access",
    "role.user_desc": "Standard access",
    "status.active": "Active",
    "status.inactive": "Inactive",
    "status.active_desc": "Full access enabled",
    "status.inactive_desc": "Access disabled",
    "status.banned": "Banned",
    "stats.blogs": "Blogs",
    "stats.likes": "Likes",
    "action.activate": "Activate",
    "action.deactivate": "Suspend",
    "common.search": "Search users...",
    "common.all_status": "All Status",
    "common.batch": "Batch",
    "common.created_at": "Joined",
    "common.action": "Actions",
    "common.no_data": "No data found",
    "common.total_records": "{count} records",
    "common.confirm": "Confirm",
    "common.cancel": "Cancel",
    "common.save": "Save Changes",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.success": "Success",
    "common.error": "Failed",
    "common.saved": "Saved",
    "common.confirm_reset": "Reset"
  },
  "zh-TW": {
    "admin.batch_confirm_title": "確認批量操作",
    "admin.batch_confirm_content": "即將對 {count} 位用戶執行此操作，是否繼續？",
    "admin.delete_user_title": "刪除確認",
    "admin.delete_user_content": "刪除用戶 {name} 後將無法恢復相關數據。",
    "admin.edit_user": "編輯用戶",
    "admin.password_min_length": "密碼長度至少6位",
    "admin.password_hint": "如不修改請留空",
    "admin.password_warning": "重置密碼後，用戶之前的登錄狀態將失效。",
    "user.info": "用戶信息",
    "user.role": "角色權限",
    "user.status": "賬號狀態",
    "user.stats": "統計數據",
    "user.reset_password": "重置密碼",
    "user.new_password": "新密碼",
    "role.admin": "管理員",
    "role.user": "普通用戶",
    "role.admin_desc": "擁有系統最高管理權限",
    "role.user_desc": "僅擁有基礎瀏覽和互動權限",
    "status.active": "正常",
    "status.inactive": "凍結",
    "status.active_desc": "用戶可正常登錄和使用功能",
    "status.inactive_desc": "禁止用戶登錄和進行操作",
    "status.banned": "封禁",
    "stats.blogs": "發布文章",
    "stats.likes": "獲得點贊",
    "action.activate": "解除凍結",
    "action.deactivate": "凍結賬號",
    "common.search": "搜索用戶...",
    "common.all_status": "全部狀態",
    "common.batch": "批量",
    "common.created_at": "註冊日期",
    "common.action": "操作",
    "common.no_data": "暫無相關數據",
    "common.total_records": "共 {count} 條記錄",
    "common.confirm": "確認",
    "common.cancel": "取消",
    "common.save": "保存更改",
    "common.delete": "刪除",
    "common.edit": "編輯",
    "common.success": "操作成功",
    "common.error": "操作失敗",
    "common.saved": "已保存",
    "common.confirm_reset": "確認重置"
  }
}</i18n>