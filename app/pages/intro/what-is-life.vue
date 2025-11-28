<script setup lang="ts">
import { computed } from 'vue';
const { t } = useAppI18n();

const features = computed(() => [
  {
    title: t('what_is_life.app.features.multichain.title'),
    desc: t('what_is_life.app.features.multichain.desc'),
    icon: 'mingcute:currency-bitcoin-fill'
  },
  {
    title: t('what_is_life.app.features.storage.title'),
    desc: t('what_is_life.app.features.storage.desc'),
    icon: 'mingcute:key-2-fill'
  },
  {
    title: t('what_is_life.app.features.control.title'),
    desc: t('what_is_life.app.features.control.desc'),
    icon: 'mingcute:user-auth-fill'
  },
  {
    title: t('what_is_life.app.features.privacy.title'),
    desc: t('what_is_life.app.features.privacy.desc'),
    icon: 'mingcute:incognito-mode-fill'
  },
  {
    title: t('what_is_life.app.features.dapp.title'),
    desc: t('what_is_life.app.features.dapp.desc'),
    icon: 'mingcute:compass-fill'
  },
  {
    title: t('what_is_life.app.features.audit.title'),
    desc: t('what_is_life.app.features.audit.desc'),
    icon: 'mingcute:safe-shield-fill'
  },
  {
    title: t('what_is_life.app.features.opensource.title'),
    desc: t('what_is_life.app.features.opensource.desc'),
    icon: 'mingcute:github-fill'
  }
]);

const highlights = computed(() => [
  { text: t('what_is_life.intro.highlight1'), icon: 'mingcute:shield-shape-fill' },
  { text: t('what_is_life.intro.highlight2'), icon: 'mingcute:eye-close-fill' },
  { text: t('what_is_life.intro.highlight3'), icon: 'mingcute:plugin-2-fill' }
]);
</script>

