import { Image } from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'

export const EditorImage = Image.configure({
  inline: false,
  allowBase64: false,
  HTMLAttributes: {
    class: 'rounded-xl shadow-lg my-6 max-w-full h-auto block mx-auto'
  },
})

export const GlobalEditorExtensions = [
  StarterKit,
  EditorImage
]