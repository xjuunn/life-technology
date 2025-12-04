<script setup lang="ts">
import type { ListCommentRequest, ListCOmmentItem, BatchRequest } from '~/api/admin'

definePageMeta({
  layout: "admin"
})

const { t } = useI18n()
const toast = useToast()
const dialog = useDialog()
const route = useRoute()
const router = useRouter()

const loading = ref(false)
const comments = ref<ListCOmmentItem[]>([])
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
  isDeleted: false,
  author: '',
  blog: ''
})

const selectedIds = ref<Set<string>>(new Set())

const authorOptions = ref<Array<{value: string, label: string}>>([])
const blogOptions = ref<Array<{value: string, label: string}>>([])

const selectAll = computed({
  get: () => comments.value.length > 0 && comments.value.every(c => selectedIds.value.has(c.id)),
  set: (val) => {
    if (val) {
      comments.value.forEach(c => selectedIds.value.add(c.id))
    } else {
      comments.value.forEach(c => selectedIds.value.delete(c.id))
    }
  }
})

const loadData = async () => {
  loading.value = true
  try {
    const params: ListCommentRequest = {
      page: pagination.value.currentPage,
      limit: pagination.value.limit,
      search: filter.search,
      isDeleted: filter.isDeleted,
      author: filter.author,
      blog: filter.blog
    }

    const res = await ApiList.admin.comment.listComment(params)

    comments.value = res.data.comments
    const paginationData = res.data.pagination
    pagination.value = {
      currentPage: paginationData.currentPage || 1,
      totalPages: paginationData.totalPages || 1,
      totalBlogs: paginationData.totalBlogs || 0,
      hasNextPage: paginationData.hasNextPage || false,
      hasPrevPage: paginationData.hasPrevPage || false,
      limit: paginationData.limit || 10
    }
    selectedIds.value.clear()

    updateFilterOptions()

    router.replace({
      query: {
        ...route.query,
        page: pagination.value.currentPage,
        search: filter.search || undefined,
        author: filter.author || undefined,
        blog: filter.blog || undefined,
        isDeleted: filter.isDeleted ? 'true' : undefined
      }
    })
  } catch (error) {
    console.error(error)
    toast.error(t('common.error'))
  } finally {
    loading.value = false
  }
}

const updateFilterOptions = () => {
  const authorSet = new Set<string>()
  comments.value.forEach(comment => {
    if (comment.author?.username) {
      authorSet.add(comment.author.username)
    }
  })
  authorOptions.value = [
    { value: '', label: t('comments.filter.all_authors') },
    ...Array.from(authorSet).map(author => ({ value: author, label: author }))
  ]

  const blogSet = new Set<string>()
  comments.value.forEach(comment => {
    if (comment.blog?.title) {
      blogSet.add(comment.blog.title)
    }
  })
  blogOptions.value = [
    { value: '', label: t('comments.filter.all_blogs') },
    ...Array.from(blogSet).map(blog => ({ value: blog, label: blog }))
  ]
}

const debouncedSearch = useDebounceFn(() => {
  pagination.value.currentPage = 1
  loadData()
}, 500)

