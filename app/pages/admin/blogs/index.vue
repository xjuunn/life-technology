<script setup lang="ts">
import { EditorContent, useEditor, type JSONContent } from '@tiptap/vue-3';
import type { ListBlogItem, ListBlogRequest, UpdateBlogTopOrderRequest } from '~/api/admin'

definePageMeta({
  layout: "admin"
})

const { t } = useI18n()
const toast = useToast()
const dialog = useDialog()
const route = useRoute()
const router = useRouter()

const loading = ref(false)
const blogs = ref<ListBlogItem[]>([])
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
  status: '',
  author: ''
})

const selectedIds = ref<Set<string>>(new Set())
const showRejectModal = ref(false)
const showViewModal = ref(false)
const viewingBlog = ref<ListBlogItem | null>(null)

const rejectForm = reactive({
  id: '',
  reason: ''
})

const statusOptions = [
  { value: 'draft', label: 'status.draft', color: 'badge-neutral' },
  { value: 'pending', label: 'status.pending', color: 'badge-warning' },
  { value: 'published', label: 'status.published', color: 'badge-success' },
  { value: 'rejected', label: 'status.rejected', color: 'badge-error' },
  { value: 'archived', label: 'status.archived', color: 'badge-info' }
]

const blogContent = computed(() => {
  if (viewingBlog.value?.content) {
    try {
      return JSON.parse(viewingBlog.value.content)
    } catch (e) {
      console.error('Failed to parse blog content:', e)
    }
  }
  return {
    "type": "doc",
    "content": [
      {
        "type": "paragraph",
        "content": []
      }
    ]
  } as JSONContent
})

const editor = useEditor({
  extensions: GlobalEditorExtensions,
  editorProps: {

  },
  content: blogContent.value,
  editable: false,
})

watch(blogContent, (newContent) => {
  editor.value?.commands.setContent(newContent)
})

const selectAll = computed({
  get: () => blogs.value.length > 0 && blogs.value.every(b => selectedIds.value.has(b.id)),
  set: (val) => {
    if (val) {
      blogs.value.forEach(b => selectedIds.value.add(b.id))
    } else {
      blogs.value.forEach(b => selectedIds.value.delete(b.id))
    }
  }
})

