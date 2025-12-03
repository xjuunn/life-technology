<template>
  <aside
    class="bg-base-100/90 backdrop-blur-xl border-r border-base-content/10 w-72 min-h-full flex flex-col transition-all duration-300">
    <div class="h-16 flex items-center gap-3 px-6 border-b border-base-content/5">
      <div class="relative w-8 h-8 flex items-center justify-center">
        <div class="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse"></div>
        <img src="/favicon.ico" alt="LIFE Admin Logo" class="w-6 h-6 relative z-10" />
      </div>
      <div class="flex flex-col leading-none select-none">
        <span class="text-lg font-black tracking-wider text-base-content">
          LIFE <span class="text-primary">ADMIN</span>
        </span>
        <span class="text-[10px] text-base-content/50 font-medium tracking-widest uppercase mt-0.5">Management</span>
      </div>
    </div>
    <div class="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
      <ul class="menu menu-md gap-1">
        <li v-for="item in menuItems" :key="item.key">
          <nuxt-link :to="item.link"
            class="group font-medium text-base-content/70 hover:text-base-content hover:bg-base-content/5 transition-all rounded-lg"
            active-class="!bg-primary/10 !text-primary shadow-xs">
            <Icon :name="item.icon" size="20" class="group-hover:scale-110 transition-transform duration-300" />
            {{ t(item.key) }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="p-4 border-t border-base-content/5 bg-base-100/50">
      <div
        class="flex items-center gap-3 p-2 rounded-xl hover:bg-base-content/5 transition-colors cursor-pointer group">
        <div class="avatar online">
          <div class="w-10 rounded-full ring ring-base-content/10 group-hover:ring-primary/50 transition-all">
            <img v-if="userStore.user?.avatar" :src="userStore.user.avatar" alt="Avatar" />
            <div v-else
              class="bg-neutral text-neutral-content w-full h-full flex items-center justify-center font-bold">A</div>
          </div>
        </div>
        <div class="flex flex-col overflow-hidden">
          <span class="text-sm font-bold truncate">{{ userStore.user?.username || 'Admin' }}</span>
          <span class="text-xs opacity-50 truncate">Administrator</span>
        </div>
        <button @click="handleLogout"
          class="btn btn-ghost btn-circle btn-xs ml-auto text-error hover:bg-error/10 tooltip tooltip-left"
          :data-tip="t('admin.nav.logout')">
          <Icon name="mingcute:exit-fill" size="16" />
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
const { t } = useAppI18n()
const userStore = useUserStore()

const menuItems = [
  { key: 'admin.nav.dashboard', link: '/admin', icon: 'mingcute:dashboard-2-fill' },
  { key: 'admin.nav.users', link: '/admin/users', icon: 'mingcute:user-3-fill' },
  { key: 'admin.nav.blogs', link: '/admin/blogs', icon: 'mingcute:document-3-fill' },
  { key: 'admin.nav.comments', link: '/admin/comments', icon: 'mingcute:chat-3-fill' },
  { key: 'admin.nav.system', link: '/admin/system', icon: 'mingcute:settings-4-fill' },
]

const handleLogout = async () => {
  await userStore.logout()
  navigateTo('/auth/login')
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: oklch(var(--bc) / 0.1);
  border-radius: 4px;
}
</style>


<i18n lang="json">{
  "en": {
    "admin": {
      "nav": {
        "dashboard": "Dashboard",
        "users": "User Mgmt",
        "blogs": "Content",
        "comments": "Comment Management", 
        "system": "System",
        "settings": "Settings",
        "backToHome": "Back to Home",
        "logout": "Log Out"
      },
      "common": {
        "welcome": "Welcome back,"
      }
    }
  },
  "zh-CN": {
    "admin": {
      "nav": {
        "dashboard": "仪表盘",
        "users": "用户管理",
        "blogs": "内容管理",
        "comments": "评论管理",
        "system": "系统设置",
        "settings": "配置中心",
        "backToHome": "返回前台",
        "logout": "退出登录"
      },
      "common": {
        "welcome": "欢迎回来，"
      }
    }
  },
  "zh-TW": {
    "admin": {
      "nav": {
        "dashboard": "儀表板",
        "users": "用戶管理",
        "blogs": "內容管理",
        "comments": "評論管理",
        "system": "系統設置",
        "settings": "配置中心",
        "backToHome": "返回前台",
        "logout": "登出"
      },
      "common": {
        "welcome": "歡迎回來，"
      }
    }
  }
}</i18n>