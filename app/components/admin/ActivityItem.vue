<template>
  <div class="activity-item group">
    <div class="flex items-start py-3">

      <div class="flex-shrink-0 mr-4">
        <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="typeColor">
          <Icon :name="typeIcon" class="text-lg" />
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <p class="text-base-content">
          <span class="font-medium text-base-content/90">{{ activity.user }}</span>
          {{ activity.action }}
          <span v-if="activity.target" class="font-medium text-primary hover:text-primary/80 cursor-pointer ml-1">{{ activity.target }}</span>
        </p>
        <div class="flex items-center mt-1">
          <Icon name="mingcute:time-line" class="text-base-content/40 text-sm mr-1" />
          <span class="text-sm text-base-content/60">{{ activity.time }}</span>
          
          <span v-if="activity.module" class="ml-3 px-2 py-0.5 text-xs rounded-full bg-base-200 text-base-content/70">
            {{ activity.module }}
          </span>
        </div>
      </div>

      <div class="flex-shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          v-if="showView"
          class="text-sm text-primary hover:text-primary/80 px-3 py-1 rounded-lg hover:bg-primary/10 transition-colors"
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

const typeColor = computed(() => {
  const colors: Record<Activity['type'], string> = {
    user: 'bg-primary/20 text-primary',
    blog: 'bg-success/20 text-success',
    comment: 'bg-accent/20 text-accent',
    system: 'bg-warning/20 text-warning',
    login: 'bg-info/20 text-info'
  };
  return colors[props.activity.type];
});

const handleView = () => {
  emit('view', props.activity.id);
};
</script>

<style lang="postcss" scoped>
.activity-item {
  @apply border-b border-base-300 last:border-0 hover:bg-base-200 rounded-lg px-2 -mx-2 transition-colors;
}
</style>