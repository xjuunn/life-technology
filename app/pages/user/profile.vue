<script setup lang="ts">
import {
  profile
} from '~/api/auth'
import {
  getUserBlogs,
  del as deleteBlog,
  type Blog,
  type UserBlogRequest,
  type Status,
  getMyReviewStatus,
  type MyReviewStatusResponse,
  type ReviewStatus
} from '~/api/blog'
import {
  listUserComments,
  type ListUserCommentsResponse
} from '~/api/comment'
import { useUserStore } from '~/stores/user'

const { t } = useI18n()
const toast = useToast()
const router = useRouter()
const userStore = useUserStore()

// --- 状态定义 ---
const user = computed(() => userStore.user)
const isLoading = ref(false)
const activeTab = ref<'blogs' | 'review' | 'comments'>('blogs')

// --- 博客相关 ---
const blogs = ref<Blog[]>([])
const blogPagination = ref({
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false
})
const blogLoading = ref(false)
const blogStatusFilter = ref<Status | undefined>(undefined)

// --- 审核相关 ---
const reviewBlogs = ref<Blog[]>([])
const reviewStats = ref({
  pendingCount: 0,
  rejectedCount: 0
})
const reviewPagination = ref({
  currentPage: 1,
  totalPages: 1,
  totalBlogs: 0,
  hasNextPage: false,
  hasPrevPage: false,
  limit: 10
})
const reviewLoading = ref(false)
const reviewStatusFilter = ref<ReviewStatus | undefined>(undefined)

// --- 评论相关 ---
const comments = ref<ListUserCommentsResponse['comments']>([])
const commentPagination = ref({
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false
})
const commentLoading = ref(false)

// --- 删除博客相关 ---
const showDeleteModal = ref(false)
const blogToDelete = ref<Blog | null>(null)
const isDeleting = ref(false)

// --- 初始化与数据获取 ---

onMounted(async () => {
  if (!userStore.token) {
    router.push('/login')
    return
  }

  // 如果 Store 里没有详细信息，重新拉取
  if (!user.value) {
    await fetchUserProfile()
  }

  // 默认加载博客
  fetchBlogs()
})

const fetchUserProfile = async () => {
  try {
    isLoading.value = true
    const { data } = await profile()
    userStore.setUser(data.user)
  } catch (error: any) {
    toast.error(error.message || t('profile.fetch_failed'))
  } finally {
    isLoading.value = false
  }
}

// 获取博客
const fetchBlogs = async (page = 1) => {
  if (!user.value) return
  blogLoading.value = true
  try {
    const params: UserBlogRequest = {
      page,
      limit: 10,
      status: blogStatusFilter.value
    }
    const { data } = await getUserBlogs(user.value.id, params)
    blogs.value = data.blogs
    blogPagination.value = data.pagination
  } catch (error) {
    console.error(error)
  } finally {
    blogLoading.value = false
  }
}

// 获取审核状态
const fetchReviewStatus = async (page = 1) => {
  if (!user.value) return
  reviewLoading.value = true
  try {
    const { data } = await getMyReviewStatus({
      page,
      limit: 10,
      status: reviewStatusFilter.value
    })
    reviewBlogs.value = data.blogs
    reviewStats.value = data.stats
    reviewPagination.value = data.pagination
  } catch (error) {
    console.error(error)
  } finally {
    reviewLoading.value = false
  }
}

// 获取评论
const fetchComments = async (page = 1) => {
  if (!user.value) return
  commentLoading.value = true
  try {
    const { data } = await listUserComments(user.value.id, { page, limit: 10 })
    comments.value = data.comments
    commentPagination.value = data.pagination
  } catch (error) {
    console.error(error)
  } finally {
    commentLoading.value = false
  }
}

// 编辑博客
const handleEditBlog = (blogId: string) => {
  router.push(`/user/edit/${blogId}`)
}

// 删除博客确认
const confirmDeleteBlog = (blog: Blog) => {
  blogToDelete.value = blog
  showDeleteModal.value = true
}

