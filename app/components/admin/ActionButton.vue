<template>
  <NuxtLink :to="to" class="action-button group">
    <div class="relative overflow-hidden rounded-xl bg-white shadow-sm p-6 border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
      <!-- 背景装饰 -->
      <div class="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300" :class="colorClass"></div>
      
      <!-- 图标 -->
      <div class="relative mb-4">
        <div class="w-12 h-12 rounded-lg flex items-center justify-center" :class="colorClass">
          <Icon :name="icon" class="text-xl" />
        </div>
      </div>
      
      <!-- 内容 -->
      <div class="relative">
        <h3 class="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{{ label }}</h3>
        <p class="text-sm text-gray-500 line-clamp-2">{{ description }}</p>
      </div>
      
      <!-- 箭头指示 -->
      <div class="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <Icon name="mingcute:arrow-right-line" class="text-blue-500" />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  to: string;
  icon: string;
  label: string;
  description: string;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const props = withDefaults(defineProps<Props>(), {
  color: 'blue'
});

// 根据颜色生成对应的类
const colorClass = computed(() => {
  const classes = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600'
  };
  return classes[props.color];
});
</script>

<style lang="postcss" scoped >
.action-button {
  @apply block;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>