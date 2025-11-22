<template>
  <nav class="fixed top-0 w-full z-50 transition-all duration-500 border-b" :class="[
    isScrolled
      ? 'bg-base-100/85 backdrop-blur-xl border-base-content/10 py-3'
      : 'bg-transparent border-transparent py-5'
  ]">
    <div class="container mx-auto px-4">
      <div class="navbar min-h-12 p-0 justify-between">
        <div class="flex items-center gap-4 z-[60]">
          <button class="btn btn-circle btn-ghost md:hidden text-base-content" @click="toggleMobileMenu">
            <Icon :name="isMobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3-bottom-left'" size="24"
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
            <li v-for="(item, index) in menuItems" :key="index">
              <nuxt-link :to="item.link"
                class="relative text-base-content/70 hover:text-base-content hover:bg-transparent transition-colors py-2 px-5 group overflow-hidden">
                {{ item.label }}
                <span
                  class="absolute bottom-1 left-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent -translate-x-1/2 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="flex items-center gap-2 z-[60]">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button"
              class="btn btn-ghost btn-circle btn-sm md:btn-md md:w-auto md:px-3 md:rounded-full hover:bg-base-content/5">
              <Icon name="heroicons:language" class="w-5 h-5" />
              <span class="hidden md:inline text-xs font-bold ml-1">CN</span>
            </div>
            <ul tabindex="0"
              class="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 border border-base-content/5 rounded-xl w-32 mt-4 backdrop-blur-md">
              <li><a class="active:bg-primary active:text-primary-content">简体中文</a></li>
              <li><a>繁体中文</a></li>
              <li><a>English</a></li>
            </ul>
          </div>
          <button ref="themeBtnRef"
            class="btn btn-ghost btn-circle btn-sm md:btn-md hover:bg-base-content/5 text-base-content overflow-hidden"
            @click="toggleTheme" aria-label="Toggle Theme">
            <div class="relative w-full h-full flex items-center justify-center">
              <Icon name="heroicons:sun-20-solid" class="absolute w-5 h-5 transition-all duration-500 ease-spring"
                :class="isDark ? 'translate-y-8 opacity-0 rotate-90' : 'translate-y-0 opacity-100 rotate-0'" />
              <Icon name="heroicons:moon-20-solid" class="absolute w-5 h-5 transition-all duration-500 ease-spring"
                :class="isDark ? 'translate-y-0 opacity-100 rotate-0' : '-translate-y-8 opacity-0 -rotate-90'" />
            </div>
          </button>
          <button
            class="btn btn-primary btn-sm md:btn-md rounded-full font-bold shadow-lg shadow-primary/20 border-none text-primary-content ml-1 group transition-all duration-300 hover:scale-105 active:scale-95">
            <span class="hidden md:inline">连接钱包</span>
            <span class="md:hidden">连接</span>
            <Icon name="heroicons:wallet" class="w-4 h-4 transition-transform group-hover:-rotate-12" />
          </button>
        </div>
      </div>
    </div>
    <div v-show="isMobileMenuOpen"
      class="fixed inset-0 z-[49] bg-base-100/95 backdrop-blur-2xl md:hidden flex flex-col pt-28 px-6 h-screen w-screen overscroll-contain">
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
        <p>LIFE TECHNOLOGY</p>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { animate, stagger } from 'animejs'

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 20)
const isMobileMenuOpen = ref(false)
const themeBtnRef = ref(null)
const isDark = ref(true)

const menuItems = [
  { label: '首页', link: '/' },
  { label: '介绍', link: '/introduction' },
  { label: '应用', link: '/apps' },
  { label: '博客', link: '/blog' },
]

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