<template>
  <div class="min-h-screen bg-base-100 text-base-content font-sans selection:bg-primary selection:text-primary-content">
    <div class="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div class="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] bg-primary/5 rounded-full blur-[120px] opacity-40">
      </div>
      <div
        class="absolute -bottom-[20%] -left-[10%] w-[70vw] h-[70vw] bg-secondary/5 rounded-full blur-[120px] opacity-40">
      </div>
      <div
        class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay">
      </div>
    </div>

    <section class="relative pt-32 pb-20 px-4 md:px-8">
      <div class="container mx-auto max-w-6xl">
        <div class="max-w-4xl">
          <div class="badge badge-primary badge-outline mb-6 font-bold tracking-wider py-4 px-4 uppercase">
            {{ t('what_is_life.hero.badge') }}
          </div>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-8">
            {{ t('what_is_life.hero.title') }}
            <br />
            <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
              {{ t('what_is_life.hero.subtitle') }}
            </span>
          </h1>
        </div>
      </div>
    </section>

    <section class="py-16 px-4 md:px-8 bg-base-200/30">
      <div class="container mx-auto max-w-6xl">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="prose prose-lg dark:prose-invert">
            <h2 class="text-3xl font-bold mb-6">{{ t('what_is_life.intro.title') }}</h2>
            <p class="text-base-content/80 leading-relaxed text-lg">
              {{ t('what_is_life.intro.desc') }}
            </p>
          </div>
          <div class="grid gap-4">
            <div v-for="(item, index) in highlights" :key="index"
              class="flex items-center gap-4 p-4 rounded-xl bg-base-100 border border-base-content/5 shadow-sm hover:border-primary/20 transition-colors">
              <div class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon :name="item.icon" size="20" />
              </div>
              <span class="font-medium">{{ item.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 px-4 md:px-8">
      <div class="container mx-auto max-w-6xl">
        <div
          class="card bg-linear-to-br from-base-200/80 to-base-100 border border-base-content/5 shadow-xl overflow-hidden relative">
          <div
            class="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2">
          </div>
          <div class="card-body p-8 md:p-12 relative z-10">
            <div class="flex flex-col md:flex-row gap-12 items-start">
              <div
                class="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <Icon name="mingcute:coin-2-fill" size="36" />
              </div>
              <div>
                <h2 class="text-3xl font-bold mb-6">{{ t('what_is_life.token.title') }}</h2>
                <p class="text-base-content/70 leading-relaxed mb-6">
                  {{ t('what_is_life.token.desc_p1') }}
                </p>
                <div class="grid sm:grid-cols-3 gap-6 pt-4">
                  <div class="p-4 rounded-xl bg-base-100/50 border border-base-content/5">
                    <h4 class="font-bold text-primary mb-1">{{ t('what_is_life.token.utility.payment') }}</h4>
                    <span class="text-xs opacity-60">Global Circulation</span>
                  </div>
                  <div class="p-4 rounded-xl bg-base-100/50 border border-base-content/5">
                    <h4 class="font-bold text-secondary mb-1">{{ t('what_is_life.token.utility.governance') }}</h4>
                    <span class="text-xs opacity-60">Community Voting</span>
                  </div>
                  <div class="p-4 rounded-xl bg-base-100/50 border border-base-content/5">
                    <h4 class="font-bold text-accent mb-1">{{ t('what_is_life.token.utility.incentive') }}</h4>
                    <span class="text-xs opacity-60">Ecosystem Rewards</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 px-4 md:px-8 bg-base-content text-base-100 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div
          class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-size-[250%_250%] animate-shine">
        </div>
      </div>

      <div class="container mx-auto max-w-6xl relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-base-100/10 border border-base-100/20 text-xs font-bold uppercase tracking-widest mb-6">
            <Icon name="mingcute:safe-flash-fill" />
            {{ t('what_is_life.app.badge') }}
          </div>
          <h2 class="text-3xl md:text-5xl font-bold mb-6">{{ t('what_is_life.app.title') }}</h2>
          <p class="text-base-100/70 text-lg">
            {{ t('what_is_life.app.desc') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(feature, index) in features" :key="index"
            class="group p-6 rounded-2xl bg-base-100/5 border border-base-100/10 hover:bg-base-100/10 transition-colors">
            <div
              class="mb-4 w-12 h-12 rounded-lg bg-base-100/10 flex items-center justify-center text-base-100 group-hover:scale-110 transition-transform">
              <Icon :name="feature.icon" size="24" />
            </div>
            <h4 class="text-xl font-bold mb-2">{{ feature.title }}</h4>
            <p class="text-sm text-base-100/60 leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>

        <div class="mt-16 text-center">
          <p class="text-lg font-medium text-base-100/90 mb-8 max-w-2xl mx-auto">
            {{ t('what_is_life.app.summary') }}
          </p>
        </div>
      </div>
    </section>

    <section class="py-24 px-4 md:px-8">
      <div class="container mx-auto max-w-4xl text-center">
        <div class="mb-8">
          <Icon name="mingcute:rocket-fill" size="48" class="text-primary animate-bounce" />
        </div>
        <h2 class="text-3xl md:text-5xl font-bold mb-6">{{ t('what_is_life.future.title') }}</h2>
        <p class="text-lg text-base-content/70 mb-10 leading-relaxed">
          {{ t('what_is_life.future.desc') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/20">
            {{ t('what_is_life.future.join_btn') }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes shine {
  0% {
    background-position: 100% 0;
  }

  100% {
    background-position: 0 100%;
  }
}

.animate-shine {
  animation: shine 8s linear infinite;
}
</style>

<i18n lang="json">{
  "zh-CN": {
    "what_is_life": {
      "hero": {
        "badge": "认识 LIFE",
        "title": "专业的区块链服务",
        "subtitle": "值得信赖的选择"
      },
      "intro": {
        "title": "什么是 LIFE？",
        "desc": "LIFE 是一个基于区块链技术的去中心化生态系统，旨在为全球用户提供安全、隐私、自主的数据与数字资产管理体验。LIFE 不仅是一个数字资产管家，更是一个开放的 Web3 平台，致力于推动个人数据主权、数字身份、资产自由流通和创新应用的普及。",
        "highlight1": "100% 用户自主管理私钥和数据，平台无权访问。",
        "highlight2": "强调隐私保护与合规，支持最小化授权。",
        "highlight3": "支持多链资产管理、NFT、DAO、AI 等丰富生态。"
      },
      "token": {
        "title": "什么是 LIFE 资产",
        "desc_p1": "LIFE 是 LIFE 生态系统的原生加密资产，在生态内承担多重核心功能。作为基础流通媒介，它支持各类支付、转账和兑换场景；同时赋予持有者治理权，使其能通过提案和投票参与生态决策。LIF还构建了完整的激励体系，用于奖励开发者、内容创作者及节点维护者等。此外，该代币用于覆盖链上交易及智能合约交互产生的手续费，保障网络高效稳定运转。",
        "utility": {
          "payment": "支付流通",
          "governance": "生态治理",
          "incentive": "激励体系"
        }
      },
      "app": {
        "badge": "核心产品",
        "title": "什么是 LIFE 数字资产管家？",
        "desc": "LIFE 数字资产管家是 LIFE 生态的官方应用，专为数据主权和资产安全设计。",
        "features": {
          "multichain": {
            "title": "多链支持",
            "desc": "一站式管理以太坊、BSC、Polygon 等多链资产。"
          },
          "storage": {
            "title": "私钥本地存储",
            "desc": "私钥和助记词仅存于用户设备，杜绝云端风险。"
          },
          "control": {
            "title": "数据自主管理",
            "desc": "用户可自主授权、撤销第三方访问权限，真正掌控数据。"
          },
          "privacy": {
            "title": "隐私保护",
            "desc": "内置隐私交易、匿名转账、零知识证明等前沿技术。"
          },
          "dapp": {
            "title": "DApp 浏览器",
            "desc": "安全访问 NFT、DAO 等丰富的 Web3 创新应用。"
          },
          "audit": {
            "title": "安全审计",
            "desc": "核心代码和合约均通过权威第三方安全审计。"
          },
          "opensource": {
            "title": "开源透明",
            "desc": "核心代码完全开源，接受全球社区监督。"
          }
        },
        "summary": "LIFE 数字资产管家不仅是资产的安全堡垒，更是你通往 Web3 世界的入口。无论是资产管理、身份认证、数据授权还是参与创新应用，都能为你提供一站式体验。"
      },
      "future": {
        "title": "LIFE 生态的未来",
        "desc": "LIFE 致力于打造一个开放、包容、创新的 Web3 生态系统。未来，LIFE 将持续拓展多链兼容性、隐私保护、合规治理、跨界合作等能力，推动个人数据主权和数字经济的普及。我们欢迎全球开发者、用户、机构共同参与 LIFE 生态建设。",
        "join_btn": "加入我们"
      }
    }
  },
  "zh-TW": {
    "what_is_life": {
      "hero": {
        "badge": "認識 LIFE",
        "title": "專業的區塊鏈服務",
        "subtitle": "值得信賴的選擇"
      },
      "intro": {
        "title": "什麼是 LIFE？",
        "desc": "LIFE 是一個基於區塊鏈技術的去中心化生態系統，旨在為全球用戶提供安全、隱私、自主的數據與數位資產管理體驗。LIFE 不僅是一個數位資產管家，更是一個開放的 Web3 平台，致力於推動個人數據主權、數位身份、資產自由流通和創新應用的普及。",
        "highlight1": "100% 用戶自主管理私鑰和數據，平台無權訪問。",
        "highlight2": "強調隱私保護與合規，支持最小化授權。",
        "highlight3": "支持多鏈資產管理、NFT、DAO、AI 等豐富生態。"
      },
      "token": {
        "title": "什麼是 LIFE 資產",
        "desc_p1": "LIFE 是 LIFE 生態系統的原生加密資產，在生態內承擔多重核心功能。作為基礎流通媒介，它支持各類支付、轉賬和兌換場景；同時賦予持有者治理權，使其能通過提案和投票參與生態決策。LIF還構建了完整的激勵體系，用於獎勵開發者、內容創作者及節點維護者等。此外，該代幣用於覆蓋鏈上交易及智能合約交互產生的手續費，保障網絡高效穩定運轉。",
        "utility": {
          "payment": "支付流通",
          "governance": "生態治理",
          "incentive": "激勵體系"
        }
      },
      "app": {
        "badge": "核心產品",
        "title": "什麼是 LIFE 數位資產管家？",
        "desc": "LIFE 數位資產管家是 LIFE 生態的官方應用，專為數據主權和資產安全設計。",
        "features": {
          "multichain": {
            "title": "多鏈支持",
            "desc": "一站式管理以太坊、BSC、Polygon 等多鏈資產。"
          },
          "storage": {
            "title": "私鑰本地存儲",
            "desc": "私鑰和助記詞僅存於用戶設備，杜絕雲端風險。"
          },
          "control": {
            "title": "數據自主管理",
            "desc": "用戶可自主授權、撤銷第三方訪問權限，真正掌控數據。"
          },
          "privacy": {
            "title": "隱私保護",
            "desc": "內置隱私交易、匿名轉賬、零知識證明等前沿技術。"
          },
          "dapp": {
            "title": "DApp 瀏覽器",
            "desc": "安全訪問 NFT、DAO 等豐富的 Web3 創新應用。"
          },
          "audit": {
            "title": "安全審計",
            "desc": "核心代碼和合約均通過權威第三方安全審計。"
          },
          "opensource": {
            "title": "開源透明",
            "desc": "核心代碼完全開源，接受全球社區監督。"
          }
        },
        "summary": "LIFE 數位資產管家不僅是資產的安全堡壘，更是你通往 Web3 世界的入口。無論是資產管理、身份認證、數據授權還是參與創新應用，都能為你提供一站式體驗。"
      },
      "future": {
        "title": "LIFE 生態的未來",
        "desc": "LIFE 致力於打造一個開放、包容、創新的 Web3 生態系統。未來，LIFE 將持續拓展多鏈兼容性、隱私保護、合規治理、跨界合作等能力，推動個人數據主權和數字經濟的普及。我們歡迎全球開發者、用戶、機構共同參與 LIFE 生態建設。",
        "join_btn": "加入我們"
      }
    }
  },
  "en": {
    "what_is_life": {
      "hero": {
        "badge": "About LIFE",
        "title": "Professional Blockchain Services",
        "subtitle": "A Trustworthy Choice"
      },
      "intro": {
        "title": "What is LIFE?",
        "desc": "LIFE is a decentralized ecosystem based on blockchain technology, designed to provide global users with a secure, private, and autonomous experience in data and digital asset management. LIFE is not just a digital asset manager but an open Web3 platform committed to promoting personal data sovereignty, digital identity, free circulation of assets, and the adoption of innovative applications.",
        "highlight1": "100% user-controlled private keys and data, no platform access.",
        "highlight2": "Emphasis on privacy protection and compliance, supporting minimized authorization.",
        "highlight3": "Supports multi-chain asset management, NFTs, DAOs, AI, and a rich ecosystem."
      },
      "token": {
        "title": "What is LIFE Asset?",
        "desc_p1": "LIFE is the native crypto asset of the LIFE ecosystem, performing multiple core functions within the ecosystem. As a basic medium of circulation, it supports various payment, transfer, and exchange scenarios; at the same time, it grants holders governance rights, enabling them to participate in ecological decisions through proposals and voting. LIF also builds a complete incentive system to reward developers, content creators, and node maintainers. Additionally, the token is used to cover fees generated by on-chain transactions and smart contract interactions, ensuring the network operates efficiently and stably.",
        "utility": {
          "payment": "Payment",
          "governance": "Governance",
          "incentive": "Incentives"
        }
      },
      "app": {
        "badge": "Core Product",
        "title": "What is LIFE Digital Asset Manager?",
        "desc": "LIFE Digital Asset Manager is the official application of the LIFE ecosystem, designed specifically for data sovereignty and asset security.",
        "features": {
          "multichain": {
            "title": "Multi-Chain Support",
            "desc": "One-stop management for Ethereum, BSC, Polygon, and other multi-chain assets."
          },
          "storage": {
            "title": "Local Key Storage",
            "desc": "Private keys and mnemonic phrases exist only on user devices, eliminating cloud risks."
          },
          "control": {
            "title": "Autonomous Data Management",
            "desc": "Users can autonomously authorize and revoke third-party access rights, truly controlling their data."
          },
          "privacy": {
            "title": "Privacy Protection",
            "desc": "Built-in cutting-edge technologies like private transactions, anonymous transfers, and zero-knowledge proofs."
          },
          "dapp": {
            "title": "DApp Browser",
            "desc": "Securely access rich Web3 innovative applications like NFTs and DAOs."
          },
          "audit": {
            "title": "Security Audits",
            "desc": "Core code and contracts have passed authoritative third-party security audits."
          },
          "opensource": {
            "title": "Open Source & Transparent",
            "desc": "Core code is fully open source, accepting supervision from the global community."
          }
        },
        "summary": "LIFE Digital Asset Manager is not only a secure fortress for assets but also your gateway to the Web3 world. Whether it's asset management, identity authentication, data authorization, or participating in innovative applications, it provides a one-stop experience."
      },
      "future": {
        "title": "The Future of LIFE Ecosystem",
        "desc": "LIFE is committed to building an open, inclusive, and innovative Web3 ecosystem. In the future, LIFE will continue to expand capabilities in multi-chain compatibility, privacy protection, compliance governance, and cross-industry cooperation, promoting the popularization of personal data sovereignty and the digital economy. We welcome global developers, users, and institutions to participate in the construction of the LIFE ecosystem.",
        "join_btn": "Join Us"
      }
    }
  }
}</i18n>