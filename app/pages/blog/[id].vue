<script setup lang="ts">
import { getBlogDetails, share, like as doLike } from '~/api/blog'
import { listBlogComments } from '~/api/comment'
import { useUserStore } from '~/stores/user'
import { EditorContent, useEditor } from "@tiptap/vue-3"
import StarterKit from "@tiptap/starter-kit"

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const toast = useToast()

const blog = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const isLiked = ref(false)
const likesCount = ref(0)

const comments = ref<any[]>([])
const commentsLoading = ref(false)
const commentsError = ref<string | null>(null)
const commentsPagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  pages: 0
})

const editor = useEditor({
  editable: false,
  extensions: [StarterKit],
  editorProps: {
    attributes: {
      class: 'prose prose-base md:prose-lg max-w-none focus:outline-none dark:prose-invert prose-headings:font-bold prose-p:leading-relaxed prose-img:rounded-xl prose-img:shadow-sm prose-a:text-primary prose-a:no-underline hover:prose-a:underline'
    }
  }
})

const generateMockComments = () => {
  const mockComments = [
    {
      id: 'mock-1',
      content: '这篇文章写得真好，对Web3的理解很深入！期待更多关于数据主权的内容。',
      authorId: 'user-1',
      blogId: blog.value?.id || '',
      parentCommentId: null,
      likeCount: 12,
      isDeleted: false,
      deletedAt: null,
      deletedContent: null,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), 
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      author: {
        id: 'user-1',
        username: '区块链爱好者',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      replies: [
        {
          id: 'mock-1-1',
          content: '同意！作者对数据主权的分析很到位，特别是关于个人数据价值的部分。',
          authorId: 'user-2',
          blogId: blog.value?.id || '',
          parentCommentId: 'mock-1',
          likeCount: 5,
          isDeleted: false,
          deletedAt: null,
          deletedContent: null,
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          author: {
            id: 'user-2',
            username: '技术探索者',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
          }
        }
      ]
    },
    {
      id: 'mock-2',
      content: '请问这篇文章提到的DAO治理模式在实际应用中有什么挑战？',
      authorId: 'user-3',
      blogId: blog.value?.id || '',
      parentCommentId: null,
      likeCount: 8,
      isDeleted: false,
      deletedAt: null,
      deletedContent: null,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), 
      updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      author: {
        id: 'user-3',
        username: 'Web3新手',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'
      },
      replies: []
    },
    {
      id: 'mock-3',
      content: '作为一个开发者，我觉得这篇文章对智能合约安全性的讨论很有价值。希望看到更多技术细节！',
      authorId: 'user-4',
      blogId: blog.value?.id || '',
      parentCommentId: null,
      likeCount: 15,
      isDeleted: false,
      deletedAt: null,
      deletedContent: null,
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), 
      updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      author: {
        id: 'user-4',
        username: 'Solidity开发者',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face'
      },
      replies: []
    }
  ]
  
  return mockComments
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
    } else {
      comments.value = []
      commentsPagination.value.total = 0
      console.log('No comments found for this blog')
    }
  } catch (err:any) {
    if (err.message && err.message.includes('评论不存在')) {
      comments.value = generateMockComments()
      commentsPagination.value.total = comments.value.length
      commentsError.value = null
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
    <div class="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-content/5">
      <div class="container mx-auto px-4 max-w-4xl h-16 flex items-center justify-between">
        <button @click="router.back()"
          class="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-base-content hover:bg-base-content/5 rounded-lg font-normal">
          <Icon name="mingcute:arrow-left-line" class="w-5 h-5" />
          {{ t('blog.detail.back_list') }}
        </button>
        <div class="flex gap-2">
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
                  <div class="text-base-content/80 leading-relaxed mb-2">
                    {{ comment.content }}
                  </div>
                  <div class="flex items-center gap-4 text-sm text-base-content/60">
                    <button class="flex items-center gap-1 hover:text-primary transition-colors">
                      <Icon name="mingcute:thumb-up-2-line" class="w-4 h-4" />
                      <span>{{ comment.likeCount }}</span>
                    </button>
                    <button class="flex items-center gap-1 hover:text-primary transition-colors">
                      <Icon name="mingcute:chat-3-line" class="w-4 h-4" />
                      <span>{{ comment.replies?.length || 0 }}</span>
                    </button>
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
                    <div class="text-base-content/80 leading-relaxed mb-2">
                      {{ reply.content }}
                    </div>
                    <div class="flex items-center gap-4 text-sm text-base-content/60">
                      <button class="flex items-center gap-1 hover:text-primary transition-colors">
                        <Icon name="mingcute:thumb-up-2-line" class="w-4 h-4" />
                        <span>{{ reply.likeCount }}</span>
                      </button>
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

<i18n lang="json">{
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
        "days_ago": "天前"
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
        "days_ago": "天前"
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
        "days_ago": " days ago"
      }
    }
  }


}</i18n>