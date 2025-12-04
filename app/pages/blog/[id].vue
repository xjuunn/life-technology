<script setup lang="ts">
import { getBlogDetails, share, like as doLike } from '~/api/blog'
import { listBlogComments, create, del, updateComment } from '~/api/comment'
import { useUserStore } from '~/stores/user'
import { EditorContent, useEditor } from "@tiptap/vue-3"
import { GlobalEditorExtensions } from '~/utils/editor.util.ts';
import { create as createReport} from '~/api/report'
import type {CreateReportRequest, CreateReportResponse} from "~/api/report";

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const toast = useToast()

const getLocalizedErrorMessage = (message: string): string => {
  const errorMappings = {
    '不能举报自己的内容': t('blog.detail.cannot_report_own_content'),
    '您已经举报过该内容': t('blog.detail.already_reported'),
    '举报频率过高': t('blog.detail.report_rate_limit'),
  }

  for (const [key, value] of Object.entries(errorMappings)) {
    if (message.includes(key)) {
      return value
    }
  }
  
  return message || t('blog.detail.report_failed')
}

const blog = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const isLiked = ref(false)
const likesCount = ref(0)

const reporting = ref(false)
const selectedReason = ref('')
const reportDescription = ref('')

const reportReasons = computed(() => [
  { value: 'spam', label: t('blog.detail.report_reasons.spam') },
  { value: 'inappropriate', label: t('blog.detail.report_reasons.inappropriate') },
  { value: 'copyright', label: t('blog.detail.report_reasons.copyright') },
  { value: 'harassment', label: t('blog.detail.report_reasons.harassment') },
  { value: 'other', label: t('blog.detail.report_reasons.other') }
])

const comments = ref<any[]>([])
const commentsLoading = ref(false)
const commentsError = ref<string | null>(null)
const commentsPagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  pages: 0
})

const submittingComment = ref(false)
const editingCommentId = ref<string | null>(null)
const editingCommentContent = ref('')
const replyingToCommentId = ref<string | null>(null)
const submittingReply = ref(false)

const expandedComments = ref<Record<string, boolean>>({})

const editor = useEditor({
  editable: false,
  extensions: GlobalEditorExtensions,
  editorProps: {
    attributes: {
      class: 'prose prose-base md:prose-lg max-w-none focus:outline-none dark:prose-invert prose-headings:font-bold prose-p:leading-relaxed prose-img:rounded-xl prose-img:shadow-sm prose-a:text-primary prose-a:no-underline hover:prose-a:underline'
    }
  }
})

const reportBlog = async () => {
  if (!userStore.token) {
    toast.warning(t('blog.detail.login_required'))
    return
  }

  if (!blog.value?.id) {
    toast.error(t('blog.detail.blog_info_missing'))
    return
  }

  const reason = await showReportDialog()
  if (!reason) return
  
  reporting.value = true

  try {
    const requestData: CreateReportRequest = {
      targetType: 'Blog',
      targetId: blog.value.id,
      reason: reason.value,
      description: reportDescription.value || `举报博客: ${blog.value.title}`
    }

    const response = await createReport(requestData)
    if (response.success) {
      const result = response.data as CreateReportResponse
      
      if (result.report) {
        toast.success(result.message || t('blog.detail.report_success'))
      } else {
        const errorMessage = getLocalizedErrorMessage(result.message || t('blog.detail.report_failed'))
        toast.error(errorMessage)
      }
    } else {
      const errorMessage = getLocalizedErrorMessage(response.message || t('blog.detail.report_failed'))
      toast.error(errorMessage)
    }
  } catch (err: any) {
    const errorMessage = getLocalizedErrorMessage(err.message || t('blog.detail.report_failed'))
    toast.error(errorMessage)
    console.error('Failed to submit report:', err)
  } finally {
    reporting.value = false
  }
}

const showReportDialog = (): Promise<{value: string, label: string} | null> => {
  return new Promise((resolve) => {
    const dialog = document.createElement('dialog')
    dialog.className = 'modal modal-bottom sm:modal-middle'
    
    const reasons = reportReasons.value
    
    dialog.innerHTML = `
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg mb-4">${t('blog.detail.report')}</h3>
        
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">${t('blog.detail.report_reason')}</label>
          <div class="space-y-2">
            ${reasons.map(reason => `
              <label class="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="reportReason" 
                  value="${reason.value}" 
                  class="radio radio-primary mr-3"
                  ${reason.value === selectedReason.value ? 'checked' : ''}
                />
                <span>${reason.label}</span>
              </label>
            `).join('')}
          </div>
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">${t('blog.detail.additional_info')}</label>
          <textarea 
            class="textarea textarea-bordered w-full" 
            placeholder="${t('blog.detail.report_description_placeholder')}"
            rows="3"
          >${reportDescription.value}</textarea>
        </div>
        
        <div class="modal-action">
          <button class="btn btn-ghost" type="button" onclick="this.closest('dialog').close('cancel')">
            ${t('blog.detail.cancel')}
          </button>
          <button class="btn btn-error" type="button" onclick="this.closest('dialog').close('confirm')">
            ${t('blog.detail.confirm_report')}
          </button>
        </div>
      </form>
    `
    
    document.body.appendChild(dialog)
    dialog.showModal()
    
    dialog.addEventListener('close', () => {
      const returnValue = dialog.returnValue
      const selectedRadio = dialog.querySelector('input[name="reportReason"]:checked') as HTMLInputElement
      const textarea = dialog.querySelector('textarea') as HTMLTextAreaElement
      
      if (returnValue === 'confirm') {
        if (!selectedRadio?.value) {
          toast.warning(t('blog.detail.select_report_reason'))
          resolve(null)
          return
        }
        
        selectedReason.value = selectedRadio.value
        reportDescription.value = textarea?.value || ''
        
        const selected = reasons.find(r => r.value === selectedReason.value)
        resolve(selected || null)
      } else {
        resolve(null)
      }
      
      document.body.removeChild(dialog)
    })
    
    dialog.addEventListener('cancel', (e) => {
      e.preventDefault()
      dialog.close('cancel')
    })
  })
}

