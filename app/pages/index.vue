<template>
  <div class="min-h-screen bg-base-100 text-base-content font-sans transition-colors duration-300">
    <div class="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
      <div class="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[128px]"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-secondary/10 rounded-full blur-[128px]">
      </div>
      <div
        class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay">
      </div>
    </div>
    <section class="relative pt-40 pb-20 md:pt-52 md:pb-32 px-4">
      <div class="container mx-auto text-center max-w-5xl">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-base-content/10 bg-base-content/5 mb-8 backdrop-blur-sm">
          <div class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
          <span class="text-xs font-bold tracking-widest uppercase opacity-80">Web3 Digital Economy</span>
        </div>
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-8">
          守护<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">数据价值</span>
          <br />
          重塑数字生命
        </h1>
        <p class="text-lg md:text-xl text-base-content/60 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
          LIFE 致力于构建可信的数字未来。利用区块链分布式账本技术，将个人数据转化为可视化的数字资产，打造安全、合规的数字管理终端，提升个人数据的价值与意义。
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            class="btn btn-primary btn-lg rounded-full px-10 min-w-[180px] text-primary-content border-none shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
            开启数字之旅
          </button>
          <button
            class="btn btn-ghost btn-lg rounded-full px-10 min-w-[180px] border border-base-content/10 hover:bg-base-content hover:text-base-100">
            了解技术白皮书
          </button>
        </div>
      </div>
    </section>
    <div class="border-y border-base-content/5 bg-base-content/[0.02]">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="(stat, index) in stats" :key="index" class="text-center group cursor-default">
            <div class="text-4xl font-black mb-1 tracking-tight group-hover:text-primary transition-colors">{{
              stat.value }}</div>
            <div class="text-xs font-bold uppercase tracking-widest text-base-content/50">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
    <section class="py-32 px-4">
      <div class="container mx-auto max-w-6xl">
        <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div class="max-w-xl">
            <h2 class="text-xs font-bold text-primary uppercase tracking-widest mb-3">Industry Trends</h2>
            <h3 class="text-4xl md:text-5xl font-bold tracking-tight">赋予生命更深意义</h3>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          <div
            class="md:col-span-2 rounded-[2.5rem] bg-base-200 p-10 relative overflow-hidden group border border-base-content/5 hover:border-primary/30 transition-all duration-500">
            <div class="absolute inset-0 bg-gradient-to-br from-base-content/5 to-transparent"></div>
            <div class="relative z-10 h-full flex flex-col justify-between">
              <div class="w-16 h-16 rounded-2xl bg-base-100 flex items-center justify-center shadow-sm text-primary">
                <Icon name="heroicons:circle-stack" class="w-8 h-8" />
              </div>
              <div>
                <h4 class="text-3xl font-bold mb-3">数据要素资产化</h4>
                <p class="text-base-content/60 leading-relaxed max-w-lg">
                  打破“数据孤岛”，通过确权与流通机制，将日常行为转化为可量化的数字权益，赋予个体对自身数字生命的价值回收权。
                </p>
                <div
                  class="mt-6 flex items-center gap-2 text-primary font-bold text-sm cursor-pointer group-hover:translate-x-2 transition-transform">
                  查看详情
                  <Icon name="heroicons:arrow-long-right" />
                </div>
              </div>
            </div>
          </div>
          <div
            class="rounded-[2.5rem] bg-base-100 p-10 relative overflow-hidden group border border-base-content/5 hover:border-secondary/30 transition-all duration-500 shadow-sm">
            <div class="relative z-10 h-full flex flex-col justify-between">
              <div class="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center text-secondary">
                <Icon name="heroicons:chart-bar-square" class="w-8 h-8" />
              </div>
              <div>
                <h4 class="text-2xl font-bold mb-3">量化自我</h4>
                <p class="text-base-content/60 text-sm leading-relaxed">
                  通过客观数据反馈促进健康行为正循环，使「管理身体」成为可量化的终身事业，实现数字技术赋能。
                </p>
              </div>
            </div>
          </div>
          <div
            class="rounded-[2.5rem] bg-base-100 p-10 relative overflow-hidden group border border-base-content/5 hover:border-accent/30 transition-all duration-500 shadow-sm">
            <div class="relative z-10 h-full flex flex-col justify-between">
              <div class="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center text-accent">
                <Icon name="heroicons:user-group" class="w-8 h-8" />
              </div>
              <div>
                <h4 class="text-2xl font-bold mb-3">信用价值</h4>
                <p class="text-base-content/60 text-sm leading-relaxed">
                  突破物理限制，通过链上行为积累信用资本，在数字生态中获得社会影响力与共创未来的参与感。
                </p>
              </div>
            </div>
          </div>
          <div
            class="md:col-span-2 rounded-[2.5rem] bg-neutral text-neutral-content p-10 relative overflow-hidden group">
            <div class="absolute -right-10 -top-10 opacity-10 rotate-12">
              <Icon name="heroicons:finger-print" size="300" />
            </div>
            <div class="relative z-10 h-full flex flex-col justify-between">
              <div
                class="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md text-white">
                <Icon name="heroicons:shield-check" class="w-8 h-8" />
              </div>
              <div>
                <h4 class="text-3xl font-bold mb-3 text-white">安全与合规</h4>
                <p class="text-white/70 leading-relaxed max-w-lg">
                  严格遵循《区块链信息服务管理规定》备案，采用AES-256加密与分布式存储，确保技术合规性与生态稳健性，让数据回归用户。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-32 px-4 bg-base-200/50">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-20 max-w-2xl mx-auto">
          <h2 class="text-4xl font-bold mb-6">核心功能</h2>
          <p class="text-base-content/60 text-lg">
            LIFE 为用户提供安全、可信的数字管家服务，构建您的 Web3 数字化身。
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(feature, i) in features" :key="i"
            class="group p-8 rounded-3xl bg-base-100 border border-base-content/5 hover:border-primary/20 hover:shadow-xl transition-all duration-300">
            <div
              class="w-14 h-14 rounded-2xl bg-base-200 group-hover:bg-primary group-hover:text-primary-content flex items-center justify-center mb-6 text-primary transition-colors">
              <Icon :name="feature.icon" size="28" />
            </div>
            <h4 class="font-bold text-xl mb-3">{{ feature.title }}</h4>
            <p class="text-base-content/60 text-sm leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="py-32 px-4 overflow-hidden">
      <div class="container mx-auto max-w-6xl">
        <div class="flex flex-col lg:flex-row items-center gap-24">
          <div class="lg:w-1/2 w-full">
            <div
              class="relative mx-auto max-w-sm aspect-[3/4] rounded-[3rem] bg-base-100 border border-base-content/5 shadow-2xl p-8 flex flex-col transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <div
                class="absolute inset-0 bg-gradient-to-b from-base-content/5 to-transparent rounded-[3rem] pointer-events-none">
              </div>

              <div class="flex justify-between items-center mb-12 relative z-10">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center text-primary">
                    <Icon name="ph:shield-check-fill" size="20" />
                  </div>
                  <span class="font-bold tracking-tight">LIFE Guard</span>
                </div>
                <div
                  class="px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-bold flex items-center gap-1">
                  <div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Secure
                </div>
              </div>
              <div class="relative z-10 mb-auto">
                <div class="text-sm text-base-content/50 font-medium mb-2">Digital Points</div>
                <div class="text-5xl font-mono font-bold tracking-tighter mb-4">8,592<span
                    class="text-2xl text-base-content/40">.00</span></div>
                <div
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold">
                  <Icon name="heroicons:trophy" size="14" />
                  <span>生态权益积分</span>
                </div>
              </div>
              <div class="space-y-3 relative z-10 mt-8">
                <div class="p-4 rounded-2xl bg-base-200/50 flex items-center gap-4">
                  <div class="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center">
                    <Icon name="heroicons:document-text" />
                  </div>
                  <div>
                    <div class="font-bold text-sm">数字身份认证</div>
                    <div class="text-xs text-base-content/50">已上链存证</div>
                  </div>
                </div>
                <div class="p-4 rounded-2xl bg-base-200/50 flex items-center gap-4">
                  <div class="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center">
                    <Icon name="heroicons:chart-pie" />
                  </div>
                  <div>
                    <div class="font-bold text-sm">健康数据报告</div>
                    <div class="text-xs text-base-content/50">加密存储中</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:w-1/2">
            <h2 class="text-4xl md:text-6xl font-black mb-8 leading-tight">
              打造全球更安全的
              <br />
              <span class="text-primary">数字资产管家</span>
            </h2>
            <p class="text-lg text-base-content/60 mb-10 leading-relaxed max-w-md">
              全球化数字经济体系下，安全是技术挑战与信任承诺。LIFE 客户端集成 AES-256 加密与 ECDSA 签名算法，通过离线私钥存储，保障您的数字权益万无一失。
            </p>
            <div class="space-y-8">
              <div class="flex gap-6 group">
                <div
                  class="flex-shrink-0 w-12 h-12 rounded-full bg-base-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors">
                  <Icon name="heroicons:server-stack" size="24" />
                </div>
                <div>
                  <h5 class="text-xl font-bold mb-2">自主掌控</h5>
                  <p class="text-base-content/60 text-sm">用户数据实施端到端加密并分布式存储，结合用户自主授权机制，真正实现数据主权。</p>
                </div>
              </div>
              <div class="flex gap-6 group">
                <div
                  class="flex-shrink-0 w-12 h-12 rounded-full bg-base-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors">
                  <Icon name="heroicons:check-badge" size="24" />
                </div>
                <div>
                  <h5 class="text-xl font-bold mb-2">技术合规</h5>
                  <p class="text-base-content/60 text-sm">严格遵循国内区块链信息服务管理规定，确保技术应用合法合规，稳健运行。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-32 px-4 bg-base-200/30">
      <div class="container mx-auto max-w-3xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">了解 LIFE</h2>
          <p class="text-base-content/60">专业的区块链技术服务，值得信赖的选择</p>
        </div>
        <div class="join join-vertical w-full bg-base-100 border border-base-content/10 rounded-2xl overflow-hidden">
          <div v-for="(faq, idx) in faqs" :key="idx"
            class="collapse collapse-arrow join-item border-b border-base-content/5 last:border-none">
            <input type="radio" name="faq-accordion" :checked="idx === 0" />
            <div class="collapse-title text-lg font-bold py-6 px-6 hover:bg-base-content/5 transition-colors">
              {{ faq.question }}
            </div>
            <div class="collapse-content px-6">
              <p class="text-base-content/60 leading-relaxed pb-6">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-40 px-4 text-center overflow-hidden relative">
      <div class="absolute inset-0 bg-gradient-to-t from-base-content/5 to-transparent pointer-events-none"></div>
      <div class="container mx-auto relative z-10">
        <h2 class="text-6xl md:text-9xl font-black mb-8 tracking-tighter opacity-5 select-none text-base-content">
          DIGITAL
        </h2>
        <div class="-mt-12 relative z-10">
          <h3 class="text-3xl md:text-5xl font-bold mb-10">准备好进入数字经济时代了吗？</h3>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              class="btn btn-primary btn-lg rounded-full px-12 min-w-[200px] text-primary-content shadow-lg shadow-primary/20">
              下载客户端
            </button>
            <button
              class="btn btn-outline btn-lg rounded-full px-12 min-w-[200px] border-base-content/20 hover:bg-base-content hover:text-base-100">
              联系商务合作
            </button>
          </div>
          <p class="mt-8 text-sm text-base-content/40">
            * LIFE 严格遵守当地法律法规，仅提供技术服务，不涉及非法金融活动。
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const stats = [
  { value: '10+', label: '年技术沉淀' },
  { value: '1.2M+', label: '服务用户' },
  { value: '100%', label: '数据自主权' },
  { value: '0', label: '安全事故' }
]

