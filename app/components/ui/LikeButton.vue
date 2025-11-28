<template>
  <button
    :class="[
      'like-button',
      'flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200',
      'border',
      {
        'text-red-500 bg-red-50 border-red-200': isLiked,
        'text-gray-500 bg-white border-gray-300': !isLiked,
        'opacity-50 cursor-not-allowed': isLoading,
        'cursor-pointer hover:border-red-300': !isLoading,
      }
    ]"
    :disabled="isLoading"
    @click="handleLikeClick"
  >
    <div class="relative">
      <!-- 使用你项目中的图标或文字 -->
      <span class="text-lg">{{ isLiked ? '❤️' : '🤍' }}</span>
      
      <!-- 加载状态 -->
      <div
        v-if="isLoading"
        class="absolute inset-0 flex items-center justify-center"
      >
        <span class="text-sm">...</span>
      </div>
    </div>
    
    <span
      :class="[
        'text-sm font-medium transition-colors',
        { 'text-red-500': isLiked, 'text-gray-600': !isLiked }
      ]"
    >
      {{ likeCount }}
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  blogId: string
  initialIsLiked?: boolean
  initialLikeCount?: number
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  initialIsLiked: false,
  initialLikeCount: 0,
  size: 'md'
})

const { isLiked, likeCount, isLoading, handleLike } = useBlogLike({
  blogId: props.blogId,
  initialIsLiked: props.initialIsLiked,
  initialLikeCount: props.initialLikeCount
})

const handleLikeClick = async () => {
  try {
    await handleLike()
  } catch (error) {
    console.error('点赞失败:', error)
  }
}
</script>

<style scoped>
.like-button {
  min-width: 80px;
}
</style>