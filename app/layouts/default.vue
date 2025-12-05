<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
const wrapperRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
let smoother: ScrollSmoother | null = null
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
  </div>
</template>