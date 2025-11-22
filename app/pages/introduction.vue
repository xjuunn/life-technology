<template>
  <div class="min-h-screen bg-base-100 text-base-content font-sans selection:bg-primary selection:text-primary-content">
    <div class="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div class="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[100px] opacity-50"></div>
      <div class="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-secondary/5 rounded-full blur-[100px] opacity-50"></div>
      <div
        class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay">
      </div>
    </div>
    <section class="relative pt-32 pb-20 px-4 md:px-8">
      <div class="container mx-auto max-w-6xl">
        <div class="max-w-3xl">
          <div class="badge badge-primary badge-outline mb-6 font-bold tracking-wider py-4 px-4">ABOUT LIFE</div>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-8">
            专业的区块链服务<br>
            <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">值得信赖的选择</span>
          </h1>
          <p class="text-xl text-base-content/70 leading-relaxed max-w-2xl">
            LIFE 不仅是一个钱包，更是一个开放的 Web3 生态系统。我们致力于推动个人数据主权、数字身份及资产的自由流通，为您构建通往数字未来的安全桥梁。
          </p>
        </div>
      </div>
    </section>
    <section class="py-20 px-4 md:px-8 border-t border-base-content/5 bg-base-200/30">
      <div class="container mx-auto max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- 大卡片：定义 -->
          <div
            class="md:col-span-2 bg-base-100 rounded-4xl p-8 md:p-12 border border-base-content/5 shadow-sm flex flex-col justify-between group hover:border-primary/20 transition-colors">
            <div>
              <div class="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Icon name="heroicons:cube-transparent" size="24" />
              </div>
              <h3 class="text-3xl font-bold mb-4">什么是 LIFE？</h3>
              <p class="text-base-content/60 leading-relaxed text-lg">
                LIFE 是一个基于区块链技术的去中心化生态系统。我们摒弃了传统中心化平台的弊端，利用分布式账本技术，确保您的数据归您所有，资产由您掌控。在这里，隐私不再是奢侈品，而是基本权利。
              </p>
            </div>
            <div class="mt-8 flex flex-wrap gap-3">
              <div class="badge badge-lg bg-base-200 border-none text-base-content/70">Web3 平台</div>
              <div class="badge badge-lg bg-base-200 border-none text-base-content/70">去中心化</div>
              <div class="badge badge-lg bg-base-200 border-none text-base-content/70">数据主权</div>
            </div>
          </div>

          <!-- 右侧小卡片组 -->
          <div class="grid grid-rows-2 gap-6">
            <div
              class="bg-base-100 rounded-4xl p-8 border border-base-content/5 shadow-sm flex flex-col justify-center hover:-translate-y-1 transition-transform duration-300">
              <Icon name="heroicons:key" class="text-secondary w-8 h-8 mb-3" />
              <h4 class="text-xl font-bold mb-2">私钥自持</h4>
              <p class="text-sm text-base-content/60">100% 用户自主管理，平台无权访问您的任何资产。</p>
            </div>
            <div
              class="bg-base-100 rounded-4xl p-8 border border-base-content/5 shadow-sm flex flex-col justify-center hover:-translate-y-1 transition-transform duration-300">
              <Icon name="heroicons:globe-alt" class="text-accent w-8 h-8 mb-3" />
              <h4 class="text-xl font-bold mb-2">丰富生态</h4>
              <p class="text-sm text-base-content/60">支持 NFT、DAO、AI 等多链资产管理与交互。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 px-4 md:px-8 overflow-hidden">
      <div class="container mx-auto max-w-6xl space-y-24">
        <div class="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div class="w-full md:w-1/2 relative">
            <div
              class="absolute -inset-4 bg-linear-to-tr from-primary/20 to-transparent rounded-full blur-3xl opacity-30">
            </div>
            <div
              class="relative bg-base-200 border border-base-content/10 rounded-[2.5rem] p-8 md:p-12 aspect-square flex items-center justify-center">
              <Icon name="heroicons:currency-dollar" class="w-32 h-32 text-primary animate-pulse" />
              <div
                class="absolute bottom-10 left-10 right-10 p-4 bg-base-100/80 backdrop-blur-md rounded-2xl border border-base-content/5 shadow-lg">
                <div class="flex justify-between items-center text-sm font-bold">
                  <span>Governance</span>
                  <span class="text-primary">Active</span>
                </div>
                <div class="h-2 bg-base-300 rounded-full mt-2 overflow-hidden">
                  <div class="h-full bg-primary w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2">
            <h2 class="text-sm font-bold text-primary uppercase tracking-widest mb-2">The Token</h2>
            <h3 class="text-3xl md:text-4xl font-bold mb-6">LIFE 资产：生态的血液</h3>
            <p class="text-base-content/60 text-lg leading-relaxed mb-8">
              LIFE 是生态系统的原生加密资产。它不仅是流通媒介，更是治理权的象征。
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <Icon name="heroicons:check-circle" class="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <span class="font-bold block text-base-content">基础流通</span>
                  <span class="text-sm text-base-content/60">支持各类支付、转账和兑换场景，高效便捷。</span>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="heroicons:user-group" class="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <span class="font-bold block text-base-content">社区治理</span>
                  <span class="text-sm text-base-content/60">持有者通过提案和投票参与生态决策，共建未来。</span>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="heroicons:sparkles" class="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <span class="font-bold block text-base-content">激励体系</span>
                  <span class="text-sm text-base-content/60">奖励开发者、创作者及节点维护者，保障网络运转。</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
          <div class="w-full md:w-1/2 relative">
            <div
              class="absolute -inset-4 bg-linear-to-bl from-secondary/20 to-transparent rounded-full blur-3xl opacity-30">
            </div>
            <div
              class="relative bg-base-200 border border-base-content/10 rounded-[2.5rem] p-8 md:p-12 aspect-square flex flex-col items-center justify-center overflow-hidden">
              <div
                class="w-64 bg-base-100 rounded-3xl shadow-2xl border border-base-content/5 p-4 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <div class="flex justify-between items-center mb-6">
                  <div class="w-8 h-8 bg-secondary/20 rounded-full"></div>
                  <div class="text-xs font-mono opacity-50">0x3F...8A2</div>
                </div>
                <div class="text-2xl font-bold mb-1">$12,450.00</div>
                <div class="text-xs text-green-500 mb-6">+2.4% (24h)</div>
                <div class="grid grid-cols-4 gap-2 mb-4">
                  <div v-for="i in 4" :key="i" class="h-10 bg-base-200 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2">
            <h2 class="text-sm font-bold text-secondary uppercase tracking-widest mb-2">The Gateway</h2>
            <h3 class="text-3xl md:text-4xl font-bold mb-6">LIFE 钱包：Web3 入口</h3>
            <p class="text-base-content/60 text-lg leading-relaxed mb-8">
              专为数据主权和资产安全设计。代码完全开源，核心合约通过权威审计，是您通往去中心化世界的安全管家。
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="p-4 rounded-2xl bg-base-200/50 border border-base-content/5">
                <div class="font-bold mb-1">多链支持</div>
                <div class="text-xs text-base-content/60">ETH, BSC, Polygon 一站式管理</div>
              </div>
              <div class="p-4 rounded-2xl bg-base-200/50 border border-base-content/5">
                <div class="font-bold mb-1">本地存储</div>
                <div class="text-xs text-base-content/60">助记词仅存于您的设备</div>
              </div>
              <div class="p-4 rounded-2xl bg-base-200/50 border border-base-content/5">
                <div class="font-bold mb-1">隐私保护</div>
                <div class="text-xs text-base-content/60">内置零知识证明与混币技术</div>
              </div>
              <div class="p-4 rounded-2xl bg-base-200/50 border border-base-content/5">
                <div class="font-bold mb-1">开源透明</div>
                <div class="text-xs text-base-content/60">接受全球社区监督与贡献</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-20 px-4 md:px-8 bg-base-content text-base-100">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-16 max-w-2xl mx-auto">
          <h2 class="text-3xl md:text-5xl font-bold mb-6">LIFE 能为您做什么？</h2>
          <p class="text-base-100/60 text-lg">无论您是区块链新手还是资深极客，这里都有您需要的功能。</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(item, index) in benefits" :key="index"
            class="p-8 rounded-3xl bg-base-100/10 border border-white/10 hover:bg-base-100/20 transition-colors group cursor-default">
            <div class="mb-4 text-primary">
              <Icon :name="item.icon" size="32" />
            </div>
            <h4 class="text-xl font-bold mb-3 text-base-300">{{ item.title }}</h4>
            <p class="text-sm text-base-100/60 leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>

        <div class="mt-16 text-center border-t border-white/10 pt-12">
          <div class="inline-flex flex-col items-center">
            <span class="text-primary font-bold tracking-widest uppercase text-xs mb-2">Future Vision</span>
            <h3 class="text-2xl font-bold mb-4">LIFE 生态的未来</h3>
            <p class="max-w-2xl text-base-100/60 mb-8">
              我们将持续拓展多链兼容性、合规治理与跨界合作。未来，LIFE 将连接现实与虚拟，推动数字经济的全面普及。
            </p>
            <button
              class="btn btn-outline btn-primary rounded-full text-white border-white/20 hover:bg-white hover:text-base-content hover:border-white">
              查看路线图
            </button>
          </div>
        </div>
      </div>
    </section>
    <section class="py-24 px-4 md:px-8 bg-base-200/50">
      <div class="container mx-auto max-w-4xl">
        <div class="flex items-end justify-between mb-12">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold">你需要知道的事情</h2>
            <p class="text-base-content/60 mt-2">安全是 Web3 的基石，请仔细阅读以下指南。</p>
          </div>
          <Icon name="heroicons:shield-exclamation" class="w-16 h-16 text-base-content/10 hidden md:block" />
        </div>

        <div class="space-y-4">
          <div v-for="(tip, idx) in safetyTips" :key="idx"
            class="collapse collapse-plus bg-base-100 border border-base-content/5 rounded-2xl hover:shadow-md transition-shadow">
            <input type="radio" name="safety-accordion" :checked="idx === 0" />
            <div class="collapse-title text-lg font-bold flex items-center gap-4 py-6 pr-12">
              <span
                class="shrink-0 w-8 h-8 rounded-full bg-base-200 text-sm flex items-center justify-center text-base-content/50 font-mono">
                0{{ idx + 1 }}
              </span>
              {{ tip.title }}
            </div>
            <div class="collapse-content">
              <div class="pl-12 pr-4 pb-6 space-y-2">
                <p v-for="(line, lIdx) in tip.lines" :key="lIdx"
                  class="text-base-content/70 text-sm leading-relaxed flex gap-2">
                  <span class="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0 block"></span>
                  <span>{{ line }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const benefits = [
  {
    icon: "heroicons:device-phone-mobile",
    title: "随时随地管理资产",
    desc: "无需依赖第三方，无论何时何地，通过手机或电脑即可自由转账、收款、参与链上活动。"
  },
  {
    icon: "heroicons:lock-closed",
    title: "极致安全与隐私",
    desc: "端到端加密、零知识证明。您的私钥和数据永远只保存在您的设备本地，LIFE 不存储任何敏感信息。"
  },
  {
    icon: "heroicons:finger-print",
    title: "数据自主可控",
    desc: "自主授权或撤销第三方访问权限，支持链上足迹清理，真正实现数据主权。"
  },
  {
    icon: "heroicons:globe-asia-australia",
    title: "全球低成本支付",
    desc: "极低手续费、极快速度完成跨境交易。无国界限制，无需银行等待。"
  },
  {
    icon: "heroicons:squares-plus",
    title: "Web3 应用生态",
    desc: "内置 DApp 浏览器，安全访问 DeFi、NFT、GameFi 等创新应用，探索无限可能。"
  },
  {
    icon: "heroicons:user-circle",
    title: "匿名与身份保护",
    desc: "无需绑定手机或实名。支持选择性披露身份，最大程度保护您的个人隐私。"
  }
]

const safetyTips = [
  {
    title: "资产安全与私钥管理",
    lines: [
      "私钥/助记词是资产唯一凭证，丢失无法找回，请务必线下手抄备份。",
      "严禁将私钥保存在微信、邮箱、网盘等联网环境中。",
      "官方团队永远不会向您索要私钥或助记词。"
    ]
  },
  {
    title: "防范诈骗与钓鱼",
    lines: [
      "警惕假冒客服、空投、高额返利等骗局。",
      "请务必通过官网下载钱包，防止恶意软件盗取资产。",
      "授权 DApp 前请仔细核查来源，不要随意点击陌生链接。"
    ]
  },
  {
    title: "交易与费用须知",
    lines: [
      "区块链转账不可逆，转账前请务必核对地址。",
      "手续费由区块链网络收取，与平台无关，请根据需求合理设置 Gas 费。",
      "部分 DApp 可能收取额外服务费，操作前请阅读说明。"
    ]
  },
  {
    title: "隐私与合规声明",
    lines: [
      "LIFE 钱包不收集、不存储您的个人数据。",
      "请遵守您所在地区的法律法规，合法使用数字资产。",
      "部分国家/地区对加密资产有特殊监管政策，请自行了解。"
    ]
  },
  {
    title: "常见问题与支持",
    lines: [
      "忘记助记词资产将永久丢失，官方无法找回。",
      "若发现钱包被盗，请立即转移剩余资产并重置设备。",
      "如需帮助，请仅通过官网或官方社群联系，警惕假冒客服。"
    ]
  }
]
</script>