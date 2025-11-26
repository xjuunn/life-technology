<script setup lang="ts">
// 定义步骤类型接口（类型安全）
interface UseLifeStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

// 步骤数据
const steps: UseLifeStep[] = [
  {
    id: 1,
    title: "资产安全与私钥管理",
    description: "私钥/助记词是您资产的唯一凭证，任何人获取都能转移您的资产。请务必离线妥善备份，切勿泄露给任何人。请勿在邮箱、云存储、聊天工具或其他联网设备中存储私钥/助记词。官方团队不会以任何理由向您索取私钥、助记词或验证码。",
    icon: "🔑"
  },
  {
    id: 2,
    title: "防范诈骗与钓鱼",
    description: "警惕假冒客服、空投、投资回报等各类骗局。不要轻信陌生链接和二维码。访问 LIFE 官网和下载钱包时，请通过官方渠道核实，防止下载恶意软件。不要随意授权陌生 DApp，在授权前仔细核对应用来源和权限范围。",
    icon: "🛡️"
  },
  {
    id: 3,
    title: "交易与费用信息",
    description: "链上转账一经确认无法撤回，请仔细核对收款地址和金额。不同区块链网络的费用和确认速度不同，建议根据实际需求合理选择。部分 DApp 可能收取额外服务费，操作前请仔细阅读相关说明。",
    icon: "💸"
  },
  {
    id: 4,
    title: "隐私与合规",
    description: "LIFE 钱包不会收集、存储或上传您的任何个人数据。请遵守当地法律法规，合法合规使用数字资产及相关服务。部分国家/地区对加密资产有特殊政策，请在使用前了解相关规定。",
    icon: "🔒"
  },
  {
    id: 5,
    title: "常见问题",
    description: "忘记助记词怎么办？丢失助记词将导致资产永久丢失，官方无法帮您找回。钱包被盗怎么办？立即转移剩余资产至新钱包并检查设备安全。如何判断 DApp 是否安全？选择知名平台，查看社区评价，谨慎授权。如何联系客服？仅通过官网、官方社区等渠道联系，警惕假冒客服。",
    icon: "❓"
  },
  {
    id: 6,
    title: "官方与社区资源",
    description: "官方文档、白皮书、合约代码等均开源，欢迎查阅监督。加入官方社区获取最新动态和安全提醒。",
    icon: "🌐"
  }
];
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
    <!-- 标题区域 -->
    <div class="title hero min-h-screen floating-grid-bg">
      <div class="hero-content text-center z-10">
        <div class="max-w-2xl backdrop-blur-sm bg-white/30 dark:bg-black/30 p-8 rounded-2xl shadow-xl border border-white/50 dark:border-black/50">
          <div class="badge badge-primary mb-4">用户须知</div>
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              您需要知道的事情
            </span>
          </h1>
          
          <p class="py-4 text-lg text-base-content/90">
            专业的产品服务，相信自己的选择
          </p>
          
          <div class="mt-8">
            <button class="btn btn-primary btn-lg glass animate-bounce">
              开始使用
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 列表区域 -->
    <div class="max-w-6xl mx-auto p-6 -mt-32 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="step in steps" 
          :key="step.id"
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-base-200"
        >
          <div class="card-body">
            <div class="flex items-start space-x-4">
              <div class="text-3xl p-3 rounded-xl bg-primary/10 text-primary">
                {{ step.icon }}
              </div>
              <div>
                <h2 class="card-title text-lg font-bold text-primary">{{ step.id }}. {{ step.title }}</h2>
                <p class="mt-3 text-base-content/80">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-12 mb-8">
        <button class="btn btn-secondary btn-lg glass" @click="$router.back()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          返回
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  height: 100vh;
}

/* 浮动网格背景样式 */
.floating-grid-bg {
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at 10% 20%, hsl(var(--pc)/0.1) 0%, transparent 20%),
              radial-gradient(circle at 90% 80%, hsl(var(--sc)/0.1) 0%, transparent 20%);
}

.floating-grid-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: floatGrid 30s ease-in-out infinite;
  z-index: 0;
}

@keyframes floatGrid {
  0% {
    transform: translate(0, 0) scale(1);
    background-size: 40px 40px;
  }
  25% {
    transform: translate(-10px, 15px) scale(1.05);
    background-size: 45px 45px;
  }
  50% {
    transform: translate(15px, -10px) scale(0.95);
    background-size: 35px 35px;
  }
  75% {
    transform: translate(5px, 20px) scale(1.02);
    background-size: 42px 42px;
  }
  100% {
    transform: translate(0, 0) scale(1);
    background-size: 40px 40px;
  }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>