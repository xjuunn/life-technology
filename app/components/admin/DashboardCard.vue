<template>
  <div class="dashboard-card" :class="color">
    <div class="p-6">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <p class="text-sm font-medium text-base-content/60 mb-2">{{ title }}</p>
          <div class="flex items-baseline">
            <span v-if="count !== undefined" class="text-3xl font-bold text-base-content">{{ formattedCount }}</span>
            <span v-if="status" class="ml-2 text-lg font-semibold text-base-content">{{ status }}</span>
          </div>
          
          <!-- 变化率 -->
          <div v-if="change !== undefined && change !== 0" class="mt-3 flex items-center">
            <Icon 
              :name="changeIcon" 
              class="mr-1"
              :class="change > 0 ? 'text-success' : 'text-error'"
            />
            <span class="text-sm font-medium" :class="change > 0 ? 'text-success' : 'text-error'">
              {{ change > 0 ? '+' : '' }}{{ change }}{{ changeType === 'percent' ? '%' : '' }}
            </span>
            <span v-if="changeLabel" class="text-base-content/60 text-sm ml-2">{{ changeLabel }}</span>
          </div>
          
          <!-- 正常运行时间 -->
          <div v-if="uptime" class="mt-3">
            <p class="text-sm text-base-content/60">{{ t('dashboardCard.uptime') }}</p>
            <p class="text-lg font-semibold text-base-content">{{ uptime }}</p>
          </div>

          <!-- 描述信息 -->
          <div v-if="description" class="mt-2">
            <p class="text-sm text-base-content/60">{{ description }}</p>
          </div>
        </div>
        
        <div class="ml-4 flex-shrink-0">
          <div class="p-3 rounded-lg" :class="iconBgColor">
            <Icon :name="icon" class="text-2xl" :class="iconColor" />
          </div>
        </div>
      </div>
      
      <div v-if="usage !== undefined" class="mt-4">
        <div class="flex justify-between text-sm text-base-content/60 mb-1">
          <span>{{ t('dashboardCard.usage') }}</span>
          <span>{{ usage }}%</span>
        </div>
        <div class="h-2 bg-base-300 rounded-full overflow-hidden">
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
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Props {
  title: string;
  count?: number;
  status?: string;
  icon: string;
  color: string;
  change?: number;
  changeType?: 'percent' | 'number';
  changeLabel?: string;
  uptime?: string;
  description?: string;
  usage?: number;
}

const props = withDefaults(defineProps<Props>(), {
  changeType: 'percent',
  description: ''
});

const formattedCount = computed(() => {
  if (props.count === undefined) return '';
  
  if (props.count >= 1000000) {
    return (props.count / 1000000).toFixed(1) + 'M';
  } else if (props.count >= 1000) {
    return (props.count / 1000).toFixed(1) + 'K';
  }
  return props.count.toLocaleString();
});

const changeIcon = computed(() => {
  return props.change && props.change > 0 ? 'mingcute:trending-up-line' : 'mingcute:trending-down-line';
});

const usageClass = computed(() => {
  if (!props.usage) return 'bg-primary';
  
  if (props.usage > 90) return 'bg-error';
  if (props.usage > 75) return 'bg-warning';
  if (props.usage > 50) return 'bg-success';
  return 'bg-primary';
});

const iconColor = computed(() => {
  const colorMap: Record<string, string> = {
    'primary': 'text-primary',
    'secondary': 'text-secondary',
    'accent': 'text-accent',
    'success': 'text-success',
    'warning': 'text-warning',
    'error': 'text-error',
    'info': 'text-info',
    'neutral': 'text-neutral',
    'blue': 'text-primary',
    'green': 'text-success',
    'purple': 'text-accent',
    'orange': 'text-warning',
    'red': 'text-error'
  };
  
  return colorMap[props.color] || 'text-primary';
});

const iconBgColor = computed(() => {
  const colorMap: Record<string, string> = {
    'primary': 'bg-primary/10',
    'secondary': 'bg-secondary/10',
    'accent': 'bg-accent/10',
    'success': 'bg-success/10',
    'warning': 'bg-warning/10',
    'error': 'bg-error/10',
    'info': 'bg-info/10',
    'neutral': 'bg-neutral/10',
    'blue': 'bg-primary/10',
    'green': 'bg-success/10',
    'purple': 'bg-accent/10',
    'orange': 'bg-warning/10',
    'red': 'bg-error/10'
  };
  
  return colorMap[props.color] || 'bg-primary/10';
});
</script>

<style lang="postcss" scoped>
.dashboard-card {
  @apply rounded-xl shadow-sm transition-all duration-300 hover:shadow-md bg-base-100 border border-base-300;
}
</style>

<i18n lang="json">
{
  "zh-CN": {
    "dashboardCard": {
      "usage": "使用率",
      "uptime": "正常运行时间"
    }
  },
  "en": {
    "dashboardCard": {
      "usage": "Usage",
      "uptime": "Uptime"
    }
  },
  "zh-TW": {
    "dashboardCard": {
      "usage": "使用率",
      "uptime": "正常運行時間"
    }
  }
}
</i18n>