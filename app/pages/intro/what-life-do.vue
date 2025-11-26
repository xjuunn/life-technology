<script setup lang="ts">
// 定义功能类型接口
interface Capability {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
  color: 'primary' | 'secondary' | 'accent';
}

// 功能数据
const capabilities: Capability[] = [
  {
    id: 1,
    icon: "mingcute:wallet-3-fill",
    title: "数字资产管理",
    description: "安全、便捷地管理您的多链数字资产",
    features: [
      "支持 50+ 主流公链资产",
      "实时资产余额与价值展示",
      "一键跨链资产转移",
      "交易历史记录查询"
    ],
    color: "primary"
  },
  {
    id: 2,
    icon: "mingcute:user-safe-fill",
    title: "数字身份与数据主权",
    description: "完全掌控您的数字身份和个人数据",
    features: [
      "去中心化数字身份(DID)",
      "零知识证明隐私保护",
      "数据授权与收益分享",
      "链上足迹管理"
    ],
    color: "secondary"
  },
  {
    id: 3,
    icon: "mingcute:earth-fill",
    title: "Web3 生态探索",
    description: "无缝接入丰富的 Web3 应用生态",
    features: [
      "内置 DApp 浏览器",
      "DeFi 协议一键接入",
      "NFT 市场直连",
      "GameFi 游戏入口"
    ],
    color: "accent"
  },
  {
    id: 4,
    icon: "mingcute:community-fill",
    title: "社区治理参与",
    description: "参与生态建设，共享发展成果",
    features: [
      "LIF 代币治理投票",
      "社区提案与讨论",
      "生态收益分配",
      "共建者奖励计划"
    ],
    color: "primary"
  },
  {
    id: 5,
    icon: "mingcute:shield-check-fill",
    title: "安全与隐私保护",
    description: "企业级安全防护，守护您的数字资产",
    features: [
      "硬件级私钥保护",
      "多重签名钱包",
      "防钓鱼安全检测",
      "交易风险预警"
    ],
    color: "secondary"
  },
  {
    id: 6,
    icon: "mingcute:rocket-2-fill",
    title: "创新功能体验",
    description: "体验前沿的区块链技术创新",
    features: [
      "社交恢复钱包",
      "智能合约交互",
      "Layer2 快速交易",
      "去中心化存储"
    ],
    color: "accent"
  }
];

// 使用场景数据
const useCases = [
  {
    category: "个人用户",
    scenarios: [
      "安全存储数字货币资产",
      "管理 NFT 数字藏品",
      "参与 DeFi 收益耕作",
      "建立去中心化数字身份"
    ]
  },
  {
    category: "开发者",
    scenarios: [
      "快速接入 DApp 应用",
      "测试智能合约功能",
      "参与生态开发建设",
      "获取开发技术支持"
    ]
  },
  {
    category: "企业用户",
    scenarios: [
      "数字资产财务管理",
      "区块链业务集成",
      "用户身份认证",
      "数据存证与验证"
    ]
  }
];
</script>

