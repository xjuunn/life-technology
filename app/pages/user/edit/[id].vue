<template>
  <div
    class="min-h-screen bg-base-100 relative overflow-hidden text-base-content selection:bg-primary selection:text-primary-content pb-20">
    
    <!-- 背景光晕 -->
    <div
      class="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none select-none animate-pulse-slow">
    </div>
    <div
      class="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none select-none select-none animate-pulse-slow"
      style="animation-delay: 2s;"></div>

    <div class="relative z-10 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      
      <!-- 返回按钮 -->
      <div class="mb-6">
        <button @click="goBack" class="btn btn-ghost btn-sm gap-2">
          <Icon name="mingcute:arrow-left-line" class="text-lg" />
          {{ t('blog.edit.back') }}
        </button>
      </div>

      <!-- 标题 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold font-title tracking-tight mb-2">{{ t('blog.edit.title') }}</h1>
        <p class="text-base-content/60">{{ t('blog.edit.subtitle') }}</p>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <span class="loading loading-ring loading-lg text-primary"></span>
      </div>

      <!-- 博客表单 -->
      <div v-else class="card bg-base-100/60 backdrop-blur-xl border border-base-content/5 shadow-lg">
        <div class="card-body p-6 md:p-10">
          <form @submit.prevent="saveBlog" class="space-y-6">
            
            <!-- 博客标题 -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold">{{ t('blog.edit.form.title') }}</span>
              </label>
              <input 
                v-model="form.title"
                type="text"
                class="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary rounded-xl"
                :placeholder="t('blog.edit.form.title_placeholder')"
                required
              />
            </div>

            <!-- 博客摘要 -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold">{{ t('blog.edit.form.summary') }}</span>
                <span class="label-text-alt opacity-50">{{ form.summary?.length || 0 }}/200</span>
              </label>
              <textarea 
                v-model="form.summary"
                class="textarea textarea-bordered w-full h-24 bg-base-200/50 focus:bg-base-100 focus:border-primary resize-none rounded-xl"
                :placeholder="t('blog.edit.form.summary_placeholder')"
                maxlength="200"
              ></textarea>
            </div>

            <!-- 博客内容 -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold">{{ t('blog.edit.form.content') }}</span>
              </label>
              <textarea 
                v-model="form.content"
                class="textarea textarea-bordered w-full h-96 bg-base-200/50 focus:bg-base-100 focus:border-primary resize-none rounded-xl font-mono text-sm"
                :placeholder="t('blog.edit.form.content_placeholder')"
                required
              ></textarea>
              <div class="label-text-alt text-xs text-base-content/40 mt-2">
                {{ t('blog.edit.form.markdown_hint') }}
              </div>
            </div>

            <!-- 封面图片 -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold">{{ t('blog.edit.form.cover_image') }}</span>
              </label>
              <input 
                v-model="form.coverImage"
                type="url"
                class="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary rounded-xl"
                :placeholder="t('blog.edit.form.cover_image_placeholder')"
              />
              <div class="mt-2">
                <img 
                  v-if="form.coverImage" 
                  :src="form.coverImage" 
                  alt="Cover preview"
                  class="max-w-xs rounded-lg shadow"
                />
              </div>
            </div>

            <!-- 标签 -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold">{{ t('blog.edit.form.tags') }}</span>
              </label>
              <div class="flex flex-wrap gap-2 mb-2">
                <span 
                  v-for="tag in form.tags" 
                  :key="tag"
                  class="badge badge-primary badge-outline badge-lg"
                >
                  {{ tag }}
                  <button 
                    type="button" 
                    @click="removeTag(tag)"
                    class="ml-1 hover:text-error"
                  >
                    ×
                  </button>
                </span>
              </div>
              <div class="flex gap-2">
                <input 
                  v-model="newTag"
                  type="text"
                  class="input input-bordered flex-1 bg-base-200/50 focus:bg-base-100 focus:border-primary rounded-xl"
                  :placeholder="t('blog.edit.form.tags_placeholder')"
                  @keydown.enter.prevent="addTag"
                />
                <button 
                  type="button" 
                  @click="addTag"
                  class="btn btn-outline btn-sm"
                >
                  {{ t('blog.edit.form.add_tag') }}
                </button>
              </div>
            </div>

            <!-- 分类 -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold">{{ t('blog.edit.form.category') }}</span>
              </label>
              <input 
                v-model="form.category"
                type="text"
                class="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary rounded-xl"
                :placeholder="t('blog.edit.form.category_placeholder')"
              />
            </div>

            <!-- 状态 -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold">{{ t('blog.edit.form.status') }}</span>
              </label>
              <select 
                v-model="form.status"
                class="select select-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary rounded-xl"
              >
                <option value="draft">{{ t('blog.edit.status.draft') }}</option>
                <option value="published">{{ t('blog.edit.status.published') }}</option>
              </select>
            </div>

            <!-- 按钮组 -->
            <div class="flex gap-4 pt-6">
              <button 
                type="button" 
                @click="goBack"
                class="btn btn-ghost flex-1"
                :disabled="saving"
              >
                {{ t('blog.edit.btn_cancel') }}
              </button>
              <button 
                type="submit"
                class="btn btn-primary flex-1"
                :disabled="saving"
              >
                <span v-if="saving" class="loading loading-spinner"></span>
                {{ t('blog.edit.btn_save') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useToast } from '~/composables/useToast'
import { useRouter } from '#app'
import { update, getBlogDetails, type BlogUpdateRequest } from '~/api/blog'

const { t } = useI18n()
const toast = useToast()
const router = useRouter()
const route = useRoute()

const loading = ref(true)
const saving = ref(false)
const newTag = ref('')

const form = reactive({
  title: '',
  summary: '',
  content: '',
  coverImage: '',
  tags: [] as string[],
  category: '',
  status: 'draft' as 'draft' | 'published'
})

// 获取博客ID
const blogId = computed(() => route.params.id as string)

// JSON修复函数
const fixJSONFormat = (content: string): string => {
  if (!content || typeof content !== 'string') {
    return '{"type":"doc","content":[]}'
  }
  
  let contentStr = content.trim()
  
  // 尝试直接解析
  try {
    JSON.parse(contentStr)
    return contentStr
  } catch (error) {
    console.warn('JSON格式错误，尝试修复:')
  }
  
  // 修复常见的格式错误
  const patterns = [
    // 修复 }]}} 结尾
    { regex: /(\]\s*\})\s*\}$/, replacement: '}]}' },
    { regex: /(\]\s*\}\s*)\}\s*\}$/, replacement: '}]}]}' },
    // 修复缺少的括号
    { regex: /"content"\s*:\s*\[\s*\{([^}]+)\}\s*$/, replacement: '"content": [{$1}]}' },
    // 修复 type: "che" -> type: "doc"
    { regex: /"type":\s*"che"/, replacement: '"type": "doc"' }
  ]
  
  for (const pattern of patterns) {
    if (pattern.regex.test(contentStr)) {
      contentStr = contentStr.replace(pattern.regex, pattern.replacement)
    }
  }
  
  // 确保有正确的基本结构
  if (!contentStr.includes('"type":"doc"')) {
    if (contentStr.includes('"type"')) {
      // 保留原有类型
    } else {
      // 添加类型
      contentStr = contentStr.replace(/^\{/, '{"type":"doc",')
    }
  }
  
  // 最终验证
  try {
    JSON.parse(contentStr)
    return contentStr
  } catch (finalError) {
    console.error('修复失败，使用默认结构')
    return '{"type":"doc","content":[]}'
  }
}

