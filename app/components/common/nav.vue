<template>
  <nav class="fixed top-0 w-full z-50 transition-all duration-500 border-b" :class="[
    isScrolled
      ? 'bg-base-100/85 backdrop-blur-xl border-base-content/10 md:py-3'
      : ' backdrop-blur-none border-transparent md:py-3 bg-base-100'
  ]">
    <div class="container mx-auto px-4">
      <div class="navbar h-2 p-0 justify-between">
        <div class="flex items-center gap-4 z-60">
          <button class="btn btn-circle btn-ghost md:hidden text-base-content z-50 relative" @click="toggleMobileMenu">
            <div class="w-6 h-6 flex flex-col justify-center items-center gap-1.5 overflow-hidden">
              <span class="w-full h-0.5 bg-current transition-all duration-300 origin-center"
                :class="isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''"></span>
              <span class="w-full h-0.5 bg-current transition-all duration-300"
                :class="isMobileMenuOpen ? '-translate-x-full opacity-0' : ''"></span>
              <span class="w-full h-0.5 bg-current transition-all duration-300 origin-center"
                :class="isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''"></span>
            </div>
          </button>
          <NuxtLink to="/" class="group flex items-center gap-2 cursor-pointer select-none z-50"
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

          <button
            class="btn bg-linear-to-r from-primary to-secondary btn-sm font-bold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 hidden sm:flex">
            <span>{{ t('nav.connect_wallet') }}</span>
            <Icon name="mingcute:wallet-3-fill" class="w-4 h-4" />
          </button>

          <nuxt-link v-if="!userStore.user" to="/auth/login"
            class="btn bg-linear-to-r from-primary to-secondary btn-sm font-bold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
            <span>{{ t('nav.login') }}</span>
          </nuxt-link>

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
  </nav>

  <Teleport to="body">
    <div v-show="isMobileMenuOpen" class="fixed inset-0 z-[100] md:hidden">
      <div class="absolute inset-0 bg-base-100" ref="menuBg">
        <div class="absolute top-0 right-0 w-full h-full bg-gradient-radial from-primary/5 to-transparent opacity-50">
        </div>
        <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-base-content/5 to-transparent"></div>
        <div class="flex flex-col h-full pt-24 pb-10 px-8 overflow-y-auto overscroll-contain">
          <ul class="flex flex-col gap-6 w-full mx-auto">
            <li v-for="(item, index) in menuItems" :key="index" class="mobile-menu-item opacity-0 translate-y-8">
              <div v-if="item.children" class="group">
                <button @click="toggleSubmenu(index)"
                  class="w-full flex items-center justify-between py-2 text-3xl font-black tracking-tighter text-base-content transition-all duration-300"
                  :class="expandedSubmenu === index ? 'text-primary' : ''">
                  <span class="relative">
                    {{ item.label }}
                    <span
                      class="absolute -bottom-2 left-0 h-1 bg-primary w-0 transition-all duration-300 group-hover:w-full"
                      :class="expandedSubmenu === index ? 'w-full' : ''"></span>
                  </span>
                  <div
                    class="w-10 h-10 rounded-full border border-base-content/10 flex items-center justify-center transition-all duration-300"
                    :class="expandedSubmenu === index ? 'border-primary bg-primary text-primary-content rotate-180' : ''">
                    <Icon name="mingcute:down-line" size="20" />
                  </div>
                </button>
                <div ref="submenus" class="overflow-hidden h-0 opacity-0">
                  <ul class="flex flex-col gap-3 pt-6 pb-2 pl-2">
                    <li v-for="(child, cIndex) in item.children" :key="cIndex">
                      <nuxt-link :to="child.link"
                        class="flex w-full items-center gap-3 text-lg font-bold text-base-content/50 hover:text-base-content hover:bg-base-content/5 hover:translate-x-2 rounded-xl transition-all duration-300 py-3 px-4"
                        @click="isMobileMenuOpen = false">
                        <span class="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0"></span>
                        {{ child.label }}
                      </nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>

              <nuxt-link v-else :to="item.link"
                class="group block w-full py-2 text-3xl font-black tracking-tighter text-base-content hover:text-primary transition-colors"
                active-class="text-primary" @click="isMobileMenuOpen = false">
                <span class="relative">
                  {{ item.label }}
                  <span
                    class="absolute -bottom-2 left-0 h-1 bg-primary w-0 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </nuxt-link>
            </li>
          </ul>

          <div class="mt-auto pt-10 w-full text-center mobile-menu-footer opacity-0">
            <div class="text-[10px] font-bold tracking-[0.3em] uppercase text-base-content/30">{{ t('nav.brand') }}
            </div>
            <div class="flex justify-center gap-8 mt-6 text-base-content/40">
              <Icon name="mingcute:social-x-line"
                class="hover:text-base-content hover:scale-110 transition-all cursor-pointer" size="24" />
              <Icon name="mingcute:github-line"
                class="hover:text-base-content hover:scale-110 transition-all cursor-pointer" size="24" />
              <Icon name="mingcute:discord-line"
                class="hover:text-base-content hover:scale-110 transition-all cursor-pointer" size="24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { gsap } from 'gsap'

const themeStore = useThemeStore()
const userStore = useUserStore()
const { t, changeLocale, currentLocaleShort } = useAppI18n()

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 20)

const isMobileMenuOpen = ref(false)
const themeBtnRef = ref(null);
const expandedSubmenu = ref(null)
const submenus = ref([])
const menuBg = ref(null)

const closeDropdown = () => {
  if (document.activeElement) {
    document.activeElement.blur()
  }
}

const menuItems = computed(() => [
  { label: t('nav.home'), link: '/' },
  {
    label: t('nav.intro'),
    children: [
      { label: t('nav.whatIsLife'), link: '/intro/what-is-life' },
      { label: t('nav.whatLifeCanDo'), link: '/intro/what-life-do' },
      { label: t('nav.howToUseLife'), link: '/intro/how-to-use-life' },
      { label: t('nav.thingsYouNeedToKnow'), link: '/intro/need-know' },
      { label: t('nav.whitepaper'), link: '/intro/white-book' }
    ]
  },
  { label: t('nav.apps'), link: '/apps' },
  { label: t('nav.blog'), link: '/blog' },
])

onMounted(() => {
  themeStore.initTheme()
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleSubmenu = (index) => {
  const el = submenus.value[0]

  if (expandedSubmenu.value === index) {
    gsap.to(el, {
      height: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.inOut'
    })
    expandedSubmenu.value = null
  } else {
    expandedSubmenu.value = index
    nextTick(() => {
      gsap.fromTo(el,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.5, ease: 'power3.out' }
      )
    })
  }
}

watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    nextTick(() => {
      const tl = gsap.timeline()

      tl.fromTo(menuBg.value,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )

      tl.fromTo('.mobile-menu-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power4.out'
        },
        "-=0.1"
      )

      tl.fromTo('.mobile-menu-footer',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        "-=0.6"
      )
    })
  } else {
    document.body.style.overflow = ''
    expandedSubmenu.value = null
  }
})

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

.bg-gradient-radial {
  background-image: radial-gradient(var(--tw-gradient-stops));
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