// 执行删除博客
const handleDeleteBlog = async () => {
  if (!blogToDelete.value) return

  isDeleting.value = true
  try {
    await deleteBlog(blogToDelete.value.id)
    toast.success(t('profile.delete_blog_success'))

    // 从列表中移除
    blogs.value = blogs.value.filter(blog => blog.id !== blogToDelete.value?.id)

    // 如果当前页没有内容且不是第一页，返回上一页
    if (blogs.value.length === 0 && blogPagination.value.currentPage > 1) {
      fetchBlogs(blogPagination.value.currentPage - 1)
    }
  } catch (error: any) {
    toast.error(error.message || t('profile.delete_blog_failed'))
  } finally {
    isDeleting.value = false
    showDeleteModal.value = false
    blogToDelete.value = null
  }
}

// --- 交互处理 ---

const handleTabChange = async (tab: 'blogs' | 'review' | 'comments') => {
  activeTab.value = tab
  if (tab === 'blogs' && blogs.value.length === 0) await fetchBlogs()
  if (tab === 'review' && reviewBlogs.value.length === 0) await fetchReviewStatus()
  if (tab === 'comments' && comments.value.length === 0) await fetchComments()
}

const handleLogout = () => {
  userStore.logout()
  toast.success(t('profile.logout_success'))
}

// 跳转到设置页面
const goToSettings = () => {
  router.push('/user/settings')
}
</script>