// 初始化加载博客数据
onMounted(async () => {
  try {
    const { data } = await getBlogDetails(blogId.value)
    const blog = data.blog
    
    // 填充表单，使用修复后的内容
    form.title = blog.title
    form.summary = blog.summary || ''
    form.content = fixJSONFormat(blog.content) // 修复JSON格式
    form.coverImage = blog.coverImage || ''
    form.tags = blog.tags || []
    form.category = blog.category || ''
    form.status = blog.status as 'draft' | 'published'
    
  } catch (error) {
    // 安全处理错误类型
    let errorMessage = t('blog.edit.fetch_failed')
    
    if (error instanceof Error) {
      errorMessage = error.message || errorMessage
    } else if (typeof error === 'string') {
      errorMessage = error
    } else if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = String((error as any).message)
    }
    
    toast.error(errorMessage)
  } finally {
    loading.value = false
  }
})

// 添加标签
const addTag = () => {
  const tag = newTag.value.trim()
  if (tag && !form.tags.includes(tag)) {
    form.tags.push(tag)
    newTag.value = ''
  }
}

// 移除标签
const removeTag = (tag: string) => {
  form.tags = form.tags.filter(t => t !== tag)
}

// 保存博客
const saveBlog = async () => {
  saving.value = true
  try {
    const updateData: BlogUpdateRequest = {
      title: form.title,
      content: form.content,
      summary: form.summary,
      coverImage: form.coverImage,
      tags: form.tags,
      category: form.category,
      status: form.status
    }
    
    await update(blogId.value, updateData)
    
    toast.success(t('blog.edit.save_success'))
    
    // 保存成功后返回博客详情页
    setTimeout(() => {
      router.push(`/blog/${blogId.value}`)
    }, 1000)
  } catch (error: any) {
    toast.error(error.message || t('blog.edit.save_failed'))
  } finally {
    saving.value = false
  }
}

