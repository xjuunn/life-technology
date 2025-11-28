<template>
  <button class="btn btn-primary" @click="test">test</button>

</template>
<script setup lang="ts">
function test() {
  useToast().success('成功')
  useToast().info('提示')
  useToast().error('错误')
  useToast().warning('警告')
}

</script>
