<script setup lang="ts">
definePageMeta({
  layout: "default",
})

onMounted(() => {
  if (useUserStore().user?.id === undefined) {
    useToast().error('请先登录');
    navigateTo('/auth/login');
  }
})

const { t } = useI18n()
const toast = useToast()
const router = useRouter()

const loading = ref(false)
const frontFile = ref<File | null>(null)
const backFile = ref<File | null>(null)
const frontPreview = ref<string>('')
const backPreview = ref<string>('')

// 隐藏的 input ref
const frontInputRef = ref<HTMLInputElement | null>(null)
const backInputRef = ref<HTMLInputElement | null>(null)

const triggerSelect = (type: 'front' | 'back') => {
  if (type === 'front') {
    frontInputRef.value?.click()
  } else {
    backInputRef.value?.click()
  }
}

const handleFileChange = (type: 'front' | 'back', event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]

    if (!file.type.startsWith('image/')) {
      toast.warning(t('verify.image_only'))
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast.warning(t('verify.image_too_large'))
      return
    }

    const previewUrl = URL.createObjectURL(file)

    if (type === 'front') {
      frontFile.value = file
      frontPreview.value = previewUrl
    } else {
      backFile.value = file
      backPreview.value = previewUrl
    }
  }
}

const handleSubmit = async () => {
  if (!frontFile.value || !backFile.value) {
    toast.warning(t('verify.upload_both_sides'))
    return
  }

  loading.value = true
  try {
    await ApiList.auth.ocrIdcard(frontFile.value, backFile.value)
    toast.success(t('verify.success'))
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (error) {
    console.error(error)
    toast.error(t('verify.failed'))
  } finally {
    loading.value = false
  }
}

onUnmounted(() => {
  if (frontPreview.value) URL.revokeObjectURL(frontPreview.value)
  if (backPreview.value) URL.revokeObjectURL(backPreview.value)
})
</script>

<template>
  <div class="min-h-screen pt-20 pb-10 px-4 flex justify-center items-start">
    <div class="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">

      <!-- 标题区域 -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary mb-3">
          {{ t('verify.title') }}
        </h1>
        <p class="text-base-content/60 max-w-md mx-auto">{{ t('verify.subtitle') }}</p>
      </div>

      <!-- 提示栏 -->
      <div class="alert alert-soft bg-base-200/50 backdrop-blur border border-base-200 mb-8 rounded-xl shadow-sm">
        <Icon name="mingcute:information-line" class="text-primary text-xl shrink-0" />
        <div class="text-sm">
          <p class="font-bold mb-1 opacity-90">{{ t('verify.tips_title') }}</p>
          <ul class="flex flex-wrap gap-x-6 gap-y-1 text-xs opacity-70 list-disc list-inside">
            <li>{{ t('verify.tip_1') }}</li>
            <li>{{ t('verify.tip_2') }}</li>
            <li>{{ t('verify.tip_3') }}</li>
          </ul>
        </div>
      </div>

      <!-- 上传区域 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        <!-- 身份证正面 (人像面) -->
        <div class="flex flex-col gap-3 group">
          <span class="font-medium text-base-content/70 flex items-center gap-2 px-1">
            <div class="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-primary">
              <Icon name="mingcute:idcard-fill" size="14" />
            </div>
            {{ t('verify.front_side') }}
          </span>

          <div
            class="relative w-full aspect-[1.58/1] rounded-2xl border-2 border-dashed border-base-content/10 bg-base-100/50 hover:bg-base-100 hover:border-primary/50 active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-md flex flex-col items-center justify-center"
            :class="{ 'border-primary shadow-primary/10': frontPreview }" @click="triggerSelect('front')">
            <!-- 预览图 -->
            <img v-if="frontPreview" :src="frontPreview" class="w-full h-full object-cover z-10" alt="ID Front" />

            <!-- 占位骨架 -->
            <div v-else
              class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity">
              <!-- 模拟身份证布局 -->
              <div
                class="w-[85%] h-[75%] border border-current rounded opacity-20 relative flex items-center justify-between p-4">
                <!-- 头像占位 -->
                <div class="w-1/3 h-full bg-current rounded-md opacity-20 order-2"></div>
                <!-- 文字占位 -->
                <div class="flex-1 h-full flex flex-col gap-2 pt-2">
                  <div class="h-2 w-12 bg-current rounded opacity-30"></div>
                  <div class="h-1.5 w-20 bg-current rounded opacity-20"></div>
                  <div class="h-1.5 w-16 bg-current rounded opacity-20"></div>
                  <div class="mt-auto h-2 w-24 bg-current rounded opacity-20"></div>
                </div>
              </div>
              <div class="absolute inset-0 flex items-center justify-center bg-base-100/10 backdrop-blur-[1px]">
                <div
                  class="flex flex-col items-center gap-2 p-3 rounded-xl bg-base-100/80 shadow-sm border border-base-200">
                  <Icon name="mingcute:camera-line" class="text-2xl text-primary" />
                  <span class="text-xs font-medium">{{ t('verify.click_upload') }}</span>
                </div>
              </div>
            </div>

            <!-- 重新上传遮罩 -->
            <div v-if="frontPreview"
              class="absolute inset-0 z-20 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              <div class="badge badge-lg bg-base-100 border-none text-base-content shadow-lg gap-2">
                <Icon name="mingcute:refresh-1-fill" /> {{ t('common.reupload') }}
              </div>
            </div>
          </div>
        </div>

        <!-- 身份证背面 (国徽面) -->
        <div class="flex flex-col gap-3 group">
          <span class="font-medium text-base-content/70 flex items-center gap-2 px-1">
            <div class="w-6 h-6 rounded-md bg-secondary/10 flex items-center justify-center text-secondary">
              <Icon name="mingcute:idcard-fill" size="14" />
            </div>
            {{ t('verify.back_side') }}
          </span>

          <div
            class="relative w-full aspect-[1.58/1] rounded-2xl border-2 border-dashed border-base-content/10 bg-base-100/50 hover:bg-base-100 hover:border-secondary/50 active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-md flex flex-col items-center justify-center"
            :class="{ 'border-secondary shadow-secondary/10': backPreview }" @click="triggerSelect('back')">
            <img v-if="backPreview" :src="backPreview" class="w-full h-full object-cover z-10" alt="ID Back" />

            <div v-else
              class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity">
              <!-- 模拟国徽面布局 -->
              <div
                class="w-[85%] h-[75%] border border-current rounded opacity-20 relative flex flex-col items-start p-4">
                <!-- 国徽占位 -->
                <div
                  class="w-12 h-12 rounded-full border-2 border-current opacity-20 absolute top-3 left-3 flex items-center justify-center">
                  <div class="w-8 h-8 rounded-full border border-current opacity-30"></div>
                </div>
                <!-- 签发机关等文字 -->
                <div class="mt-auto w-full flex flex-col gap-2 items-center">
                  <div class="h-2 w-1/2 bg-current rounded opacity-20"></div>
                  <div class="h-2 w-2/3 bg-current rounded opacity-20"></div>
                </div>
              </div>
              <div class="absolute inset-0 flex items-center justify-center bg-base-100/10 backdrop-blur-[1px]">
                <div
                  class="flex flex-col items-center gap-2 p-3 rounded-xl bg-base-100/80 shadow-sm border border-base-200">
                  <Icon name="mingcute:add-circle-line" class="text-2xl text-secondary" />
                  <span class="text-xs font-medium">{{ t('verify.click_upload') }}</span>
                </div>
              </div>
            </div>

            <div v-if="backPreview"
              class="absolute inset-0 z-20 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              <div class="badge badge-lg bg-base-100 border-none text-base-content shadow-lg gap-2">
                <Icon name="mingcute:refresh-1-fill" /> {{ t('common.reupload') }}
              </div>
            </div>
          </div>
        </div>

      </div>

      <input type="file" ref="frontInputRef" accept="image/*" class="hidden"
        @change="(e) => handleFileChange('front', e)" />
      <input type="file" ref="backInputRef" accept="image/*" class="hidden"
        @change="(e) => handleFileChange('back', e)" />

      <!-- 提交按钮 -->
      <div class="mt-10">
        <button class="btn btn-primary btn-block h-14 text-base font-bold shadow-lg shadow-primary/20 rounded-xl"
          :class="{ 'btn-disabled opacity-50': !frontFile || !backFile }" :disabled="loading || !frontFile || !backFile"
          @click="handleSubmit">
          <span v-if="loading" class="loading loading-spinner loading-md"></span>
          <span v-else class="flex items-center gap-2">
            <Icon name="mingcute:shield-shape-fill" size="20" />
            {{ t('verify.submit_audit') }}
          </span>
        </button>

        <p class="text-center text-xs text-base-content/40 mt-4 flex items-center justify-center gap-1.5">
          <Icon name="mingcute:lock-line" size="14" />
          {{ t('verify.privacy_notice') }}
        </p>
      </div>

    </div>
  </div>
</template>

<i18n lang="json">{
  "zh-CN": {
    "verify.title": "实名认证",
    "verify.subtitle": "根据相关法律法规，请完成实名认证以使用完整功能",
    "verify.tips_title": "拍摄标准",
    "verify.tip_1": "边框完整、字体清晰",
    "verify.tip_2": "无反光、无遮挡、无阴影",
    "verify.tip_3": "图片大小不超过 10MB",
    "verify.front_side": "身份证人像面",
    "verify.back_side": "身份证国徽面",
    "verify.click_upload": "点击上传",
    "verify.submit_audit": "安全提交审核",
    "verify.privacy_notice": "您的身份信息已加密，仅用于合规认证",
    "verify.image_only": "请选择图片文件",
    "verify.image_too_large": "图片大小不能超过 10MB",
    "verify.upload_both_sides": "请上传完整的正反面照片",
    "verify.success": "提交成功，系统审核中...",
    "verify.failed": "认证失败，请检查照片清晰度",
    "common.reupload": "更换图片"
  },
  "en": {
    "verify.title": "Identity Verification",
    "verify.subtitle": "Complete verification to unlock all features",
    "verify.tips_title": "Guidelines",
    "verify.tip_1": "Full borders visible",
    "verify.tip_2": "No glare or shadows",
    "verify.tip_3": "Max file size 10MB",
    "verify.front_side": "Portrait Side",
    "verify.back_side": "Emblem Side",
    "verify.click_upload": "Click to Upload",
    "verify.submit_audit": "Submit Securely",
    "verify.privacy_notice": "Your data is encrypted and used for compliance only",
    "verify.image_only": "Images only",
    "verify.image_too_large": "Max 10MB",
    "verify.upload_both_sides": "Please upload both sides",
    "verify.success": "Submitted successfully...",
    "verify.failed": "Verification failed",
    "common.reupload": "Change Photo"
  },
  "zh-TW": {
    "verify.title": "實名認證",
    "verify.subtitle": "根據相關法律法規，請完成實名認證以使用完整功能",
    "verify.tips_title": "拍攝標準",
    "verify.tip_1": "邊框完整、字體清晰",
    "verify.tip_2": "無反光、無遮擋、無陰影",
    "verify.tip_3": "圖片大小不超過 10MB",
    "verify.front_side": "身份證人像面",
    "verify.back_side": "身份證國徽面",
    "verify.click_upload": "點擊上傳",
    "verify.submit_audit": "安全提交審核",
    "verify.privacy_notice": "您的身份信息已加密，僅用於合規認證",
    "verify.image_only": "請選擇圖片文件",
    "verify.image_too_large": "圖片大小不能超過 10MB",
    "verify.upload_both_sides": "請上傳完整的正反面照片",
    "verify.success": "提交成功，系統審核中...",
    "verify.failed": "認證失敗，請檢查照片清晰度",
    "common.reupload": "更換圖片"
  }
}</i18n>