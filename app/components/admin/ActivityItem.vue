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
          
          <span v-if="activity.type" class="ml-3 px-2 py-0.5 text-xs rounded-full bg-base-200 text-base-content/70">
            {{ getTypeText(activity.type) }}
          </span>
        </div>
      </div>

      <div class="flex-shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          v-if="showView"
          class="text-sm text-primary hover:text-primary/80 px-3 py-1 rounded-lg hover:bg-primary/10 transition-colors"
          @click="handleView"
        >
          {{ t('common.view') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Activity {
  id: number;
  user: string;
  action: string;
  target?: string;
  time: string;
  type: 'user' | 'blog' | 'comment' | 'report' | 'download' | 'login';
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
    blog: 'mingcute:file-line',
    comment: 'mingcute:message-1-line',
    report: 'mingcute:flag-2-line',
    download: 'mingcute:download-2-line',
    login: 'mingcute:login-circle-line'
  };
  return icons[props.activity.type] || 'mingcute:info-circle-line';
});

const typeColor = computed(() => {
  const colors: Record<Activity['type'], string> = {
    user: 'bg-primary/20 text-primary',
    blog: 'bg-success/20 text-success',
    comment: 'bg-accent/20 text-accent',
    report: 'bg-warning/20 text-warning',
    download: 'bg-info/20 text-info',
    login: 'bg-secondary/20 text-secondary'
  };
  return colors[props.activity.type] || 'bg-base-200 text-base-content';
});

const getTypeText = (type: Activity['type']): string => {
  const typeMap: Record<Activity['type'], string> = {
    user: t('activity.types.user'),
    blog: t('activity.types.blog'),
    comment: t('activity.types.comment'),
    report: t('activity.types.report'),
    download: t('activity.types.download'),
    login: t('activity.types.login')
  };
  return typeMap[type] || type;
};

const handleView = () => {
  emit('view', props.activity.id);
};
</script>

<i18n lang="json">
{
  "zh-CN": {
    "common": {
      "view": "查看"
    },
    "activity": {
      "types": {
        "user": "用户",
        "blog": "博客",
        "comment": "评论",
        "report": "举报",
        "download": "下载",
        "login": "登录"
      }
    }
  },
  "en": {
    "common": {
      "view": "View"
    },
    "activity": {
      "types": {
        "user": "User",
        "blog": "Blog",
        "comment": "Comment",
        "report": "Report",
        "download": "Download",
        "login": "Login"
      }
    }
  },
  "zh-TW": {
    "common": {
      "view": "查看"
    },
    "activity": {
      "types": {
        "user": "用戶",
        "blog": "博客",
        "comment": "評論",
        "report": "舉報",
        "download": "下載",
        "login": "登入"
      }
    }
  }
}
</i18n>