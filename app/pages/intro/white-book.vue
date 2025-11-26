<script setup lang="ts">
// 定义白皮书内容接口
interface WhitePaperContent {
  version: string;
  releaseDate: string;
  title: string;
  subtitle: string;
  disclaimer: string;
}

// 白皮书数据
const whitePaper: WhitePaperContent = {
  version: "2.1 (集成版)",
  releaseDate: "2025年9月1日",
  title: "LifeChain:一个基于拥有硬件级安全主权公链的Web3社交健康生态系统",
  subtitle: "将健康数据的所有权和数字资产的控制权归还给用户，赋能数字经济，构建绿色智能的生活方式生态系统",
  disclaimer: "重要声明与风险提示:本白皮书阐述了LifeChain项目的技术愿景、发展路线图和生态蓝图。它不构成投资建议、证券出售要约或购买承诺。本文档基于发布日期为止的可用信息,未来可能在不事先通知的情况下进行...待更新中..."
};
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- 标题区域 -->
    <div class="title hero bg-base-200 min-h-screen floating-grid-bg">
      <div class="hero-content text-center">
        <div class="max-w-2xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
              LifeChain白皮书
            </span>
          </h1>
          <div class="py-4">
            <h2 class="text-xl md:text-2xl font-semibold mb-4">{{ whitePaper.title }}</h2>
            <p class="text-lg md:text-xl py-4">{{ whitePaper.subtitle }}</p>
            <div class="badge badge-primary badge-outline mt-2">
              版本 {{ whitePaper.version }}
            </div>
            <div class="text-sm mt-2 opacity-75">
              发布日期: {{ whitePaper.releaseDate }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 免责声明区域 -->
    <div class="max-w-4xl mx-auto p-6">
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <h2 class="card-title text-warning">
            <i class="fas fa-exclamation-triangle mr-2"></i>
            重要声明与风险提示
          </h2>
          <p class="whitespace-pre-line">{{ whitePaper.disclaimer }}</p>
        </div>
      </div>
      
      <div class="text-center mt-8 pb-8">
        <button class="btn btn-primary" @click="$router.back()">
          返回
        </button>
      </div>
    </div>
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

/* 深色模式下的网格背景 */
[data-theme="dark"] .floating-grid-bg::before {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
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