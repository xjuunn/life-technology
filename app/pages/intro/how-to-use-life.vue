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
    <!-- 标题区域 -->
    <div class="hero bg-base-200 min-h-[50vh] floating-grid-bg">
      <div class="hero-content text-center">
        <div class="max-w-2xl">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold">
            如何使用
            <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">LIFE</span>
          </h1>
          <p class="py-6 text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto">
            开启您的 Web3 数字之旅
          </p>
          <button class="btn btn-primary btn-lg rounded-full shadow-lg hover:scale-105 transition-transform">
            立即开始
          </button>
        </div>
      </div>
    </div>

    <!-- 步骤时间线 -->
    <div class="py-16 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">使用步骤</h2>
          <p class="text-base-content/70 max-w-2xl mx-auto">
            跟随以下简单步骤，快速上手 LIFE 生态系统
          </p>
        </div>
        
        <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          <li v-for="(step, index) in steps" :key="step.id">
            <div class="timeline-middle">
              <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold">
                {{ step.id }}
              </div>
            </div>
            
            <div :class="index % 2 === 0 ? 'timeline-start mb-10 md:text-end' : 'timeline-end mb-10'">
              <div class="text-lg font-bold text-primary">{{ step.title }}</div>
              <div class="text-base-content/80">{{ step.description }}</div>
            </div>
            
            <hr v-if="index < steps.length - 1" :class="index % 2 === 0 ? 'timeline-end' : 'timeline-start'" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  animation: floatGrid 20s ease-in-out infinite;
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