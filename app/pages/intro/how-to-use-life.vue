how-to-use-life.vue
<script setup lang="ts">
// 定义步骤类型接口（类型安全）
interface UseLifeStep {
  id: number;
  title: string;
  description: string;
}

// 步骤数据
const steps: UseLifeStep[] = [
  {
    id: 1,
    title: "下载并安装 LIFE 钱包",
    description: "前往官网或应用商店，下载适合您设备的 LIFE 钱包应用，并完成安装。"
  },
  {
    id: 2,
    title: "创建或导入钱包",
    description: "首次使用可选择「创建新钱包」并妥善备份助记词，或选择「导入钱包」输入已有助记词/私钥以恢复资产。"
  },
  {
    id: 3,
    title: "资产管理与支付",
    description: "在钱包首页可查看多链资产余额，点击「收款」获取地址，或点击「转账」输入收款地址与金额完成转账。"
  },
  {
    id: 4,
    title: "数据主权与隐私设置",
    description: "在「隐私与安全」中设置数据授权、链上足迹清理、零知识证明等功能，保护您的数据主权与隐私。"
  },
  {
    id: 5,
    title: "体验 Web3 应用",
    description: "通过内置 DApp 浏览器访问 DeFi、NFT、GameFi、DAO 等 Web3 应用，参与创新生态。"
  },
  {
    id: 6,
    title: "参与社区与治理",
    description: "持有 LIF 可参与社区治理、提案与投票，成为 LIFE 生态的共建者。"
  },
  {
    id: 7,
    title: "备份与安全提醒",
    description: "定期备份钱包助记词，切勿泄露私钥。丢失助记词将导致资产永久丢失。"
  }
];
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- 导航栏组件（遵循PascalCase组件名，模板中用kebab-case） -->
    <nav-bar />

    <!-- 标题区域 -->
    <section class="bg-primary text-primary-content py-10">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-3xl md:text-4xl font-bold mb-2">如何使用 
          <span class="text-3xl md:text-4xl font-bold mb-2">LIFE</span></h1>
        <p class="text-primary-content/70">开启您的 Web3 数字之旅</p>
      </div>
    </section>

    <!-- 步骤时间线 -->
    <section class="container mx-auto px-4 py-12">
      <div class="max-w-3xl mx-auto relative">
        <!-- 垂直引导线 -->
        <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>

        <!-- 步骤列表 -->
        <div class="space-y-12">
          <div 
            v-for="step in steps" 
            :key="step.id"
            class="flex flex-col md:flex-row items-center"
            :class="{
              'md:flex-row-reverse': step.id % 2 === 0
            }"
          >
           

            <!-- 步骤内容 -->
            <div class="md:w-1/2" :class="{
              'pl-8': step.id % 2 === 1,
              'pr-8': step.id % 2 === 0
            }">
              <div class="bg-base-200 p-4 rounded-lg shadow-sm">
                <h3 class="font-bold text-primary mb-2">{{step.id}}.{{ step.title }}</h3>
                <p class="text-base-content">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>