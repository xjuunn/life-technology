<template>
  <NuxtLink :to="to" class="action-button group">
    <div class="relative overflow-hidden rounded-xl bg-base-100 shadow-sm p-6 border border-base-300 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">

      <div class="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300" :class="backgroundClass"></div>

      <div class="relative mb-4">
        <div class="w-12 h-12 rounded-lg flex items-center justify-center" :class="colorClass">
          <Icon :name="icon" class="text-xl" />
        </div>
      </div>

      <div class="relative">
        <h3 class="font-semibold text-base-content mb-1 group-hover:text-primary transition-colors">{{ t(label) }}</h3>
        <p class="text-sm text-base-content/70 line-clamp-2">{{ t(description) }}</p>
      </div>

      <div class="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <Icon name="mingcute:arrow-right-line" class="text-primary" />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

type ColorKey = 
  | 'primary' | 'secondary' | 'accent' | 'neutral'
  | 'base-100' | 'base-200' | 'base-300' | 'base-content'
  | 'info' | 'success' | 'warning' | 'error'
  | 'blue' | 'green' | 'purple' | 'orange' | 'red';

interface Props {
  to: string;
  icon: string;
  label: string;  
  description: string; 
  color?: ColorKey; 
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary'
});

const colorConfig = {
  'primary': { bg: 'bg-primary/20', text: 'text-primary', base: 'bg-primary' },
  'secondary': { bg: 'bg-secondary/20', text: 'text-secondary', base: 'bg-secondary' },
  'accent': { bg: 'bg-accent/20', text: 'text-accent', base: 'bg-accent' },
  'neutral': { bg: 'bg-neutral/20', text: 'text-neutral', base: 'bg-neutral' },
  'base-100': { bg: 'bg-base-100/20', text: 'text-base-content', base: 'bg-base-100' },
  'base-200': { bg: 'bg-base-200/20', text: 'text-base-content', base: 'bg-base-200' },
  'base-300': { bg: 'bg-base-300/20', text: 'text-base-content', base: 'bg-base-300' },
  'base-content': { bg: 'bg-base-content/20', text: 'text-base-100', base: 'bg-base-content' },
  'info': { bg: 'bg-info/20', text: 'text-info', base: 'bg-info' },
  'success': { bg: 'bg-success/20', text: 'text-success', base: 'bg-success' },
  'warning': { bg: 'bg-warning/20', text: 'text-warning', base: 'bg-warning' },
  'error': { bg: 'bg-error/20', text: 'text-error', base: 'bg-error' },
  'blue': { bg: 'bg-primary/20', text: 'text-primary', base: 'bg-primary' },
  'green': { bg: 'bg-success/20', text: 'text-success', base: 'bg-success' },
  'purple': { bg: 'bg-accent/20', text: 'text-accent', base: 'bg-accent' },
  'orange': { bg: 'bg-warning/20', text: 'text-warning', base: 'bg-warning' },
  'red': { bg: 'bg-error/20', text: 'text-error', base: 'bg-error' },
} as const;

const getColorConfig = (color: ColorKey) => {
  return colorConfig[color] || colorConfig['primary'];
};

const colorClass = computed(() => {
  const config = getColorConfig(props.color);
  return `${config.bg} ${config.text}`;
});

const backgroundClass = computed(() => {
  const config = getColorConfig(props.color);
  return config.base;
});
</script>

<style lang="postcss" scoped>
.action-button {
  @apply block;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<i18n lang="json">
{
  "zh-CN": {
    "quickActions.userManagement": "用户管理",
    "quickActions.userManagementDesc": "管理用户账户与权限",
    "quickActions.blogManagement": "博客管理",
    "quickActions.blogManagementDesc": "审核与管理博客内容",
    "quickActions.commentReview": "评论审核",
    "quickActions.commentReviewDesc": "审核用户评论内容",
    "quickActions.systemSettings": "系统设置",
    "quickActions.systemSettingsDesc": "配置系统参数"
  },
  "en": {
    "quickActions.userManagement": "User Management",
    "quickActions.userManagementDesc": "Manage user accounts and permissions",
    "quickActions.blogManagement": "Blog Management",
    "quickActions.blogManagementDesc": "Review and manage blog content",
    "quickActions.commentReview": "Comment Review",
    "quickActions.commentReviewDesc": "Review user comments",
    "quickActions.systemSettings": "System Settings",
    "quickActions.systemSettingsDesc": "Configure system parameters"
  },
  "zh-TW": {
    "quickActions.userManagement": "用戶管理",
    "quickActions.userManagementDesc": "管理用戶帳戶與權限",
    "quickActions.blogManagement": "博客管理",
    "quickActions.blogManagementDesc": "審核與管理博客內容",
    "quickActions.commentReview": "評論審核",
    "quickActions.commentReviewDesc": "審核用戶評論內容",
    "quickActions.systemSettings": "系統設定",
    "quickActions.systemSettingsDesc": "配置系統參數"
  }
}
</i18n>