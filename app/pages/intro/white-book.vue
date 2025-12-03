<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'

const { t } = useAppI18n()
const activeSection = ref('')
const observer = ref<IntersectionObserver | null>(null)

const sections = computed(() => [
  { id: 'executive', title: t('wp.sections.executive') },
  { id: 'intro', title: t('wp.sections.intro') },
  { id: 'solution', title: t('wp.sections.solution') },
  { id: 'architecture', title: t('wp.sections.architecture') },
  { id: 'product', title: t('wp.sections.product') },
  { id: 'tokenomics', title: t('wp.sections.tokenomics') },
  { id: 'governance', title: t('wp.sections.governance') },
  { id: 'roadmap', title: t('wp.sections.roadmap') },
  { id: 'team', title: t('wp.sections.team') },
  { id: 'market', title: t('wp.sections.market') },
  { id: 'risks', title: t('wp.sections.risks') },
  { id: 'conclusion', title: t('wp.sections.conclusion') }
])

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    const offset = 80
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = el.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
    activeSection.value = id
  }
}

onMounted(() => {
  nextTick(() => {
    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    }, { rootMargin: '-20% 0px -50% 0px' })

    sections.value.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) observer.value?.observe(el)
    })
  })
})

onUnmounted(() => {
  if (observer.value) observer.value.disconnect()
})
</script>

