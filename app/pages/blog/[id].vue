<script setup lang="ts">
import { onMounted, ref, computed , h , defineComponent} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBlogDetails, like, share } from '~/api/blog'
import { EditorContent, useEditor } from "@tiptap/vue-3"
import StarterKit from "@tiptap/starter-kit"

const route = useRoute()
const router = useRouter()
const { data: post } = await useFetch(`/api/posts/${route.params.id}`)

// 博客详情数据
const blog = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)



// Tiptap 编辑器实例（只读模式）
const editor = useEditor({
  editable: false,
  extensions: [StarterKit],
  content: '',
})

// 获取博客详情
const fetchBlogDetail = async () => {
  loading.value = true
  error.value = null
  
  try {
    const result = await getBlogDetails(route.params.id as string)
    blog.value = result.data.blog
    
    // 设置编辑器内容
    if (blog.value.content) {
      
      if (typeof blog.value.content === 'object') {
        editor.value?.commands.setContent(blog.value.content)
      } else {
      
        editor.value?.commands.setContent(blog.value.content)
      }
    }
  } catch (err) {
    console.error('获取博客详情失败:', err)
    error.value = '获取博客详情失败，请稍后再试'
  } finally {
    loading.value = false
  }
}

// 格式化日期
const formattedDate = computed(() => {
  if (!blog.value?.createdAt) return ''
  
  const date = new Date(blog.value.createdAt)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// 阅读时间估算
const readingTime = computed(() => {
  if (!blog.value?.content) return 0
  
  let textContent = ''
  if (typeof blog.value.content === 'object') {
    textContent = JSON.stringify(blog.value.content)
  } else {
    textContent = blog.value.content
  }
  
  const wordsPerMinute = 200
  const wordCount = textContent.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
})

// 分享功能
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
      alert('链接已复制到剪贴板')
    }
  } catch (err) {
    console.error('分享失败:', err)
  }
}

// 点赞功能
interface LikeButtonProps {
  postId?: string
}

const LikeButton = defineComponent({
  name: 'LikeButton',
  props: {
    postId: {
      type: String,
      required: false
    }
  },
  setup(props: LikeButtonProps) {
    const isLiked = ref(false)
    const likesCount = ref(0)
    
    const toggleLike = () => {
      isLiked.value = !isLiked.value
      likesCount.value += isLiked.value ? 1 : -1
    }
    
    return () => h('button', {
      class: [
        'like-button', 
        'btn', 
        'btn-outline', 
        'btn-sm',
        { 
          'btn-primary': isLiked.value,
          'btn-ghost': !isLiked.value
        }
      ],
      onClick: toggleLike
    }, [
      h('span', { class: 'like-icon mr-2' }, isLiked.value ? '❤️' : '🤍'),
      h('span', { class: 'like-count' }, likesCount.value)
    ])
  }
})


// 组件挂载时获取数据
onMounted(() => {
  fetchBlogDetail()
})
</script>

