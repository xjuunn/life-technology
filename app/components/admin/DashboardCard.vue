<template>
  <div class="dashboard-card" :class="color">
    <div class="p-6">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-600 mb-2">{{ title }}</p>
          <div class="flex items-baseline">
            <span v-if="count !== undefined" class="text-3xl font-bold text-gray-900">{{ formattedCount }}</span>
            <span v-if="status" class="ml-2 text-lg font-semibold text-gray-900">{{ status }}</span>
          </div>
          
          <!-- 变化率 -->
          <div v-if="change !== undefined" class="mt-3 flex items-center">
            <Icon 
              :name="changeIcon" 
              class="mr-1"
              :class="change > 0 ? 'text-green-500' : 'text-red-500'"
            />
            <span class="text-sm font-medium" :class="change > 0 ? 'text-green-600' : 'text-red-600'">
              {{ change > 0 ? '+' : '' }}{{ change }}%
            </span>
            <span class="text-gray-500 text-sm ml-2">{{ $t('admin.dashboard.vs_last_month') }}</span>
          </div>
          
          <!-- 正常运行时间 -->
          <div v-if="uptime" class="mt-3">
            <p class="text-sm text-gray-500">{{ $t('admin.dashboard.uptime') }}</p>
            <p class="text-lg font-semibold text-gray-900">{{ uptime }}</p>
          </div>
        </div>
        
        <!-- 图标 -->
        <div class="ml-4 flex-shrink-0">
          <div class="p-3 rounded-lg bg-white bg-opacity-50">
            <Icon :name="icon" class="text-2xl" />
          </div>
        </div>
      </div>
      
      <!-- 进度条（如果有usage） -->
      <div v-if="usage !== undefined" class="mt-4">
        <div class="flex justify-between text-sm text-gray-600 mb-1">
          <span>{{ $t('admin.dashboard.usage') }}</span>
          <span>{{ usage }}%</span>
        </div>
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full rounded-full transition-all duration-500"
            :class="usageClass"
            :style="{ width: `${usage}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title: string;
  count?: number;
  status?: string;
  icon: string;
  color: string;
  change?: number;
  uptime?: string;
  usage?: number;
}

const props = defineProps<Props>();
// 格式化数字显示
const formattedCount = computed(() => {
  if (props.count === undefined) return '';
  
  if (props.count >= 1000000) {
    return (props.count / 1000000).toFixed(1) + 'M';
  } else if (props.count >= 1000) {
    return (props.count / 1000).toFixed(1) + 'K';
  }
  return props.count.toString();
});

// 变化图标
const changeIcon = computed(() => {
  return props.change && props.change > 0 ? 'mingcute:trending-up-line' : 'mingcute:trending-down-line';
});

// 使用率颜色
const usageClass = computed(() => {
  if (!props.usage) return 'bg-blue-500';
  
  if (props.usage > 90) return 'bg-red-500';
  if (props.usage > 75) return 'bg-yellow-500';
  if (props.usage > 50) return 'bg-green-500';
  return 'bg-blue-500';
});
</script>

<style lang="postcss"scoped>
.dashboard-card {
  @apply rounded-xl shadow-sm transition-all duration-300 hover:shadow-md;
}
</style>