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
            探索数字未来
          </div>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-8">
            什么是
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">LIFE</span>
          </h1>
          <p class="text-xl text-base-content/70 leading-relaxed max-w-2xl">
            LIFE是一个革命性的区块链生态系统，旨在通过去中心化技术重新定义数字生活体验，让每个人都能掌控自己的数字资产和身份。
          </p>
        </div>
      </div>
    </section>

    <!-- 核心概念区域 -->
    <section class="py-16 px-4 md:px-8">
      <div class="container mx-auto max-w-6xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <div 
            v-for="concept in coreConcepts" 
            :key="concept.id"
            class="card bg-base-100 border border-base-content/5 shadow-lg hover:shadow-2xl transition-all duration-300 group"
            :class="{
              'hover:border-primary/20': concept.color === 'primary',
              'hover:border-secondary/20': concept.color === 'secondary',
              'hover:border-accent/20': concept.color === 'accent'
            }"
          >
            <div class="card-body p-8">
              <!-- 图标区域 -->
              <div 
                class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                :class="{
                  'bg-primary/10 text-primary': concept.color === 'primary',
                  'bg-secondary/10 text-secondary': concept.color === 'secondary',
                  'bg-accent/10 text-accent': concept.color === 'accent'
                }"
              >
                <Icon :name="concept.icon" size="32" />
              </div>

              <!-- 标题和描述 -->
              <h3 class="card-title text-xl font-bold mb-3">{{ concept.title }}</h3>
              <p class="text-base-content/60 mb-6 leading-relaxed">{{ concept.description }}</p>

              <!-- 特性列表 -->
              <div class="space-y-3">
                <div 
                  v-for="(feature, index) in concept.features" 
                  :key="index"
                  class="flex items-center gap-3 text-sm"
                >
                  <div 
                    class="w-2 h-2 rounded-full shrink-0"
                    :class="{
                      'bg-primary': concept.color === 'primary',
                      'bg-secondary': concept.color === 'secondary',
                      'bg-accent': concept.color === 'accent'
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
                    'bg-gradient-to-r from-primary to-primary/50': concept.color === 'primary',
                    'bg-gradient-to-r from-secondary to-secondary/50': concept.color === 'secondary',
                    'bg-gradient-to-r from-accent to-accent/50': concept.color === 'accent'
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术架构区域 -->
    <section class="py-24 px-4 md:px-8 bg-base-200/30">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-16 max-w-2xl mx-auto">
          <h2 class="text-3xl md:text-5xl font-bold mb-6">技术架构</h2>
          <p class="text-base-content/60 text-lg">
            基于先进的多层区块链架构，确保系统的高性能、安全性和可扩展性
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(layer, index) in techArchitecture" 
            :key="index"
            class="card bg-base-100 border border-base-content/5 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
          >
            <div class="card-body p-8">
              <div class="text-center mb-6">
                <div class="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Icon 
                    :name="layer.icon" 
                    size="24" 
                  />
                </div>
                <h3 class="text-xl font-bold text-primary">{{ layer.name }}</h3>
              </div>

              <div class="space-y-4">
                <div 
                  v-for="(component, cIndex) in layer.components" 
                  :key="cIndex"
                  class="flex items-start gap-3 p-3 rounded-lg bg-base-200/50 group-hover:bg-base-200 transition-colors duration-300"
                >
                  <Icon name="mingcute:check-2-fill" class="text-primary shrink-0 mt-0.5" size="16" />
                  <span class="text-base-content/80 text-sm leading-relaxed">{{ component }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 生态系统区域 -->
    <section class="py-24 px-4 md:px-8">
      <div class="container mx-auto max-w-6xl">
        <div class="flex flex-col lg:flex-row items-center gap-16">
          <div class="w-full lg:w-1/2">
            <div class="badge badge-primary mb-4">生态系统</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-6">构建完整的Web3生态系统</h2>
            
            <div class="space-y-6">
              <div class="flex items-start gap-4 p-6 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors duration-300">
                <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Icon name="mingcute:wallet-3-fill" size="24" />
                </div>
                <div>
                  <h4 class="font-bold text-lg mb-2">多链钱包</h4>
                  <p class="text-base-content/60">支持主流区块链网络，统一管理您的数字资产。</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4 p-6 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors duration-300">
                <div class="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <Icon name="mingcute:user-safe-fill" size="24" />
                </div>
                <div>
                  <h4 class="font-bold text-lg mb-2">数字身份</h4>
                  <p class="text-base-content/60">去中心化身份系统，让您完全掌控个人数据。</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4 p-6 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors duration-300">
                <div class="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <Icon name="mingcute:earth-fill" size="24" />
                </div>
                <div>
                  <h4 class="font-bold text-lg mb-2">DApp生态</h4>
                  <p class="text-base-content/60">丰富的去中心化应用，满足各种数字生活需求。</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="w-full lg:w-1/2 relative">
            <div class="absolute -inset-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl opacity-30"></div>
            <div class="relative bg-base-100 border border-base-content/10 rounded-3xl p-8 aspect-square flex items-center justify-center">
              <div class="text-center">
                <div class="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-8">
                  <Icon name="mingcute:leaf-fill" class="text-white" size="48" />
                </div>
                <h3 class="text-2xl font-bold mb-4">LIFE代币</h3>
                <p class="text-base-content/60">
                  LIFE代币是整个生态系统的核心，用于治理、交易手续费、生态激励等多个场景。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 白皮书区域 -->
    <section class="py-20 px-4 md:px-8 bg-base-content text-base-100">
      <div class="container mx-auto max-w-4xl text-center">
        <h2 class="text-3xl md:text-5xl font-bold mb-6">深入了解LIFE</h2>
        <p class="text-base-100/60 text-lg mb-8 max-w-2xl mx-auto">
          阅读我们的白皮书，详细了解LIFE的技术细节、经济模型和未来规划
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="btn btn-primary btn-lg rounded-full px-8 text-white">
            下载白皮书
            <Icon name="mingcute:download-fill" size="20" />
          </button>
          <button class="btn btn-outline btn-lg rounded-full px-8 border-white/20 text-white hover:bg-white hover:text-base-content">
            技术文档
            <Icon name="mingcute:book-open-fill" size="20" />
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 定义核心概念类型接口
interface CoreConcept {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
  color: 'primary' | 'secondary' | 'accent';
}

// 核心概念数据
const coreConcepts: CoreConcept[] = [
  {
    id: 1,
    icon: "mingcute:blockchain-fill",
    title: "去中心化网络",
    description: "基于区块链技术构建的完全去中心化网络",
    features: [
      "分布式账本技术",
      "共识机制保障安全",
      "节点去中心化运营",
      "抗审查特性"
    ],
    color: "primary"
  },
  {
    id: 2,
    icon: "mingcute:token-fill",
    title: "LIFE代币经济",
    description: "创新的代币经济模型驱动生态发展",
    features: [
      "治理投票权",
      "交易手续费",
      "生态激励奖励",
      "价值存储媒介"
    ],
    color: "secondary"
  },
  {
    id: 3,
    icon: "mingcute:safe-shield-fill",
    title: "安全与隐私",
    description: "企业级安全防护与隐私保护技术",
    features: [
      "零知识证明技术",
      "多重签名机制",
      "硬件级私钥保护",
      "匿名交易功能"
    ],
    color: "accent"
  },
  {
    id: 4,
    icon: "mingcute:rocket-2-fill",
    title: "高性能架构",
    description: "高吞吐量低延迟的区块链基础设施",
    features: [
      "分片技术扩展",
      "Layer2解决方案",
      "跨链互操作性",
      "即时交易确认"
    ],
    color: "primary"
  },
  {
    id: 5,
    icon: "mingcute:community-fill",
    title: "社区治理",
    description: "由社区共同治理的去中心化自治组织",
    features: [
      "提案与投票系统",
      "国库资金管理",
      "生态发展决策",
      "社区激励计划"
    ],
    color: "secondary"
  },
  {
    id: 6,
    icon: "mingcute:ecology-fill",
    title: "可持续发展",
    description: "环保节能的区块链解决方案",
    features: [
      "权益证明机制",
      "能源效率优化",
      "碳足迹抵消",
      "绿色技术采用"
    ],
    color: "accent"
  }
];

// 技术架构数据
const techArchitecture = [
  {
    name: "应用层",
    icon: "mingcute:app-fill",
    components: [
      "DApp浏览器",
      "钱包界面",
      "治理面板",
      "市场应用"
    ]
  },
  {
    name: "合约层",
    icon: "mingcute:code-fill",
    components: [
      "智能合约引擎",
      "虚拟机环境",
      "合约模板库",
      "安全审计"
    ]
  },
  {
    name: "共识层",
    icon: "mingcute:network-fill",
    components: [
      "PoS共识机制",
      "节点验证",
      "区块生产",
      "网络同步"
    ]
  }
];

// SEO配置
useSeoMeta({
  title: '什么是LIFE - LIFE代币介绍',
  description: '了解LIFE代币的核心概念、技术架构和生态系统',
  ogTitle: '什么是LIFE - LIFE代币介绍',
  ogDescription: '了解LIFE代币的核心概念、技术架构和生态系统',
});
</script>

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