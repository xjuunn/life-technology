<template>
  <editor-content :editor="editor" class="prose max-w-none mt-4" />
</template>

<script setup lang="ts">
import { EditorContent, useEditor} from "@tiptap/vue-3"
import StarterKit from "@tiptap/starter-kit"
const editor = useEditor({
  editable: false,
  extensions: [StarterKit],
  content: {
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "123123"
        }
      ]
    }
  ]
},
})
</script>
