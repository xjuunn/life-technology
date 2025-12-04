<template>
  <div
    class="min-h-screen bg-base-100 relative overflow-hidden text-base-content selection:bg-primary selection:text-primary-content pb-20">
    <title>life-修改博客</title>
    <div
      class="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none select-none animate-pulse-slow">
    </div>
    <div
      class="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none select-none select-none animate-pulse-slow"
      style="animation-delay: 2s;"></div>

    <div class="relative z-10 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">      
      <div class="mb-6">
        <button @click="goBack" class="btn btn-ghost btn-sm gap-2">
          <Icon name="mingcute:arrow-left-line" class="text-lg" />
          {{ t('blog.edit.back') }}
        </button>
      </div>
      <div class="mb-8">
        <h1 class="text-3xl font-bold font-title tracking-tight mb-2">{{ t('blog.edit.title') }}</h1>
        <p class="text-base-content/60">{{ t('blog.edit.subtitle') }}</p>
      </div>
      <div v-if="loading" class="flex justify-center items-center h-64">
        <span class="loading loading-ring loading-lg text-primary"></span>
      </div>
      <div v-else class="card bg-base-100/60 backdrop-blur-xl border border-base-content/5 shadow-lg">
        <div class="card-body p-6 md:p-10">
          <form @submit.prevent="saveBlog" class="space-y-6">
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
            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold">{{ t('blog.edit.form.content') }}</span>
              </label>
              <div class="editor-container border border-base-content/10 rounded-lg overflow-hidden bg-base-200/30">
                <div class="border-b border-base-content/10 bg-base-200/50 p-3 flex gap-2">
                  <button 
                    @click="editor?.chain().focus().toggleBold().run()" 
                    type="button"
                    class="btn btn-xs btn-ghost"
                    :class="{ 'btn-active': editor?.isActive('bold') }"
                  >
                    <Icon name="mingcute:bold-line" />
                  </button>
                  <button 
                    @click="editor?.chain().focus().toggleItalic().run()" 
                    type="button"
                    class="btn btn-xs btn-ghost"
                    :class="{ 'btn-active': editor?.isActive('italic') }"
                  >
                    <Icon name="mingcute:italic-line" />
                  </button>
                  <button 
                    @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()" 
                    type="button"
                    class="btn btn-xs btn-ghost"
                    :class="{ 'btn-active': editor?.isActive('heading', { level: 1 }) }"
                  >
                    H1
                  </button>
                  <button 
                    @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()" 
                    type="button"
                    class="btn btn-xs btn-ghost"
                    :class="{ 'btn-active': editor?.isActive('heading', { level: 2 }) }"
                  >
                    H2
                  </button>
                  <div class="flex-1"></div>
                  <span class="text-xs text-base-content/40">
                    {{ t('blog.edit.form.markdown_hint') }}
                  </span>
                </div>

                <div class="p-4 min-h-[400px]">
                  <editor-content :editor="editor" />
                </div>
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
import { EditorContent, useEditor } from "@tiptap/vue-3"
import StarterKit from "@tiptap/starter-kit"
import { useUserStore } from '~/stores/user'

const { t } = useI18n()
const toast = useToast()
const router = useRouter()
const route = useRoute()

const loading = ref(true)
const saving = ref(false)
const newTag = ref('')
const hasUnsavedChanges = ref(false)
const blog = ref<any>(null)
const hasEditPermission = ref(false)

const form = reactive({
  title: '',
  summary: '',
  content: '',
  coverImage: '',
  tags: [] as string[],
  category: '',
  status: 'draft' as 'draft' | 'published'
})

const editor = useEditor({
  editable: true,
  extensions: [
    StarterKit
  ],
  content: '<p>开始编辑...</p>',
  editorProps: {
    attributes: {
      class: 'prose prose-base md:prose-lg max-w-none focus:outline-none dark:prose-invert prose-headings:font-bold prose-p:leading-relaxed prose-img:rounded-xl prose-img:shadow-sm prose-a:text-primary prose-a:no-underline hover:prose-a:underline min-h-[400px] bg-base-200/30 rounded-lg p-4 border border-base-content/10',
      placeholder: t('blog.edit.form.content_placeholder')
    }
  },
  onUpdate: ({ editor }) => {
    form.content = JSON.stringify(editor.getJSON())
    hasUnsavedChanges.value = true
  }
})

// 获取博客ID
const blogId = computed(() => route.params.id as string)

// 解析 JSON 内容
const safeParseContent = (content: any) => {
  try {
    if (!content) return { type: 'doc', content: [] }
    
    if (typeof content === 'string') {
      const parsed = JSON.parse(content)
      if (parsed && typeof parsed === 'object') {
        return parsed
      }
    } else if (typeof content === 'object') {
      return content
    }
  } catch (error) {
    console.warn('解析内容失败，使用默认结构:', error)
  }
  return {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: content && typeof content === 'string' 
          ? [{ type: 'text', text: content }]
          : [{ type: 'text', text: '' }]
      }
    ]
  }
}

// 初始化加载博客数据
onMounted(async () => {
  try {
    const { data } = await getBlogDetails(blogId.value)
    const blog = data.blog
    form.title = blog.title
    form.summary = blog.summary || ''
    form.coverImage = blog.coverImage || ''
    form.tags = blog.tags || []
    form.category = blog.category || ''
    form.status = blog.status as 'draft' | 'published'
    let contentData = blog.content
    if (typeof contentData === 'string' && (!contentData.trim() || contentData === 'null')) {
      contentData = '{"type":"doc","content":[]}'
    }
    const parsedContent = safeParseContent(contentData)
    if (editor.value) {
      editor.value.commands.setContent(parsedContent)
      form.content = JSON.stringify(parsedContent)
    } else {
      form.content = JSON.stringify(parsedContent)
    }
    
  } catch (error) {
    console.error('加载博客失败:', error)
    toast.error(t('blog.edit.fetch_failed'))
  } finally {
    loading.value = false
  }
})
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
    if (editor.value) {
      form.content = JSON.stringify(editor.value.getJSON())
    }
    if (!form.content.trim()) {
      toast.error(t('blog.edit.form.content_empty'))
      saving.value = false
      return
    }
    // 验证 JSON 格式
    try {
      JSON.parse(form.content)
    } catch (jsonError) {
      toast.error(t('blog.edit.form.invalid_json'))
      saving.value = false
      return
    }
    
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
    setTimeout(() => {
      router.push(`/blog/${blogId.value}`)
    }, 1000)
  } catch (error: any) {
    console.error('保存失败:', error)
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