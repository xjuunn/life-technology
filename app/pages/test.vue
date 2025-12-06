<template>
  <div ref="wrapperRef" class="h-screen overflow-auto w-screen">
    <div ref="contentRef" class="h-[300vh] flex gap-3 items-center justify-center">
      <div data-speed="0.1"  data-lag="0.1" class="w-24 h-24 rounded-lg bg-base-content"></div>
      <div data-speed="0.2"  data-lag="0.2" class="w-24 h-24 rounded-lg bg-base-content"></div>
      <div data-speed="0.3"  data-lag="0.9" class="w-24 h-24 rounded-lg bg-base-content"></div>
      <div data-speed="0.4"  data-lag="0.2" class="w-24 h-24 rounded-lg bg-base-content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'empty' })
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const wrapperRef = useTemplateRef('wrapperRef');
const contentRef = useTemplateRef('contentRef');
let smooter: ScrollSmoother | null = null;
useGsap((ctx) => {
  smooter = ScrollSmoother.create({
    content: contentRef.value,
    wrapper: wrapperRef.value,
    smooth: 1,
    effects: true
  })
})

onUnmounted(() => {
  smooter?.kill();
  smooter = null;
})

</script>