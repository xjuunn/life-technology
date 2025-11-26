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
              <nuxt-img src="/favicon.png" class="w-8 h-8 object-contain"></nuxt-img>
            </div>
            <div class="flex flex-col leading-none">
              <span class="font-black text-2xl tracking-tighter text-base-content relative">
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
              <nuxt-link class="dropdown dropdown-center p-0">
                <div tabindex="0" role="button"
                  class="btn btn-ghost text-base-content/70 hover:text-base-content transition-colors py-2 px-5 group overflow-hidden">
                  {{ t('nav.intro') }}</div>
                <ul tabindex="-1"
                  class="dropdown-content bg-base-200 menu border border-base-content/10 rounded-box z-1 w-52 p-2 shadow-sm">
                   <li><NuxtLink to="/intro/what-is-life"><a>{{ t('nav.whatIsLife') }}</a></NuxtLink></li>
                  <li><NuxtLink to="/intro/what-life-do">{{ t('nav.whatLifeCanDo') }}</NuxtLink></li>
                  <li><NuxtLink to="/intro/how-to-use-life">{{ t('nav.howToUseLife') }}</NuxtLink></li>
                  <li><NuxtLink to="/intro/need-know"><a>{{ t('nav.thingsYouNeedToKnow') }}</a></NuxtLink></li>
                  <li><NuxtLink to="/intro/white-book"><a>{{ t('nav.whitepaper') }}</a></NuxtLink></li>
                  </ul>
              </nuxt-link>
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
            @click="toggleTheme" aria-label="Toggle Theme">
            <div class="relative w-full h-full flex items-center justify-center">
              <Icon name="mingcute:sun-fill" class="absolute w-5 h-5 transition-all duration-500 ease-spring"
                :class="isDark ? 'translate-y-8 opacity-0 rotate-90' : 'translate-y-0 opacity-100 rotate-0'" />
              <Icon name="mingcute:moon-fill" class="absolute w-5 h-5 transition-all duration-500 ease-spring"
                :class="isDark ? 'translate-y-0 opacity-100 rotate-0' : '-translate-y-8 opacity-0 -rotate-90'" />
            </div>
          </button>

          <!-- 连接钱包 (独立显示) -->
          <button
            class="btn btn-primary btn-sm font-bold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 hidden sm:flex">
            <span>{{ t('nav.connect_wallet') }}</span>
            <Icon name="mingcute:wallet-3-fill" class="w-4 h-4" />
          </button>

          <!-- 未登录状态 -->
          <nuxt-link v-if="!userStore.user" to="/auth/login"
            class="btn btn-primary btn-sm font-bold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
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
                  <div class="flex flex-col overflow-hidden">
                    <span class="font-bold text-base truncate leading-tight">{{ userStore.user?.username }}</span>
                    <span class="text-xs opacity-50 truncate mt-0.5">{{ userStore.user?.email }}</span>
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
const { t, changeLocale, currentLocaleShort } = useAppI18n()
const userStore = useUserStore();

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 20)
const isMobileMenuOpen = ref(false)
const themeBtnRef = ref(null)
const isDark = ref(true)

// 使用 computed 确保语言切换时菜单文字随之更新
const menuItems = computed(() => [
  { label: t('nav.home'), link: '/' },
  { label: t('nav.intro'), link: '/intro' },
  { label: t('nav.apps'), link: '/apps' },
  { label: t('nav.blog'), link: '/blog' },
])

onMounted(() => {
  const savedTheme = localStorage.getItem('life-theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    isDark.value = true
  }
  applyTheme()
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
const toggleTheme = () => {
  isDark.value = !isDark.value
  applyTheme()

  if (themeBtnRef.value) {
    animate(themeBtnRef.value, {
      scale: [0.8, 1],
      duration: 800,
      easing: 'easeOutElastic(1, .5)'
    })
  }
}
const applyTheme = () => {
  const themeName = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', themeName)
  localStorage.setItem('life-theme', themeName)
}

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