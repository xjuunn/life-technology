<template>
  <nav class="fixed top-0 w-full z-50 transition-all duration-500 border-b" :class="[
    isScrolled
      ? 'bg-base-100/85 backdrop-blur-xl border-base-content/10 py-5'
      : ' backdrop-blur-none border-transparent py-5 bg-base-100'
  ]">
    <div class="container mx-auto px-4">
      <div class="navbar min-h-12 p-0 justify-between">
        <div class="flex items-center gap-4 z-60">
          <button class="btn btn-circle btn-ghost md:hidden text-base-content" @click="toggleMobileMenu">
            <Icon :name="isMobileMenuOpen ? 'mingcute:close-fill' : 'mingcute:menu-fill'" size="24"
              class="transition-transform duration-300" :class="isMobileMenuOpen ? 'rotate-90' : 'rotate-0'" />
          </button>
          <NuxtLink to="/" class="group flex items-center gap-2 cursor-pointer select-none"
            @click="isMobileMenuOpen = false">
            <div class="relative w-9 h-9 flex items-center justify-center">
              <div
                class="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              </div>
              <img v-if="!themeStore.isDark" src="/favicon.ico" class="w-16 h-14 scale-95 object-contain" />
              <nuxt-img v-else src="/favicon.png" class="w-16 h-14 scale-125 object-contain" />
            </div>
            <div class="flex flex-col leading-none">
              <span class="text-2xl text-base-content relative" style="-webkit-text-stroke: 0.5px currentColor;">
                LIFE
              </span>
            </div>
          </NuxtLink>
        </div>
        <div class="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ul class="menu menu-horizontal px-1 font-medium text-[15px] gap-2">
            <li>
              <nuxt-link to="/"
                class="relative btn btn-ghost text-base-content/70 hover:text-base-content transition-colors py-2 px-5 group overflow-hidden">
                {{ t('nav.home') }}
              </nuxt-link>
            </li>
            <li>
              <div class="dropdown dropdown-center p-0">
                <div tabindex="0" role="button"
                  class="btn btn-ghost text-base-content/70 hover:text-base-content transition-colors py-2 px-5 group overflow-hidden">
                  {{ t('nav.intro') }}
                </div>

                <ul tabindex="-1"
                  class="dropdown-content bg-base-200 menu border border-base-content/10 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li>
                    <NuxtLink to="/intro/what-is-life" @click="closeDropdown">
                      {{ t('nav.whatIsLife') }}
                    </NuxtLink>
                  </li>

                  <li>
                    <NuxtLink to="/intro/what-life-do" @click="closeDropdown">
                      {{ t('nav.whatLifeCanDo') }}
                    </NuxtLink>
                  </li>

                  <li>
                    <NuxtLink to="/intro/how-to-use-life" @click="closeDropdown">
                      {{ t('nav.howToUseLife') }}
                    </NuxtLink>
                  </li>

                  <li>
                    <NuxtLink to="/intro/need-know" @click="closeDropdown">
                      {{ t('nav.thingsYouNeedToKnow') }}
                    </NuxtLink>
                  </li>

                  <li>
                    <NuxtLink to="/intro/white-book" @click="closeDropdown">
                      {{ t('nav.whitepaper') }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>

            </li>
            <li>
              <nuxt-link to="/apps"
                class="relative btn btn-ghost text-base-content/70 hover:text-base-content transition-colors py-2 px-5 group overflow-hidden">
                {{ t('nav.apps') }}
              </nuxt-link>
            </li>

            <li>
              <nuxt-link to="/blog"
                class="relative btn btn-ghost text-base-content/70 hover:text-base-content transition-colors py-2 px-5 group overflow-hidden">
                {{ t('nav.blog') }}
              </nuxt-link>
            </li>

          </ul>
        </div>
        <div class="flex items-center gap-2 z-60">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button"
              class="btn btn-ghost btn-circle btn-sm md:btn-md md:w-auto md:px-3 md:rounded-full hover:bg-base-content/5">
              <Icon name="mingcute:translate-2-fill" class="w-5 h-5" />
              <span class="hidden md:inline text-xs font-bold ml-1">
                {{ currentLocaleShort() }}
              </span>
            </div>
            <ul tabindex="0"
              class="dropdown-content z-1 menu p-2 shadow-xl bg-base-100 border border-base-content/5 rounded-xl w-32 mt-4 backdrop-blur-md">
              <li><a @click="changeLocale('zh-CN')">简体中文</a></li>
              <li><a @click="changeLocale('zh-TW')">繁体中文</a></li>
              <li><a @click="changeLocale('en')">English</a></li>
            </ul>
          </div>

          <button ref="themeBtnRef"
            class="btn btn-ghost btn-circle btn-sm md:btn-md hover:bg-base-content/5 text-base-content overflow-hidden"
            @click="themeStore.toggleTheme" aria-label="Toggle Theme">
            <div class="relative w-full h-full flex items-center justify-center">
              <Icon name="mingcute:sun-fill" class="absolute w-5 h-5 transition-all duration-500 ease-spring"
                :class="themeStore.isDark ? 'translate-y-8 opacity-0 rotate-90' : 'translate-y-0 opacity-100 rotate-0'" />
              <Icon name="mingcute:moon-fill" class="absolute w-5 h-5 transition-all duration-500 ease-spring"
                :class="themeStore.isDark ? 'translate-y-0 opacity-100 rotate-0' : '-translate-y-8 opacity-0 -rotate-90'" />
            </div>
          </button>

          <!-- 连接资产 (独立显示) -->
          <button
            class="btn bg-linear-to-r from-primary to-secondary btn-sm font-bold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 hidden sm:flex">
            <span>{{ t('nav.connect_wallet') }}</span>
            <Icon name="mingcute:wallet-3-fill" class="w-4 h-4" />
          </button>

          <!-- 未登录状态 -->
          <nuxt-link v-if="!userStore.user" to="/auth/login"
            class="btn bg-linear-to-r from-primary to-secondary btn-sm font-bold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
            <span>{{ t('nav.login') }}</span>
          </nuxt-link>

          <!-- 已登录状态 (用户头像菜单) -->
          <div v-else class="dropdown dropdown-end ml-1">
            <div tabindex="0" role="button"
              class="btn btn-ghost btn-circle avatar border border-base-content/10 hover:border-primary/50 transition-colors">
              <div
                class="w-9 h-9 rounded-full ring ring-primary/20 ring-offset-base-100 ring-offset-1 flex items-center justify-center overflow-hidden bg-base-200 text-base-content">
                <img v-if="userStore.user?.avatar" :src="userStore.user.avatar" class="w-full h-full object-cover"
                  alt="Avatar" />
                <span v-else class="text-sm font-bold uppercase">
                  {{ userStore.user?.username?.charAt(0) || 'U' }}
                </span>
              </div>
            </div>
            <ul tabindex="0"
              class="menu dropdown-content z-1 p-2 shadow-2xl bg-base-100/90 border border-base-content/5 rounded-2xl w-64 mt-4 backdrop-blur-xl">
              <!-- 用户信息头部 -->
              <li class="pointer-events-none px-2 pb-2 pt-1">
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div
                      class="w-10 h-10 rounded-full ring ring-base-content/5 flex items-center justify-center overflow-hidden bg-base-200">
                      <img v-if="userStore.user?.avatar" :src="userStore.user.avatar"
                        class="w-full h-full object-cover" />
                      <span v-else class="text-lg font-bold uppercase opacity-70">
                        {{ userStore.user?.username?.charAt(0) || 'U' }}
                      </span>
                    </div>
                  </div>
                  <div class="flex flex-col overflow-hidden w-36">
                    <span class="font-bold text-base truncate leading-tight min-w-0 max-w-full">
                      {{ userStore.user?.username }}
                    </span>

                    <span
                      class="text-xs opacity-50 mt-0.5 w-full block overflow-hidden whitespace-nowrap text-ellipsis">
                      {{ userStore.user?.email }}
                    </span>
                  </div>
                </div>
              </li>
              <li class="divider p-0 h-0.5"></li>

              <!-- 菜单项 -->
              <li v-if="userStore.user?.isAdmin">
                <nuxt-link to="/admin" class="py-3 font-medium hover:bg-primary/10 hover:text-primary">
                  <Icon name="mingcute:safe-lock-fill" class="w-5 h-5" />
                  {{ t('nav.admin_panel') }}
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/blog/new" class="py-3 font-medium hover:bg-base-content/5">
                  <Icon name="mingcute:edit-2-fill" class="w-5 h-5" />
                  {{ t('nav.new_blog') }}
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/user/profile" class="py-3 font-medium hover:bg-base-content/5">
                  <Icon name="mingcute:profile-fill" class="w-5 h-5" />
                  {{ t('nav.profile') }}
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/user/settings" class="py-3 font-medium hover:bg-base-content/5">
                  <Icon name="mingcute:settings-3-fill" class="w-5 h-5" />
                  {{ t('nav.settings') }}
                </nuxt-link>
              </li>

              <li class="divider h-0.5"></li>

              <!-- 登出 -->
              <li>
                <button @click="handleLogout" class="py-3 text-error hover:bg-error/10 font-medium">
                  <Icon name="mingcute:exit-fill" class="w-5 h-5" />
                  {{ t('nav.logout') }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isMobileMenuOpen"
      class="fixed inset-0 z-49 bg-base-100/95 backdrop-blur-2xl md:hidden flex flex-col pt-28 px-6 h-screen w-screen overscroll-contain">
      <ul class="flex flex-col gap-6 text-center cursor-pointer">
        <li v-for="(item, index) in menuItems" :key="index" class="mobile-menu-item opacity-0 translate-y-4">
          <nuxt-link :to="item.link"
            class="text-3xl font-black text-base-content hover:text-primary transition-colors block py-2"
            @click="isMobileMenuOpen = false">
            {{ item.label }}
          </nuxt-link>
        </li>
      </ul>
      <div class="mt-auto mb-10 text-center opacity-50 text-sm">
        <p>{{ t('nav.brand') }}</p>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { animate, stagger } from 'animejs'

const themeStore = useThemeStore()
const userStore = useUserStore()
const { t, changeLocale, currentLocaleShort } = useAppI18n()

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 20)

const isMobileMenuOpen = ref(false)
const themeBtnRef = ref(null);

const closeDropdown = () => {
  if (document.activeElement) {
    document.activeElement.blur()
  }
}

// 动态菜单
const menuItems = computed(() => [
  { label: t('nav.home'), link: '/' },
  { label: t('nav.intro'), link: '/intro' },
  { label: t('nav.apps'), link: '/apps' },
  { label: t('nav.blog'), link: '/blog' },
])

// 主题初始化（使用 themeStore 的逻辑）
onMounted(() => {
  themeStore.initTheme()
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    setTimeout(() => {
      animate('.mobile-menu-item', {
        translateY: [20, 0],
        opacity: [0, 1],
        delay: stagger(100),
        duration: 800,
        easing: 'easeOutExpo'
      })
    }, 50)
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// 登出
const handleLogout = async () => {
  await userStore.logout()
  navigateTo('/auth/login')
}
</script>

<style scoped>
.ease-spring {
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}

.backdrop-blur-xl {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
</style>


<i18n lang="json">{
  "en": {
    "footer": {
      "copyright": "Tianjin Chengjiu Network Technology Co., Ltd. All Rights Reserved.",
      "compliance": "ICP Filing: Tianjin ICP No. 2025040555-1"
    },
    "nav": {
      "home": "Home",
      "intro": "About",
      "apps": "Apps",
      "blog": "Blog",
      "login": "Login",
      "connect_wallet": "Connect Assets",
      "connect": "Connect",
      "brand": "LIFE TECHNOLOGY",
      "new_blog": "New Blog",
      "admin_panel": "Admin Panel",
      "profile": "My Profile",
      "settings": "Settings",
      "logout": "Log Out",
      "whatIsLife": "What is LIFE",
      "whatLifeCanDo": "What LIFE Can Do for You",
      "howToUseLife": "How to Use LIFE",
      "thingsYouNeedToKnow": "Things You Need to Know",
      "whitepaper": "LIFE Token White Paper"
    }
  },
  "zh-CN": {
    "footer": {
      "copyright": "天津成久网络科技有限公司 版权所有",
      "compliance": "备案号：津ICP备2025040555号-1"
    },
    "nav": {
      "home": "首页",
      "intro": "介绍",
      "apps": "应用",
      "blog": "博客",
      "login": "登录",
      "connect_wallet": "连接资产",
      "connect": "连接",
      "brand": "LIFE TECHNOLOGY",
      "new_blog": "新建博客",
      "admin_panel": "管理面板",
      "profile": "个人资料",
      "settings": "账号设置",
      "logout": "退出登录",
      "whatIsLife": "什么是 LIFE",
      "whatLifeCanDo": "LIFE 能为你做什么",
      "howToUseLife": "如何使用 LIFE",
      "thingsYouNeedToKnow": "你需要知道的事情",
      "whitepaper": "LIFE 积分白皮书"
    }
  },
  "zh-TW": {
    "footer": {
      "copyright": "天津成久網絡科技有限公司 版權所有",
      "compliance": "備案號：津ICP備2025040555號-1"
    },
    "nav": {
      "home": "首頁",
      "intro": "介紹",
      "apps": "應用",
      "blog": "博客",
      "login": "登入",
      "connect_wallet": "連接資產",
      "connect": "連接",
      "brand": "LIFE TECHNOLOGY",
      "new_blog": "新建博客",
      "admin_panel": "管理面板",
      "profile": "個人資料",
      "settings": "帳號設定",
      "logout": "登出",
      "whatIsLife": "什麼是 LIFE",
      "whatLifeCanDo": "LIFE 能為你做什麼",
      "howToUseLife": "如何使用 LIFE",
      "thingsYouNeedToKnow": "你需要知道的事情",
      "whitepaper": "LIFE 代幣白皮書"
    }
  }
}</i18n>