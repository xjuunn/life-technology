<template>
  <div ref="containerRef" class=" h-screen container overflow-auto">
    <div ref="boxRef1" class="h-full"></div>
    <div ref="boxRef2" class="h-full"></div>
    <div ref="boxRef3" class="h-full"></div>
    <div ref="boxRef4" class="h-full"></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'empty' })
import { gsap } from 'gsap';
</script>