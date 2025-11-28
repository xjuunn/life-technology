<template>
  <div class="min-h-screen bg-base-100 text-base-content font-sans transition-colors duration-300 relative">
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] opacity-40 animate-pulse">
      </div>
      <div
        class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] opacity-40 animate-pulse"
        style="animation-delay: 2s"></div>
      <div
        class="absolute top-[40%] left-[40%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] opacity-20 transform -translate-x-1/2">
      </div>
    </div>

    <div class="relative z-10 container mx-auto px-4 py-6 lg:py-10 max-w-7xl">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        <div class="lg:col-span-8 flex flex-col">
          <common-editor v-model="form.content" :placeholder="t('blog.create.content_placeholder')"
            class="h-full min-h-[calc(100vh-5rem)] shadow-lg bg-base-100/80! custom-editor-height" />
        </div>

        <div class="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-6">
          <div class="card bg-base-100/80 backdrop-blur-xl border border-base-content/10 shadow-xl overflow-hidden">
            <div class="p-5 flex flex-col gap-5">

              <div class="form-control w-full">
                <label class="label pt-0">
                  <span class="label-text font-bold flex items-center gap-2">
                    <Icon name="mingcute:text-2-line" />
                    {{ t('blog.create.title') }}
                  </span>
                </label>
                <input v-model="form.title" type="text" :placeholder="t('blog.create.title_placeholder')"
                  class="input input-bordered w-full focus:input-primary text-lg font-bold" />
              </div>

              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text font-bold flex items-center gap-2">
                    <Icon name="mingcute:pic-line" />
                    {{ t('blog.create.cover') }}
                  </span>
                </label>

                <div
                  class="relative w-full aspect-video rounded-xl overflow-hidden bg-base-200 border-2 border-dashed border-base-content/10 hover:border-primary/50 transition-all cursor-pointer group"
                  @click="triggerFileInput">
                  <div v-if="uploading"
                    class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-base-100/90 backdrop-blur-sm">
                    <span class="loading loading-spinner loading-md text-primary"></span>
                    <span class="text-xs mt-2 font-medium opacity-60">{{ t('blog.create.uploading') }}</span>
                  </div>

                  <img v-if="form.coverImage" :src="form.coverImage"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt="Cover" />

                  <div v-else
                    class="absolute inset-0 flex flex-col items-center justify-center text-base-content/40 group-hover:text-primary transition-colors">
                    <Icon name="mingcute:upload-2-line" size="32" class="mb-2" />
                    <span class="text-xs font-bold uppercase tracking-wider">{{ t('blog.create.click_upload') }}</span>
                  </div>

                  <div v-if="form.coverImage && !uploading"
                    class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button @click.stop="form.coverImage = ''"
                      class="btn btn-circle btn-sm btn-error text-white shadow-md">
                      <Icon name="mingcute:delete-2-line" />
                    </button>
                  </div>

                  <input ref="fileInputRef" type="file" accept="image/*" class="hidden" @change="handleCoverUpload" />
                </div>
              </div>

              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text font-bold flex items-center gap-2">
                    <Icon name="mingcute:folder-open-line" />
                    {{ t('blog.create.category') }}
                  </span>
                </label>
                <select v-model="form.category" class="select select-bordered w-full focus:select-primary">
                  <option value="" disabled selected>{{ t('blog.create.category_select') }}</option>
                  <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>

              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text font-bold flex items-center gap-2">
                    <Icon name="mingcute:tag-line" />
                    {{ t('blog.create.tags') }}
                  </span>
                  <span class="label-text-alt opacity-50">{{ form.tags.length }}/5</span>
                </label>

                <div class="flex flex-wrap gap-2 mb-2" v-if="form.tags.length">
                  <span v-for="(tag, index) in form.tags" :key="index" class="badge badge-primary gap-1 pl-2 pr-1 h-7">
                    {{ tag }}
                    <button @click="removeTag(index)"
                      class="btn btn-ghost btn-xs btn-circle h-4 w-4 min-h-0 text-primary-content hover:bg-white/20">
                      <Icon name="mingcute:close-line" size="10" />
                    </button>
                  </span>
                </div>

                <div class="join w-full">
                  <input v-model="tagInput" @keydown.enter.prevent="addTag" type="text"
                    :placeholder="t('blog.create.tags_placeholder')"
                    class="input input-bordered join-item w-full focus:input-primary text-sm"
                    :disabled="form.tags.length >= 5" />
                  <button @click="addTag" :disabled="form.tags.length >= 5"
                    class="btn join-item btn-square border-base-content/20 bg-base-200">
                    <Icon name="mingcute:add-line" />
                  </button>
                </div>
              </div>

              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text font-bold flex items-center gap-2">
                    <Icon name="mingcute:file-info-line" />
                    {{ t('blog.create.summary') }}
                  </span>
                </label>
                <textarea v-model="form.summary"
                  class="textarea textarea-bordered h-24 focus:textarea-primary text-sm leading-relaxed resize-none"
                  :placeholder="t('blog.create.summary_placeholder')"></textarea>
              </div>

              <div class="form-control bg-base-200/50 p-3 rounded-lg border border-base-content/5">
                <label class="label cursor-pointer">
                  <div class="flex flex-col gap-0.5">
                    <span class="label-text font-bold flex items-center gap-2">
                      {{ isPublished ? t('blog.create.status_pub') : t('blog.create.status_draft') }}
                    </span>
                    <span class="label-text-alt opacity-60">
                      {{ isPublished ? t('blog.create.status_pub_desc') : t('blog.create.status_draft_desc') }}
                    </span>
                  </div>
                  <input type="checkbox" v-model="isPublished" class="toggle toggle-primary" />
                </label>
              </div>

              <div class="divider my-0"></div>

              <div class="grid grid-cols-2 gap-3">
                <button @click="router.back()"
                  class="btn btn-ghost border border-base-content/10 hover:bg-base-content/5 w-full">
                  {{ t('common.cancel') }}
                </button>
                <button @click="handleSubmit" :disabled="loading || uploading"
                  class="btn btn-primary bg-linear-to-r from-primary to-secondary border-none w-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                  <Icon v-if="loading" name="mingcute:loading-fill" class="animate-spin" />
                  <span v-else>{{ t('blog.create.submit') }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { JSONContent } from '@tiptap/vue-3';
import type { BlogCreateRequest, Status } from '~/api/blog';

const { t } = useAppI18n();
const router = useRouter();

const loading = ref(false);
const uploading = ref(false);
const categories = ref<string[]>([]);
const tagInput = ref('');
const fileInputRef = ref<HTMLInputElement | null>(null);

const form = reactive({
  title: '',
  content: {
    "type": "doc",
    "content": [
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "#"
          }
        ]
      }
    ]
  } as JSONContent,
  summary: '',
  coverImage: '',
  category: '',
  tags: [] as string[],
  status: 'published' as string
});