watch(() => filter.search, debouncedSearch)
watch(() => filter.author, debouncedSearch)
watch(() => filter.blog, debouncedSearch)
watch(() => filter.isDeleted, () => {
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

const handleBatchDelete = async () => {
  if (selectedIds.value.size === 0) return

  const confirm = await dialog.confirm({
    title: t('comments.batch_confirm_title'),
    content: t('comments.batch_confirm_content', { count: selectedIds.value.size }),
    type: 'error',
    confirmText: t('common.delete')
  })

  if (!confirm) return

  try {
    await ApiList.admin.batch({
      ids: Array.from(selectedIds.value),
      operation: 'delete',
      type: 'comments'
    })
    toast.success(t('common.success'))
    loadData()
  } catch (error) {
    toast.error(t('common.error'))
  }
}

const handleDelete = async (comment: ListCOmmentItem) => {
  const confirm = await dialog.confirm({
    title: t('comments.delete_title'),
    content: t('comments.delete_content'),
    type: 'error',
    confirmText: t('common.delete')
  })

  if (!confirm) return

  try {
    await ApiList.admin.comment.delComment(comment.id)
    toast.success(t('common.success'))
    loadData()
  } catch (error) {
    toast.error(t('common.error'))
  }
}

onMounted(() => {
  if (route.query.search) filter.search = route.query.search as string
  if (route.query.author) filter.author = route.query.author as string
  if (route.query.blog) filter.blog = route.query.blog as string
  if (route.query.isDeleted) filter.isDeleted = route.query.isDeleted === 'true'
  if (route.query.page) pagination.value.currentPage = Number(route.query.page)
  loadData()
})
</script>

<template>
  <div class="flex flex-col gap-6 p-2 md:p-6">
    <title>life-评论管理</title>
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 relative z-40 shrink-0">
      <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1">
        <label
          class="input input-bordered bg-base-100/80 backdrop-blur shadow-sm flex items-center gap-3 w-full sm:w-80 transition-all hover:shadow-md focus-within:shadow-md focus-within:border-primary/50 rounded-lg h-11">
          <Icon name="mingcute:search-line" class="text-base-content/50 text-xl" />
          <input type="text" class="grow placeholder:text-base-content/40" :placeholder="t('comments.search_placeholder')"
            v-model="filter.search" />
        </label>

        <label
          class="input input-bordered bg-base-100/80 backdrop-blur shadow-sm flex items-center gap-3 w-full sm:w-64 transition-all hover:shadow-md focus-within:shadow-md focus-within:border-primary/50 rounded-lg h-11">
          <Icon name="mingcute:user-3-line" class="text-base-content/50 text-xl" />
          <input type="text" class="grow placeholder:text-base-content/40" :placeholder="t('comments.author_placeholder')"
            v-model="filter.author" list="author-options" />
          <datalist id="author-options">
            <option v-for="opt in authorOptions" :key="opt.value" :value="opt.value" />
          </datalist>
        </label>

        <label
          class="input input-bordered bg-base-100/80 backdrop-blur shadow-sm flex items-center gap-3 w-full sm:w-64 transition-all hover:shadow-md focus-within:shadow-md focus-within:border-primary/50 rounded-lg h-11">
          <Icon name="mingcute:book-2-line" class="text-base-content/50 text-xl" />
          <input type="text" class="grow placeholder:text-base-content/40" :placeholder="t('comments.blog_placeholder')"
            v-model="filter.blog" list="blog-options" />
          <datalist id="blog-options">
            <option v-for="opt in blogOptions" :key="opt.value" :value="opt.value" />
          </datalist>
        </label>
      </div>

      <div class="flex items-center gap-3 w-full md:w-auto justify-end">
        <select
          class="select select-bordered bg-base-100/80 backdrop-blur shadow-sm w-full md:w-40 rounded-lg h-11 min-h-[2.75rem]"
          v-model="filter.isDeleted">
          <option :value="false">{{ t('comments.filter.active') }}</option>
          <option :value="true">{{ t('comments.filter.deleted') }}</option>
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
            <li><a @click="handleBatchDelete" class="text-error hover:bg-error/10 py-3">
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
              <th class="py-4 text-sm font-semibold min-w-[200px]">{{ t('comments.author') }}</th>
              <th class="py-4 text-sm font-semibold min-w-[300px]">{{ t('comments.content') }}</th>
              <th class="py-4 text-sm font-semibold min-w-[150px]">{{ t('comments.blog') }}</th>
              <th class="py-4 text-sm font-semibold min-w-[100px]">{{ t('comments.stats') }}</th>
              <th class="py-4 text-sm font-semibold min-w-[120px]">{{ t('comments.status') }}</th>
              <th class="py-4 text-sm font-semibold min-w-[180px]">{{ t('common.created_at') }}</th>
              <th
                class="sticky right-0 bg-base-200/50 shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)] text-center w-40 py-4 text-sm font-semibold">
                {{ t('common.action') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="8" class="h-64 text-center">
                <span class="loading loading-spinner loading-lg text-primary/50"></span>
              </td>
            </tr>

            <tr v-else-if="comments.length === 0">
              <td colspan="8" class="h-64 text-center text-base-content/40">
                <div class="flex flex-col items-center gap-3">
                  <div class="bg-base-200 p-6 rounded-full">
                    <Icon name="mingcute:chat-2-line" class="text-5xl" />
                  </div>
                  <span class="text-lg">{{ t('comments.no_data') }}</span>
                </div>
              </td>
            </tr>

            <tr v-else v-for="comment in comments" :key="comment.id"
              :class="['hover:bg-base-200/30 transition-colors group border-b border-base-100', 
                      comment.isDeleted ? 'opacity-70' : '']">
              <th class="text-center py-4">
                <label>
                  <input type="checkbox" class="checkbox checkbox-primary rounded-md"
                    :checked="selectedIds.has(comment.id)" @change="toggleSelection(comment.id)"
                    :disabled="comment.isDeleted" />
                </label>
              </th>
              <td class="py-4">
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="w-8 h-8 rounded-full bg-base-200">
                      <img :src="comment.author?.avatar || `https://ui-avatars.com/api/?name=${comment.author?.username}`"
                        :alt="comment.author?.username" />
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-sm font-medium">{{ comment.author?.username }}</span>
                    <span class="text-xs text-base-content/50 truncate max-w-[150px]">{{ comment.author?.email }}</span>
                  </div>
                </div>
              </td>
              <td class="py-4">
                <div class="min-w-0 flex flex-col gap-1">
                  <div class="text-sm truncate max-w-[280px]" :title="comment.content">
                    {{ comment.isDeleted ? comment.deletedContent || t('comments.deleted_content') : comment.content }}
                  </div>
                  <div v-if="comment.parentCommentId" class="text-xs text-base-content/50 flex items-center gap-1">
                    <Icon name="mingcute:reply-line" size="12" />
                    {{ t('comments.reply_to') }} {{ comment.parentCommentId.slice(0, 8) }}...
                  </div>
                </div>
              </td>
              <td class="py-4">
                <div class="flex flex-col">
                  <span class="text-sm font-medium truncate max-w-[120px]">{{ comment.blog?.title }}</span>
                  <span class="text-xs text-base-content/50 truncate max-w-[120px] font-mono">{{ comment.blog?.slug }}</span>
                </div>
              </td>
              <td class="py-4">
                <div class="flex gap-4 text-xs text-base-content/70">
                  <span class="flex items-center gap-1" :title="t('stats.likes')">
                    <Icon name="mingcute:heart-line" size="14" /> {{ comment.likeCount || 0 }}
                  </span>
                </div>
              </td>
              <td class="py-4">
                <span :class="[
                  'badge badge-soft gap-1.5 font-medium px-3 py-1 h-7',
                  comment.isDeleted ? 'badge-error' : 'badge-success'
                ]">
                  {{ comment.isDeleted ? t('comments.status_text.deleted') : t('comments.status_text.active') }}
                </span>
                <div v-if="comment.deletedAt" class="mt-1 text-xs text-error/80 truncate max-w-[120px]">
                  {{ new Date(comment.deletedAt).toLocaleDateString() }}
                </div>
              </td>
              <td class="text-sm text-base-content/60 font-mono py-4">
                <div class="flex flex-col">
                  <span>{{ new Date(comment.createdAt).toLocaleDateString() }}</span>
                  <span class="text-xs text-base-content/40">{{ new Date(comment.createdAt).toLocaleTimeString() }}</span>
                </div>
              </td>
              <td
                class="sticky right-0 bg-base-100 shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)] text-center p-0 align-middle">
                <div class="flex justify-center items-center h-full w-full px-2">
                  <div v-if="!comment.isDeleted" class="join border border-base-200/60 shadow-sm bg-base-100 rounded-lg">
                    <button
                      class="btn btn-sm btn-square btn-ghost join-item text-error/70 hover:bg-error/10 hover:text-error w-9 h-9"
                      :title="t('common.delete')" @click="handleDelete(comment)">
                      <Icon name="mingcute:delete-2-line" size="18" />
                    </button>
                  </div>
                  <div v-else class="text-xs text-base-content/40">
                    {{ t('comments.cannot_operate') }}
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
          {{ t('common.total_records', { count: pagination.totalBlogs || comments.length }) }}
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
  </div>
</template>

<i18n lang="json">
{
  "zh-CN": {
    "comments": {
      "search_placeholder": "搜索评论内容...",
      "author_placeholder": "搜索作者...",
      "blog_placeholder": "搜索博客...",
      "filter": {
        "active": "正常评论",
        "deleted": "已删除",
        "all_authors": "所有作者",
        "all_blogs": "所有博客"
      },
      "author": "作者",
      "content": "评论内容",
      "blog": "所属博客",
      "stats": "统计",
      "status": "状态",
      "deleted_content": "[评论已被删除]",
      "reply_to": "回复",
      "no_data": "暂无相关评论",
      "batch_confirm_title": "确认批量删除",
      "batch_confirm_content": "即将删除 {count} 条评论，是否继续？",
      "delete_title": "删除评论",
      "delete_content": "删除评论后将无法恢复。",
      "cannot_operate": "不可操作",
      "status_text": {
        "active": "正常",
        "deleted": "已删除"
      }
    },
    "common": {
      "batch": "批量",
      "action": "操作",
      "created_at": "创建时间",
      "total_records": "共 {count} 条记录",
      "success": "操作成功",
      "error": "操作失败",
      "delete": "删除",
      "cancel": "取消",
      "confirm": "确认"
    },
    "stats": {
      "likes": "点赞数"
    }
  },
  "en": {
    "comments": {
      "search_placeholder": "Search comment content...",
      "author_placeholder": "Search author...",
      "blog_placeholder": "Search blog...",
      "filter": {
        "active": "Active",
        "deleted": "Deleted",
        "all_authors": "All Authors",
        "all_blogs": "All Blogs"
      },
      "author": "Author",
      "content": "Content",
      "blog": "Blog",
      "stats": "Stats",
      "status": "Status",
      "deleted_content": "[Comment deleted]",
      "reply_to": "Reply to",
      "no_data": "No comments found",
      "batch_confirm_title": "Batch Delete",
      "batch_confirm_content": "Proceed with deleting {count} comments?",
      "delete_title": "Delete Comment",
      "delete_content": "Deleting comment is permanent.",
      "cannot_operate": "Cannot operate",
      "status_text": {
        "active": "Active",
        "deleted": "Deleted"
      }
    },
    "common": {
      "batch": "Batch",
      "action": "Actions",
      "created_at": "Created",
      "total_records": "{count} records",
      "success": "Success",
      "error": "Failed",
      "delete": "Delete",
      "cancel": "Cancel",
      "confirm": "Confirm"
    },
    "stats": {
      "likes": "Likes"
    }
  },
  "zh-TW": {
    "comments": {
      "search_placeholder": "搜尋評論內容...",
      "author_placeholder": "搜尋作者...",
      "blog_placeholder": "搜尋博客...",
      "filter": {
        "active": "正常評論",
        "deleted": "已刪除",
        "all_authors": "所有作者",
        "all_blogs": "所有博客"
      },
      "author": "作者",
      "content": "評論內容",
      "blog": "所屬博客",
      "stats": "統計",
      "status": "狀態",
      "deleted_content": "[評論已被刪除]",
      "reply_to": "回覆",
      "no_data": "暫無相關評論",
      "batch_confirm_title": "確認批量刪除",
      "batch_confirm_content": "即將刪除 {count} 條評論，是否繼續？",
      "delete_title": "刪除評論",
      "delete_content": "刪除評論後將無法恢復。",
      "cannot_operate": "不可操作",
      "status_text": {
        "active": "正常",
        "deleted": "已刪除"
      }
    },
    "common": {
      "batch": "批量",
      "action": "操作",
      "created_at": "創建時間",
      "total_records": "共 {count} 條記錄",
      "success": "操作成功",
      "error": "操作失敗",
      "delete": "刪除",
      "cancel": "取消",
      "confirm": "確認"
    },
    "stats": {
      "likes": "點讚數"
    }
  }
}
</i18n>