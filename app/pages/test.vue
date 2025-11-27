<template>
  <common-editor v-model="data" />
  <pre class="text-sm mt-4">{{ JSON.stringify(data, null, 2) }}</pre>
  <editor-content :editor="editor" class="prose max-w-none mt-4" />
</template>
<script setup lang="ts">
import { EditorContent, useEditor } from "@tiptap/vue-3"
import StarterKit from "@tiptap/starter-kit"
import { watch } from "vue"
const data = ref<any>(null)
const props = defineProps<{
  content: any
}>()

const editor = useEditor({
  editable: false,
  extensions: [StarterKit],
  content: props.content
})

watch(
  () => data.value,
  (newValue) => {
    if (editor.value && newValue) {
      editor.value.commands.setContent(newValue)
    }
  },
  { deep: true }
)
</script>