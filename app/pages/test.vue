<template>
  <div class="mt-32">
    <button class="btn btn-primary" @click="test">test</button>
    {{ useUserStore().user?.username }}
  </div>
</template>
<script lang="ts" setup>
const userStore = useUserStore();
async function test() {
  const data = await userStore.login("xjuunn@gmail.com", '123123')
  console.log(data);

} 
</script>