const loadData = async () => {
  loading.value = true
  try {
    const params: ListBlogRequest = {
      page: pagination.value.currentPage,
      limit: pagination.value.limit,
      search: filter.search,
      status: filter.status,
      author: filter.author
    }

    const res = await ApiList.admin.blog.listBlogs(params)

    blogs.value = res.data.blogs.sort((a, b) => {
      if (a.topOrder > 0 && b.topOrder > 0) {
        return b.topOrder - a.topOrder
      }
      if (a.topOrder > 0 && b.topOrder === 0) {
        return -1
      }
      if (a.topOrder === 0 && b.topOrder > 0) {
        return 1
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
    
    pagination.value = res.data.pagination
    selectedIds.value.clear()

    router.replace({
      query: {
        ...route.query,
        page: pagination.value.currentPage,
        search: filter.search || undefined,
        status: filter.status || undefined,
        author: filter.author || undefined
      }
    })
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
watch(() => filter.author, debouncedSearch)
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

const handleBatch = async (operation: 'delete' | 'publish' | 'archive') => {
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
      type: 'blogs'
    })
    toast.success(t('common.success'))
    loadData()
  } catch (error) {
    toast.error(t('common.error'))
  }
}

const handleDelete = async (blog: ListBlogItem) => {
  const confirm = await dialog.confirm({
    title: t('admin.delete_blog_title'),
    content: t('admin.delete_blog_content', { title: blog.title }),
    type: 'error',
    confirmText: t('common.delete')
  })

  if (!confirm) return

  try {
    await ApiList.admin.blog.delBlog(blog.id)
    toast.success(t('common.success'))
    loadData()
    if (showViewModal.value) showViewModal.value = false
  } catch (error) {
    toast.error(t('common.error'))
  }
}

const handleApprove = async (blog: ListBlogItem) => {
  try {
    await ApiList.admin.blog.approve(blog.id)
    toast.success(t('common.success'))
    loadData()
    if (showViewModal.value) showViewModal.value = false
  } catch (error) {
    toast.error(t('common.error'))
  }
}

const openRejectModal = (blog: ListBlogItem) => {
  rejectForm.id = blog.id
  rejectForm.reason = ''
  showRejectModal.value = true
}

const openViewModal = (blog: ListBlogItem) => {
  viewingBlog.value = blog
  showViewModal.value = true
}

const confirmReject = async () => {
  if (!rejectForm.reason) {
    toast.warning(t('admin.reject_reason_required'))
    return
  }
  try {
    await ApiList.admin.blog.reject(rejectForm.id, rejectForm.reason)
    toast.success(t('common.success'))
    showRejectModal.value = false
    loadData()
    if (showViewModal.value) showViewModal.value = false
  } catch (error) {
    toast.error(t('common.error'))
  }
}

const toggleTopOrder = async (blog: ListBlogItem) => {
  const newTopOrder = blog.topOrder > 0 ? 0 : 1
  
  try {
    const data: UpdateBlogTopOrderRequest = {
      topOrder: newTopOrder
    }
    await ApiList.admin.blog.updateTopOrder(blog.id, data)
    toast.success(t('common.success'))
    loadData()
  } catch (error) {
    toast.error(t('common.error'))
  }
}

const getStatusBadge = (status: string) => {
  const option = statusOptions.find(o => o.value === status)
  return option ? option.color : 'badge-ghost'
}

const getTopOrderDisplay = (topOrder: number) => {
  if (topOrder > 0) {
    return {
      text: `${t('admin.top')}`,
      variant: 'primary'
    }
  }
  return {
    text: t('admin.not_top'),
    variant: 'ghost'
  }
}

const viewingBlogTopOrder = computed(() => viewingBlog.value?.topOrder || 0)
const viewingBlogTopOrderDisplay = computed(() => getTopOrderDisplay(viewingBlogTopOrder.value))

onMounted(() => {
  if (route.query.search) filter.search = route.query.search as string
  if (route.query.author) filter.author = route.query.author as string
  if (route.query.status) filter.status = route.query.status as string
  if (route.query.page) pagination.value.currentPage = Number(route.query.page)
  loadData()
})
</script>

<template>
  <div class="flex flex-col gap-6 p-2 md:p-6">
    <title>life-内容管理</title>
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 relative z-40 shrink-0">
      <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1">
        <label
          class="input input-bordered bg-base-100/80 backdrop-blur shadow-sm flex items-center gap-3 w-full sm:w-80 transition-all hover:shadow-md focus-within:shadow-md focus-within:border-primary/50 rounded-lg h-11">
          <Icon name="mingcute:search-line" class="text-base-content/50 text-xl" />
          <input type="text" class="grow placeholder:text-base-content/40" :placeholder="t('common.search_blog')"
            v-model="filter.search" />
        </label>

        <label
          class="input input-bordered bg-base-100/80 backdrop-blur shadow-sm flex items-center gap-3 w-full sm:w-64 transition-all hover:shadow-md focus-within:shadow-md focus-within:border-primary/50 rounded-lg h-11">
          <Icon name="mingcute:user-3-line" class="text-base-content/50 text-xl" />
          <input type="text" class="grow placeholder:text-base-content/40" :placeholder="t('common.search_author')"
            v-model="filter.author" />
        </label>
      </div>

      <div class="flex items-center gap-3 w-full md:w-auto justify-end">
        <select
          class="select select-bordered bg-base-100/80 backdrop-blur shadow-sm w-full md:w-40 rounded-lg h-11 min-h-[2.75rem]"
          v-model="filter.status">
          <option value="">{{ t('common.all_status') }}</option>
          <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">
            {{ t(opt.label) }}
          </option>
        </select>

        <div class="dropdown dropdown-end dropdown-bottom" v-if="selectedIds.size > 0">
          <div tabindex="0" role="button"
            class="btn btn-primary text-primary-content shadow-md animate-in fade-in zoom-in duration-200 rounded-lg px-6 h-11 min-h-[2.75rem]">
            <Icon name="mingcute:layer-line" size="18" />
            <span>{{ t('common.batch') }}</span>
            <span class="badge badge-neutral bg-white/20 border-none text-white">{{ selectedIds.size }}</span>
          </div>
          <ul tabindex="0"
            class="dropdown-content menu bg-base-100 rounded-xl z-[100] w-52 p-2 shadow-xl border border-base-200 mt-2">
            <li><a @click="handleBatch('publish')" class="py-3 hover:text-success">
                <Icon name="mingcute:check-circle-line" size="18" /> {{ t('action.publish') }}
              </a></li>
            <li><a @click="handleBatch('archive')" class="py-3 hover:text-info">
                <Icon name="mingcute:archive-line" size="18" /> {{ t('action.archive') }}
              </a></li>
            <li class="divider my-1"></li>
            <li><a class="text-error hover:bg-error/10 py-3" @click="handleBatch('delete')">
                <Icon name="mingcute:delete-2-line" size="18" /> {{ t('common.delete') }}
              </a></li>
          </ul>
        </div>
      </div>
    </div>

    <div
      class="card bg-base-100 shadow-sm border border-base-200 z-0 flex-1 min-h-0 flex flex-col rounded-2xl overflow-hidden">
      <div class="overflow-auto flex-1 w-full scrollbar-hide">
        <table class="table table-pin-rows">
          <thead>
            <tr class="bg-base-200/50 text-base-content/70">
              <th class="w-16 text-center py-4">
                <label>
                  <input type="checkbox" class="checkbox checkbox-primary rounded-md" v-model="selectAll" />
                </label>
              </th>
              <th class="py-4 text-sm font-semibold min-w-[300px]">{{ t('blog.info') }}</th>
              <th class="py-4 text-sm font-semibold min-w-[150px]">{{ t('blog.author') }}</th>
              <th class="py-4 text-sm font-semibold min-w-[120px]">{{ t('blog.status') }}</th>
              <th class="py-4 text-sm font-semibold min-w-[120px] text-center">{{ t('blog.top_order') }}</th>
              <th class="py-4 text-sm font-semibold min-w-[180px]">{{ t('blog.stats') }}</th>
              <th class="py-4 text-sm font-semibold min-w-[120px]">{{ t('common.updated_at') }}</th>
              <th
                class="sticky right-0 bg-base-200/50 shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)] text-center w-48 py-4 text-sm font-semibold">
                {{ t('common.action') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="8" class="h-64 text-center">
                <span class="loading loading-spinner loading-lg text-primary/50"></span>
              </td>
            </tr>

            <tr v-else-if="blogs.length === 0">
              <td colspan="8" class="h-64 text-center text-base-content/40">
                <div class="flex flex-col items-center gap-3">
                  <div class="bg-base-200 p-6 rounded-full">
                    <Icon name="mingcute:ghost-line" class="text-5xl" />
                  </div>
                  <span class="text-lg">{{ t('common.no_data') }}</span>
                </div>
              </td>
            </tr>

            <tr v-else v-for="blog in blogs" :key="blog.id"
              class="hover:bg-base-200/30 transition-colors group border-b border-base-100">
              <th class="text-center py-4">
                <label>
                  <input type="checkbox" class="checkbox checkbox-primary rounded-md"
                    :checked="selectedIds.has(blog.id)" @change="toggleSelection(blog.id)" />
                </label>
              </th>
              <td class="py-4">
                <div class="flex items-start gap-4">
                  <div class="avatar">
                    <div class="w-16 h-12 rounded-lg bg-base-200 ring-1 ring-base-content/5 overflow-hidden">
                      <img :src="blog.coverImage || `https://picsum.photos/seed/${blog.id}/200/150`" :alt="blog.title"
                        class="object-cover w-full h-full" loading="lazy" />
                    </div>
                  </div>
                  <div class="min-w-0 flex flex-col gap-1">
                    <div
                      class="font-medium text-base truncate max-w-[280px] cursor-pointer hover:text-primary transition-colors"
                      :title="blog.title" @click="openViewModal(blog)">
                      {{ blog.title }}
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="badge badge-xs badge-neutral badge-outline">{{ blog.category }}</span>
                      <span class="text-xs text-base-content/50 truncate max-w-[200px] font-mono">/{{ blog.slug
                      }}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="py-4">
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="w-8 h-8 rounded-full bg-base-200">
                      <img :src="blog.author.avatar || 'https://ui-avatars.com/api/?name=' + blog.author.username"
                        :alt="blog.author.username" />
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-sm font-medium">{{ blog.author.username }}</span>
                    <span class="text-xs text-base-content/50 truncate max-w-[100px]">{{ blog.author.email }}</span>
                  </div>
                </div>
              </td>
              <td class="py-4">
                <span class="badge badge-soft gap-1.5 font-medium px-3 py-1 h-7" :class="getStatusBadge(blog.status)">
                  {{ t(`status.${blog.status}`) }}
                </span>
                <div v-if="blog.status === 'rejected' && blog.rejectReason"
                  class="mt-1 text-xs text-error/80 truncate max-w-[120px]" :title="blog.rejectReason">
                  {{ blog.rejectReason }}
                </div>
              </td>
              <td class="py-4 text-center">
                  <button
                    class="btn btn-sm gap-1.5 font-medium px-3 py-1 h-7"
                    :class="blog.topOrder > 0 ? 'btn-primary' : 'btn-ghost border border-base-300'"
                    @click="toggleTopOrder(blog)"
                    :title="blog.topOrder > 0 ? t('action.cancel_top') : t('action.set_top')">
                    {{ getTopOrderDisplay(blog.topOrder).text }}
                  </button>
              </td>
              <td class="py-4">
                <div class="flex gap-4 text-xs text-base-content/70">
                  <span class="flex items-center gap-1" :title="t('stats.views')">
                    <Icon name="mingcute:eye-line" size="14" /> {{ blog.viewCount }}
                  </span>
                  <span class="flex items-center gap-1" :title="t('stats.likes')">
                    <Icon name="mingcute:thumb-up-line" size="14" /> {{ blog.likeCount }}
                  </span>
                  <span class="flex items-center gap-1" :title="t('stats.comments')">
                    <Icon name="mingcute:chat-2-line" size="14" /> {{ blog.commentCount }}
                  </span>
                </div>
              </td>
              <td class="text-sm text-base-content/60 font-mono py-4">
                <div class="flex flex-col">
                  <span>{{ new Date(blog.updatedAt).toLocaleDateString() }}</span>
                  <span class="text-xs text-base-content/40">{{ new Date(blog.updatedAt).toLocaleTimeString() }}</span>
                </div>
              </td>
              <td
                class="sticky right-0 bg-base-100 shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)] text-center p-0 align-middle">
                <div class="flex justify-center items-center h-full w-full px-2">
                  <div class="join border border-base-200/60 shadow-sm bg-base-100 rounded-lg">
                    <template v-if="blog.status === 'pending'">
                      <button class="btn btn-sm btn-square btn-ghost join-item text-success hover:bg-success/10 w-9 h-9"
                        :title="t('action.approve')" @click="handleApprove(blog)">
                        <Icon name="mingcute:check-line" size="18" />
                      </button>
                      <button class="btn btn-sm btn-square btn-ghost join-item text-warning hover:bg-warning/10 w-9 h-9"
                        :title="t('action.reject')" @click="openRejectModal(blog)">
                        <Icon name="mingcute:close-line" size="18" />
                      </button>
                    </template>
                    <button
                      class="btn btn-sm btn-square btn-ghost join-item text-base-content/70 hover:bg-base-200 hover:text-primary w-9 h-9"
                      v-else :title="t('common.view')" @click="openViewModal(blog)">
                      <Icon name="mingcute:external-link-line" size="18" />
                    </button>
                    <button
                      class="btn btn-sm btn-square btn-ghost join-item text-primary/70 hover:bg-primary/10 hover:text-primary w-9 h-9"
                      :title="blog.topOrder > 0 ? t('action.cancel_top') : t('action.set_top')"
                      @click="toggleTopOrder(blog)">
                      <Icon :name="blog.topOrder > 0 ? 'mingcute:pin-fill' : 'mingcute:pin-line'" size="18" />
                    </button>
                    <button
                      class="btn btn-sm btn-square btn-ghost join-item text-error/70 hover:bg-error/10 hover:text-error w-9 h-9"
                      :title="t('common.delete')" @click="handleDelete(blog)">
                      <Icon name="mingcute:delete-2-line" size="18" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="p-4 border-t border-base-200 bg-base-50/50 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 h-auto sm:h-16">
        <div class="text-sm text-base-content/50 font-medium hidden sm:block">
          {{ t('common.total_records', { count: pagination.totalBlogs || blogs.length }) }}
        </div>
        <div class="join bg-base-100 shadow-sm border border-base-200 rounded-lg overflow-hidden">
          <button
            class="join-item btn btn-sm h-9 min-h-[2.25rem] btn-ghost border-r border-base-200 hover:bg-base-200 px-3"
            :disabled="!pagination.hasPrevPage" @click="changePage(pagination.currentPage - 1)">
            <Icon name="mingcute:left-line" size="18" />
          </button>
          <button
            class="join-item btn btn-sm h-9 min-h-[2.25rem] bg-base-100 border-none no-animation text-sm font-medium cursor-default hover:bg-base-100 px-4">
            {{ pagination.currentPage }} / {{ pagination.totalPages }}
          </button>
          <button
            class="join-item btn btn-sm h-9 min-h-[2.25rem] btn-ghost border-l border-base-200 hover:bg-base-200 px-3"
            :disabled="!pagination.hasNextPage" @click="changePage(pagination.currentPage + 1)">
            <Icon name="mingcute:right-line" size="18" />
          </button>
        </div>
      </div>
    </div>

    <!-- 驳回模态框 -->
    <common-modal v-model="showRejectModal" :title="t('admin.reject_blog')">
      <template #title-prefix>
        <div class="p-2 bg-error/10 rounded-lg text-error">
          <Icon name="mingcute:close-circle-line" size="20" />
        </div>
      </template>

      <div class="form-control w-full">
        <label class="label pt-0">
          <span class="label-text font-semibold">{{ t('admin.reject_reason_label') }}</span>
        </label>
        <textarea v-model="rejectForm.reason"
          class="textarea textarea-bordered h-32 w-full resize-none focus:border-error/50"
          :placeholder="t('admin.reject_reason_placeholder')"></textarea>
        <label class="label pb-0">
          <span class="label-text-alt text-base-content/50">{{ t('admin.reject_hint') }}</span>
        </label>
      </div>

      <template #actions="{ close }">
        <button class="btn btn-ghost" @click="close">{{ t('common.cancel') }}</button>
        <button class="btn btn-error px-6" @click="confirmReject">{{ t('action.reject_confirm') }}</button>
      </template>
    </common-modal>

    <!-- 查看详情模态框 -->
    <common-modal v-model="showViewModal" :title="viewingBlog?.title" max-width="max-w-4xl">
      <div v-if="viewingBlog" class="flex flex-col gap-6">
        <div v-if="viewingBlog.coverImage"
          class="w-full h-64 sm:h-80 bg-base-200 relative rounded-xl overflow-hidden shadow-sm">
          <img :src="viewingBlog.coverImage" class="w-full h-full object-cover" :alt="viewingBlog.title" />
          <div class="absolute inset-0 bg-gradient-to-t from-base-100/50 to-transparent"></div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-base-200">
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="w-12 h-12 rounded-full ring ring-base-200 ring-offset-base-100 ring-offset-2">
                <img
                  :src="viewingBlog.author.avatar || 'https://ui-avatars.com/api/?name=' + viewingBlog.author.username" />
              </div>
            </div>
            <div>
              <div class="font-bold">{{ viewingBlog.author.username }}</div>
              <div class="text-xs text-base-content/50 flex gap-2">
                <span>{{ viewingBlog.author.email }}</span>
                <span class="opacity-70 font-mono">ID: {{ viewingBlog.id }}</span>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-end gap-1">
            <span class="badge badge-lg" :class="getStatusBadge(viewingBlog.status)">
              {{ t(`status.${viewingBlog.status}`) }}
            </span>
            <button class="btn btn-sm gap-1.5 font-medium px-3 py-1 h-7 mt-1"
                    :class="viewingBlogTopOrder > 0 ? 'btn-primary' : 'btn-ghost border border-base-300'"
                    @click="toggleTopOrder(viewingBlog)"
                    :title="viewingBlogTopOrder > 0 ? t('action.cancel_top') : t('action.set_top')">
              {{ viewingBlogTopOrderDisplay.text }}
            </button>
            <span class="text-xs text-base-content/50">
              {{ new Date(viewingBlog.updatedAt).toLocaleString() }}
            </span>
          </div>
        </div>

        <div v-if="viewingBlog.summary"
          class="bg-base-200/50 p-4 rounded-xl text-base-content/70 italic border-l-4 border-primary">
          {{ viewingBlog.summary }}
        </div>

        <div class="prose prose-sm md:prose-base max-w-none">
          <editor-content :editor="editor"></editor-content>
        </div>

        <div class="flex flex-wrap gap-2">
          <span v-for="tag in viewingBlog.tags" :key="tag" class="badge badge-outline">#{{ tag }}</span>
        </div>

        <div v-if="viewingBlog.status === 'rejected' && viewingBlog.rejectReason" class="alert alert-error alert-soft">
          <Icon name="mingcute:close-circle-fill" />
          <div>
            <h3 class="font-bold text-xs">{{ t('admin.reject_reason_label') }}</h3>
            <div class="text-xs">{{ viewingBlog.rejectReason }}</div>
          </div>
        </div>
      </div>

      <template #actions="{ close }">
        <div class="flex flex-wrap gap-2 w-full">
          <template v-if="viewingBlog?.status === 'pending'">
            <button class="btn btn-warning" @click="viewingBlog && openRejectModal(viewingBlog)">
              {{ t('action.reject') }}
            </button>
            <button class="btn btn-success text-white" @click="viewingBlog && handleApprove(viewingBlog)">
              {{ t('action.approve') }}
            </button>
          </template>
          <div class="flex-1"></div>
          <button class="btn btn-primary" @click="viewingBlog && toggleTopOrder(viewingBlog)">
            <Icon :name="viewingBlogTopOrder > 0 ? 'mingcute:pin-fill' : 'mingcute:pin-line'" size="18" />
            {{ viewingBlogTopOrder > 0 ? t('action.cancel_top') : t('action.set_top') }}
          </button>
          <button class="btn btn-ghost" @click="close">{{ t('common.cancel') }}</button>
        </div>
      </template>
    </common-modal>
  </div>
</template>

<i18n lang="json">
{
  "zh-CN": {
    "blog.info": "博客信息",
    "blog.author": "作者",
    "blog.status": "状态",
    "blog.top_order": "置顶状态",
    "blog.stats": "数据统计",
    "status.draft": "草稿",
    "status.pending": "审核中",
    "status.published": "已发布",
    "status.rejected": "已驳回",
    "status.archived": "已归档",
    "admin.batch_confirm_title": "确认批量操作",
    "admin.batch_confirm_content": "即将对 {count} 篇博客执行此操作，是否继续？",
    "admin.delete_blog_title": "删除博客",
    "admin.delete_blog_content": "删除博客 {title} 后将无法恢复。",
    "admin.reject_blog": "驳回博客",
    "admin.reject_reason_label": "驳回原因",
    "admin.reject_reason_placeholder": "请输入具体的驳回原因，以便作者修改...",
    "admin.reject_hint": "原因将通过系统通知发送给作者",
    "admin.reject_reason_required": "请填写驳回原因",
    "admin.top": "置顶",
    "admin.not_top": "未置顶",
    "action.publish": "发布",
    "action.archive": "归档",
    "action.approve": "通过",
    "action.reject": "驳回",
    "action.set_top": "设为置顶",
    "action.cancel_top": "取消置顶",
    "action.increase_top": "提高优先级",
    "action.decrease_top": "降低优先级",
    "action.reject_confirm": "确认驳回",
    "action.save": "保存",
    "stats.views": "浏览",
    "stats.likes": "点赞",
    "stats.comments": "评论",
    "common.search_blog": "搜索博客标题...",
    "common.search_author": "搜索作者...",
    "common.all_status": "全部状态",
    "common.batch": "批量",
    "common.updated_at": "更新时间",
    "common.action": "操作",
    "common.no_data": "暂无相关博客",
    "common.total_records": "共 {count} 条记录",
    "common.confirm": "确认",
    "common.cancel": "取消",
    "common.delete": "删除",
    "common.success": "操作成功",
    "common.error": "操作失败",
    "common.view": "查看详情"
  },
  "en": {
    "blog.info": "Blog Info",
    "blog.author": "Author",
    "blog.status": "Status",
    "blog.top_order": "Top Status",
    "blog.stats": "Stats",
    "status.draft": "Draft",
    "status.pending": "Pending",
    "status.published": "Published",
    "status.rejected": "Rejected",
    "status.archived": "Archived",
    "admin.batch_confirm_title": "Batch Action",
    "admin.batch_confirm_content": "Proceed with this action for {count} blogs?",
    "admin.delete_blog_title": "Delete Blog",
    "admin.delete_blog_content": "Deleting blog {title} is permanent.",
    "admin.reject_blog": "Reject Blog",
    "admin.reject_reason_label": "Reason",
    "admin.reject_reason_placeholder": "Reason for rejection...",
    "admin.reject_hint": "Author will be notified.",
    "admin.reject_reason_required": "Reason is required",
    "admin.top": "Top",
    "admin.not_top": "Not Top",
    "action.publish": "Publish",
    "action.archive": "Archive",
    "action.approve": "Approve",
    "action.reject": "Reject",
    "action.set_top": "Set Top",
    "action.cancel_top": "Cancel Top",
    "action.increase_top": "Increase Priority",
    "action.decrease_top": "Decrease Priority",
    "action.reject_confirm": "Reject",
    "action.save": "Save",
    "stats.views": "Views",
    "stats.likes": "Likes",
    "stats.comments": "Comments",
    "common.search_blog": "Search title...",
    "common.search_author": "Search author...",
    "common.all_status": "All Status",
    "common.batch": "Batch",
    "common.updated_at": "Updated",
    "common.action": "Actions",
    "common.no_data": "No blogs found",
    "common.total_records": "{count} records",
    "common.confirm": "Confirm",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.success": "Success",
    "common.error": "Failed",
    "common.view": "View Details"
  },
  "zh-TW": {
    "blog.info": "博客信息",
    "blog.author": "作者",
    "blog.status": "狀態",
    "blog.top_order": "置頂狀態",
    "blog.stats": "數據統計",
    "status.draft": "草稿",
    "status.pending": "審核中",
    "status.published": "已發布",
    "status.rejected": "已駁回",
    "status.archived": "已歸檔",
    "admin.batch_confirm_title": "確認批量操作",
    "admin.batch_confirm_content": "即將對 {count} 篇博客執行此操作，是否繼續？",
    "admin.delete_blog_title": "刪除博客",
    "admin.delete_blog_content": "刪除博客 {title} 後將無法恢復。",
    "admin.reject_blog": "駁回博客",
    "admin.reject_reason_label": "駁回原因",
    "admin.reject_reason_placeholder": "請輸入具體的駁回原因，以便作者修改...",
    "admin.reject_hint": "原因將通過系統通知發送給作者",
    "admin.reject_reason_required": "請填寫駁回原因",
    "admin.top": "置頂",
    "admin.not_top": "未置頂",
    "action.publish": "發布",
    "action.archive": "歸檔",
    "action.approve": "通過",
    "action.reject": "駁回",
    "action.set_top": "設為置頂",
    "action.cancel_top": "取消置頂",
    "action.increase_top": "提高優先級",
    "action.decrease_top": "降低優先級",
    "action.reject_confirm": "確認駁回",
    "action.save": "保存",
    "stats.views": "瀏覽",
    "stats.likes": "點贊",
    "stats.comments": "評論",
    "common.search_blog": "搜索博客標題...",
    "common.search_author": "搜索作者...",
    "common.all_status": "全部狀態",
    "common.batch": "批量",
    "common.updated_at": "更新時間",
    "common.action": "操作",
    "common.no_data": "暫無相關博客",
    "common.total_records": "共 {count} 條記錄",
    "common.confirm": "確認",
    "common.cancel": "取消",
    "common.delete": "刪除",
    "common.success": "操作成功",
    "common.error": "操作失敗",
    "common.view": "查看詳情"
  }
}
</i18n>