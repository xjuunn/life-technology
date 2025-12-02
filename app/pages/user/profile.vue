<script setup lang="ts">
import {
  profile,
  updateProfile,
  updatePassword,
  type User
} from '~/api/auth'
import {
  getUserBlogs,
  del as deleteBlog,
  type Blog,
  type UserBlogRequest,
  type Status
} from '~/api/blog'
import {
  listUserComments,
  type ListUserCommentsResponse
} from '~/api/comment'
import { avatar as uploadAvatarApi } from '~/api/upload'

const { t } = useI18n()
const toast = useToast()
const router = useRouter()
const userStore = useUserStore()

// --- 状态定义 ---
const user = computed(() => userStore.user)
const isLoading = ref(false)
const activeTab = ref<'blogs' | 'comments' | 'settings'>('blogs')

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

// --- 评论相关 ---
const comments = ref<ListUserCommentsResponse['comments']>([])
const commentPagination = ref({
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false
})
const commentLoading = ref(false)

// --- 设置页相关 (您提供的逻辑) ---
const dropZoneRef = ref<HTMLElement>()
const isUploading = ref(false)
const isSaving = ref(false)
// 编辑表单数据
const editForm = reactive({
  username: '',
  bio: '',
  avatar: ''
})

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
  } else {
    syncFormWithUser()
  }

  // 默认加载博客
  fetchBlogs()
})

// 同步 Store 数据到表单
const syncFormWithUser = () => {
  if (user.value) {
    editForm.username = user.value.username || ''
    editForm.bio = user.value.bio || ''
    editForm.avatar = user.value.avatar || ''
  }
}

