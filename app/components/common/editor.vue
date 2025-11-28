<template>
  <div
    class="card bg-base-100/60 backdrop-blur-md border border-base-content/10 shadow-sm overflow-hidden flex flex-col w-full">
    <div v-if="editor" class="flex flex-wrap items-center gap-1 p-2 border-b border-base-content/10 bg-base-200/50">
      <button v-for="(item, index) in toolbarItems" :key="index" @click="item.action" :class="[
        'btn btn-sm btn-ghost btn-square min-h-8 h-8 w-8 rounded-lg',
        item.isActive() ? 'bg-primary/10 text-primary' : 'text-base-content/70 hover:bg-base-content/10'
      ]" :title="item.title" :disabled="disabled" type="button">
        <Icon :name="item.icon" class="w-4 h-4" />
      </button>
      <div class="w-px h-5 bg-base-content/10 mx-1"></div>
      <button @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run() || disabled"
        class="btn btn-sm btn-ghost btn-square min-h-8 h-8 w-8 rounded-lg text-base-content/70">
        <Icon name="mingcute:back-line" class="w-4 h-4" />
      </button>
      <button @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run() || disabled"
        class="btn btn-sm btn-ghost btn-square min-h-8 h-8 w-8 rounded-lg text-base-content/70">
        <Icon name="mingcute:forward-line" class="w-4 h-4" />
      </button>
      <slot name="toolbar" :editor="editor"></slot>
      <div class="ml-auto flex items-center gap-2">
        <slot name="toolbar-end" :editor="editor"></slot>
      </div>
    </div>
    <editor-content :editor="editor"
      class="flex-1 overflow-y-auto min-h-[150px] max-h-[600px] p-4 cursor-text prose max-w-none focus:outline-none" />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent, type JSONContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import type { AnyExtension } from '@tiptap/core'
import { watch, onBeforeUnmount, computed, type PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object as PropType<JSONContent>,
    default: () => ({
      "type": "doc",
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "#"
            }
          ]
        }
      ]
    }),
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  extensions: {
    type: Array as PropType<AnyExtension[]>,
    default: () => [],
  }
})
const emit = defineEmits(['update:modelValue', 'change'])
const editor = useEditor({
  content: props.modelValue,
  editable: !props.disabled,
  extensions: [
    StarterKit.configure({
      heading: { levels: [1, 2, 3] },
    }),
    ...props.extensions
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose-base focus:outline-none min-h-[150px]',
    },
  },
  onUpdate: ({ editor }) => {
    const json = editor.getJSON()
    emit('update:modelValue', json)
    emit('change', json)
  },
})
watch(() => props.modelValue, (newValue) => {
  if (!editor.value) return
  const currentContent = editor.value.getJSON()
  if (JSON.stringify(currentContent) !== JSON.stringify(newValue)) {
    editor.value.commands.setContent(newValue)
  }
}, { deep: true })

watch(() => props.disabled, (val) => {
  editor.value?.setEditable(!val)
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

const toolbarItems = computed(() => {
  if (!editor.value) return []

  return [
    {
      title: 'Bold',
      icon: 'mingcute:bold-line',
      action: () => editor.value?.chain().focus().toggleBold().run(),
      isActive: () => editor.value?.isActive('bold')
    },
    {
      title: 'Italic',
      icon: 'mingcute:italic-line',
      action: () => editor.value?.chain().focus().toggleItalic().run(),
      isActive: () => editor.value?.isActive('italic')
    },
    {
      title: 'Strike',
      icon: 'mingcute:strikethrough-line',
      action: () => editor.value?.chain().focus().toggleStrike().run(),
      isActive: () => editor.value?.isActive('strike')
    },
    {
      title: 'Code',
      icon: 'mingcute:code-line',
      action: () => editor.value?.chain().focus().toggleCode().run(),
      isActive: () => editor.value?.isActive('code')
    },
    {
      title: 'H1',
      icon: 'mingcute:heading-1-line',
      action: () => editor.value?.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.value?.isActive('heading', { level: 1 })
    },
    {
      title: 'H2',
      icon: 'mingcute:heading-2-line',
      action: () => editor.value?.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.value?.isActive('heading', { level: 2 })
    },
    {
      title: 'Bullet List',
      icon: 'mingcute:list-check-line',
      action: () => editor.value?.chain().focus().toggleBulletList().run(),
      isActive: () => editor.value?.isActive('bulletList')
    },

    {
      title: 'Ordered List',
      icon: 'mingcute:list-ordered-line',
      action: () => editor.value?.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.value?.isActive('orderedList')
    },
    {
      title: 'Blockquote',
      icon: 'mingcute:quote-left-line',
      action: () => editor.value?.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.value?.isActive('blockquote')
    },
    {
      title: 'Horizontal Rule',
      icon: 'mingcute:minimize-line',
      action: () => editor.value?.chain().focus().setHorizontalRule().run(),
      isActive: () => false
    }
  ]
})
</script>

<style scoped>
:deep(.ProseMirror) {
  outline: none;
  min-height: 150px;
}

:deep(.ProseMirror p.is-editor-empty:first-child::before) {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>