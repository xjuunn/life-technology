<template>
  <div>
    <button class="btn btn-primary" @click="test">test</button>
  </div>
</template>
<script lang="ts" setup>
async function test() {
  const data = await ApiList.auth.profile();
  console.log(data);

} 
</script>