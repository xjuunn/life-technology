<template>
  <div class="activity-item group">
    <div class="flex items-start py-3">
      <!-- 用户头像/图标 -->
      <div class="flex-shrink-0 mr-4">
        <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="typeColor">
          <Icon :name="typeIcon" class="text-lg" />
        </div>
      </div>
      
      <!-- 活动内容 -->
      <div class="flex-1 min-w-0">
        <p class="text-gray-800">
          <span class="font-medium text-gray-900">{{ activity.user }}</span>
          {{ activity.action }}
          <span v-if="activity.target" class="font-medium text-blue-600 hover:text-blue-800 cursor-pointer ml-1">{{ activity.target }}</span>
        </p>
        <div class="flex items-center mt-1">
          <Icon name="mingcute:time-line" class="text-gray-400 text-sm mr-1" />
          <span class="text-sm text-gray-500">{{ activity.time }}</span>
          
          <span v-if="activity.module" class="ml-3 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
            {{ activity.module }}
          </span>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div class="flex-shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          v-if="showView"
          class="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
          @click="handleView"
        >
          {{ $t('common.view') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Activity {
  id: number;
  user: string;
  action: string;
  target?: string;
  time: string;
  type: 'user' | 'blog' | 'comment' | 'system' | 'login';
  module?: string;
}

interface Props {
  activity: Activity;
  showView?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showView: true
});

const emit = defineEmits<{
  view: [id: number];
}>();

// 根据类型获取图标
const typeIcon = computed(() => {
  const icons: Record<Activity['type'], string> = {
    user: 'mingcute:user-2-line',
    blog: 'mingcute:file-text-line',
    comment: 'mingcute:message-1-line',
    system: 'mingcute:settings-3-line',
    login: 'mingcute:login-circle-line'
  };
  return icons[props.activity.type];
});

// 根据类型获取颜色
const typeColor = computed(() => {
  const colors: Record<Activity['type'], string> = {
    user: 'bg-blue-100 text-blue-600',
    blog: 'bg-green-100 text-green-600',
    comment: 'bg-purple-100 text-purple-600',
    system: 'bg-orange-100 text-orange-600',
    login: 'bg-cyan-100 text-cyan-600'
  };
  return colors[props.activity.type];
});

const handleView = () => {
  emit('view', props.activity.id);
};
</script>

<style lang="postcss" scoped>
.activity-item {
  @apply border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors;
}
</style>