// 返回
const goBack = () => {
  router.back()
}


</script>

<i18n lang="json">
{
  "en": {
    "blog": {
      "edit": {
        "title": "Edit Blog",
        "subtitle": "Update your blog post",
        "back": "Back",
        "fetch_failed": "Failed to load blog",
        "save_success": "Blog updated successfully",
        "save_failed": "Failed to update blog",
        "form": {
          "title": "Title",
          "title_placeholder": "Enter blog title",
          "summary": "Summary",
          "summary_placeholder": "Brief summary of your blog...",
          "content": "Content",
          "content_placeholder": "Write your blog content here...",
          "markdown_hint": "Supports Markdown formatting",
          "cover_image": "Cover Image",
          "cover_image_placeholder": "https://example.com/cover.jpg",
          "tags": "Tags",
          "tags_placeholder": "Enter tag and press Enter",
          "add_tag": "Add",
          "category": "Category",
          "category_placeholder": "Technology, Life, etc.",
          "status": "Status"
        },
        "status": {
          "draft": "Draft",
          "published": "Published"
        },
        "btn_cancel": "Cancel",
        "btn_save": "Save Changes"
      }
    }
  },
  "zh-CN": {
    "blog": {
      "edit": {
        "title": "编辑博客",
        "subtitle": "更新您的博客文章",
        "back": "返回",
        "fetch_failed": "加载博客失败",
        "save_success": "博客更新成功",
        "save_failed": "更新博客失败",
        "form": {
          "title": "标题",
          "title_placeholder": "输入博客标题",
          "summary": "摘要",
          "summary_placeholder": "博客简要摘要...",
          "content": "内容",
          "content_placeholder": "在此处编写博客内容...",
          "markdown_hint": "支持Markdown格式",
          "cover_image": "封面图片",
          "cover_image_placeholder": "https://example.com/cover.jpg",
          "tags": "标签",
          "tags_placeholder": "输入标签后按回车",
          "add_tag": "添加",
          "category": "分类",
          "category_placeholder": "技术、生活等",
          "status": "状态"
        },
        "status": {
          "draft": "草稿",
          "published": "已发布"
        },
        "btn_cancel": "取消",
        "btn_save": "保存修改"
      }
    }
  },
  "zh-TW": {
    "blog": {
      "edit": {
        "title": "編輯博客",
        "subtitle": "更新您的博客文章",
        "back": "返回",
        "fetch_failed": "加載博客失敗",
        "save_success": "博客更新成功",
        "save_failed": "更新博客失敗",
        "form": {
          "title": "標題",
          "title_placeholder": "輸入博客標題",
          "summary": "摘要",
          "summary_placeholder": "博客簡要摘要...",
          "content": "內容",
          "content_placeholder": "在此處編寫博客內容...",
          "markdown_hint": "支援Markdown格式",
          "cover_image": "封面圖片",
          "cover_image_placeholder": "https://example.com/cover.jpg",
          "tags": "標籤",
          "tags_placeholder": "輸入標籤後按Enter",
          "add_tag": "添加",
          "category": "分類",
          "category_placeholder": "技術、生活等",
          "status": "狀態"
        },
        "status": {
          "draft": "草稿",
          "published": "已發佈"
        },
        "btn_cancel": "取消",
        "btn_save": "儲存變更"
      }
    }
  }
}
</i18n>