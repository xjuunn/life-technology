<template>
  <ContentRenderer v-if="data" :value="data" />
  <div v-else>Home not found</div>

  <button class="btn btn-primary" @click="test">test</button> {{ locale }}
</template>
<script setup lang="ts">
import type { IntroCollectionItem } from '@nuxt/content';

const { locale } = useAppI18n();
let data = ref<IntroCollectionItem | null>();
async function test() {
  const path = "/whitepaper/" + locale.value.toLowerCase();
  data.value = await queryCollection('intro').where('path', 'LIKE', path).first()
  console.log(path, data.value);


}
</script>