const features = [
  { icon: "heroicons:cpu-chip", title: "数字大脑", desc: "AI 驱动的数据分析引擎，将您的生活足迹转化为可视化数据报告与建议。" },
  { icon: "heroicons:identification", title: "数字身份 (DID)", desc: "基于区块链的去中心化数字身份，一次认证，全生态通用，告别繁琐账号。" },
  { icon: "heroicons:heart", title: "数字身体", desc: "连接智能穿戴设备，让健康数据上链，将良好的生活习惯转化为可视化的数字权益。" },
  { icon: "heroicons:key", title: "私钥自持", desc: "私钥离线生成并存储于用户本地设备，平台无法触碰，确保资产安全与隐私。" },
  { icon: "heroicons:squares-2x2", title: "跨链兼容", desc: "支持主流联盟链及公链技术标准，实现不同生态间的数据互通与价值流转。" },
  { icon: "heroicons:eye-slash", title: "隐私计算", desc: "采用零知识证明与可信执行环境技术，确保数据在“可用不可见”的前提下创造价值。" },
]

const faqs = [
  { question: "什么是 LIFE 平台？", answer: "LIFE 是一个基于区块链技术的去中心化数字生态系统，旨在为用户提供安全、隐私、自主的数据管理体验。它不是传统意义上的金融工具，而是您的个人数据资产管家。" },
  { question: "LIFE 积分有什么用？", answer: "LIFE 积分是生态内的权益凭证，用于奖励用户对生态的数据贡献（如健康数据上传）。积分可用于兑换生态内的服务、参与社区治理投票，不可用于非法买卖。" },
  { question: "如何保障我的数据安全？", answer: "我们采用军工级 AES-256 加密技术，您的核心数据和私钥仅存储在您的本地设备上。未经您授权，任何人（包括平台方）都无法查看或调用您的数据。" },
]
</script>