const fetchUserProfile = async () => {
  try {
    isLoading.value = true
    const { data } = await profile()
    userStore.setUser(data.user)
    syncFormWithUser()
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

const handleTabChange = async (tab: 'blogs' | 'comments' | 'settings') => {
  activeTab.value = tab
  if (tab === 'blogs' && blogs.value.length === 0) await fetchBlogs()
  if (tab === 'comments' && comments.value.length === 0) await fetchComments()
  if (tab === 'settings') syncFormWithUser()
}

const handleLogout = () => {
  userStore.logout()
  toast.success(t('profile.logout_success'))
}

// --- 设置页逻辑 (集成您提供的代码) ---

const handleAvatarUpload = async (file: File) => {
  if (!file.type.startsWith('image/')) {
    toast.error(t('settings.error_image_type'))
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    toast.error(t('settings.error_image_size'))
    return
  }

  isUploading.value = true
  try {
    const { data } = await uploadAvatarApi(file)
    const url = data.fullUrl || data.fileUrl
    if (url) {
      editForm.avatar = url
      toast.success(t('settings.upload_success'))
    }
  } catch (e: any) {
    toast.error(e.message || 'Upload failed')
  } finally {
    isUploading.value = false
  }
}

// VueUse File Dialog
const { open: openFileDialog, onChange: onFileChange } = useFileDialog({ accept: 'image/*', multiple: false })

onFileChange((files) => {
  if (files?.length && files[0]) handleAvatarUpload(files[0])
})

// VueUse Drop Zone
useDropZone(dropZoneRef, {
  onDrop: (files) => {
    if (files?.length && files[0]) handleAvatarUpload(files[0])
  },
})

// 保存资料
const saveProfile = async () => {
  isSaving.value = true
  try {
    const { data } = await updateProfile({
      username: editForm.username,
      bio: editForm.bio,
      avatar: editForm.avatar
    })

    // 更新 Store
    userStore.setUser(data.user)
    toast.success(t('settings.save_success'))
  } catch (e: any) {
    toast.error(e.response?.data?.message || e.message || t('settings.save_failed'))
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-base-100 relative overflow-hidden text-base-content selection:bg-primary selection:text-primary-content pb-20">

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

        <!-- 头部资料卡片 -->
        <div
          class="card bg-base-100/60 backdrop-blur-xl border border-base-content/5 shadow-lg overflow-hidden relative group mb-8">
          <div
            class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary/50 via-secondary/50 to-accent/50 opacity-50">
          </div>
          <div class="card-body p-6 sm:p-10">
            <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
              <!-- 头像 -->
              <div class="avatar">
                <div class="w-28 h-28 sm:w-32 sm:h-32 rounded-full ring-4 ring-base-100 shadow-2xl">
                  <NuxtImg :src="user.avatar || '/default-avatar.png'" alt="avatar" class="object-cover" />
                </div>
              </div>
              <!-- 信息 -->
              <div class="flex-1 text-center md:text-left space-y-3 pt-2">
                <div class="flex flex-col md:flex-row items-center gap-3">
                  <h1 class="text-3xl font-bold font-title tracking-tight">{{ user.username }}</h1>
                  <div v-if="user.idVerified" class="tooltip tooltip-right" data-tip="Verified">
                    <Icon name="mingcute:certificate-fill" class="text-blue-500 text-xl" />
                  </div>
                </div>

                <p
                  class="block text-base-content/70 text-sm sm:text-base w-[40vw] lg:text-lg leading-relaxed line-clamp-3 overflow-hidden text-ellipsis">
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

              <!-- 登出按钮 -->
              <div class="md:self-start">
                <nuxt-link to="/auth/real-name-auth/" v-show="!userStore.user?.isAdmin && !userStore.user?.idVerified" 
                  class="btn btn-soft btn-primary btn-sm">实名认证</nuxt-link>
                <button class="btn btn-ghost text-error hover:bg-error/10 btn-sm gap-2" @click="handleLogout">
                  <Icon name="mingcute:exit-line" class="text-lg" />
                  <span class="hidden sm:inline">{{ t('profile.logout') }}</span>
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
              <button v-for="tab in ['blogs', 'comments', 'settings']" :key="tab" @click="handleTabChange(tab as any)"
                class="btn btn-sm rounded-full transition-all flex-nowrap whitespace-nowrap"
                :class="activeTab === tab ? 'btn-neutral text-white shadow-lg' : 'btn-ghost bg-base-100/50'">
                {{ t(`profile.tabs.${tab}`) }}
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
                <a :class="{ 'active bg-primary/10! text-primary!': activeTab === 'comments' }"
                  @click="handleTabChange('comments')">
                  <Icon name="mingcute:comment-line" class="text-xl" />
                  {{ t('profile.tabs.comments') }}
                </a>
              </li>
              <div class="divider my-1 opacity-50"></div>
              <li>
                <a :class="{ 'active bg-primary/10! text-primary!': activeTab === 'settings' }"
                  @click="handleTabChange('settings')">
                  <Icon name="mingcute:settings-3-line" class="text-xl" />
                  {{ t('profile.tabs.settings') }}
                </a>
              </li>
            </ul>
          </div>

          <!-- 右侧内容区域 -->
          <div class="lg:col-span-9 min-h-[500px]">
            <Transition name="fade" mode="out-in">

              <!-- Tab 1: 我的博客 -->
              <div v-if="activeTab === 'blogs'" key="blogs" class="space-y-6">
                <!-- 过滤器 -->
                <div
                  class="flex justify-between items-center bg-base-100/40 backdrop-blur-sm p-3 rounded-xl border border-base-content/5">
                  <h2 class="text-lg font-bold flex items-center gap-2">
                    <span class="w-1.5 h-6 bg-primary rounded-full"></span>
                    {{ t('profile.my_blogs') }}
                  </h2>
                  <select v-model="blogStatusFilter" class="select select-sm select-ghost" @change="fetchBlogs(1)">
                    <option :value="undefined">{{ t('profile.filter.all') }}</option>
                    <option value="published">{{ t('profile.filter.published') }}</option>
                  </select>
                </div>

                <!-- 列表 -->
                <div v-if="blogLoading" class="grid gap-4">
                  <div v-for="i in 3" :key="i" class="skeleton h-32 w-full rounded-2xl"></div>
                </div>
                <div v-else-if="blogs.length > 0" class="grid gap-4">
                  <div v-for="blog in blogs" :key="blog.id"
                    class="card card-side bg-base-100/60 backdrop-blur-md shadow-sm border border-base-content/5 p-4 hover:border-primary/20 transition-all group">
                    <figure class="w-24 sm:w-40 rounded-lg overflow-hidden shrink-0">
                      <NuxtImg :src="blog.coverImage || '/default-cover.jpg'" class="h-full w-full object-cover" />
                    </figure>
                    <div class="flex-1 pl-4 flex flex-col justify-between">
                      <div>
                        <div class="flex justify-between">
                          <h3 class="font-bold text-lg line-clamp-1">
                            <NuxtLink :to="`/blog/${blog.id}`" class="hover:text-primary">{{ blog.title }}</NuxtLink>
                          </h3>
                          <span class="badge badge-sm"
                            :class="blog.status === 'published' ? 'badge-success badge-soft' : 'badge-warning badge-soft'">{{
                            blog.status }}</span>
                        </div>
                        <p class="text-sm text-base-content/60 line-clamp-2 mt-1">{{ blog.summary }}</p>
                      </div>
                      <div class="flex justify-between items-end mt-2">
                        <div class="text-xs text-base-content/40 space-x-3">
                          <span>
                            <Icon name="mingcute:eye-line" /> {{ blog.viewCount }}
                          </span>
                          <span>
                            <Icon name="mingcute:thumb-up-line" /> {{ blog.likeCount }}
                          </span>
                          <span>
                            <Icon name="mingcute:chat-line" /> {{ blog.commentCount }}
                          </span>
                        </div>
                        <div class="flex gap-1">
                          <button @click="handleEditBlog(blog.id)"
                            class="btn btn-sm btn-ghost btn-circle hover:bg-primary/10 hover:text-primary"
                            :title="t('profile.edit_blog')">
                            <Icon name="mingcute:edit-2-line" />
                          </button>
                          <button @click="confirmDeleteBlog(blog)"
                            class="btn btn-sm btn-ghost btn-circle hover:bg-error/10 text-error"
                            :title="t('profile.delete_blog')">
                            <Icon name="mingcute:delete-2-line" />
                          </button>
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

              <!-- Tab 2: 我的评论 -->
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
                    <div class="flex justify-between items-start mb-2">
                      <NuxtLink :to="`/blog/${comment.blog.slug}`"
                        class="text-sm font-bold hover:text-primary transition-colors">
                        Re: {{ comment.blog.title }}
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

              <!-- Tab 3: 个人设置 -->
              <div v-else-if="activeTab === 'settings'" key="settings">
                <div class="card w-full bg-base-100/60 backdrop-blur-xl shadow-lg border border-base-content/5">
                  <div class="card-body p-6 md:p-10">

                    <div class="mb-8">
                      <h1 class="text-2xl font-black tracking-tight">{{ t('settings.title') }}</h1>
                      <p class="text-base-content/60 text-sm mt-1">{{ t('settings.subtitle') }}</p>
                    </div>

                    <div class="flex flex-col md:flex-row gap-10">
                      <!-- 头像上传区域 -->
                      <div
                        class="flex flex-col items-center space-y-4 md:w-1/3 md:border-r border-base-content/5 pr-0 md:pr-10">
                        <div ref="dropZoneRef"
                          class="relative group w-40 h-40 rounded-full ring-4 ring-base-200 cursor-pointer overflow-hidden shadow-lg transition-all duration-300 hover:ring-primary hover:shadow-primary/20"
                          @click="openFileDialog()">

                          <img v-if="editForm.avatar" :src="editForm.avatar"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div v-else
                            class="w-full h-full flex items-center justify-center bg-base-300 text-base-content/30">
                            <span class="text-5xl font-bold">{{ editForm.username?.charAt(0) || 'U' }}</span>
                          </div>

                          <div v-if="isUploading"
                            class="absolute inset-0 bg-base-100/60 flex items-center justify-center z-20">
                            <span class="loading loading-spinner loading-lg text-primary"></span>
                          </div>

                          <div
                            class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white backdrop-blur-xs z-10">
                            <Icon name="heroicons:camera" class="w-8 h-8 mb-1" />
                            <span class="text-xs font-bold uppercase tracking-wider">{{ t('settings.change_avatar')
                            }}</span>
                          </div>
                        </div>
                        <p class="text-xs text-base-content/40 text-center px-4">{{ t('settings.upload_hint') }}</p>
                      </div>

                      <!-- 表单区域 -->
                      <div class="flex-1 space-y-6">
                        <form @submit.prevent="saveProfile" class="space-y-6">
                          <div class="form-control">
                            <label class="label">
                              <span class="label-text font-bold text-xs uppercase opacity-70">{{ t('settings.username')
                              }}</span>
                            </label>
                            <div class="relative group">
                              <div
                                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                                <Icon name="heroicons:user" class="w-5 h-5" />
                              </div>
                              <input v-model="editForm.username" type="text"
                                class="input input-bordered w-full pl-11 bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all rounded-xl"
                                :placeholder="t('settings.username_placeholder')" :disabled="isSaving" />
                            </div>
                          </div>

                          <div class="form-control">
                            <label class="label">
                              <span class="label-text font-bold text-xs uppercase opacity-70">{{ t('settings.bio')
                              }}</span>
                              <span class="label-text-alt opacity-50">{{ editForm.bio?.length || 0 }}/200</span>
                            </label>
                            <textarea v-model="editForm.bio"
                              class="textarea textarea-bordered w-full h-32 bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all resize-none rounded-xl text-base leading-relaxed p-4"
                              :placeholder="t('settings.bio_placeholder')" maxlength="200"
                              :disabled="isSaving"></textarea>
                          </div>

                          <div class="flex justify-end pt-4">
                            <button type="submit"
                              class="btn btn-primary btn-lg rounded-xl min-w-40 shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                              :disabled="isSaving || isUploading">
                              <span v-if="isSaving" class="loading loading-spinner"></span>
                              {{ t('settings.btn_save') }}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
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
</style>

<i18n lang="json">{
  "en": {
    "profile": {
      "fetch_failed": "Failed to fetch profile",
      "logout_success": "Logged out successfully",
      "logout": "Logout",
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
      "tabs": {
        "blogs": "My Articles",
        "comments": "Comments",
        "settings": "Settings"
      }
    },
    "settings": {
      "title": "Edit Profile",
      "subtitle": "Update your personal information",
      "btn_save": "Save Changes",
      "username": "Display Name",
      "username_placeholder": "Enter your username",
      "bio": "Bio",
      "bio_placeholder": "Brief description...",
      "change_avatar": "Change",
      "upload_hint": "Click or drag to upload",
      "upload_success": "Avatar uploaded",
      "save_success": "Profile saved",
      "save_failed": "Failed to save",
      "error_image_type": "Invalid image format",
      "error_image_size": "Image too large (Max 5MB)"
    }
  },
  "zh-CN": {
    "profile": {
      "fetch_failed": "获取用户信息失败",
      "logout_success": "已安全退出",
      "logout": "退出登录",
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
      "tabs": {
        "blogs": "我的文章",
        "comments": "评论记录",
        "settings": "个人设置"
      }
    },
    "settings": {
      "title": "编辑资料",
      "subtitle": "更新您的个人信息",
      "btn_save": "保存修改",
      "username": "显示昵称",
      "username_placeholder": "请输入昵称",
      "bio": "个人简介",
      "bio_placeholder": "一句话介绍你自己...",
      "change_avatar": "更换头像",
      "upload_hint": "点击或拖拽图片以上传",
      "upload_success": "头像上传成功",
      "save_success": "保存成功",
      "save_failed": "保存失败",
      "error_image_type": "图片格式无效",
      "error_image_size": "图片过大 (最大 5MB)"
    }
  },
  "zh-TW": {
    "profile": {
      "fetch_failed": "獲取用戶信息失敗",
      "logout_success": "已安全退出",
      "logout": "退出登錄",
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
      "tabs": {
        "blogs": "我的文章",
        "comments": "評論記錄",
        "settings": "個人設置"
      }
    },
    "settings": {
      "title": "編輯資料",
      "subtitle": "更新您的個人資訊",
      "btn_save": "儲存變更",
      "username": "顯示暱稱",
      "username_placeholder": "請輸入暱稱",
      "bio": "個人簡介",
      "bio_placeholder": "一句話介紹你自己...",
      "change_avatar": "更換頭像",
      "upload_hint": "點擊或拖曳圖片以上傳",
      "upload_success": "頭像上傳成功",
      "save_success": "儲存成功",
      "save_failed": "儲存失敗",
      "error_image_type": "圖片格式無效",
      "error_image_size": "圖片過大 (最大 5MB)"
    }
  }
}</i18n>