<template>
  <div>
    <button class="btn btn-primary" @click="test">test</button>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
async function test() {
  const data = await userStore.getUserInfo();
  console.log(data);

}

</script>