const reportComment = async (comment: any, isReply = false) => {
  if (!userStore.token) {
    toast.warning(t('blog.detail.login_required'))
    return
  }

  if (!comment?.id) {
    toast.error(t('blog.detail.comment_info_missing'))
    return
  }

  const reason = await showReportDialog()
  if (!reason) return
  
  reporting.value = true

  try {
    const requestData: CreateReportRequest = {
      targetType: 'Comment',
      targetId: comment.id,
      reason: reason.value,
      description: reportDescription.value || `举报${isReply ? '回复' : '评论'}: ${comment.content.substring(0, 50)}${comment.content.length > 50 ? '...' : ''}`
    }

    const response  = await createReport(requestData)
    if (response.success) {
      const result = response.data as CreateReportResponse
      
      if (result.report) {
        toast.success(result.message || t('blog.detail.report_success'))
      } else {
        const errorMessage = getLocalizedErrorMessage(result.message || t('blog.detail.report_failed'))
        toast.error(errorMessage)
      }
    } else {
      const errorMessage = getLocalizedErrorMessage(response.message || t('blog.detail.report_failed'))
      toast.error(errorMessage)
    }
  } catch (err: any) {
    const errorMessage = getLocalizedErrorMessage(err.message || t('blog.detail.report_failed'))
    toast.error(errorMessage)
    console.error('Failed to submit report:', err)
  } finally {
    reporting.value = false
  }
}

const toggleCommentExpand = (commentId: string) => {
  expandedComments.value[commentId] = !expandedComments.value[commentId]
}

const needsExpand = (content: string) => {
  return content.length > 250
}

const getDisplayContent = (comment: any) => {
  if (expandedComments.value[comment.id] || !needsExpand(comment.content)) {
    return comment.content
  }
  return comment.content.slice(0, 250) + '...'
}

const submitComment = async () => {
  if (!userStore.token) {
    toast.warning(t('blog.detail.login_required'))
    return
  }

  const commentContent = document.querySelector('.comment-textarea') as HTMLTextAreaElement
  if (!commentContent || !commentContent.value.trim()) {
    toast.warning(t('blog.detail.comment_empty'))
    return
  }

  submittingComment.value = true

  try {
    const result = await create({
      blogId: blog.value.id,
      content: commentContent.value,
      parentCommentId: null
    }) as ApiResponse

    if (result.success) {
      toast.success(t('blog.detail.comment_published'))
      commentContent.value = ''
      await fetchComments()
    } else {
      throw new Error(result.message)
    }
  } catch (err) {
    toast.error(t('blog.detail.comment_publish_failed'))
    console.error('Failed to publish comment:', err)
  } finally {
    submittingComment.value = false
  }
}

const submitReply = async (parentCommentId: string) => {
  if (!userStore.token) {
    toast.warning(t('blog.detail.login_required'))
    return
  }

  const replyContent = document.querySelector(`.reply-textarea-${parentCommentId}`) as HTMLTextAreaElement
  if (!replyContent || !replyContent.value.trim()) {
    toast.warning(t('blog.detail.comment_empty'))
    return
  }
  submittingReply.value = true

  try {
    const result = await create({
      blogId: blog.value.id,
      content: replyContent.value,
      parentCommentId
    }) as ApiResponse

    if (result.success) {
      toast.success(t('blog.detail.reply_published'))
      replyContent.value = ''
      replyingToCommentId.value = null
      await fetchComments()
    } else {
      throw new Error(result.message)
    }
  } catch (err) {
    toast.error(t('blog.detail.reply_publish_failed'))
    console.error('Failed to publish reply:', err)
  } finally {
    submittingReply.value = false
  }
}

const startEditComment = (comment: any) => {
  editingCommentId.value = comment.id
  editingCommentContent.value = comment.content
}