const isPublished = computed({
  get: () => form.status === 'published',
  set: (val: boolean) => form.status = val ? 'published' : 'draft'
});

onMounted(async () => {
  await loadCategories();
});

const loadCategories = async () => {
  try {
    const { data } = await ApiList.blog.categories();
    if (data && data.categories) {
      categories.value = data.categories;
    }
  } catch (error: any) {
    useToast().error(error.message || t('blog.create.error_general'));
    console.error('Failed to load categories', error);
  }
};

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleCoverUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    useToast().error(t('blog.create.error_file_size'));
    if (fileInputRef.value) fileInputRef.value.value = '';
    return;
  }

  uploading.value = true;
  try {
    const res = await ApiList.upload.cover(file);
    if (res.success && res.data) {
      form.coverImage = res.data.fullUrl;
    } else {
      throw new Error(res.message || 'Upload failed');
    }
  } catch (error: any) {
    console.error("Upload error:", error);
    useToast().error(error.message || t('blog.create.error_upload'));
  } finally {
    uploading.value = false;
    if (fileInputRef.value) fileInputRef.value.value = '';
  }
};

const addTag = () => {
  const val = tagInput.value.trim();
  if (val && !form.tags.includes(val) && form.tags.length < 5) {
    form.tags.push(val);
    tagInput.value = '';
  }
};

const removeTag = (index: number) => {
  form.tags.splice(index, 1);
};

