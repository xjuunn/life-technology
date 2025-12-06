<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const wrapperRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const backTopBtn = ref<HTMLElement | null>(null)
let smoother: ScrollSmoother | null = null

const scrollToTop = () => {
  if (smoother) {
    smoother.scrollTo(0, true)
  }
}

onMounted(async () => {
  await nextTick()
  if (!wrapperRef.value || !contentRef.value) return
  smoother = ScrollSmoother.create({
    wrapper: wrapperRef.value,
    content: contentRef.value,
    smooth: 1,
    effects: true,
    normalizeScroll: true,
    smoothTouch: 0.1
  })

  ScrollTrigger.create({
    start: 500,
    onToggle: (self) => {
      if (!backTopBtn.value) return
      gsap.to(backTopBtn.value, {
        autoAlpha: self.isActive ? 1 : 0,
        y: self.isActive ? 0 : 20,
        scale: self.isActive ? 1 : 0.8,
        duration: 0.4,
        ease: 'back.out(1.7)'
      })
    }
  })
})

onUnmounted(() => {
  if (smoother) {
    smoother.kill()
    smoother = null
  }
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <div class="font-sans">
    <div class="fixed top-0 left-0 w-full z-50">
      <common-nav />
    </div>
    <div ref="wrapperRef" class="fixed inset-0 w-full h-full overflow-hidden z-0">
      <div ref="contentRef" class="w-full min-h-screen flex flex-col will-change-transform">
        <main class="grow pt-22">
          <slot />
        </main>
        <common-footer />
      </div>
    </div>

    <button ref="backTopBtn" @click="scrollToTop"
      class="fixed bottom-8 right-8 z-[100] w-12 h-12 flex items-center justify-center rounded-full bg-primary text-primary-content shadow-lg shadow-primary/30 cursor-pointer opacity-0 invisible hover:scale-110 active:scale-95 transition-colors duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </div>
</template>
