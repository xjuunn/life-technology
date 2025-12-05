<script setup lang="ts">
import { onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollSmoother)

const wrapperRef = useTemplateRef('wrapperRef')
const contentRef = useTemplateRef('contentRef')

let smoother: ScrollSmoother | null = null

onMounted(async () => {
  // 必须确保客户端
  if (!process.client) return

  // 必须等待 DOM 完整挂载
  await nextTick()

  if (!wrapperRef.value || !contentRef.value) return

  smoother = ScrollSmoother.create({
    wrapper: wrapperRef.value,
    content: contentRef.value,
    smooth: 1.5,
  })
})

onUnmounted(() => {
  smoother?.kill()
  smoother = null
})
</script>


<template>
  <div ref="wrapperRef" class="min-h-screen flex flex-col font-sans">
    <common-nav></common-nav>
    <main ref="contentRef" class="mt-22 min-h-[calc(100vh-84px)] flex flex-col">
      <slot />
    </main>
    <common-footer></common-footer>
  </div>
</template>