<template>
  <div class="min-h-screen text-base-content font-sans relative overflow-x-hidden selection:bg-primary selection:text-primary-content">
    <!-- 背景装饰 -->
    <div class="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div
        class="absolute -top-32 -right-32 w-120 h-120 lg:w-160 lg:h-160 bg-primary/10 rounded-full blur-[100px] lg:blur-[128px] opacity-40 dark:opacity-30">
      </div>
      <div
        class="absolute -bottom-32 -left-32 w-120 h-120 lg:w-160 lg:h-160 bg-secondary/10 rounded-full blur-[100px] lg:blur-[128px] opacity-40 dark:opacity-30">
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      <!-- 返回按钮 -->
      <button 
        @click="router.back()" 
        class="btn btn-ghost btn-sm mt-6 text-base-content/70 hover:text-base-content"
      >
        <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2" />
        返回博客列表
      </button>

      <!-- 加载状态 -->
      <div v-if="loading" class="py-16">
        <div class="animate-pulse">
          <div class="h-8 bg-base-300 rounded w-3/4 mb-4"></div>
          <div class="h-4 bg-base-300 rounded w-1/2 mb-8"></div>
          <div class="h-64 bg-base-300 rounded-lg mb-8"></div>
          <div class="space-y-4">
            <div class="h-4 bg-base-300 rounded"></div>
            <div class="h-4 bg-base-300 rounded"></div>
            <div class="h-4 bg-base-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="py-16 text-center">
        <div class="max-w-md mx-auto">
          <div class="text-6xl mb-4"></div>
          <h2 class="text-2xl font-bold mb-4">加载失败</h2>
          <p class="text-base-content/70 mb-6">{{ error }}</p>
          <button @click="fetchBlogDetail" class="btn btn-primary">重试</button>
        </div>
      </div>

      <!-- 博客内容 -->
      <div v-else-if="blog" class="py-8">
        <!-- 博客头部 -->
        <header class="mb-8 text-center">
          <div class="flex flex-wrap gap-2 justify-center mb-4">
            <span 
              v-for="tag in blog.tags" 
              :key="tag"
              class="badge badge-outline badge-sm"
            >
              {{ tag }}
            </span>
          </div>
          
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4">
            {{ blog.title }}
          </h1>
          
          <p class="text-xl text-base-content/70 mb-6 leading-relaxed max-w-2xl mx-auto">
            {{ blog.summary }}
          </p>
          
          <div class="flex flex-wrap items-center justify-center gap-4 text-sm text-base-content/60">
            <div class="flex items-center gap-2">
              <div class="avatar">
                <div class="w-8 h-8 rounded-full">
                  <img 
                    :src="blog.author.avatar" 
                    :alt="blog.author.username" 
                    class="object-cover"
                  />
                </div>
              </div>
              <span>{{ blog.author.username }}</span>
            </div>
            
            <div class="flex items-center gap-1">
              <Icon name="heroicons:calendar" class="w-4 h-4" />
              <span>{{ formattedDate }}</span>
            </div>
            
            <div class="flex items-center gap-1">
              <Icon name="heroicons:clock" class="w-4 h-4" />
              <span>阅读时间 {{ readingTime }} 分钟</span>
            </div>
            
            <div class="flex items-center gap-1">
              <Icon name="heroicons:eye" class="w-4 h-4" />
              <span>{{ blog.viewCount || 0 }} 阅读</span>
            </div>
          </div>
        </header>

        <!-- 封面图片 -->
        <div class="mb-8 rounded-2xl lg:rounded-3xl overflow-hidden border border-base-content/5">
          <img 
            :src="blog.coverImage" 
            :alt="blog.title" 
            class="w-full h-auto object-cover max-h-96"
          />
        </div>

        <!-- 博客内容区域 -->
        <article class="mb-12">
          <div class="bg-base-100 rounded-2xl lg:rounded-3xl p-6 sm:p-8 border border-base-content/5">
            <editor-content :editor="editor" class="prose max-w-none" />
          </div>
        </article>

        <!-- 互动区域 -->
         <div class="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-b border-base-content/10 mb-8">
          <div class="flex items-center gap-4">
              <LikeButton 
               :post-id="blog?.id" 
              />
          </div>
          
          <button 
            @click="shareBlog" 
            class="btn btn-ghost btn-sm gap-2"
          >
            <Icon name="heroicons:share" class="w-5 h-5" />
            <span>分享</span>
          </button>
        </div>

        <!-- 分类标签 -->
        <div class="flex justify-between items-center mb-12">
          <div class="flex items-center gap-2">
            <span class="text-base-content/60 text-sm">分类：</span>
            <span class="badge badge-primary badge-lg">{{ blog.category }}</span>
          </div>
          
          <div class="text-sm text-base-content/60">
            最后更新：{{ new Date(blog.updatedAt).toLocaleDateString() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Tiptap 编辑器样式 */
.ProseMirror {
  outline: none;
  color: inherit;
}

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3,
.ProseMirror h4,
.ProseMirror h5,
.ProseMirror h6 {
  color: inherit;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: bold;
}

.ProseMirror h1 {
  font-size: 2.25em;
  line-height: 1.1;
}

.ProseMirror h2 {
  font-size: 1.875em;
  line-height: 1.2;
}

.ProseMirror h3 {
  font-size: 1.5em;
  line-height: 1.3;
}

.ProseMirror p {
  margin-bottom: 1em;
  line-height: 1.7;
}

.ProseMirror ul,
.ProseMirror ol {
  margin-bottom: 1em;
  padding-left: 1.5em;
}

.ProseMirror ul {
  list-style-type: disc;
}

.ProseMirror ol {
  list-style-type: decimal;
}

.ProseMirror blockquote {
  border-left: 4px solid hsl(var(--bc) / 0.2);
  padding-left: 1em;
  font-style: italic;
  margin: 1.5em 0;
}

.ProseMirror code {
  background-color: hsl(var(--bc) / 0.1);
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  font-size: 0.9em;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.ProseMirror pre {
  background-color: hsl(var(--n));
  color: hsl(var(--nc));
  padding: 1em;
  border-radius: 0.5em;
  overflow-x: auto;
  margin: 1.5em 0;
}

.ProseMirror pre code {
  background: none;
  padding: 0;
  border-radius: 0;
  color: inherit;
}

.ProseMirror img {
  border-radius: 0.5em;
  margin: 1.5em 0;
  max-width: 100%;
  height: auto;
}

.ProseMirror a {
  color: hsl(var(--p));
  text-decoration: underline;
}

.ProseMirror strong {
  font-weight: bold;
}

.ProseMirror em {
  font-style: italic;
}

.ProseMirror table {
  border-collapse: collapse;
  margin: 1.5em 0;
  width: 100%;
}

.ProseMirror table td,
.ProseMirror table th {
  border: 1px solid hsl(var(--bc) / 0.2);
  padding: 0.5em 0.75em;
}

.ProseMirror table th {
  background-color: hsl(var(--bc) / 0.05);
  font-weight: bold;
}
</style>