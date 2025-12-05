<template>
  <div>
    <button class="btn btn-secondary" @click="test">test</button>
    <div ref="testRef" class="border-3 rounded-xl w-24 h-24 flex items-center justify-center">
      1
    </div>
    <div ref="testRef2" class="border-3 rounded-xl w-24 h-24 flex items-center justify-center">
      2
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "empty" })
import { gsap } from 'gsap';
const testRef = useTemplateRef('testRef');
let t1 = true;
const testRef2 = useTemplateRef('testRef2');
import { animate } from 'animejs';
let t2 = true;

function test() {
  gsap.to(testRef.value, {
    x: t1 ? 300 : 0,
    ease: "expo.inOut",
    duration: 1
  })
  t1 = !t1;

  if (testRef2.value)
    animate(testRef2.value, {
      x: t2 ? 300 : 0,
      ease: 'inOutExpo',
      duration: 1000
    })
  t2 = !t2;
}
</script>