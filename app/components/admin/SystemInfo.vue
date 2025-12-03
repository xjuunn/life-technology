<template>
  <div class="system-info">
    <div class="py-4">
      <div class="flex justify-between items-center mb-2">
        <div class="flex items-center">
          <Icon v-if="icon" :name="icon" class="mr-3 text-gray-400" />
          <span class="text-gray-700 font-medium">{{ label }}</span>
        </div>
        
        <div class="flex items-center">
          <span class="font-semibold" :class="valueColor">{{ value }}</span>
          
          <!-- 状态指示器 -->
          <div 
            v-if="healthy !== undefined"
            class="ml-2 w-2 h-2 rounded-full"
            :class="healthy ? 'bg-green-500' : 'bg-red-500'"
          ></div>
        </div>
      </div>
      
      <!-- 进度条 -->
      <div v-if="usage !== undefined" class="mt-3">
        <div class="flex justify-between text-sm text-gray-500 mb-1">
          <span>{{ $t('admin.dashboard.usage') }}</span>
          <span>{{ usage }}%</span>
        </div>
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full rounded-full transition-all duration-500"
            :class="usageColor"
            :style="{ width: `${Math.min(usage, 100)}%` }"
          ></div>
        </div>
        
        <!-- 使用量详情 -->
        <div v-if="details" class="mt-2 text-xs text-gray-500 flex justify-between">
          <span>{{ details.used }}</span>
          <span>{{ details.total }}</span>
        </div>
      </div>
      
      <!-- 警告信息 -->
      <div v-if="warning && usage !== undefined && usage > warningThreshold" class="mt-2">
        <div class="flex items-start text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
          <Icon name="mingcute:warning-line" class="mr-2 mt-0.5 flex-shrink-0" />
          <span class="text-sm">
            {{ $t('admin.dashboard.warning_high_usage') }}
          </span>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div v-if="showAction" class="mt-3">
        <button 
          class="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
          @click="handleAction"
        >
          {{ actionText || $t('common.manage') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Details {
  used: string;
  total: string;
}

interface Props {
  label: string;
  value: string;
  healthy?: boolean;
  usage?: number;
  details?: Details;
  warning?: boolean;
  warningThreshold?: number;
  showAction?: boolean;
  actionText?: string;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  warning: true,
  warningThreshold: 85,
  showAction: false
});

const emit = defineEmits<{
  action: [];
}>();

// 值颜色
const valueColor = computed(() => {
  if (props.healthy !== undefined) {
    return props.healthy ? 'text-green-600' : 'text-red-600';
  }
  
  if (props.usage !== undefined) {
    if (props.usage > 90) return 'text-red-600';
    if (props.usage > 75) return 'text-yellow-600';
    return 'text-green-600';
  }
  
  return 'text-gray-900';
});

// 进度条颜色
const usageColor = computed(() => {
  if (!props.usage) return 'bg-blue-500';
  
  if (props.usage > 90) return 'bg-red-500';
  if (props.usage > 75) return 'bg-yellow-500';
  if (props.usage > 50) return 'bg-green-500';
  return 'bg-blue-500';
});

const handleAction = () => {
  emit('action');
};
</script>

<style lang="postcss" scoped>
.system-info {
  @apply border-b border-gray-100 last:border-0;
}
</style>