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
    <!-- <nav-bar /> -->

    <!-- 标题区域 -->
  
    <div class="title hero bg-base-200 min-h-screen floating-grid-bg">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">如何使用
        <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">LIFE</span></h1>
      <p class="py-6">
        开启您的 Web3 数字之旅
      </p>
      <button class="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>

    <!-- 步骤时间线 -->
    <ul class="list timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
      <li v-for="(step, index) in steps" :key="step.id">
        <div class="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div :class="index % 2 === 0 ? 'timeline-start mb-10 md:text-end' : 'timeline-end md:mb-10'">
          <time class="font-mono italic">{{ step.id }}</time>
          <div class="text-lg font-black">{{ step.title }}</div>
          {{ step.description }}
        </div>
        <hr v-if="index < steps.length - 1" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.list {
  width:800px;
  margin:0 auto;
}
.title{
  height: 300px;
}

/* 浮动网格背景样式 */
.floating-grid-bg {
  position: relative;
  overflow: hidden;
}

.floating-grid-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  animation: floatGrid 20s linear infinite;
  z-index: 0;
}

@keyframes floatGrid {
  0% {
    transform: translate(0, 0);
    background-size: 30px 30px;
  }
  50% {
    transform: translate(15px, 15px);
    background-size: 35px 35px;
  }
  100% {
    transform: translate(0, 0);
    background-size: 30px 30px;
  }
}

.hero-content {
  position: relative;
  z-index: 1;
}
</style>