<template>
  <div
    class="min-h-screen bg-base-100 text-base-content font-sans selection:bg-primary selection:text-primary-content scroll-smooth">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
      <div class="flex flex-col lg:flex-row gap-12">
        <aside class="hidden lg:block w-64 shrink-0">
          <div class="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 custom-scrollbar">
            <h3 class="text-xs font-bold uppercase tracking-widest text-base-content/40 mb-4 px-3">{{ t('wp.toc') }}
            </h3>
            <ul class="menu bg-base-100/50 rounded-box p-2 w-full text-sm">
              <li v-for="item in sections" :key="item.id">
                <a @click.prevent="scrollTo(item.id)"
                  :class="{ 'active font-bold bg-primary/10 text-primary border-l-4 border-primary rounded-r-lg rounded-l-none': activeSection === item.id }"
                  class="py-2 border-l-4 border-transparent rounded-r-lg rounded-l-none hover:bg-base-200 transition-all duration-200">
                  {{ item.title }}
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <main class="flex-1 min-w-0">
          <header class="mb-12 text-center lg:text-left">
            <div class="badge badge-lg badge-primary badge-outline mb-4 font-bold">{{ t('wp.release_date') }}:
              2025-09-01</div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              LifeChain: <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">{{
                t('wp.title_suffix') }}</span>
            </h1>
            <p class="text-xl text-base-content/70 leading-relaxed max-w-3xl">
              {{ t('wp.subtitle') }}
            </p>
          </header>

          <div class="alert alert-warning shadow-lg mb-12 items-start">
            <Icon name="mingcute:warning-fill" class="w-6 h-6 shrink-0 mt-1" />
            <div class="text-sm">
              <h3 class="font-bold text-base mb-1">{{ t('wp.disclaimer.title') }}</h3>
              <p class="opacity-90 leading-relaxed">{{ t('wp.disclaimer.content') }}</p>
            </div>
          </div>

          <article
            class="prose prose-base sm:prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-3xl prose-img:shadow-xl dark:prose-invert">

            <section id="executive" class="scroll-mt-24">
              <h2>1. {{ t('wp.sections.executive') }}</h2>
              <p>{{ t('wp.content.executive_p1') }}</p>
              <p>{{ t('wp.content.executive_p2') }}</p>
            </section>

            <section id="intro" class="scroll-mt-24">
              <h2>2. {{ t('wp.sections.intro') }}</h2>
              <p class="lead">{{ t('wp.content.intro_lead') }}</p>
              <ul>
                <li v-for="(item, i) in 5" :key="i"><strong>{{ t(`wp.content.intro_point_${i + 1}_title`) }}:</strong>
                  {{
                    t(`wp.content.intro_point_${i + 1}_desc`) }}</li>
              </ul>
            </section>

            <section id="solution" class="scroll-mt-24">
              <h2>3. {{ t('wp.sections.solution') }}</h2>
              <div class="grid sm:grid-cols-2 gap-4 not-prose my-8">
                <div v-for="(item, i) in 6" :key="i" class="card bg-base-200/50 border border-base-content/5 p-6">
                  <h4 class="font-bold text-lg mb-2 text-primary">{{ t(`wp.content.solution_point_${i + 1}_title`) }}
                  </h4>
                  <p class="text-sm text-base-content/70">{{ t(`wp.content.solution_point_${i + 1}_desc`) }}</p>
                </div>
              </div>
            </section>

            <section id="architecture" class="scroll-mt-24">
              <h2>4. {{ t('wp.sections.architecture') }}</h2>
              <h3>4.1 {{ t('wp.content.arch_4_1_title') }}</h3>
              <ul>
                <li>{{ t('wp.content.arch_4_1_li1') }}</li>
                <li>{{ t('wp.content.arch_4_1_li2') }}</li>
                <li>{{ t('wp.content.arch_4_1_li3') }}</li>
              </ul>
              <h3>4.2 {{ t('wp.content.arch_4_2_title') }}</h3>
              <p>{{ t('wp.content.arch_4_2_desc') }}</p>
              <ul>
                <li><strong>{{ t('wp.content.arch_4_2_li1_t') }}:</strong> {{ t('wp.content.arch_4_2_li1_d') }}</li>
                <li><strong>{{ t('wp.content.arch_4_2_li2_t') }}:</strong> {{ t('wp.content.arch_4_2_li2_d') }}</li>
              </ul>
            </section>

            <section id="product" class="scroll-mt-24">
              <h2>5. {{ t('wp.sections.product') }}</h2>
              <div class="card bg-primary text-primary-content not-prose mb-8">
                <div class="card-body">
                  <h3 class="card-title text-2xl mb-4">Watch H Smart Health Watch</h3>
                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 class="font-bold mb-2 opacity-80 border-b border-white/20 pb-1">Health Monitoring</h4>
                      <ul class="list-disc list-inside text-sm space-y-1">
                        <li>High-precision optical heart-rate sensor</li>
                        <li>SpO2 & HRV analysis</li>
                        <li>GPS + GLONASS dual-positioning</li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-bold mb-2 opacity-80 border-b border-white/20 pb-1">Digital Security Core</h4>
                      <ul class="list-disc list-inside text-sm space-y-1">
                        <li>Secure Element (SE) Data Vault</li>
                        <li>NFC for offline encrypted interactions</li>
                        <li>LifeChain light node</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <p>{{ t('wp.content.product_app_desc') }}</p>
            </section>

            <section id="tokenomics" class="scroll-mt-24">
              <h2>6. {{ t('wp.sections.tokenomics') }}</h2>
              <div class="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-200/50 not-prose mb-8">
                <div class="stat">
                  <div class="stat-title">{{ t('wp.content.token_name') }}</div>
                  <div class="stat-value text-primary">LIF</div>
                </div>
                <div class="stat">
                  <div class="stat-title">{{ t('wp.content.max_supply') }}</div>
                  <div class="stat-value text-secondary">2.1 Billion</div>
                  <div class="stat-desc">{{ t('wp.content.fixed_supply') }}</div>
                </div>
              </div>

              <div class="overflow-x-auto not-prose my-8">
                <table class="table table-zebra bg-base-100 border border-base-content/10">
                  <thead>
                    <tr class="bg-base-200">
                      <th>Category</th>
                      <th>Ratio</th>
                      <th>Quantity</th>
                      <th>Release Rules</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Behavior Incentives</td>
                      <td>80%</td>
                      <td>1,680,000,000</td>
                      <td>Proof-of-Health output; 4-year cycle</td>
                    </tr>
                    <tr>
                      <td>Ecosystem Reserve</td>
                      <td>10%</td>
                      <td>210,000,000</td>
                      <td>48-month linear release</td>
                    </tr>
                    <tr>
                      <td>Operation & Dev</td>
                      <td>4.76%</td>
                      <td>100,000,000</td>
                      <td>25% at Launch; remaining over 12 months</td>
                    </tr>
                    <tr>
                      <td>Early Contributor Reward</td>
                      <td>3.81%</td>
                      <td>80,000,000</td>
                      <td>One-time post-Launch</td>
                    </tr>
                    <tr>
                      <td>Founders & Dev</td>
                      <td>1.43%</td>
                      <td>30,000,000</td>
                      <td>12-month cliff; 24-month linear</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="governance" class="scroll-mt-24">
              <h2>7. {{ t('wp.sections.governance') }}</h2>
              <p>{{ t('wp.content.governance_desc') }}</p>
            </section>

            <section id="roadmap" class="scroll-mt-24">
              <h2>8. {{ t('wp.sections.roadmap') }}</h2>
              <ul class="steps steps-vertical w-full not-prose">
                <li class="step step-primary">
                  <div class="text-left ml-4 mb-6">
                    <h3 class="font-bold">Phase 1: Foundation (2023 Q4 – 2024 Q2)</h3>
                    <p class="text-sm opacity-70">LifeChain testnet launch, Watch H prototypes</p>
                  </div>
                </li>
                <li class="step step-primary">
                  <div class="text-left ml-4 mb-6">
                    <h3 class="font-bold">Phase 2: Growth (2025 Q2 – 2025 Q4)</h3>
                    <p class="text-sm opacity-70">Mainnet launch, First batch Watch H sales, App launch</p>
                  </div>
                </li>
                <li class="step">
                  <div class="text-left ml-4 mb-6">
                    <h3 class="font-bold">Phase 3: Expansion (2025 Q4 – 2026 Q1)</h3>
                    <p class="text-sm opacity-70">Developer SDK, Global marketing, Community transition</p>
                  </div>
                </li>
                <li class="step">
                  <div class="text-left ml-4">
                    <h3 class="font-bold">Phase 4: Future (2026+)</h3>
                    <p class="text-sm opacity-70">AI health module, Carbon-neutral goals</p>
                  </div>
                </li>
              </ul>
            </section>

            <section id="team" class="scroll-mt-24">
              <h2>9. {{ t('wp.sections.team') }}</h2>
              <div class="grid sm:grid-cols-2 gap-6 not-prose">
                <div class="flex items-center gap-4 bg-base-200/30 p-4 rounded-xl">
                  <div class="avatar placeholder">
                    <div class="bg-neutral text-neutral-content rounded-full w-12">
                      <span>FX</span>
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">Fei Xiong</div>
                    <div class="text-xs opacity-60">CEO</div>
                  </div>
                </div>
                <div class="flex items-center gap-4 bg-base-200/30 p-4 rounded-xl">
                  <div class="avatar placeholder">
                    <div class="bg-neutral text-neutral-content rounded-full w-12">
                      <span>OS</span>
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">Original Spirit</div>
                    <div class="text-xs opacity-60">Tech Manager</div>
                  </div>
                </div>
              </div>
            </section>

            <section id="market" class="scroll-mt-24">
              <h2>10. {{ t('wp.sections.market') }}</h2>
              <p>{{ t('wp.content.market_desc') }}</p>
            </section>

            <section id="risks" class="scroll-mt-24">
              <h2>11. {{ t('wp.sections.risks') }}</h2>
              <div class="overflow-x-auto not-prose">
                <table class="table table-xs sm:table-sm border border-base-content/10">
                  <thead>
                    <tr>
                      <th>Risk</th>
                      <th>Mitigation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="font-bold">Technical</td>
                      <td>Top-tier audits, proven cryptography</td>
                    </tr>
                    <tr>
                      <td class="font-bold">Regulatory</td>
                      <td>Anonymous aggregation, compliance legal counsel</td>
                    </tr>
                    <tr>
                      <td class="font-bold">Market</td>
                      <td>Strong utility, community ethos</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="conclusion" class="scroll-mt-24">
              <h2>12. {{ t('wp.sections.conclusion') }}</h2>
              <p>{{ t('wp.content.conclusion_desc') }}</p>
              <div class="card bg-linear-to-r from-primary to-secondary text-primary-content not-prose mt-8">
                <div class="card-body items-center text-center">
                  <h3 class="card-title text-2xl">Join the Green Ecosystem</h3>
                  <div class="flex gap-4 mt-4">
                    <a href="https://life.voto/" target="_blank"
                      class="btn btn-ghost border-white/20 hover:bg-white/20 text-white">Official Website</a>
                    <a href="https://x.com/DigiLifePro" target="_blank"
                      class="btn btn-ghost border-white/20 hover:bg-white/20 text-white">Twitter (X)</a>
                  </div>
                </div>
              </div>
            </section>

          </article>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 20px;
}
</style>


