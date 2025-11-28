<template>
  <common-editor v-model="data" />
  <pre class="text-sm mt-4">{{ JSON.stringify(data, null, 2) }}</pre>
</template>
<script setup lang="ts">
import { type JSONContent } from "@tiptap/vue-3"
const data = ref<JSONContent>()

</script>
