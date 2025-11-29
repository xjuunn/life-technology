<script setup lang="ts">
const { t } = useI18n()

// 状态管理
const showModal = ref(false)
const showLargeModal = ref(false)

const handleConfirm = () => {
  useToast().success(t('demo.success_message'))
  showModal.value = false
}
</script>

<template>
  <div class="p-8 min-h-screen flex flex-col items-center justify-center gap-4 bg-base-200">

    <!-- 触发按钮 -->
    <button class="btn btn-primary" @click="showModal = true">
      {{ t('demo.open_basic') }}
    </button>

    <button class="btn btn-secondary" @click="showLargeModal = true">
      {{ t('demo.open_large') }}
    </button>

    <!-- 1. 基础 Modal -->
    <CommonModal v-model="showModal" :title="t('demo.modal_title')">
      <p class="text-base-content/70">
        {{ t('demo.modal_content') }}
      </p>

      <!-- 底部按钮插槽 -->
      <template #actions="{ close }">
        <button class="btn btn-ghost" @click="close">
          {{ t('common.cancel') }}
        </button>
        <button class="btn btn-primary" @click="handleConfirm">
          {{ t('common.confirm') }}
        </button>
      </template>
    </CommonModal>

    <!-- 2. 大尺寸内容 Modal -->
    <CommonModal v-model="showLargeModal" :title="t('demo.large_modal')" max-width="max-w-3xl">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-base-200 p-4 rounded-xl h-32 animate-pulse"></div>
        <div class="bg-base-200 p-4 rounded-xl h-32 animate-pulse"></div>
        <div class="bg-base-200 p-4 rounded-xl h-32 animate-pulse sm:col-span-2"></div>
      </div>
    </CommonModal>


  </div>
</template>

<i18n lang="json">{
  "zh-CN": {
    "common": {
      "cancel": "取消",
      "confirm": "确认"
    },
    "demo": {
      "open_basic": "打开基础模态框",
      "open_large": "打开宽幅模态框",
      "modal_title": "系统提示",
      "modal_content": "这是一个响应式模态框。在移动端它会从底部滑出，在桌面端它会居中显示。",
      "large_modal": "详细信息",
      "success_message": "操作成功！"
    }
  },
  "en": {
    "common": {
      "cancel": "Cancel",
      "confirm": "Confirm"
    },
    "demo": {
      "open_basic": "Open Basic Modal",
      "open_large": "Open Large Modal",
      "modal_title": "System Notice",
      "modal_content": "This is a responsive modal. It slides up from the bottom on mobile and centers on desktop.",
      "large_modal": "Detailed Information",
      "success_message": "Operation successful!"
    }
  }
}</i18n>