const cancelEditComment = () => {
  editingCommentId.value = null
  editingCommentContent.value = ''
}

const saveEditComment = async (commentId: string) => {
  if (!editingCommentContent.value.trim()) {
    toast.warning(t('blog.detail.comment_empty'))
    return
  }

  try {
    const result = await updateComment(commentId, editingCommentContent.value)

    if (result.success) {
      toast.success(t('blog.detail.comment_updated'))
      editingCommentId.value = null
      editingCommentContent.value = ''
      await fetchComments()
    } else {
      throw new Error(result.message)
    }
  } catch (err) {
    toast.error(t('blog.detail.comment_update_failed'))
    console.error('Failed to update comment:', err)
  }
}

const deleteCommentHandler = async (commentId: string) => {
  if (!confirm(t('blog.detail.confirm_delete_comment'))) {
    return
  }

  try {
    const result = await del(commentId)

    if (result.success) {
      toast.success(t('blog.detail.comment_deleted'))
      await fetchComments()
    } else {
      throw new Error(result.message)
    }
  } catch (err) {
    toast.error(t('blog.detail.comment_delete_failed'))
    console.error('Failed to delete comment:', err)
  }
}

const isCommentAuthor = (commentAuthorId: string) => {
  return userStore.user?.id === commentAuthorId
}

const formatCommentDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return t('blog.detail.just_now')
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}${t('blog.detail.minutes_ago')}`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}${t('blog.detail.hours_ago')}`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}${t('blog.detail.days_ago')}`

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const fetchBlogDetail = async () => {
  loading.value = true
  error.value = null

  try {
    const result = await getBlogDetails(route.params.id as string)
    blog.value = result.data.blog
    isLiked.value = result.data.blog.isLiked || false
    likesCount.value = blog.value.likeCount || 0

    if (blog.value.content && editor.value) {
      try {
        const content = typeof blog.value.content === 'string'
          ? JSON.parse(blog.value.content)
          : blog.value.content
        editor.value.commands.setContent(content)
      } catch (e) {
        editor.value.commands.setContent(blog.value.content)
      }
    }
    await fetchComments()
  } catch (err) {
    error.value = t('blog.detail.load_failed')
  } finally {
    loading.value = false
  }
}

const fetchComments = async () => {
  if (!blog.value?.id) return

  commentsLoading.value = true
  commentsError.value = null

  try {
    const result = await listBlogComments(blog.value.id, {
      page: commentsPagination.value.page,
      limit: commentsPagination.value.limit,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    })

    if (result.success) {
      comments.value = result.data.comments
      commentsPagination.value = {
        ...commentsPagination.value,
        ...result.data.pagination
      }
      comments.value.forEach(comment => {
        expandedComments.value[comment.id] = false
        if (comment.replies) {
          comment.replies.forEach((reply: any) => {
            expandedComments.value[reply.id] = false
          })
        }
      })
    } else {
      comments.value = []
      commentsPagination.value.total = 0
      console.log('No comments found for this blog')
    }
  } catch (err: any) {
    if (err.message && err.message.includes('评论不存在')) {
      comments.value = []
      commentsPagination.value.total = comments.value.length
      console.log('No comments found for this blog')
    } else {
      commentsError.value = t('blog.detail.comments_load_failed')
      console.error('Failed to load comments:', err)
    }
  } finally {
    commentsLoading.value = false
  }
}

const formattedDate = computed(() => {
  if (!blog.value?.createdAt) return ''
  return new Date(blog.value.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const readingTime = computed(() => {
  if (!blog.value?.content) return 0
  const text = typeof blog.value.content === 'string'
    ? blog.value.content
    : JSON.stringify(blog.value.content)
  return Math.ceil(text.split(/\s+/).length / 200)
})

const handleLike = async () => {
  if (!userStore.token) {
    toast.warning(t('blog.detail.login_required'))
    return
  }

  const originalLiked = isLiked.value
  const originalCount = likesCount.value

  isLiked.value = !isLiked.value
  likesCount.value += isLiked.value ? 1 : -1

  try {
    const res = await doLike(blog.value.id)
    if (res.success) {
      isLiked.value = res.data.isLiked
    } else {
      throw new Error(res.message)
    }
  } catch (err) {
    isLiked.value = originalLiked
    likesCount.value = originalCount
    toast.error(t('blog.detail.action_failed'))
  }
}

const shareBlog = async () => {
  if (!blog.value) return
  try {
    await share(blog.value.id)
    if (navigator.share) {
      navigator.share({
        title: blog.value.title,
        text: blog.value.summary,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success(t('blog.detail.link_copied'))
    }
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  fetchBlogDetail()
})
</script>

<template>
  <div class="min-h-screen bg-base-100 text-base-content font-sans">
    <title>life-博客详情</title>
    <div class="sticky top-0 bg-base-100/80 backdrop-blur-md border-b border-base-content/5">
      <div class="container mx-auto px-4 max-w-4xl h-16 flex items-center justify-between">
        <button @click="router.back()"
          class="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-base-content hover:bg-base-content/5 rounded-lg font-normal">
          <Icon name="mingcute:arrow-left-line" class="w-5 h-5" />
          {{ t('blog.detail.back_list') }}
        </button>
        <div class="flex gap-2">
          <button @click="reportBlog"
            class="btn btn-ghost btn-sm btn-square rounded-lg text-base-content/70 hover:text-error hover:bg-base-content/5 transition-colors"
            :disabled="reporting || loading || !blog"
            :title="t('blog.detail.report')">
            <Icon v-if="!reporting" name="mingcute:alert-line" class="w-5 h-5" />
            <span v-else class="loading loading-spinner loading-sm"></span>
          </button>
          <button @click="shareBlog"
            class="btn btn-ghost btn-sm btn-square rounded-lg text-base-content/70 hover:bg-base-content/5">
            <Icon name="mingcute:share-forward-line" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-10 max-w-3xl">
      <div v-if="loading" class="animate-pulse space-y-8">
        <div class="space-y-4">
          <div class="h-4 bg-base-content/5 rounded w-24"></div>
          <div class="h-10 bg-base-content/5 rounded w-3/4"></div>
          <div class="h-4 bg-base-content/5 rounded w-48"></div>
        </div>
        <div class="h-64 bg-base-content/5 rounded-xl w-full"></div>
        <div class="space-y-4">
          <div class="h-4 bg-base-content/5 rounded w-full"></div>
          <div class="h-4 bg-base-content/5 rounded w-full"></div>
          <div class="h-4 bg-base-content/5 rounded w-2/3"></div>
        </div>
      </div>

      <div v-else-if="error" class="flex flex-col items-center justify-center py-20 text-center">
        <div class="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mb-4 text-base-content/40">
          <Icon name="mingcute:wifi-off-line" class="w-8 h-8" />
        </div>
        <h3 class="text-lg font-bold mb-2">{{ error }}</h3>
        <button @click="fetchBlogDetail" class="btn btn-primary btn-sm rounded-lg">{{ t('blog.detail.retry') }}</button>
      </div>

      <article v-else-if="blog" class="animate-fade-in">
        <header class="mb-10">
          <div class="flex items-center gap-2 mb-6">
            <span
              class="badge badge-primary badge-outline rounded-md px-3 py-3 font-medium text-xs tracking-wide uppercase">
              {{ blog.category }}
            </span>
          </div>

          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-base-content mb-6 leading-[1.2]">
            {{ blog.title }}
          </h1>

          <div
            class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-base-content/60 border-b border-base-content/5 pb-8">
            <div class="flex items-center gap-2">
              <div class="avatar">
                <div class="w-6 h-6 rounded-full ring-1 ring-base-content/10">
                  <img :src="blog.author.avatar" alt="avatar" />
                </div>
              </div>
              <span class="font-medium text-base-content/80">{{ blog.author.username }}</span>
            </div>
            <span class="w-1 h-1 rounded-full bg-base-content/20"></span>
            <div class="flex items-center gap-1.5">
              <Icon name="mingcute:calendar-2-line" class="w-4 h-4" />
              <time>{{ formattedDate }}</time>
            </div>
            <span class="w-1 h-1 rounded-full bg-base-content/20"></span>
            <div class="flex items-center gap-1.5">
              <Icon name="mingcute:time-line" class="w-4 h-4" />
              <span>{{ readingTime }} {{ t('blog.detail.min_read') }}</span>
            </div>
          </div>
        </header>

        <div v-if="blog.coverImage" 
          class="mb-10 rounded-xl overflow-hidden bg-base-200 border border-base-content/5 shadow-sm aspect-video">
          <img :src="blog.coverImage" :alt="blog.title" class="w-full h-full object-cover" />
        </div>

        <div v-if="blog.summary"
          class="bg-base-200/40 border-l-4 border-primary rounded-r-lg p-6 mb-10 text-base-content/80 italic leading-relaxed">
          {{ blog.summary }}
        </div>

        <div class="prose-content mb-16">
          <editor-content :editor="editor" />
        </div>

        <div class="flex flex-wrap gap-2 mb-12">
          <span v-for="tag in blog.tags" :key="tag"
            class="badge badge-ghost rounded-md px-3 py-3 text-base-content/60 hover:bg-base-200 cursor-pointer transition-colors">
            # {{ tag }}
          </span>
        </div>
        
        <div class="border-t border-base-content/10 pt-10 pb-20">
          <div class="flex flex-col items-center gap-6">
            <h3 class="text-sm font-bold uppercase tracking-widest text-base-content/40">{{ t('blog.detail.like_share')
            }}</h3>

            <div class="flex items-center gap-4">
              <button @click="handleLike" class="btn h-14 px-8 rounded-full transition-all duration-300 gap-3"
                :class="isLiked ? 'btn-primary shadow-lg shadow-primary/20' : 'btn-outline border-base-content/20 hover:border-primary hover:text-primary'">
                <Icon :name="isLiked ? 'mingcute:thumb-up-2-fill' : 'mingcute:thumb-up-2-line'" class="w-6 h-6" />
                <span class="text-lg font-bold">{{ likesCount }}</span>
              </button>

              <button @click="shareBlog"
                class="btn btn-circle btn-outline h-14 w-14 border-base-content/20 hover:border-base-content hover:bg-base-content hover:text-base-100 transition-all">
                <Icon name="mingcute:share-forward-line" class="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div class="border-t border-base-content/10 pt-10 pb-8">
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-base-content mb-2">
              {{ t('blog.detail.comments') }}
              <span class="text-base font-normal text-base-content/60 ml-2">
                ({{ commentsPagination.total }})
              </span>
            </h3>
            <p class="text-base-content/60">{{ t('blog.detail.comments_description') }}</p>
          </div>

          <div class="bg-base-200/30 rounded-xl p-6 mb-8 border border-base-content/5">
            <div class="flex gap-4">
              <div class="avatar flex-shrink-0">
                <div class="w-10 h-10 rounded-full ring-2 ring-base-content/5">
                  <img 
                    :src="userStore.user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'" 
                    :alt="userStore.user?.username || '用户'" 
                  />
                </div>
              </div>
              <div class="flex-1">
                <textarea 
                  class="textarea textarea-bordered w-full min-h-[100px] mb-3 comment-textarea"
                  :placeholder="userStore.token ? t('blog.detail.comment_placeholder') : t('blog.detail.login_to_comment')"
                  :disabled="!userStore.token"
                ></textarea>
                <div class="flex justify-between items-center">
                  <p class="text-sm text-base-content/60" v-if="!userStore.token">
                    {{ t('blog.detail.login_to_comment') }}
                  </p>
                  <div class="flex gap-2 ml-auto">
                    <button 
                      @click="submitComment"
                      class="btn btn-primary btn-sm rounded-lg"
                      :disabled="submittingComment || !userStore.token"
                    >
                      <span v-if="submittingComment" class="loading loading-spinner loading-sm"></span>
                      {{ submittingComment ? t('blog.detail.publishing') : t('blog.detail.publish_comment') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="commentsLoading" class="space-y-6">
            <div v-for="n in 3" :key="n" class="animate-pulse">
              <div class="flex gap-4">
                <div class="w-10 h-10 bg-base-content/5 rounded-full"></div>
                <div class="flex-1 space-y-3">
                  <div class="h-4 bg-base-content/5 rounded w-1/4"></div>
                  <div class="h-4 bg-base-content/5 rounded w-full"></div>
                  <div class="h-4 bg-base-content/5 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="commentsError" class="text-center py-8">
            <div class="w-12 h-12 bg-base-200 rounded-full flex items-center justify-center mb-4 text-base-content/40 mx-auto">
              <Icon name="mingcute:comment-fail-line" class="w-6 h-6" />
            </div>
            <p class="text-base-content/60 mb-4">{{ commentsError }}</p>
            <button @click="fetchComments" class="btn btn-sm btn-outline rounded-lg">
              {{ t('blog.detail.retry') }}
            </button>
          </div>

          <div v-else-if="comments.length > 0" class="space-y-6">
            <div v-for="comment in comments" :key="comment.id" class="comment-item">
              <div class="flex gap-4">
                <div class="avatar flex-shrink-0">
                  <div class="w-10 h-10 rounded-full ring-2 ring-base-content/5">
                    <img :src="comment.author.avatar" :alt="comment.author.username" />
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-medium text-base-content">{{ comment.author.username }}</span>
                    <span class="w-1 h-1 rounded-full bg-base-content/20"></span>
                    <span class="text-sm text-base-content/60">{{ formatCommentDate(comment.createdAt) }}</span>
                  </div>
                  
                  <div v-if="editingCommentId === comment.id" class="mb-3">
                    <textarea 
                      v-model="editingCommentContent"
                      class="textarea textarea-bordered w-full min-h-[100px] mb-2"
                      :placeholder="t('blog.detail.edit_comment_placeholder')"
                    ></textarea>
                    <div class="flex gap-2">
                      <button 
                        @click="saveEditComment(comment.id)"
                        class="btn btn-primary btn-sm rounded-lg"
                      >
                        {{ t('blog.detail.save') }}
                      </button>
                      <button 
                        @click="cancelEditComment"
                        class="btn btn-ghost btn-sm rounded-lg"
                      >
                        {{ t('blog.detail.cancel') }}
                      </button>
                    </div>
                  </div>

                  <div v-else class="text-base-content/80 leading-relaxed mb-2">
                    <div :class="['comment-content', { 'line-clamp-5': !expandedComments[comment.id] && needsExpand(comment.content) }]">
                      {{ getDisplayContent(comment) }}
                    </div>
                    <button
                      v-if="needsExpand(comment.content)"
                      @click="toggleCommentExpand(comment.id)"
                      class="btn btn-link btn-sm p-0 h-auto min-h-0 text-primary mt-1 no-underline hover:underline"
                    >
                      {{ expandedComments[comment.id] ? t('blog.detail.collapse') : t('blog.detail.expand') }}
                    </button>
                  </div>
                  
                  <div class="flex items-center gap-4 text-sm text-base-content/60">
                    <button class="flex items-center gap-1 hover:text-primary transition-colors">
                      <Icon name="mingcute:thumb-up-2-line" class="w-4 h-4" />
                      <span>{{ comment.likeCount }}</span>
                    </button>
                    <button 
                      @click="replyingToCommentId = replyingToCommentId === comment.id ? null : comment.id"
                      class="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      <Icon name="mingcute:chat-3-line" class="w-4 h-4" />
                      <span>{{ comment.replies?.length || 0 }}</span>
                    </button>
                    
                    <div v-if="isCommentAuthor(comment.author.id)" class="flex items-center gap-2 ml-2">
                      <button 
                        @click="startEditComment(comment)"
                        class="text-xs hover:text-primary transition-colors"
                      >
                        {{ t('blog.detail.edit') }}
                      </button>
                      <span class="text-base-content/20">•</span>
                      <button 
                        @click="deleteCommentHandler(comment.id)"
                        class="text-xs hover:text-error transition-colors"
                      >
                        {{ t('blog.detail.delete') }}
                      </button>
                    </div>
                    <div class="flex items-center gap-2 ml-2">
                      <span class="text-base-content/20" v-if="isCommentAuthor(comment.author.id)">•</span>
                      <button 
                        @click="reportComment(comment, false)"
                        class="text-xs hover:text-warning transition-colors flex items-center gap-1"
                        :disabled="reporting"
                        :title="t('blog.detail.report')"
                      >
                        <Icon name="mingcute:alert-line" class="w-3 h-3" />
                        {{ t('blog.detail.report') }}
                      </button>
                    </div>
                  </div>

                  <div v-if="replyingToCommentId === comment.id" class="mt-4 bg-base-200/30 rounded-lg p-4">
                    <div class="flex gap-3">
                      <div class="avatar flex-shrink-0">
                        <div class="w-8 h-8 rounded-full ring-2 ring-base-content/5">
                          <img 
                            :src="userStore.user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'" 
                            :alt="userStore.user?.username || '用户'" 
                          />
                        </div>
                      </div>
                      <div class="flex-1">
                        <textarea 
                          :class="`textarea textarea-bordered w-full min-h-[80px] mb-2 reply-textarea-${comment.id}`"
                          :placeholder="userStore.token ? t('blog.detail.reply_placeholder') : t('blog.detail.login_to_comment')"
                          :disabled="!userStore.token"
                        ></textarea>
                        <div class="flex justify-between items-center">
                          <p class="text-sm text-base-content/60" v-if="!userStore.token">
                            {{ t('blog.detail.login_to_comment') }}
                          </p>
                          <div class="flex gap-2 ml-auto">
                            <button 
                              @click="replyingToCommentId = null"
                              class="btn btn-ghost btn-sm rounded-lg"
                              :disabled="submittingReply"
                            >
                              {{ t('blog.detail.cancel') }}
                            </button>
                            <button 
                              @click="submitReply(comment.id)"
                              class="btn btn-primary btn-sm rounded-lg"
                              :disabled="submittingReply || !userStore.token"
                            >
                              <span v-if="submittingReply" class="loading loading-spinner loading-sm"></span>
                              {{ submittingReply ? t('blog.detail.publishing') : t('blog.detail.publish_reply') }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="comment.replies && comment.replies.length > 0" class="ml-14 mt-4 space-y-4">
                <div v-for="reply in comment.replies" :key="reply.id" class="flex gap-4">
                  <div class="avatar flex-shrink-0">
                    <div class="w-8 h-8 rounded-full ring-2 ring-base-content/5">
                      <img :src="reply.author.avatar" :alt="reply.author.username" />
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-medium text-base-content">{{ reply.author.username }}</span>
                      <span class="w-1 h-1 rounded-full bg-base-content/20"></span>
                      <span class="text-sm text-base-content/60">{{ formatCommentDate(reply.createdAt) }}</span>
                    </div>
                    
                    <div class="text-sm text-base-content/60 mb-1">
                      回复 @{{ comment.author.username }}
                    </div>
                    
                    <div v-if="editingCommentId === reply.id" class="mb-3">
                      <textarea 
                        v-model="editingCommentContent"
                        class="textarea textarea-bordered w-full min-h-[80px] mb-2"
                        :placeholder="t('blog.detail.edit_comment_placeholder')"
                      ></textarea>
                      <div class="flex gap-2">
                        <button 
                          @click="saveEditComment(reply.id)"
                          class="btn btn-primary btn-sm rounded-lg"
                        >
                          {{ t('blog.detail.save') }}
                        </button>
                        <button 
                          @click="cancelEditComment"
                          class="btn btn-ghost btn-sm rounded-lg"
                        >
                          {{ t('blog.detail.cancel') }}
                        </button>
                      </div>
                    </div>
                    
                    <div v-else class="text-base-content/80 leading-relaxed mb-2">
                      <div :class="['comment-content', { 'line-clamp-5': !expandedComments[reply.id] && needsExpand(reply.content) }]">
                        {{ getDisplayContent(reply) }}
                      </div>
                      <button 
                        v-if="needsExpand(reply.content)"
                        @click="toggleCommentExpand(reply.id)"
                        class="btn btn-link btn-sm p-0 h-auto min-h-0 text-primary mt-1 no-underline hover:underline"
                      >
                        {{ expandedComments[reply.id] ? t('blog.detail.collapse') : t('blog.detail.expand') }}
                      </button>
                    </div>
                    
                    <div class="flex items-center gap-4 text-sm text-base-content/60">
                      <button class="flex items-center gap-1 hover:text-primary transition-colors">
                        <Icon name="mingcute:thumb-up-2-line" class="w-4 h-4" />
                        <span>{{ reply.likeCount }}</span>
                      </button>
                      
                      <div v-if="isCommentAuthor(reply.author.id)" class="flex items-center gap-2 ml-2">
                        <button 
                          @click="startEditComment(reply)"
                          class="text-xs hover:text-primary transition-colors"
                        >
                          {{ t('blog.detail.edit') }}
                        </button>
                        <span class="text-base-content/20">•</span>
                        <button 
                          @click="deleteCommentHandler(reply.id)"
                          class="text-xs hover:text-error transition-colors"
                        >
                          {{ t('blog.detail.delete') }}
                        </button>
                      </div>
                      <div class="flex items-center gap-2 ml-2">
                        <span class="text-base-content/20" v-if="isCommentAuthor(reply.author.id)">•</span>
                        <button 
                          @click="reportComment(reply, true)"
                          class="text-xs hover:text-warning transition-colors flex items-center gap-1"
                          :disabled="reporting"
                          :title="t('blog.detail.report')"
                        >
                          <Icon name="mingcute:alert-line" class="w-3 h-3" />
                          {{ t('blog.detail.report') }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-12">
            <div class="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mb-4 text-base-content/40 mx-auto">
              <Icon name="mingcute:comment-line" class="w-8 h-8" />
            </div>
            <h4 class="text-lg font-medium text-base-content mb-2">{{ t('blog.detail.no_comments') }}</h4>
            <p class="text-base-content/60">{{ t('blog.detail.no_comments_description') }}</p>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<i18n lang="json">
{
  "zh-CN": {
    "blog": {
      "detail": {
        "back_list": "返回列表",
        "load_failed": "加载失败",
        "retry": "重试",
        "min_read": "分钟阅读",
        "like_share": "点赞与分享",
        "login_required": "请先登录后点赞",
        "action_failed": "操作失败，请稍后重试",
        "link_copied": "链接已复制",
        "comments": "评论",
        "comments_description": "加入讨论，分享你的想法",
        "comments_load_failed": "评论加载失败",
        "no_comments": "暂无评论",
        "no_comments_description": "成为第一个评论的人",
        "just_now": "刚刚",
        "minutes_ago": "分钟前",
        "hours_ago": "小时前",
        "days_ago": "天前",
        "comment_empty": "评论内容不能为空",
        "comment_published": "评论发布成功",
        "comment_publish_failed": "评论发布失败",
        "reply_published": "回复发布成功",
        "reply_publish_failed": "回复发布失败",
        "comment_updated": "评论更新成功",
        "comment_update_failed": "评论更新失败",
        "comment_deleted": "评论删除成功",
        "comment_delete_failed": "评论删除失败",
        "confirm_delete_comment": "确定要删除这条评论吗？",
        "login_to_comment": "请登录后发表评论",
        "publish_comment": "发布评论",
        "publish_reply": "发布回复",
        "publishing": "发布中...",
        "edit": "编辑",
        "delete": "删除",
        "save": "保存",
        "cancel": "取消",
        "edited": "已编辑",
        "edit_comment_placeholder": "编辑评论内容...",
        "comment_placeholder": "写下你的评论...",
        "reply_placeholder": "写下你的回复...",
        "expand": "展开",
        "collapse": "收起",
        "report": "举报",
        "report_success": "举报提交成功",
        "report_failed": "举报提交失败",
        "report_reason": "举报原因",
        "select_report_reason": "请选择举报原因",
        "additional_info": "补充说明（选填）",
        "report_description_placeholder": "请描述具体情况...",
        "confirm_report": "确认举报",
        "cannot_report_own_content": "不能举报自己的内容",
        "already_reported": "您已经举报过该内容",
        "report_rate_limit": "举报频率过高，请稍后再试",
        "report_reasons": {
          "spam": "垃圾内容",
          "inappropriate": "不合适内容",
          "copyright": "侵犯版权",
          "harassment": "骚扰",
          "other": "其他原因"
        }
      }
    }
  },
  "zh-TW": {
    "blog": {
      "detail": {
        "back_list": "返回列表",
        "load_failed": "加載失敗",
        "retry": "重試",
        "min_read": "分鐘閱讀",
        "like_share": "按讚與分享",
        "login_required": "請先登入後按讚",
        "action_failed": "操作失敗，請稍後重試",
        "link_copied": "連結已複製",
        "comments": "評論",
        "comments_description": "加入討論，分享你的想法",
        "comments_load_failed": "評論加載失敗",
        "no_comments": "暫無評論",
        "no_comments_description": "成為第一個評論的人",
        "just_now": "剛剛",
        "minutes_ago": "分鐘前",
        "hours_ago": "小時前",
        "days_ago": "天前",
        "comment_empty": "評論內容不能為空",
        "comment_published": "評論發布成功",
        "comment_publish_failed": "評論發布失敗",
        "reply_published": "回覆發布成功",
        "reply_publish_failed": "回覆發布失敗",
        "comment_updated": "評論更新成功",
        "comment_update_failed": "評論更新失敗",
        "comment_deleted": "評論刪除成功",
        "comment_delete_failed": "評論刪除失敗",
        "confirm_delete_comment": "確定要刪除這條評論嗎？",
        "login_to_comment": "請登入後發表評論",
        "publish_comment": "發布評論",
        "publish_reply": "發布回覆",
        "publishing": "發布中...",
        "edit": "編輯",
        "delete": "刪除",
        "save": "保存",
        "cancel": "取消",
        "edited": "已編輯",
        "edit_comment_placeholder": "編輯評論內容...",
        "comment_placeholder": "寫下你的評論...",
        "reply_placeholder": "寫下你的回覆...",
        "expand": "展開",
        "collapse": "收起",
        "report": "檢舉",
        "report_success": "檢舉提交成功",
        "report_failed": "檢舉提交失敗",
        "report_reason": "檢舉原因",
        "select_report_reason": "請選擇檢舉原因",
        "additional_info": "補充說明（選填）",
        "report_description_placeholder": "請描述具體情況...",
        "confirm_report": "確認檢舉",
        "cannot_report_own_content": "不能檢舉自己的內容",
        "already_reported": "您已經檢舉過該內容",
        "report_rate_limit": "檢舉頻率過高，請稍後再試",
        "report_reasons": {
          "spam": "垃圾內容",
          "inappropriate": "不合適內容",
          "copyright": "侵犯版權",
          "harassment": "騷擾",
          "other": "其他原因"
        }
      }
    }
  },
  "en": {
    "blog": {
      "detail": {
        "back_list": "Back to List",
        "load_failed": "Failed to load",
        "retry": "Retry",
        "min_read": "min read",
        "like_share": "Like & Share",
        "login_required": "Please login to like",
        "action_failed": "Operation failed, please try again",
        "link_copied": "Link copied",
        "comments": "Comments",
        "comments_description": "Join the discussion and share your thoughts",
        "comments_load_failed": "Failed to load comments",
        "no_comments": "No comments yet",
        "no_comments_description": "Be the first to comment",
        "just_now": "Just now",
        "minutes_ago": " minutes ago",
        "hours_ago": " hours ago",
        "days_ago": " days ago",
        "comment_empty": "Comment content cannot be empty",
        "comment_published": "Comment published successfully",
        "comment_publish_failed": "Failed to publish comment",
        "reply_published": "Reply published successfully",
        "reply_publish_failed": "Failed to publish reply",
        "comment_updated": "Comment updated successfully",
        "comment_update_failed": "Failed to update comment",
        "comment_deleted": "Comment deleted successfully",
        "comment_delete_failed": "Failed to delete comment",
        "confirm_delete_comment": "Are you sure you want to delete this comment?",
        "login_to_comment": "Please login to comment",
        "publish_comment": "Publish Comment",
        "publish_reply": "Publish Reply",
        "publishing": "Publishing...",
        "edit": "Edit",
        "delete": "Delete",
        "save": "Save",
        "cancel": "Cancel",
        "edited": "Edited",
        "edit_comment_placeholder": "Edit comment content...",
        "comment_placeholder": "Write your comment...",
        "reply_placeholder": "Write your reply...",
        "expand": "Expand",
        "collapse": "Collapse",
        "report": "Report",
        "report_success": "Report submitted successfully",
        "report_failed": "Failed to submit report",
        "report_reason": "Report reason",
        "select_report_reason": "Please select a report reason",
        "additional_info": "Additional information (optional)",
        "report_description_placeholder": "Please describe the situation...",
        "confirm_report": "Confirm Report",
        "cannot_report_own_content": "Cannot report your own content",
        "already_reported": "You have already reported this content",
        "report_rate_limit": "Report rate limit exceeded, please try again later",
        "report_reasons": {
          "spam": "Spam",
          "inappropriate": "Inappropriate content",
          "copyright": "Copyright infringement",
          "harassment": "Harassment",
          "other": "Other reason"
        }
      }
    }
  }
}
</i18n>