const handleSubmit = async () => {
  if (!form.title.trim()) {
    useToast().error(t('blog.create.error_title'));
    return;
  }
  if (!form.content.content || form.content.content.length === 0) {
    useToast().error(t('blog.create.error_content'));
    return;
  }
  if (!form.category) {
    useToast().error(t('blog.create.error_category'));
    return;
  }
  if (form.title.length < 5) {
    useToast().error('标题长度不能少于5个字符');
    return;
  }
  if (form.content.length < 10) {
    useToast().error('内容长度不能少于10个字符');
    return;
  }
  if (form.title.length > 50) {
    useToast().error('标题太长了');
    return;
  }
  if (form.summary.length > 200) {
    useToast().error('摘要太长了');
    return;
  }

  loading.value = true;
  try {
    const payload: BlogCreateRequest = {
      ...form,
      content: JSON.stringify(form.content),
      status: form.status as Status
    };
    const { success } = await ApiList.blog.create(payload);
    if (success) {
      navigateTo('/blog', { replace: true });
    }
  } catch (error: any) {
    console.error(error);
    useToast().error(error.message || t('blog.create.error_general'));
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
:deep(.ProseMirror) {
  min-height: 500px !important;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<i18n lang="json">{
  "zh-CN": {
    "common": {
      "cancel": "取消"
    },
    "blog": {
      "create": {
        "title": "文章标题",
        "title_placeholder": "请输入精彩标题...",
        "content_placeholder": "在此处开始撰写您的文章...",
        "cover": "文章封面",
        "click_upload": "点击上传封面",
        "uploading": "上传中...",
        "category": "分类专栏",
        "category_select": "请选择分类",
        "tags": "内容标签",
        "tags_placeholder": "输入标签回车 (Max 5)",
        "summary": "内容摘要",
        "summary_placeholder": "简要概述文章内容...",
        "status_pub": "立即发布",
        "status_draft": "存为草稿",
        "status_pub_desc": "内容对所有人可见",
        "status_draft_desc": "仅您自己可见",
        "submit": "发布文章",
        "error_title": "文章标题不能为空",
        "error_content": "文章内容不能为空",
        "error_category": "请选择文章分类",
        "error_file_size": "图片大小不能超过 5MB",
        "error_upload": "图片上传失败，请重试",
        "error_general": "发布失败，请稍后重试"
      }
    }
  },
  "zh-TW": {
    "common": {
      "cancel": "取消"
    },
    "blog": {
      "create": {
        "title": "文章標題",
        "title_placeholder": "請輸入精彩標題...",
        "content_placeholder": "在此處開始撰寫您的文章...",
        "cover": "文章封面",
        "click_upload": "點擊上傳封面",
        "uploading": "上傳中...",
        "category": "分類專欄",
        "category_select": "請選擇分類",
        "tags": "內容標籤",
        "tags_placeholder": "輸入標籤回車 (Max 5)",
        "summary": "內容摘要",
        "summary_placeholder": "簡要概述文章內容...",
        "status_pub": "立即發布",
        "status_draft": "存為草稿",
        "status_pub_desc": "內容對所有人可見",
        "status_draft_desc": "僅您自己可見",
        "submit": "發布文章",
        "error_title": "文章標題不能為空",
        "error_content": "文章內容不能為空",
        "error_category": "請選擇文章分類",
        "error_file_size": "圖片大小不能超過 5MB",
        "error_upload": "圖片上傳失敗，請重試",
        "error_general": "發布失敗，請稍後重試"
      }
    }
  },
  "en": {
    "common": {
      "cancel": "Cancel"
    },
    "blog": {
      "create": {
        "title": "Title",
        "title_placeholder": "Enter an amazing title...",
        "content_placeholder": "Start writing here...",
        "cover": "Cover Image",
        "click_upload": "Upload Cover",
        "uploading": "Uploading...",
        "category": "Category",
        "category_select": "Select Category",
        "tags": "Tags",
        "tags_placeholder": "Enter tag & hit Enter",
        "summary": "Summary",
        "summary_placeholder": "Brief overview...",
        "status_pub": "Publish Now",
        "status_draft": "Save Draft",
        "status_pub_desc": "Visible to everyone",
        "status_draft_desc": "Only visible to you",
        "submit": "Publish",
        "error_title": "Title is required",
        "error_content": "Content cannot be empty",
        "error_category": "Category is required",
        "error_file_size": "File size limit: 5MB",
        "error_upload": "Upload failed, please try again",
        "error_general": "Publish failed, please try again"
      }
    }
  }
}</i18n>