<script setup lang="ts">
const dialog = useDialog()
const toast = useToast()

// 示例 1: 基础确认框
const handleDelete = async () => {
  const isConfirmed = await dialog.confirm({
    title: '删除确认',
    content: '你确定要删除这条重要数据吗？此操作无法撤销。',
    type: 'warning',
    confirmText: '立即删除',
  })

  if (isConfirmed) {
    // 调用 API
    await new Promise(r => setTimeout(r, 1000))
    toast.success('删除成功')
  } else {
    toast.info('已取消操作')
  }
}

// 示例 2: 简单 Alert
const showInfo = async () => {
  await dialog.alert('操作成功，积分已到账！')
  console.log('用户关闭了弹窗')
}

// 示例 3: 错误提示
const showError = () => {
  dialog.error('服务器连接超时，请检查网络设置。')
}
</script>

<template>
  <div class="p-10 flex flex-col gap-4 items-start">
    <h1 class="text-2xl font-bold">Dialog Demo</h1>

    <button class="btn btn-warning" @click="handleDelete">
      <Icon name="mingcute:delete-2-fill" />
      测试删除确认 (Async/Await)
    </button>

    <button class="btn btn-info" @click="showInfo">
      测试普通提示
    </button>

    <button class="btn btn-error" @click="showError">
      测试错误提示
    </button>
  </div>
</template>