<i18n lang="json">{
  "en": {
    "wp": {
      "toc": "Table of Contents",
      "release_date": "Release Date",
      "title_suffix": "Digital Health Ecosystem",
      "subtitle": "Returning health data sovereignty and digital rights control to users with hardware-level security.",
      "disclaimer": {
        "title": "Disclaimer and Note",
        "content": "This whitepaper presents the technical vision and roadmap of LifeChain. It does not constitute participation advice or a commitment. Digital ecosystem participation carries risks. Please evaluate carefully."
      },
      "sections": {
        "executive": "Executive Summary",
        "intro": "The Value Dilemma",
        "solution": "LifeChain Solution",
        "architecture": "Technical Architecture",
        "product": "Product Components",
        "tokenomics": "Ecological Points",
        "governance": "Community Co-building",
        "roadmap": "Roadmap",
        "team": "Team",
        "market": "Industry Analysis",
        "risks": "Risks & Mitigations",
        "conclusion": "Conclusion"
      },
      "content": {
        "executive_p1": "LifeChain aims to catalyze a paradigm shift in the control and utility distribution of personal health data. By integrating blockchain technology, AI, and smart wearables, we build an inclusive and green ecosystem.",
        "executive_p2": "We present a full-stack system consisting of a sovereign high-performance network, a secure smartwatch (Watch H) with a built-in hardware security module, and immersive social applications.",
        "intro_lead": "A fundamental contradiction exists: users generate health data, yet receive little utility in return.",
        "intro_point_1_title": "Data Monopoly",
        "intro_point_1_desc": "Tech giants silo user health data. Users cannot effectively utilize their data.",
        "intro_point_2_title": "Trust Deficit",
        "intro_point_2_desc": "Traditional incentives are vulnerable to data tampering and discrepancies.",
        "intro_point_3_title": "Unsustainability",
        "intro_point_3_desc": "Many models rely on high expansion without intrinsic utility.",
        "intro_point_4_title": "Fragmented Experience",
        "intro_point_4_desc": "Hardware and applications remain disjointed.",
        "intro_point_5_title": "Security Risks",
        "intro_point_5_desc": "Lack of hardware-level security puts user rights at risk.",
        "solution_point_1_title": "Trusted Data Source",
        "solution_point_1_desc": "Watch H signs data at generation, preventing tampering.",
        "solution_point_2_title": "Incentive Distribution",
        "solution_point_2_desc": "Smart contracts automate points for healthy behavior.",
        "solution_point_3_title": "Data Exchange",
        "solution_point_3_desc": "Users utilize anonymized data via exchange platforms.",
        "solution_point_4_title": "Social-Incentive Layer",
        "solution_point_4_desc": "Integrates social attributes with digital incentives.",
        "solution_point_5_title": "Data Security",
        "solution_point_5_desc": "Hardware vault secures all digital rights and identity.",
        "solution_point_6_title": "Green Sustainability",
        "solution_point_6_desc": "Low-power network fosters a green, smart lifestyle.",
        "arch_4_1_title": "LifeChain Network",
        "arch_4_1_li1": "DPoS Consensus for energy efficiency.",
        "arch_4_1_li2": "High Performance: Target TPS > 10,000.",
        "arch_4_1_li3": "EVM+ Compatibility for privacy-preserving computation.",
        "arch_4_2_title": "Watch H Hardware Security",
        "arch_4_2_desc": "Adopts advanced, quantum-resistant cryptography.",
        "arch_4_2_li1_t": "Secure Element (SE)",
        "arch_4_2_li1_d": "CC EAL6+ certified, physically isolated environment.",
        "arch_4_2_li2_t": "Self-Custody",
        "arch_4_2_li2_d": "Keys never leave the chip. Users retain full control.",
        "product_app_desc": "The LifeChain Super App serves as the interaction hub. It features a Dashboard, Social Center, Data Exchange, and Community Portal, integrated with hybrid interaction functions.",
        "token_name": "Point Name",
        "max_supply": "Max Quantity",
        "fixed_supply": "Fixed, No Expansion",
        "governance_desc": "LifeChain's endgame is a community-managed ecosystem. Voting power is based on accumulated points. Topics include technical upgrades, fund usage, and ecosystem parameters.",
        "market_desc": "Targeting the >$1T global health-tech market and digital adoption. Vertical integration of 'Network + Hardware + App' creates strong moats.",
        "conclusion_desc": "LifeChain breaks centralized monopolies. With 2.1 billion points, 80% of which are obtained via healthy behavior, we inaugurate a fair utility distribution paradigm."
      }
    }
  },
  "zh-CN": {
    "wp": {
      "toc": "目录",
      "release_date": "发布日期",
      "title_suffix": "下一代互联网社交健康生态",
      "subtitle": "拥有硬件级安全，将健康数据主权和数字权益控制权归还给用户。",
      "disclaimer": {
        "title": "重要声明与提示",
        "content": "本白皮书阐述了LifeChain项目的技术愿景和路线图。它不构成参与建议或承诺。数字生态参与具有风险，请谨慎评估。"
      },
      "sections": {
        "executive": "执行摘要",
        "intro": "价值困境",
        "solution": "LifeChain 解决方案",
        "architecture": "技术架构",
        "product": "产品组件",
        "tokenomics": "生态积分模型",
        "governance": "社区共建",
        "roadmap": "路线图",
        "team": "团队",
        "market": "行业分析",
        "risks": "风险与应对",
        "conclusion": "结语"
      },
      "content": {
        "executive_p1": "LifeChain 旨在推动个人健康数据控制权和权益分配的范式转变。通过整合区块链技术、AI 和智能穿戴设备，我们构建了一个包容且绿色的生态系统。",
        "executive_p2": "我们提供由主权高性能网络、内置硬件安全模块的智能手表 (Watch H) 以及沉浸式社交应用组成的全栈系统。",
        "intro_lead": "存在一个根本矛盾：用户产生健康数据，却几乎没有获得任何权益。",
        "intro_point_1_title": "数据垄断",
        "intro_point_1_desc": "科技巨头垄断用户数据，用户无法有效利用。",
        "intro_point_2_title": "信任赤字",
        "intro_point_2_desc": "传统激励机制易受数据不一致和欺诈影响。",
        "intro_point_3_title": "不可持续",
        "intro_point_3_desc": "许多模式依赖高扩张，缺乏内在价值支撑。",
        "intro_point_4_title": "体验割裂",
        "intro_point_4_desc": "硬件与应用缺乏联动，体验不连贯。",
        "intro_point_5_title": "权益安全",
        "intro_point_5_desc": "缺乏硬件级安全保护，用户权益面临风险。",
        "solution_point_1_title": "可信源头数据",
        "solution_point_1_desc": "Watch H 在生成端签名，从源头防止篡改。",
        "solution_point_2_title": "权益分配引擎",
        "solution_point_2_desc": "智能合约自动分发健康行为积分。",
        "solution_point_3_title": "数据交换",
        "solution_point_3_desc": "用户通过交换平台授权匿名数据获取积分。",
        "solution_point_4_title": "社交激励层",
        "solution_point_4_desc": "深度融合社交属性与数字化激励。",
        "solution_point_5_title": "数据安全堡垒",
        "solution_point_5_desc": "硬件环境保护所有数字权益与身份。",
        "solution_point_6_title": "绿色可持续",
        "solution_point_6_desc": "低能耗网络，倡导绿色智能生活。",
        "arch_4_1_title": "LifeChain 网络",
        "arch_4_1_li1": "DPoS 共识机制，高效节能。",
        "arch_4_1_li2": "高性能：目标 TPS > 10,000。",
        "arch_4_1_li3": "EVM+ 兼容，支持隐私保护计算。",
        "arch_4_2_title": "Watch H 硬件安全",
        "arch_4_2_desc": "采用高强度抗量子加密技术。",
        "arch_4_2_li1_t": "安全单元 (SE)",
        "arch_4_2_li1_d": "CC EAL6+ 认证，物理隔离环境。",
        "arch_4_2_li2_t": "自主管理",
        "arch_4_2_li2_d": "密钥永不出芯片，用户拥有完全控制权。",
        "product_app_desc": "LifeChain Super App 是交互中心，包含仪表盘、社交中心、数据交换和社区入口，集成混合交互功能。",
        "token_name": "积分名称",
        "max_supply": "最大发行量",
        "fixed_supply": "总量恒定，无增发",
        "governance_desc": "LifeChain 的最终目标是社区共建的生态。投票权基于持有积分，议题包括技术升级、生态基金使用及参数调整。",
        "market_desc": "瞄准万亿级全球健康科技市场及数字化普及浪潮。「网络+硬件+App」的垂直整合构建了强大的技术护城河。",
        "conclusion_desc": "LifeChain 旨在打破健康数据垄断。21亿 LIF 积分中80%通过健康行为产出，我们开启了全新的公平权益分配范式。"
      }
    }
  },
  "zh-TW": {
    "wp": {
      "toc": "目錄",
      "release_date": "發布日期",
      "title_suffix": "下一代互聯網社交健康生態",
      "subtitle": "擁有硬件級安全，將健康數據主權和數位權益控制權歸還給用戶。",
      "disclaimer": {
        "title": "重要聲明與提示",
        "content": "本白皮書闡述了LifeChain項目的技術願景和路線圖。它不構成參與建議或承諾。數位生態參與具有風險，請謹慎評估。"
      },
      "sections": {
        "executive": "執行摘要",
        "intro": "價值困境",
        "solution": "LifeChain 解決方案",
        "architecture": "技術架構",
        "product": "產品組件",
        "tokenomics": "生態積分模型",
        "governance": "社區共建",
        "roadmap": "路線圖",
        "team": "團隊",
        "market": "行業分析",
        "risks": "風險與應對",
        "conclusion": "結語"
      },
      "content": {
        "executive_p1": "LifeChain 旨在推動個人健康數據控制權和權益分配的範式轉變。通過整合區塊鏈技術、AI 和智能穿戴設備，我們構建了一個包容且綠色的生態系統。",
        "executive_p2": "我們提供由主權高性能網絡、內置硬件安全模組的智能手錶 (Watch H) 以及沉浸式社交應用組成的全棧系統。",
        "intro_lead": "存在一個根本矛盾：用戶產生健康數據，卻幾乎沒有獲得任何權益。",
        "intro_point_1_title": "數據壟斷",
        "intro_point_1_desc": "科技巨頭壟斷用戶數據，用戶無法有效利用。",
        "intro_point_2_title": "信任赤字",
        "intro_point_2_desc": "傳統激勵機制易受數據不一致和欺詐影響。",
        "intro_point_3_title": "不可持續",
        "intro_point_3_desc": "許多模式依賴高擴張，缺乏內在價值支撐。",
        "intro_point_4_title": "體驗割裂",
        "intro_point_4_desc": "硬件與應用缺乏聯動，體驗不連貫。",
        "intro_point_5_title": "權益安全",
        "intro_point_5_desc": "缺乏硬件級安全保護，用戶權益面臨風險。",
        "solution_point_1_title": "可信源頭數據",
        "solution_point_1_desc": "Watch H 在生成端簽名，從源頭防止篡改。",
        "solution_point_2_title": "權益分配引擎",
        "solution_point_2_desc": "智能合約自動分發健康行為積分。",
        "solution_point_3_title": "數據交換",
        "solution_point_3_desc": "用戶通過交換平台授權匿名數據獲取積分。",
        "solution_point_4_title": "社交激勵層",
        "solution_point_4_desc": "深度融合社交屬性與數位化激勵。",
        "solution_point_5_title": "數據安全堡壘",
        "solution_point_5_desc": "硬件環境保護所有數位權益與身份。",
        "solution_point_6_title": "綠色可持續",
        "solution_point_6_desc": "低能耗網絡，倡導綠色智能生活。",
        "arch_4_1_title": "LifeChain 網絡",
        "arch_4_1_li1": "DPoS 共識機制，高效節能。",
        "arch_4_1_li2": "高性能：目標 TPS > 10,000。",
        "arch_4_1_li3": "EVM+ 兼容，支持隱私保護計算。",
        "arch_4_2_title": "Watch H 硬件安全",
        "arch_4_2_desc": "採用高強度抗量子加密技術。",
        "arch_4_2_li1_t": "安全單元 (SE)",
        "arch_4_2_li1_d": "CC EAL6+ 認證，物理隔離環境。",
        "arch_4_2_li2_t": "自主管理",
        "arch_4_2_li2_d": "密鑰永不出芯片，用戶擁有完全控制權。",
        "product_app_desc": "LifeChain Super App 是交互中心，包含儀表盤、社交中心、數據交換和社區入口，集成混合交互功能。",
        "token_name": "積分名稱",
        "max_supply": "最大發行量",
        "fixed_supply": "總量恆定，無增發",
        "governance_desc": "LifeChain 的最終目標是社區共建的生態。投票權基於持有積分，議題包括技術升級、生態基金使用及參數調整。",
        "market_desc": "瞄準萬億級全球健康科技市場及數位化普及浪潮。「網絡+硬件+App」的垂直整合構建了強大的技術護城河。",
        "conclusion_desc": "LifeChain 旨在打破健康數據壟斷。21億 LIF 積分中80%通過健康行為產出，我們開啟了全新的公平權益分配範式。"
      }
    }
  }
}</i18n>