<template>
  <div class="mt-32">
    <button class="btn btn-primary" @click="test">test</button>
  </div>
</template>
<script lang="ts" setup>
async function test() {
  const { code, data, message, success, error } = await ApiList.Test.health();
  console.log(code, data, message, success, error);
}
</script>