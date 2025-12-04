<template>
  <div class="h-[80vh] flex items-center justify-center">
    <title>life-测试</title>
    <div ref="testRef" class="text-5xl w-[50vw]">LIFE
      致力于构建可信的数字未来。利用区块链分布式账本技术，将个人数据转化为可视化的数字资产，打造安全、合规的数字管理终端，提升个人数据的价值与意义。</div>
  </div>
</template>

<script setup lang="ts">
import { splitText, animate, stagger } from 'animejs';
const testRef = useTemplateRef('testRef');

onMounted(() => {
  if (testRef.value) {
    const charts = splitText(testRef.value, {
      chars: true,
    });
    console.log(charts.$target.children);
    
    animate(charts.$target.children, {
      y: '-100px',
      delay: stagger(10)
    })


  }
})
</script>