<template>
  <div class="min-h-screen bg-base-100 text-base-content font-sans selection:bg-primary selection:text-primary-content">
    <!-- 背景装饰 -->
    <div class="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div class="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[100px] opacity-50"></div>
      <div class="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-secondary/5 rounded-full blur-[100px] opacity-50"></div>
      <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
    </div>

    <!-- Hero 区域 -->
    <section class="relative pt-32 pb-20 px-4 md:px-8">
      <div class="container mx-auto max-w-6xl">
        <div class="max-w-3xl">
          <div class="badge badge-primary badge-outline mb-6 font-bold tracking-wider py-4 px-4">
            解锁数字生活新体验
          </div>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-8">
            LIFE 能为你
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">做什么</span>
          </h1>
          <p class="text-xl text-base-content/70 leading-relaxed max-w-2xl">
            从数字资产管理到 Web3 生态探索，LIFE 为您提供全方位的数字生活解决方案，让您在区块链世界中游刃有余。
          </p>
        </div>
      </div>
    </section>

    <!-- 核心功能区域 -->
    <section class="py-16 px-4 md:px-8">
      <div class="container mx-auto max-w-6xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <div 
            v-for="capability in capabilities" 
            :key="capability.id"
            class="card bg-base-100 border border-base-content/5 shadow-lg hover:shadow-2xl transition-all duration-300 group"
            :class="{
              'hover:border-primary/20': capability.color === 'primary',
              'hover:border-secondary/20': capability.color === 'secondary',
              'hover:border-accent/20': capability.color === 'accent'
            }"
          >
            <div class="card-body p-8">
              <!-- 图标区域 -->
              <div 
                class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                :class="{
                  'bg-primary/10 text-primary': capability.color === 'primary',
                  'bg-secondary/10 text-secondary': capability.color === 'secondary',
                  'bg-accent/10 text-accent': capability.color === 'accent'
                }"
              >
                <Icon :name="capability.icon" size="32" />
              </div>

              <!-- 标题和描述 -->
              <h3 class="card-title text-xl font-bold mb-3">{{ capability.title }}</h3>
              <p class="text-base-content/60 mb-6 leading-relaxed">{{ capability.description }}</p>

              <!-- 特性列表 -->
              <div class="space-y-3">
                <div 
                  v-for="(feature, index) in capability.features" 
                  :key="index"
                  class="flex items-center gap-3 text-sm"
                >
                  <div 
                    class="w-2 h-2 rounded-full shrink-0"
                    :class="{
                      'bg-primary': capability.color === 'primary',
                      'bg-secondary': capability.color === 'secondary',
                      'bg-accent': capability.color === 'accent'
                    }"
                  ></div>
                  <span class="text-base-content/80">{{ feature }}</span>
                </div>
              </div>

              <!-- 悬浮效果指示器 -->
              <div class="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div 
                  class="w-full h-full"
                  :class="{
                    'bg-gradient-to-r from-primary to-primary/50': capability.color === 'primary',
                    'bg-gradient-to-r from-secondary to-secondary/50': capability.color === 'secondary',
                    'bg-gradient-to-r from-accent to-accent/50': capability.color === 'accent'
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 使用场景区域 -->
    <section class="py-24 px-4 md:px-8 bg-base-200/30">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-16 max-w-2xl mx-auto">
          <h2 class="text-3xl md:text-5xl font-bold mb-6">适用场景</h2>
          <p class="text-base-content/60 text-lg">
            无论您是个人用户、开发者还是企业，LIFE 都能满足您的不同需求
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(useCase, index) in useCases" 
            :key="index"
            class="card bg-base-100 border border-base-content/5 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
          >
            <div class="card-body p-8">
              <div class="text-center mb-6">
                <div class="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Icon 
                    :name="[
                      'mingcute:user-4-fill',
                      'mingcute:code-fill', 
                      'mingcute:building-4-fill'
                    ][index]" 
                    size="24" 
                  />
                </div>
                <h3 class="text-xl font-bold text-primary">{{ useCase.category }}</h3>
              </div>

              <div class="space-y-4">
                <div 
                  v-for="(scenario, sIndex) in useCase.scenarios" 
                  :key="sIndex"
                  class="flex items-start gap-3 p-3 rounded-lg bg-base-200/50 group-hover:bg-base-200 transition-colors duration-300"
                >
                  <Icon name="mingcute:check-2-fill" class="text-primary shrink-0 mt-0.5" size="16" />
                  <span class="text-base-content/80 text-sm leading-relaxed">{{ scenario }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 价值主张区域 -->
    <section class="py-24 px-4 md:px-8">
      <div class="container mx-auto max-w-6xl">
        <div class="flex flex-col lg:flex-row items-center gap-16">
          <div class="w-full lg:w-1/2">
            <div class="badge badge-primary mb-4">核心价值</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-6">重新定义您的数字生活体验</h2>
            
            <div class="space-y-6">
              <div class="flex items-start gap-4 p-6 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors duration-300">
                <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Icon name="mingcute:lightning-fill" size="24" />
                </div>
                <div>
                  <h4 class="font-bold text-lg mb-2">极简操作体验</h4>
                  <p class="text-base-content/60">精心设计的用户界面，让复杂的区块链操作变得简单直观，新手也能快速上手。</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4 p-6 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors duration-300">
                <div class="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <Icon name="mingcute:safe-shield-fill" size="24" />
                </div>
                <div>
                  <h4 class="font-bold text-lg mb-2">全方位安全防护</h4>
                  <p class="text-base-content/60">多层次安全体系，从私钥管理到交易验证，全面保障您的资产和数据安全。</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4 p-6 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors duration-300">
                <div class="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <Icon name="mingcute:puzzle-2-fill" size="24" />
                </div>
                <div>
                  <h4 class="font-bold text-lg mb-2">生态无缝集成</h4>
                  <p class="text-base-content/60">与主流 Web3 应用深度集成，一个钱包即可畅游整个区块链生态。</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="w-full lg:w-1/2 relative">
            <div class="absolute -inset-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl opacity-30"></div>
            <div class="relative bg-base-100 border border-base-content/10 rounded-3xl p-8 aspect-square flex items-center justify-center">
              <div class="text-center">
                <div class="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-8">
                  <Icon name="mingcute:heart-fill" class="text-white" size="48" />
                </div>
                <h3 class="text-2xl font-bold mb-4">您的数字生活助手</h3>
                <p class="text-base-content/60">
                  LIFE 不仅仅是钱包，更是您在 Web3 世界中的贴心伙伴，陪伴您探索数字未来的每一步。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA 区域 -->
    <section class="py-20 px-4 md:px-8 bg-base-content text-base-100">
      <div class="container mx-auto max-w-4xl text-center">
        <h2 class="text-3xl md:text-5xl font-bold mb-6">准备好体验 LIFE 的强大功能了吗？</h2>
        <p class="text-base-100/60 text-lg mb-8 max-w-2xl mx-auto">
          立即开始您的 Web3 之旅，发现 LIFE 为您带来的无限可能
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="btn btn-primary btn-lg rounded-full px-8 text-white">
            立即体验
        
          </button>
           <button class="btn btn-primary btn-lg rounded-full px-8 text-white hover:bg-blue-600">
            查看教程
            <Icon name="mingcute:book-open-fill" size="20" />
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 自定义动画效果 */
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
}

/* 确保图标动画流畅 */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}
</style>