<template>
  <div
    class="min-h-screen bg-base-100 relative overflow-hidden text-base-content selection:bg-primary selection:text-primary-content pb-20">
    <title>life-个人资料</title>

    <!-- 背景光晕 -->
    <div
      class="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none select-none animate-pulse-slow">
    </div>
    <div
      class="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none select-none animate-pulse-slow"
      style="animation-delay: 2s;"></div>

    <div class="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">

      <!-- 加载状态 -->
      <div v-if="isLoading" class="flex justify-center items-center h-[60vh]">
        <span class="loading loading-ring loading-lg text-primary"></span>
      </div>

      <div v-else-if="user" class="animate-fade-in-up">

        <!-- 头部资料卡片 - 移动端优化 -->
        <div
          class="card bg-base-100/60 backdrop-blur-xl border border-base-content/5 shadow-lg overflow-hidden relative group mb-8">
          <div
            class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary/50 via-secondary/50 to-accent/50 opacity-50">
          </div>
          <div class="card-body p-4 sm:p-10">
            <div class="lg:hidden">
              <div class="flex flex-col items-center gap-4 mb-6">
                <!-- 头像 -->
                <div class="avatar">
                  <div class="w-24 h-24 rounded-full ring-4 ring-base-100 shadow-2xl">
                    <NuxtImg :src="user.avatar || '/default-avatar.png'" alt="avatar" class="object-cover" />
                  </div>
                </div>
                
                <!-- 用户名和认证 -->
                <div class="text-center">
                  <div class="flex items-center justify-center gap-2 mb-1">
                    <h1 class="text-2xl font-bold font-title tracking-tight">{{ user.username }}</h1>
                    <div v-if="user.idVerified" class="tooltip" data-tip="已实名认证">
                      <Icon name="mingcute:certificate-fill" class="text-blue-500 text-lg" />
                    </div>
                  </div>
                  
                  <!-- 个人简介 -->
                  <p class="text-base-content/70 text-sm line-clamp-2 max-w-md mx-auto">
                    {{ user.bio || t('profile.no_bio') }}
                  </p>
                </div>
              </div>
              
              <!-- 按钮组 -->
              <div class="flex justify-center gap-2 mb-6">
                <button 
                  @click="goToSettings"
                  class="btn btn-ghost btn-sm gap-2 text-primary hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Icon name="mingcute:settings-3-line" class="text-lg" />
                  <span>{{ t('profile.settings_short') }}</span>
                </button>
                
                <nuxt-link 
                  to="/auth/real-name-auth/" 
                  v-show="!userStore.user?.isAdmin && !userStore.user?.idVerified"
                  class="btn btn-soft btn-primary btn-sm gap-2"
                >
                  <Icon name="mingcute:certificate-2-line" class="text-lg" />
                  <span>
                    <util-i18n zh="实名" tw="實名" en="Verify"></util-i18n>
                  </span>
                </nuxt-link>
                
                <button 
                  class="btn btn-ghost text-error hover:bg-error/10 btn-sm gap-2" 
                  @click="handleLogout"
                >
                  <Icon name="mingcute:exit-line" class="text-lg" />
                  <span>{{ t('profile.logout_short') }}</span>
                </button>
              </div>
              
              <!-- 统计数据 -->
              <div class="flex justify-center gap-8 mb-4">
                <div class="flex flex-col items-center">
                  <span class="text-2xl font-black font-title">{{ user.blogCount || 0 }}</span>
                  <span class="text-xs font-medium text-base-content/50 uppercase">{{ t('profile.posts') }}</span>
                </div>
                <div class="flex flex-col items-center">
                  <span class="text-2xl font-black font-title">{{ user.totalLikes || 0 }}</span>
                  <span class="text-xs font-medium text-base-content/50 uppercase">{{ t('profile.likes') }}</span>
                </div>
              </div>
            </div>
            <div class="hidden lg:flex flex-col md:flex-row items-center md:items-start gap-8">
              <!-- 头像区域 -->
              <div class="flex flex-col items-center gap-1">
                <!-- 头像 -->
                <div class="avatar">
                  <div class="w-28 h-28 sm:w-32 sm:h-32 rounded-full ring-4 ring-base-100 shadow-2xl">
                    <NuxtImg :src="user.avatar || '/default-avatar.png'" alt="avatar" class="object-cover" />
                  </div>
                </div>
                
                <!-- 个人设置按钮 -->
                <button 
                  @click="goToSettings"
                  class="btn btn-ghost btn-sm gap-2 text-primary hover:bg-primary/10 hover:text-primary transition-colors mt-4"
                >
                  <Icon name="mingcute:settings-3-line" class="text-lg" />
                  <span>{{ t('profile.settings') }}</span>
                </button>
              </div>
              
              <!-- 信息区域 -->
              <div class="flex-1 text-center md:text-left space-y-3 pt-2">
                <div class="flex flex-col md:flex-row items-center gap-3">
                  <h1 class="text-3xl font-bold font-title tracking-tight">{{ user.username }}</h1>
                  <div v-if="user.idVerified" class="tooltip tooltip-right" data-tip="Verified">
                    <Icon name="mingcute:certificate-fill" class="text-blue-500 text-xl" />
                  </div>
                </div>

                <p
                  class="block text-base-content/70 text-sm sm:text-base lg:text-lg leading-relaxed line-clamp-3 overflow-hidden text-ellipsis max-w-3xl">
                  {{ user.bio || t('profile.no_bio') }}
                </p>

                <!-- 统计数据 -->
                <div class="flex items-center justify-center md:justify-start gap-8 pt-4">
                  <div class="flex flex-col items-center md:items-start">
                    <span class="text-2xl font-black font-title">{{ user.blogCount || 0 }}</span>
                    <span class="text-xs font-medium text-base-content/50 uppercase">{{ t('profile.posts') }}</span>
                  </div>
                  <div class="w-px h-8 bg-base-content/10"></div>
                  <div class="flex flex-col items-center md:items-start">
                    <span class="text-2xl font-black font-title">{{ user.totalLikes || 0 }}</span>
                    <span class="text-xs font-medium text-base-content/50 uppercase">{{ t('profile.likes') }}</span>
                  </div>
                </div>
              </div>

              <!-- 右侧按钮区域 -->
              <div class="md:self-start flex flex-col items-center gap-3">
                <nuxt-link 
                  to="/auth/real-name-auth/" 
                  v-show="!userStore.user?.isAdmin && !userStore.user?.idVerified"
                  class="btn btn-soft btn-primary btn-sm gap-2"
                >
                  <Icon name="mingcute:certificate-2-line" class="text-lg" />
                  <span>
                    <util-i18n zh="实名认证" tw="實名認證" en="Real-name Authentication"></util-i18n>
                  </span>
                </nuxt-link>
                <!-- 退出登录按钮 -->
                <button 
                  class="btn btn-ghost text-error hover:bg-error/10 btn-sm gap-2" 
                  @click="handleLogout"
                >
                  <Icon name="mingcute:exit-line" class="text-lg" />
                  <span>{{ t('profile.logout') }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 主要布局 Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <!-- 左侧导航 (PC端垂直菜单 / 移动端横向Tab) -->
          <div class="lg:col-span-3 sticky top-24 z-30">

            <!-- 移动端 Tabs -->
            <div class="lg:hidden flex overflow-x-auto gap-2 pb-4 scrollbar-none">
              <button 
                @click="handleTabChange('blogs')"
                class="btn btn-sm rounded-full transition-all flex-nowrap whitespace-nowrap"
                :class="activeTab === 'blogs' ? 'btn-neutral text-white shadow-lg' : 'btn-ghost bg-base-100/50'"
              >
                {{ t('profile.tabs.blogs') }}
              </button>
              <button 
                @click="handleTabChange('review')"
                class="btn btn-sm rounded-full transition-all flex-nowrap whitespace-nowrap"
                :class="activeTab === 'review' ? 'btn-neutral text-white shadow-lg' : 'btn-ghost bg-base-100/50'"
              >
                {{ t('profile.tabs.review') }}
              </button>
              <button 
                @click="handleTabChange('comments')"
                class="btn btn-sm rounded-full transition-all flex-nowrap whitespace-nowrap"
                :class="activeTab === 'comments' ? 'btn-neutral text-white shadow-lg' : 'btn-ghost bg-base-100/50'"
              >
                {{ t('profile.tabs.comments') }}
              </button>
            </div>

            <!-- PC端 垂直菜单 -->
            <ul
              class="hidden lg:block menu bg-base-100/60 backdrop-blur-md rounded-2xl border border-base-content/5 p-2 shadow-sm text-base-content/80 font-medium w-full">
              <li>
                <a :class="{ 'active bg-primary/10! text-primary!': activeTab === 'blogs' }"
                  @click="handleTabChange('blogs')">
                  <Icon name="mingcute:document-3-line" class="text-xl" />
                  {{ t('profile.tabs.blogs') }}
                </a>
              </li>
              <li>
                <a :class="{ 'active bg-primary/10! text-primary!': activeTab === 'review' }"
                  @click="handleTabChange('review')">
                  <Icon name="mingcute:file-check-line" class="text-xl" />
                  {{ t('profile.tabs.review') }}
                </a>
              </li>
              <li>
                <a :class="{ 'active bg-primary/10! text-primary!': activeTab === 'comments' }"
                  @click="handleTabChange('comments')">
                  <Icon name="mingcute:comment-line" class="text-xl" />
                  {{ t('profile.tabs.comments') }}
                </a>
              </li>
            </ul>
          </div>

          <!-- 右侧内容区域 -->
          <div class="lg:col-span-9 min-h-[500px]">
            <Transition name="fade" mode="out-in">

              <!-- Tab 1: 我的博客 -->
              <div v-if="activeTab === 'blogs'" key="blogs" class="space-y-6">
                <div
                  class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-base-100/40 backdrop-blur-sm p-3 rounded-xl border border-base-content/5">
                  <h2 class="text-lg font-bold flex items-center gap-2">
                    <span class="w-1.5 h-6 bg-primary rounded-full"></span>
                    {{ t('profile.my_blogs') }}
                  </h2>
                  <select v-model="blogStatusFilter" class="select select-sm select-bordered w-full sm:w-auto" @change="fetchBlogs(1)">
                    <option :value="undefined">{{ t('profile.filter.all') }}</option>
                    <option value="published">{{ t('profile.filter.published') }}</option>
                  </select>
                </div>

                <div v-if="blogLoading" class="grid gap-4">
                  <div v-for="i in 3" :key="i" class="skeleton h-32 w-full rounded-2xl"></div>
                </div>
                <div v-else-if="blogs.length > 0" class="grid gap-4">
                  <div v-for="blog in blogs" :key="blog.id"
                    class="card bg-base-100/60 backdrop-blur-md shadow-sm border border-base-content/5 p-4 hover:border-primary/20 transition-all group">
                    <div class="flex flex-col sm:flex-row gap-4">
                      <figure class="w-full sm:w-40 rounded-lg overflow-hidden shrink-0">
                        <NuxtImg :src="blog.coverImage || '/default-cover.jpg'" class="h-40 sm:h-full w-full object-cover" />
                      </figure>
                      <div class="flex-1 flex flex-col justify-between">
                        <div>
                          <div class="flex flex-col sm:flex-row justify-between gap-2">
                            <h3 class="font-bold text-lg line-clamp-1">
                              <NuxtLink :to="`/blog/${blog.id}`" class="hover:text-primary">{{ blog.title }}</NuxtLink>
                            </h3>
                            <span class="badge badge-sm self-start"
                              :class="blog.status === 'published' ? 'badge-success badge-soft' : 'badge-warning badge-soft'">{{ blog.status }}</span>
                          </div>
                          <p class="text-sm text-base-content/60 line-clamp-2 mt-2">{{ blog.summary }}</p>
                        </div>
                        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mt-4">
                          <div class="flex gap-4 text-xs text-base-content/40">
                            <span class="flex items-center gap-1">
                              <Icon name="mingcute:eye-line" /> {{ blog.viewCount }}
                            </span>
                            <span class="flex items-center gap-1">
                              <Icon name="mingcute:thumb-up-line" /> {{ blog.likeCount }}
                            </span>
                            <span class="flex items-center gap-1">
                              <Icon name="mingcute:chat-line" /> {{ blog.commentCount }}
                            </span>
                          </div>
                          <div class="flex gap-2 self-end">
                            <button @click="handleEditBlog(blog.id)"
                              class="btn btn-xs sm:btn-sm btn-ghost hover:bg-primary/10 hover:text-primary"
                              :title="t('profile.edit_blog')">
                              <Icon name="mingcute:edit-2-line" />
                              <span class="hidden sm:inline ml-1">{{ t('profile.edit_blog') }}</span>
                            </button>
                            <button @click="confirmDeleteBlog(blog)"
                              class="btn btn-xs sm:btn-sm btn-ghost hover:bg-error/10 text-error"
                              :title="t('profile.delete_blog')">
                              <Icon name="mingcute:delete-2-line" />
                              <span class="hidden sm:inline ml-1">{{ t('profile.delete_blog') }}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 分页 -->
                  <div class="join grid grid-cols-2 max-w-xs mx-auto mt-4" v-if="blogPagination.totalPages > 1">
                    <button class="join-item btn btn-outline btn-sm" :disabled="!blogPagination.hasPrevPage"
                      @click="fetchBlogs(blogPagination.currentPage - 1)">{{ t('profile.prev') }}</button>
                    <button class="join-item btn btn-outline btn-sm" :disabled="!blogPagination.hasNextPage"
                      @click="fetchBlogs(blogPagination.currentPage + 1)">{{ t('profile.next') }}</button>
                  </div>
                </div>
                <div v-else class="text-center py-20 text-base-content/40">
                  <Icon name="mingcute:quill-pen-line" class="text-4xl mb-2" />
                  <p>{{ t('profile.no_blogs') }}</p>
                </div>
              </div>

              <!-- Tab 2: 文章审核 -->
              <div v-else-if="activeTab === 'review'" key="review" class="space-y-6">
                <div
                  class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-base-100/40 backdrop-blur-sm p-3 rounded-xl border border-base-content/5">
                  <h2 class="text-lg font-bold flex items-center gap-2">
                    <span class="w-1.5 h-6 bg-warning rounded-full"></span>
                    {{ t('profile.tabs.review') }}
                  </h2>
                  
                  <!-- 统计信息 -->
                  <div class="flex gap-4 text-sm">
                    <div class="flex items-center gap-1">
                      <span class="badge badge-sm badge-warning badge-soft">
                        {{ t('profile.review.pending') }}
                      </span>
                      <span class="font-medium">{{ reviewStats.pendingCount }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <span class="badge badge-sm badge-error badge-soft">
                        {{ t('profile.review.rejected') }}
                      </span>
                      <span class="font-medium">{{ reviewStats.rejectedCount }}</span>
                    </div>
                  </div>
                </div>

                <!-- 过滤选项 -->
                <div class="flex justify-end">
                  <select v-model="reviewStatusFilter" class="select select-sm select-bordered w-full sm:w-auto max-w-xs" @change="fetchReviewStatus(1)">
                    <option :value="undefined">{{ t('profile.review.filter.all') }}</option>
                    <option value="pending">{{ t('profile.review.filter.pending') }}</option>
                    <option value="rejected">{{ t('profile.review.filter.rejected') }}</option>
                  </select>
                </div>

                <div v-if="reviewLoading" class="grid gap-4">
                  <div v-for="i in 3" :key="i" class="skeleton h-32 w-full rounded-2xl"></div>
                </div>
                <div v-else-if="reviewBlogs.length > 0" class="grid gap-4">
                  <div v-for="blog in reviewBlogs" :key="blog.id"
                    class="card bg-base-100/60 backdrop-blur-md shadow-sm border border-base-content/5 p-4 hover:border-warning/20 transition-all group">
                    <div class="flex flex-col sm:flex-row gap-4">
                      <figure class="w-full sm:w-40 rounded-lg overflow-hidden shrink-0">
                        <NuxtImg :src="blog.coverImage || '/default-cover.jpg'" class="h-40 sm:h-full w-full object-cover" />
                      </figure>
                      <div class="flex-1 flex flex-col justify-between">
                        <div>
                          <div class="flex flex-col sm:flex-row justify-between gap-2">
                            <h3 class="font-bold text-lg line-clamp-1">
                              <NuxtLink :to="`/blog/${blog.id}`" class="hover:text-warning">{{ blog.title }}</NuxtLink>
                            </h3>
                            <span class="badge badge-sm self-start"
                              :class="blog.status === 'rejected' ? 'badge-error badge-soft' : 'badge-warning badge-soft'">
                              {{ blog.status === 'rejected' ? t('profile.review.rejected') : t('profile.review.pending') }}
                            </span>
                          </div>
                          <p class="text-sm text-base-content/60 line-clamp-2 mt-2">{{ blog.summary }}</p>
                        </div>
                        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mt-4">
                          <div class="flex gap-4 text-xs text-base-content/40">
                            <span class="flex items-center gap-1">
                              <Icon name="mingcute:calendar-line" /> 
                              {{ new Date(blog.createdAt).toLocaleDateString() }}
                            </span>
                            <span class="flex items-center gap-1">
                              <Icon name="mingcute:eye-line" /> {{ blog.viewCount }}
                            </span>
                            <span class="flex items-center gap-1">
                              <Icon name="mingcute:thumb-up-line" /> {{ blog.likeCount }}
                            </span>
                          </div>
                          <div class="flex gap-2 self-end">
                            <button @click="handleEditBlog(blog.id)"
                              class="btn btn-xs sm:btn-sm btn-ghost hover:bg-warning/10 hover:text-warning"
                              :title="t('profile.edit_blog')">
                              <Icon name="mingcute:edit-2-line" />
                              <span class="hidden sm:inline ml-1">{{ t('profile.edit_blog') }}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 分页 -->
                  <div class="join grid grid-cols-2 max-w-xs mx-auto mt-4" v-if="reviewPagination.totalPages > 1">
                    <button class="join-item btn btn-outline btn-sm" :disabled="!reviewPagination.hasPrevPage"
                      @click="fetchReviewStatus(reviewPagination.currentPage - 1)">{{ t('profile.prev') }}</button>
                    <button class="join-item btn btn-outline btn-sm" :disabled="!reviewPagination.hasNextPage"
                      @click="fetchReviewStatus(reviewPagination.currentPage + 1)">{{ t('profile.next') }}</button>
                  </div>
                </div>
                <div v-else class="text-center py-20 text-base-content/40">
                  <Icon name="mingcute:file-check-line" class="text-4xl mb-2" />
                  <p>{{ t('profile.review.no_review') }}</p>
                </div>
              </div>

              <!-- Tab 3: 我的评论 -->
              <div v-else-if="activeTab === 'comments'" key="comments" class="space-y-4">
                <h2 class="text-lg font-bold flex items-center gap-2 mb-4">
                  <span class="w-1.5 h-6 bg-secondary rounded-full"></span>
                  {{ t('profile.my_comments') }}
                </h2>

                <div v-if="commentLoading" class="space-y-3">
                  <div v-for="i in 3" :key="i" class="skeleton h-24 w-full rounded-xl"></div>
                </div>

                <div v-else-if="comments.length > 0" class="space-y-3">
                  <div v-for="comment in comments" :key="comment.id"
                    class="card bg-base-100/60 backdrop-blur-md border border-base-content/5 p-5 hover:shadow-md transition-all">
                    <div class="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                      <NuxtLink :to="`/blog/${comment.blog.slug}`"
                        class="text-sm font-bold hover:text-primary transition-colors line-clamp-1">
                        评论了: {{ comment.blog.title }}
                      </NuxtLink>
                      <span class="text-xs text-base-content/40">{{ new Date(comment.createdAt).toLocaleDateString()
                      }}</span>
                    </div>
                    <p class="text-base-content/80 text-sm">{{ comment.content }}</p>
                  </div>
                  <!-- 分页 -->
                  <div class="join grid grid-cols-2 max-w-xs mx-auto mt-4" v-if="commentPagination.totalPages > 1">
                    <button class="join-item btn btn-outline btn-sm" :disabled="!commentPagination.hasPrevPage"
                      @click="fetchComments(commentPagination.currentPage - 1)">{{ t('profile.prev') }}</button>
                    <button class="join-item btn btn-outline btn-sm" :disabled="!commentPagination.hasNextPage"
                      @click="fetchComments(commentPagination.currentPage + 1)">{{ t('profile.next') }}</button>
                  </div>
                </div>
                <div v-else class="text-center py-20 text-base-content/40">
                  <Icon name="mingcute:comment-line" class="text-4xl mb-2" />
                  <p>{{ t('profile.no_comments') }}</p>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <!-- 删除确认模态框 -->
    <div v-if="showDeleteModal" class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-lg">{{ t('profile.delete_blog_title') }}</h3>
        <p class="py-4">
          {{ t('profile.delete_blog_confirmation') }} <strong>"{{ blogToDelete?.title }}"</strong>?
          {{ t('profile.delete_blog_warning') }}
        </p>
        <div class="modal-action">
          <button class="btn btn-ghost" @click="showDeleteModal = false" :disabled="isDeleting">
            {{ t('profile.cancel') }}
          </button>
          <button class="btn btn-error" @click="handleDeleteBlog" :disabled="isDeleting">
            <span v-if="isDeleting" class="loading loading-spinner"></span>
            {{ t('profile.confirm_delete') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

@keyframes pulse-slow {

  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }

  50% {
    opacity: 0.15;
    transform: scale(1.1);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 8s infinite ease-in-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scrollbar-none {
  scrollbar-width: none;
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
}

@media (max-width: 475px) {
  .xs\:hidden {
    display: none !important;
  }
  
  .xs\:inline {
    display: inline !important;
  }
}
</style>

<i18n lang="json">{
  "en": {
    "profile": {
      "fetch_failed": "Failed to fetch profile",
      "logout_success": "Logged out successfully",
      "logout": "Logout",
      "logout_short": "Out",
      "settings": "Settings",
      "settings_short": "Settings",
      "no_bio": "No bio yet...",
      "posts": "Posts",
      "likes": "Likes",
      "my_blogs": "My Blogs",
      "my_comments": "My Comments",
      "no_blogs": "No blogs found",
      "no_comments": "No comments found",
      "prev": "Prev",
      "next": "Next",
      "edit_blog": "Edit",
      "delete_blog": "Delete",
      "cancel": "Cancel",
      "confirm_delete": "Delete",
      "comment_to": "Re",
      "delete_blog_title": "Delete Blog",
      "delete_blog_confirmation": "Are you sure you want to delete the blog",
      "delete_blog_warning": "This action cannot be undone.",
      "delete_blog_success": "Blog deleted successfully",
      "delete_blog_failed": "Failed to delete blog",
      "filter": {
        "all": "All",
        "published": "Published"
      },
      "review": {
        "pending": "Pending",
        "rejected": "Rejected",
        "no_review": "No articles pending review",
        "filter": {
          "all": "All Status",
          "pending": "Pending Review",
          "rejected": "Rejected"
        }
      },
      "tabs": {
        "blogs": "My Articles",
        "review": "Article Review",
        "comments": "Comments"
      }
    }
  },
  "zh-CN": {
    "profile": {
      "fetch_failed": "获取用户信息失败",
      "logout_success": "已安全退出",
      "logout": "退出登录",
      "logout_short": "退出",
      "settings": "个人设置",
      "settings_short": "设置",
      "no_bio": "这个人很懒，什么都没写...",
      "posts": "文章",
      "likes": "获赞",
      "my_blogs": "我的博客",
      "my_comments": "我的评论",
      "no_blogs": "暂无博客",
      "no_comments": "暂无评论",
      "prev": "上一页",
      "next": "下一页",
      "edit_blog": "编辑",
      "delete_blog": "删除",
      "cancel": "取消",
      "confirm_delete": "确认删除",
      "comment_to": "回复",
      "delete_blog_title": "删除博客",
      "delete_blog_confirmation": "确定要删除博客",
      "delete_blog_warning": "此操作不可撤销。",
      "delete_blog_success": "博客删除成功",
      "delete_blog_failed": "博客删除失败",
      "filter": {
        "all": "全部",
        "published": "已发布"
      },
      "review": {
        "pending": "待审核",
        "rejected": "已拒绝",
        "no_review": "暂无待审核文章",
        "filter": {
          "all": "全部状态",
          "pending": "待审核",
          "rejected": "已拒绝"
        }
      },
      "tabs": {
        "blogs": "我的文章",
        "review": "文章审核",
        "comments": "评论记录"
      }
    }
  },
  "zh-TW": {
    "profile": {
      "fetch_failed": "獲取用戶信息失敗",
      "logout_success": "已安全退出",
      "logout": "退出登錄",
      "logout_short": "退出",
      "settings": "個人設置",
      "settings_short": "設置",
      "no_bio": "這個人很懶，什麼都沒寫...",
      "posts": "文章",
      "likes": "獲贊",
      "my_blogs": "我的博客",
      "my_comments": "我的評論",
      "no_blogs": "暫無博客",
      "no_comments": "暫無評論",
      "prev": "上一頁",
      "next": "下一頁",
      "edit_blog": "編輯",
      "delete_blog": "刪除",
      "cancel": "取消",
      "confirm_delete": "確認刪除",
      "comment_to": "回覆",
      "delete_blog_title": "刪除博客",
      "delete_blog_confirmation": "確定要刪除博客",
      "delete_blog_warning": "此操作不可撤銷。",
      "delete_blog_success": "博客刪除成功",
      "delete_blog_failed": "博客刪除失敗",
      "filter": {
        "all": "全部",
        "published": "已發布"
      },
      "review": {
        "pending": "待審核",
        "rejected": "已拒絕",
        "no_review": "暫無待審核文章",
        "filter": {
          "all": "全部狀態",
          "pending": "待審核",
          "rejected": "已拒絕"
        }
      },
      "tabs": {
        "blogs": "我的文章",
        "review": "文章審核",
        "comments": "評論記錄"
      }
    }
  }
}</i18n>