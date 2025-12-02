<script setup lang="ts">
/**
 * T (Text) Component
 * 用于在 HTML 中直接内联多语言文本
 */

interface Props {
  zh: string       // 简体中文 (必填)
  en: string       // 英文 (必填)
  tw?: string      // 繁体中文 (选填，若为空自动回退到简体)
  tag?: string     // 渲染的 HTML 标签 (默认 span)
}

// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  tag: 'span',
  tw: ''
})

const { locale } = useI18n()

// 计算当前应该显示的文本
const text = computed(() => {
  const current = locale.value

  // 英文环境
  if (current === 'en') {
    return props.en || props.zh
  }

  // 繁体环境
  if (current === 'zh-TW') {
    // 如果没有提供繁体，回退显示简体
    return props.tw || props.zh
  }

  // 默认简体
  return props.zh
})
</script>

<template>
  <component :is="tag" :class="$attrs.class">
    {{ text }}
  </component>
</template>