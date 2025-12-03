<template>
  <div class="system-info">
    <div class="py-4">
      <div class="flex justify-between items-center mb-2">
        <div class="flex items-center">
          <Icon v-if="icon" :name="icon" class="mr-3 text-base-content/40" />
          <span class="text-base-content/80 font-medium">{{ label }}</span>
        </div>
        
        <div class="flex items-center">
          <span class="font-semibold" :class="valueColor">{{ value }}</span>

          <div 
            v-if="healthy !== undefined"
            class="ml-2 w-2 h-2 rounded-full"
            :class="healthy ? 'bg-success' : 'bg-error'"
          ></div>
        </div>
      </div>

      <div v-if="usage !== undefined" class="mt-3">
        <div class="flex justify-between text-sm text-base-content/60 mb-1">
          <span>{{ $t('admin.dashboard.usage') }}</span>
          <span>{{ usage }}%</span>
        </div>
        <div class="h-2 bg-base-300 rounded-full overflow-hidden">
          <div 
            class="h-full rounded-full transition-all duration-500"
            :class="usageColor"
            :style="{ width: `${Math.min(usage, 100)}%` }"
          ></div>
        </div>
        
        <div v-if="details" class="mt-2 text-xs text-base-content/60 flex justify-between">
          <span>{{ details.used }}</span>
          <span>{{ details.total }}</span>
        </div>
      </div>
      
      <div v-if="warning && usage !== undefined && usage > warningThreshold" class="mt-2">
        <div class="flex items-start text-warning-content bg-warning/10 px-3 py-2 rounded-lg border border-warning/20">
          <Icon name="mingcute:warning-line" class="mr-2 mt-0.5 flex-shrink-0 text-warning" />
          <span class="text-sm text-warning-content">
            {{ $t('admin.dashboard.warning_high_usage') }}
          </span>
        </div>
      </div>
    
      <div v-if="showAction" class="mt-3">
        <button 
          class="text-sm text-primary hover:text-primary/80 px-3 py-1 rounded-lg hover:bg-primary/10 transition-colors"
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

const valueColor = computed(() => {
  if (props.healthy !== undefined) {
    return props.healthy ? 'text-success' : 'text-error';
  }
  
  if (props.usage !== undefined) {
    if (props.usage > 90) return 'text-error';
    if (props.usage > 75) return 'text-warning';
    return 'text-success';
  }
  
  return 'text-base-content';
});

const usageColor = computed(() => {
  if (!props.usage) return 'bg-primary';
  
  if (props.usage > 90) return 'bg-error';
  if (props.usage > 75) return 'bg-warning';
  if (props.usage > 50) return 'bg-success';
  return 'bg-primary';
});

const handleAction = () => {
  emit('action');
};
</script>

<style lang="postcss" scoped>
.system-info {
  @apply border-b border-base-300 last:border-0;
}
</style>