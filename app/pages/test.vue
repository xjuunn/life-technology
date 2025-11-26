<template>
  <button class="btn btn-primary" @click="test">test</button>
</template>
<script lang="ts" setup>
function test() {
  console.log(import.meta.env.VITE_BACKBASE_URL);

}

</script>