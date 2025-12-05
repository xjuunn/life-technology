<template>
  <div class="min-h-screen bg-base-100 text-base-content font-sans selection:bg-primary selection:text-primary-content">
    <title>life-你需要知道的事</title>
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
          <div class="badge badge-primary badge-outline mb-6 font-bold tracking-wider py-4 px-4">{{
            t('about_page.header.badge') }}</div>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-8">
            {{ t('about_page.header.title_prefix') }}<br>
            <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">{{
              t('about_page.header.title_highlight') }}</span>
          </h1>
          <p class="text-xl text-base-content/70 leading-relaxed max-w-2xl">
            {{ t('about_page.header.description') }}
          </p>
        </div>
      </div>
    </section>
    <section class="py-20 px-4 md:px-8 border-t border-base-content/5 bg-base-200/30">
      <div class="container mx-auto max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            class="md:col-span-2 bg-base-100 rounded-4xl p-8 md:p-12 border border-base-content/5 shadow-sm flex flex-col justify-between group hover:border-primary/20 transition-colors">
            <div>
              <div class="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Icon name="heroicons:cube-transparent" size="24" />
              </div>
              <h3 class="text-3xl font-bold mb-4">{{ t('about_page.definition.main_card.title') }}</h3>
              <p class="text-base-content/60 leading-relaxed text-lg">
                {{ t('about_page.definition.main_card.desc') }}
              </p>
            </div>
            <div class="mt-8 flex flex-wrap gap-3">
              <div class="badge badge-lg bg-base-200 border-none text-base-content/70">{{
                t('about_page.definition.main_card.badge_web3') }}</div>
              <div class="badge badge-lg bg-base-200 border-none text-base-content/70">{{
                t('about_page.definition.main_card.badge_decentralized') }}</div>
              <div class="badge badge-lg bg-base-200 border-none text-base-content/70">{{
                t('about_page.definition.main_card.badge_sovereignty') }}</div>
            </div>
          </div>

          <div class="grid grid-rows-2 gap-6">
            <div
              class="bg-base-100 rounded-4xl p-8 border border-base-content/5 shadow-sm flex flex-col justify-center hover:-translate-y-1 transition-transform duration-300">
              <Icon name="heroicons:key" class="text-secondary w-8 h-8 mb-3" />
              <h4 class="text-xl font-bold mb-2">{{ t('about_page.definition.small_card_key.title') }}</h4>
              <p class="text-sm text-base-content/60">{{ t('about_page.definition.small_card_key.desc') }}</p>
            </div>
            <div
              class="bg-base-100 rounded-4xl p-8 border border-base-content/5 shadow-sm flex flex-col justify-center hover:-translate-y-1 transition-transform duration-300">
              <Icon name="heroicons:globe-alt" class="text-accent w-8 h-8 mb-3" />
              <h4 class="text-xl font-bold mb-2">{{ t('about_page.definition.small_card_eco.title') }}</h4>
              <p class="text-sm text-base-content/60">{{ t('about_page.definition.small_card_eco.desc') }}</p>
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
            <h2 class="text-sm font-bold text-primary uppercase tracking-widest mb-2">{{ t('about_page.token.subtitle')
            }}</h2>
            <h3 class="text-3xl md:text-4xl font-bold mb-6">{{ t('about_page.token.title') }}</h3>
            <p class="text-base-content/60 text-lg leading-relaxed mb-8">
              {{ t('about_page.token.desc') }}
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <Icon name="heroicons:check-circle" class="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <span class="font-bold block text-base-content">{{ t('about_page.token.list.circulation.title')
                  }}</span>
                  <span class="text-sm text-base-content/60">{{ t('about_page.token.list.circulation.desc') }}</span>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="heroicons:user-group" class="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <span class="font-bold block text-base-content">{{ t('about_page.token.list.governance.title')
                  }}</span>
                  <span class="text-sm text-base-content/60">{{ t('about_page.token.list.governance.desc') }}</span>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="heroicons:sparkles" class="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <span class="font-bold block text-base-content">{{ t('about_page.token.list.incentive.title')
                  }}</span>
                  <span class="text-sm text-base-content/60">{{ t('about_page.token.list.incentive.desc') }}</span>
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
            <h2 class="text-sm font-bold text-secondary uppercase tracking-widest mb-2">{{
              t('about_page.wallet.subtitle') }}</h2>
            <h3 class="text-3xl md:text-4xl font-bold mb-6">{{ t('about_page.wallet.title') }}</h3>
            <p class="text-base-content/60 text-lg leading-relaxed mb-8">
              {{ t('about_page.wallet.desc') }}
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="p-4 rounded-2xl bg-base-200/50 border border-base-content/5">
                <div class="font-bold mb-1">{{ t('about_page.wallet.features.multichain.title') }}</div>
                <div class="text-xs text-base-content/60">{{ t('about_page.wallet.features.multichain.desc') }}</div>
              </div>
              <div class="p-4 rounded-2xl bg-base-200/50 border border-base-content/5">
                <div class="font-bold mb-1">{{ t('about_page.wallet.features.storage.title') }}</div>
                <div class="text-xs text-base-content/60">{{ t('about_page.wallet.features.storage.desc') }}</div>
              </div>
              <div class="p-4 rounded-2xl bg-base-200/50 border border-base-content/5">
                <div class="font-bold mb-1">{{ t('about_page.wallet.features.privacy.title') }}</div>
                <div class="text-xs text-base-content/60">{{ t('about_page.wallet.features.privacy.desc') }}</div>
              </div>
              <div class="p-4 rounded-2xl bg-base-200/50 border border-base-content/5">
                <div class="font-bold mb-1">{{ t('about_page.wallet.features.opensource.title') }}</div>
                <div class="text-xs text-base-content/60">{{ t('about_page.wallet.features.opensource.desc') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-20 px-4 md:px-8 bg-base-content text-base-100">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-16 max-w-2xl mx-auto">
          <h2 class="text-3xl md:text-5xl font-bold mb-6">{{ t('about_page.benefits.title') }}</h2>
          <p class="text-base-100/60 text-lg">{{ t('about_page.benefits.subtitle') }}</p>
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
            <span class="text-primary font-bold tracking-widest uppercase text-xs mb-2">{{
              t('about_page.benefits.future.label') }}</span>
            <h3 class="text-2xl font-bold mb-4">{{ t('about_page.benefits.future.title') }}</h3>
            <p class="max-w-2xl text-base-100/60 mb-8">
              {{ t('about_page.benefits.future.desc') }}
            </p>
            <button
              class="btn btn-outline btn-primary rounded-full text-white border-white/20 hover:bg-white hover:text-base-content hover:border-white">
              {{ t('about_page.benefits.future.btn') }}
            </button>
          </div>
        </div>
      </div>
    </section>
    <section class="py-24 px-4 md:px-8 bg-base-200/50">
      <div class="container mx-auto max-w-4xl">
        <div class="flex items-end justify-between mb-12">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold">{{ t('about_page.safety.title') }}</h2>
            <p class="text-base-content/60 mt-2">{{ t('about_page.safety.subtitle') }}</p>
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
import { computed } from 'vue';
const { t } = useAppI18n();

const benefits = computed(() => [
  {
    icon: "heroicons:device-phone-mobile",
    title: t('about_page.benefits.list.mobile.title'),
    desc: t('about_page.benefits.list.mobile.desc')
  },
  {
    icon: "heroicons:lock-closed",
    title: t('about_page.benefits.list.security.title'),
    desc: t('about_page.benefits.list.security.desc')
  },
  {
    icon: "heroicons:finger-print",
    title: t('about_page.benefits.list.control.title'),
    desc: t('about_page.benefits.list.control.desc')
  },
  {
    icon: "heroicons:globe-asia-australia",
    title: t('about_page.benefits.list.global.title'),
    desc: t('about_page.benefits.list.global.desc')
  },
  {
    icon: "heroicons:squares-plus",
    title: t('about_page.benefits.list.ecosystem.title'),
    desc: t('about_page.benefits.list.ecosystem.desc')
  },
  {
    icon: "heroicons:user-circle",
    title: t('about_page.benefits.list.identity.title'),
    desc: t('about_page.benefits.list.identity.desc')
  }
])

const safetyTips = computed(() => [
  {
    title: t('about_page.safety.list.assets.title'),
    lines: [
      t('about_page.safety.list.assets.line1'),
      t('about_page.safety.list.assets.line2'),
      t('about_page.safety.list.assets.line3')
    ]
  },
  {
    title: t('about_page.safety.list.scam.title'),
    lines: [
      t('about_page.safety.list.scam.line1'),
      t('about_page.safety.list.scam.line2'),
      t('about_page.safety.list.scam.line3')
    ]
  },
  {
    title: t('about_page.safety.list.tx.title'),
    lines: [
      t('about_page.safety.list.tx.line1'),
      t('about_page.safety.list.tx.line2'),
      t('about_page.safety.list.tx.line3')
    ]
  },
  {
    title: t('about_page.safety.list.compliance.title'),
    lines: [
      t('about_page.safety.list.compliance.line1'),
      t('about_page.safety.list.compliance.line2'),
      t('about_page.safety.list.compliance.line3')
    ]
  },
  {
    title: t('about_page.safety.list.support.title'),
    lines: [
      t('about_page.safety.list.support.line1'),
      t('about_page.safety.list.support.line2'),
      t('about_page.safety.list.support.line3')
    ]
  }
])
</script>

<i18n lang="json">{
  "zh-CN": {
    "about_page": {
      "header": {
        "badge": "ABOUT LIFE",
        "title_prefix": "专业的区块链服务",
        "title_highlight": "值得信赖的选择",
        "description": "LIFE 不仅是一个资产，更是一个开放的 Web3 生态系统。我们致力于推动个人数据主权、数字身份及资产的自由流通，为您构建通往数字未来的安全桥梁。"
      },
      "definition": {
        "main_card": {
          "title": "什么是 LIFE？",
          "desc": "LIFE 是一个基于区块链技术的去中心化生态系统。我们摒弃了传统中心化平台的弊端，利用分布式账本技术，确保您的数据归您所有，资产由您掌控。在这里，隐私不再是奢侈品，而是基本权利。",
          "badge_web3": "Web3 平台",
          "badge_decentralized": "去中心化",
          "badge_sovereignty": "数据主权"
        },
        "small_card_key": {
          "title": "私钥自持",
          "desc": "100% 用户自主管理，平台无权访问您的任何资产。"
        },
        "small_card_eco": {
          "title": "丰富生态",
          "desc": "支持 NFT、DAO、AI 等多链资产管理与交互。"
        }
      },
      "token": {
        "subtitle": "The Token",
        "title": "LIFE 资产：生态的血液",
        "desc": "LIFE 是生态系统的原生加密资产。它不仅是流通媒介，更是治理权的象征。",
        "list": {
          "circulation": {
            "title": "基础流通",
            "desc": "支持各类支付、转账和兑换场景，高效便捷。"
          },
          "governance": {
            "title": "社区治理",
            "desc": "持有者通过提案和投票参与生态决策，共建未来。"
          },
          "incentive": {
            "title": "激励体系",
            "desc": "奖励开发者、创作者及节点维护者，保障网络运转。"
          }
        }
      },
      "wallet": {
        "subtitle": "The Gateway",
        "title": "LIFE 资产：Web3 入口",
        "desc": "专为数据主权和资产安全设计。代码完全开源，核心合约通过权威审计，是您通往去中心化世界的安全管家。",
        "features": {
          "multichain": {
            "title": "多链支持",
            "desc": "ETH, BSC, Polygon 一站式管理"
          },
          "storage": {
            "title": "本地存储",
            "desc": "助记词仅存于您的设备"
          },
          "privacy": {
            "title": "隐私保护",
            "desc": "内置零知识证明与混币技术"
          },
          "opensource": {
            "title": "开源透明",
            "desc": "接受全球社区监督与贡献"
          }
        }
      },
      "benefits": {
        "title": "LIFE 能为您做什么？",
        "subtitle": "无论您是区块链新手还是资深极客，这里都有您需要的功能。",
        "list": {
          "mobile": {
            "title": "随时随地管理资产",
            "desc": "无需依赖第三方，无论何时何地，通过手机或电脑即可自由转账、收款、参与链上活动。"
          },
          "security": {
            "title": "极致安全与隐私",
            "desc": "端到端加密、零知识证明。您的私钥和数据永远只保存在您的设备本地，LIFE 不存储任何敏感信息。"
          },
          "control": {
            "title": "数据自主可控",
            "desc": "自主授权或撤销第三方访问权限，支持链上足迹清理，真正实现数据主权。"
          },
          "global": {
            "title": "全球低成本支付",
            "desc": "极低手续费、极快速度完成跨境交易。无国界限制，无需银行等待。"
          },
          "ecosystem": {
            "title": "Web3 应用生态",
            "desc": "内置 DApp 浏览器，安全访问 DeFi、NFT、GameFi 等创新应用，探索无限可能。"
          },
          "identity": {
            "title": "匿名与身份保护",
            "desc": "无需绑定手机或实名。支持选择性披露身份，最大程度保护您的个人隐私。"
          }
        },
        "future": {
          "label": "Future Vision",
          "title": "LIFE 生态的未来",
          "desc": "我们将持续拓展多链兼容性、合规治理与跨界合作。未来，LIFE 将连接现实与虚拟，推动数字经济的全面普及。",
          "btn": "查看路线图"
        }
      },
      "safety": {
        "title": "你需要知道的事情",
        "subtitle": "安全是 Web3 的基石，请仔细阅读以下指南。",
        "list": {
          "assets": {
            "title": "资产安全与私钥管理",
            "line1": "私钥/助记词是资产唯一凭证，丢失无法找回，请务必线下手抄备份。",
            "line2": "严禁将私钥保存在微信、邮箱、网盘等联网环境中。",
            "line3": "官方团队永远不会向您索要私钥或助记词。"
          },
          "scam": {
            "title": "防范诈骗与钓鱼",
            "line1": "警惕假冒客服、空投、高额返利等骗局。",
            "line2": "请务必通过官网下载资产，防止恶意软件盗取资产。",
            "line3": "授权 DApp 前请仔细核查来源，不要随意点击陌生链接。"
          },
          "tx": {
            "title": "交易与费用须知",
            "line1": "区块链转账不可逆，转账前请务必核对地址。",
            "line2": "手续费由区块链网络收取，与平台无关，请根据需求合理设置 Gas 费。",
            "line3": "部分 DApp 可能收取额外服务费，操作前请阅读说明。"
          },
          "compliance": {
            "title": "隐私与合规声明",
            "line1": "LIFE 资产不收集、不存储您的个人数据。",
            "line2": "请遵守您所在地区的法律法规，合法使用数字资产。",
            "line3": "部分国家/地区对加密资产有特殊监管政策，请自行了解。"
          },
          "support": {
            "title": "常见问题与支持",
            "line1": "忘记助记词资产将永久丢失，官方无法找回。",
            "line2": "若发现资产被盗，请立即转移剩余资产并重置设备。",
            "line3": "如需帮助，请仅通过官网或官方社群联系，警惕假冒客服。"
          }
        }
      }
    }
  },
  "zh-TW": {
    "about_page": {
      "header": {
        "badge": "ABOUT LIFE",
        "title_prefix": "專業的區塊鏈服務",
        "title_highlight": "值得信賴的選擇",
        "description": "LIFE 不僅是一個錢包，更是一個開放的 Web3 生態系統。我們致力於推動個人數據主權、數字身份及資產的自由流通，為您構建通往數字未來的安全橋樑。"
      },
      "definition": {
        "main_card": {
          "title": "什麼是 LIFE？",
          "desc": "LIFE 是一個基於區塊鏈技術的去中心化生態系統。我們摒棄了傳統中心化平台的弊端，利用分佈式賬本技術，確保您的數據歸您所有，資產由您掌控。在這裡，隱私不再是奢侈品，而是基本權利。",
          "badge_web3": "Web3 平台",
          "badge_decentralized": "去中心化",
          "badge_sovereignty": "數據主權"
        },
        "small_card_key": {
          "title": "私鑰自持",
          "desc": "100% 用戶自主管理，平台無權訪問您的任何資產。"
        },
        "small_card_eco": {
          "title": "豐富生態",
          "desc": "支持 NFT、DAO、AI 等多鏈資產管理與交互。"
        }
      },
      "token": {
        "subtitle": "The Token",
        "title": "LIFE 資產：生態的血液",
        "desc": "LIFE 是生態系統的原生加密資產。它不僅是流通媒介，更是治理權的象徵。",
        "list": {
          "circulation": {
            "title": "基礎流通",
            "desc": "支持各類支付、轉賬和兌換場景，高效便捷。"
          },
          "governance": {
            "title": "社區治理",
            "desc": "持有者通過提案和投票參與生態決策，共建未來。"
          },
          "incentive": {
            "title": "激勵體系",
            "desc": "獎勵開發者、創作者及節點維護者，保障網絡運轉。"
          }
        }
      },
      "wallet": {
        "subtitle": "The Gateway",
        "title": "LIFE 錢包：Web3 入口",
        "desc": "專為數據主權和資產安全設計。代碼完全開源，核心合約通過權威審計，是您通往去中心化世界的安全管家。",
        "features": {
          "multichain": {
            "title": "多鏈支持",
            "desc": "ETH, BSC, Polygon 一站式管理"
          },
          "storage": {
            "title": "本地存儲",
            "desc": "助記詞僅存於您的設備"
          },
          "privacy": {
            "title": "隱私保護",
            "desc": "內置零知識證明與混幣技術"
          },
          "opensource": {
            "title": "開源透明",
            "desc": "接受全球社區監督與貢獻"
          }
        }
      },
      "benefits": {
        "title": "LIFE 能為您做什麼？",
        "subtitle": "無論您是區塊鏈新手還是資深極客，這裡都有您需要的功能。",
        "list": {
          "mobile": {
            "title": "隨時隨地管理資產",
            "desc": "無需依賴第三方，無論何時何地，通過手機或電腦即可自由轉賬、收款、參與鏈上活動。"
          },
          "security": {
            "title": "極致安全與隱私",
            "desc": "端到端加密、零知識證明。您的私鑰和數據永遠只保存在您的設備本地，LIFE 不存儲任何敏感信息。"
          },
          "control": {
            "title": "數據自主可控",
            "desc": "自主授權或撤銷第三方訪問權限，支持鏈上足跡清理，真正實現數據主權。"
          },
          "global": {
            "title": "全球低成本支付",
            "desc": "極低手續費、極快速度完成跨境交易。無國界限制，無需銀行等待。"
          },
          "ecosystem": {
            "title": "Web3 應用生態",
            "desc": "內置 DApp 瀏覽器，安全訪問 DeFi、NFT、GameFi 等創新應用，探索無限可能。"
          },
          "identity": {
            "title": "匿名與身份保護",
            "desc": "無需綁定手機或實名。支持選擇性披露身份，最大程度保護您的個人隱私。"
          }
        },
        "future": {
          "label": "Future Vision",
          "title": "LIFE 生態的未來",
          "desc": "我們將持續拓展多鏈兼容性、合規治理與跨界合作。未來，LIFE 將連接現實與虛擬，推動數字經濟的全面普及。",
          "btn": "查看路線圖"
        }
      },
      "safety": {
        "title": "你需要知道的事情",
        "subtitle": "安全是 Web3 的基石，請仔細閱讀以下指南。",
        "list": {
          "assets": {
            "title": "資產安全與私鑰管理",
            "line1": "私鑰/助記詞是資產唯一憑證，丟失無法找回，請務必線下抄寫備份。",
            "line2": "嚴禁將私鑰保存在微信、郵箱、網盤等聯網環境中。",
            "line3": "官方團隊永遠不會向您索要私鑰或助記詞。"
          },
          "scam": {
            "title": "防範詐騙與釣魚",
            "line1": "警惕假冒客服、空投、高額返利等騙局。",
            "line2": "請務必通過官網下載錢包，防止惡意軟件盜取資產。",
            "line3": "授權 DApp 前請仔細核查來源，不要隨意點擊陌生鏈接。"
          },
          "tx": {
            "title": "交易與費用須知",
            "line1": "區塊鏈轉賬不可逆，轉賬前請務必核對地址。",
            "line2": "手續費由區塊鏈網絡收取，與平台無關，請根據需求合理設置 Gas 費。",
            "line3": "部分 DApp 可能收取額外服務費，操作前請閱讀說明。"
          },
          "compliance": {
            "title": "隱私與合規聲明",
            "line1": "LIFE 錢包不收集、不存儲您的個人數據。",
            "line2": "請遵守您所在地區的法律法規，合法使用數字資產。",
            "line3": "部分國家/地區對加密資產有特殊監管政策，請自行了解。"
          },
          "support": {
            "title": "常見問題與支持",
            "line1": "忘記助記詞資產將永久丟失，官方無法找回。",
            "line2": "若發現錢包被盜，請立即轉移剩餘資產並重置設備。",
            "line3": "如需幫助，請僅通過官網或官方社群聯繫，警惕假冒客服。"
          }
        }
      }
    }
  },
  "en": {
    "about_page": {
      "header": {
        "badge": "ABOUT LIFE",
        "title_prefix": "Professional Blockchain Services",
        "title_highlight": "A Trustworthy Choice",
        "description": "LIFE is not just a wallet, but an open Web3 ecosystem. We are committed to promoting personal data sovereignty, digital identity, and the free circulation of assets, building a secure bridge for you to the digital future."
      },
      "definition": {
        "main_card": {
          "title": "What is LIFE?",
          "desc": "LIFE is a decentralized ecosystem based on blockchain technology. We have abandoned the drawbacks of traditional centralized platforms, utilizing distributed ledger technology to ensure your data belongs to you and your assets are under your control. Here, privacy is no longer a luxury, but a fundamental right.",
          "badge_web3": "Web3 Platform",
          "badge_decentralized": "Decentralized",
          "badge_sovereignty": "Data Sovereignty"
        },
        "small_card_key": {
          "title": "Self-Held Keys",
          "desc": "100% user-managed. The platform has no access to any of your assets."
        },
        "small_card_eco": {
          "title": "Rich Ecosystem",
          "desc": "Supports multi-chain asset management and interaction including NFTs, DAOs, and AI."
        }
      },
      "token": {
        "subtitle": "The Token",
        "title": "LIFE Assets: The Ecosystem Blood",
        "desc": "LIFE is the native crypto asset of the ecosystem. It is not only a medium of circulation but also a symbol of governance rights.",
        "list": {
          "circulation": {
            "title": "Basic Circulation",
            "desc": "Supports various payment, transfer, and exchange scenarios with high efficiency and convenience."
          },
          "governance": {
            "title": "Community Governance",
            "desc": "Holders participate in ecological decisions and co-build the future through proposals and voting."
          },
          "incentive": {
            "title": "Incentive System",
            "desc": "Rewards developers, creators, and node maintainers to ensure network operation."
          }
        }
      },
      "wallet": {
        "subtitle": "The Gateway",
        "title": "LIFE Wallet: Web3 Entry",
        "desc": "Designed for data sovereignty and asset security. The code is fully open source, and core contracts have passed authoritative audits. It is your secure steward to the decentralized world.",
        "features": {
          "multichain": {
            "title": "Multi-Chain Support",
            "desc": "One-stop management for ETH, BSC, Polygon"
          },
          "storage": {
            "title": "Local Storage",
            "desc": "Mnemonic phrases are stored only on your device"
          },
          "privacy": {
            "title": "Privacy Protection",
            "desc": "Built-in Zero-Knowledge Proofs and mixing tech"
          },
          "opensource": {
            "title": "Open Source",
            "desc": "Open to global community supervision"
          }
        }
      },
      "benefits": {
        "title": "What can LIFE do for you?",
        "subtitle": "Whether you are a blockchain novice or a seasoned geek, we have the features you need.",
        "list": {
          "mobile": {
            "title": "Manage Assets Anywhere",
            "desc": "No reliance on third parties. Transfer, receive, and participate in on-chain activities freely via mobile or PC anytime, anywhere."
          },
          "security": {
            "title": "Ultimate Security & Privacy",
            "desc": "End-to-end encryption, Zero-Knowledge Proofs. Your private keys and data are forever stored only locally on your device; LIFE stores no sensitive information."
          },
          "control": {
            "title": "Data Controllability",
            "desc": "Autonomously authorize or revoke third-party access, support on-chain footprint cleaning, and truly realize data sovereignty."
          },
          "global": {
            "title": "Global Low-Cost Payments",
            "desc": "Complete cross-border transactions with extremely low fees and high speed. No border restrictions, no bank waiting times."
          },
          "ecosystem": {
            "title": "Web3 App Ecosystem",
            "desc": "Built-in DApp browser to safely access innovative applications like DeFi, NFT, GameFi, and explore infinite possibilities."
          },
          "identity": {
            "title": "Anonymity & ID Protection",
            "desc": "No mobile binding or real-name verification required. Supports selective identity disclosure to maximize your personal privacy protection."
          }
        },
        "future": {
          "label": "Future Vision",
          "title": "The Future of LIFE Ecosystem",
          "desc": "We will continue to expand multi-chain compatibility, compliance governance, and cross-industry cooperation. In the future, LIFE will connect reality and virtuality, promoting the comprehensive popularization of the digital economy.",
          "btn": "View Roadmap"
        }
      },
      "safety": {
        "title": "Things You Need to Know",
        "subtitle": "Security is the cornerstone of Web3. Please read the following guide carefully.",
        "list": {
          "assets": {
            "title": "Asset Security & Key Management",
            "line1": "Private keys/mnemonics are the only credentials for assets. Lost ones cannot be recovered. Be sure to back them up offline on paper.",
            "line2": "Never store private keys in networked environments like WeChat, email, or cloud drives.",
            "line3": "The official team will NEVER ask for your private keys or mnemonic phrases."
          },
          "scam": {
            "title": "Prevent Scams & Phishing",
            "line1": "Be wary of scams involving fake customer service, airdrops, and high rebates.",
            "line2": "Be sure to download the wallet from the official website to prevent malware from stealing assets.",
            "line3": "Check the source carefully before authorizing DApps and do not click on strange links."
          },
          "tx": {
            "title": "Transactions & Fees",
            "line1": "Blockchain transfers are irreversible. Please verify the address before transferring.",
            "line2": "Fees are charged by the blockchain network and are unrelated to the platform. Set Gas fees reasonably based on demand.",
            "line3": "Some DApps may charge additional service fees. Please read instructions before operating."
          },
          "compliance": {
            "title": "Privacy & Compliance",
            "line1": "LIFE Wallet does not collect or store your personal data.",
            "line2": "Please comply with local laws and regulations when using digital assets.",
            "line3": "Some countries/regions have special regulatory policies on crypto assets. Please inform yourself."
          },
          "support": {
            "title": "FAQ & Support",
            "line1": "Assets will be permanently lost if you forget your mnemonic phrase; the official team cannot recover them.",
            "line2": "If you suspect your wallet is compromised, transfer remaining assets immediately and reset your device.",
            "line3": "For help, contact only via the official website or community. Be wary of fake customer service."
          }
        }
      }
    }
  }
}</i18n>