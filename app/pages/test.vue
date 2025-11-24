<template>
  <div class="mt-32">
    <button class="btn btn-primary" @click="test">test</button>
    {{ userStore.user?.username }}
  </div>
</template>
<script lang="ts" setup>
const userStore = useUserStore();
async function test() {


} 
</script>