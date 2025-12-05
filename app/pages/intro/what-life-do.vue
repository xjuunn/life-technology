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

const { t } = useAppI18n()

// 功能数据
const capabilities: Capability[] = [
  {
    id: 1,
    icon: "mingcute:wallet-3-fill",
    title: t('about_page.benefits.list.mobile.title'),
    description: t('about_page.benefits.list.mobile.desc'),
    features: [
      t('about_page.benefits.list.mobile.desc'),
      t('about_page.wallet.features.multichain.desc'),
      t('about_page.token.list.circulation.desc'),
      t('about_page.safety.list.tx.line1')
    ],
    color: "primary"
  },
  {
    id: 2,
    icon: "heroicons:circle-stack",
    title: t('about_page.benefits.list.identity.title'),
    description: t('about_page.benefits.list.identity.desc'),
    features: [
      t('about_page.definition.main_card.badge_sovereignty'),
      t('about_page.wallet.features.privacy.desc'),
      t('about_page.benefits.list.control.desc'),
      t('about_page.compliance.line1') 
    ],
    color: "secondary"
  },
  {
    id: 3,
    icon: "mingcute:earth-fill",
    title: t('about_page.benefits.list.ecosystem.title'),
    description: t('about_page.benefits.list.ecosystem.desc'),
    features: [
      t('about_page.definition.small_card_eco.desc'),
      t('about_page.token.list.incentive.desc'),
      t('about_page.wallet.features.opensource.desc'),
      t('about_page.benefits.future.desc')
    ],
    color: "accent"
  },
  {
    id: 4,
    icon: "heroicons:user-group",
    title: t('about_page.token.list.governance.title'),
    description: t('about_page.token.list.governance.desc'),
    features: [
      t('about_page.token.list.governance.desc'),
      t('about_page.token.list.incentive.desc'),
      t('about_page.token.list.circulation.desc'),
      t('about_page.benefits.future.desc')
    ],
    color: "primary"
  },
  {
    id: 5,
    icon: "mingcute:safe-flash-fill",
    title: t('about_page.benefits.list.security.title'),
    description: t('about_page.benefits.list.security.desc'),
    features: [
      t('about_page.definition.small_card_key.title'),
      t('about_page.wallet.features.storage.desc'),
      t('about_page.safety.list.scam.line2'),
      t('about_page.safety.list.assets.line2')
    ],
    color: "secondary"
  },
  {
    id: 6,
    icon: "mingcute:rocket-2-fill",
    title: t('about_page.benefits.future.title'),
    description: t('about_page.benefits.future.desc'),
    features: [
      t('about_page.wallet.features.multichain.desc'),
      t('about_page.benefits.list.ecosystem.desc'),
      t('about_page.token.list.circulation.desc'),
      t('about_page.wallet.features.storage.desc')
    ],
    color: "accent"
  }
];

const useCases = [
  {
    category: t('about_page.token.list.circulation.title'),
    scenarios: [
      t('about_page.wallet.features.storage.desc'),
      t('about_page.definition.small_card_eco.desc'),
      t('about_page.token.list.incentive.desc'),
      t('about_page.benefits.list.identity.desc')
    ]
  },
  {
    category: t('about_page.wallet.features.opensource.title'),
    scenarios: [
      t('about_page.benefits.list.ecosystem.desc'),
      t('about_page.token.list.governance.desc'),
      t('about_page.benefits.future.desc'),
      t('about_page.safety.list.support.line3')
    ]
  },
  {
    category: t('about_page.definition.main_card.badge_web3'),
    scenarios: [
      t('about_page.token.list.circulation.desc'),
      t('about_page.benefits.list.control.desc'),
      t('about_page.benefits.list.identity.desc'),
      t('about_page.compliance.line2')
    ]
  }
];
</script>

<template>
  <div class="min-h-screen bg-base-100 text-base-content font-sans selection:bg-primary selection:text-primary-content">
    <title>life-life能为你做什么</title>
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
            {{ t('about_page.header.badge') }}
          </div>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-8">
            {{ t('about_page.header.title_prefix') }}
            <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">{{ t('about_page.header.title_highlight') }}</span>
          </h1>
          <p class="text-xl text-base-content/70 leading-relaxed max-w-2xl">
            {{ t('about_page.header.description') }}
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
                    'bg-linear-to-r from-primary to-primary/50': capability.color === 'primary',
                    'bg-linear-to-r from-secondary to-secondary/50': capability.color === 'secondary',
                    'bg-linear-to-r from-accent to-accent/50': capability.color === 'accent'
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
          <h2 class="text-3xl md:text-5xl font-bold mb-6">{{ t('about_page.benefits.title') }}</h2>
          <p class="text-base-content/60 text-lg">
            {{ t('about_page.benefits.subtitle') }}
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
                  'mingcute:earth-fill',
                ][index] || 'mingcute:question-fill'" 
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
            <div class="badge badge-primary mb-4">{{ t('about_page.benefits.future.label') }}</div>
            <h2 class="text-3xl md:text-4xl font-bold mb-6">{{ t('about_page.benefits.future.title') }}</h2>
            
            <div class="space-y-6">
              <div class="flex items-start gap-4 p-6 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors duration-300">
                <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Icon name="mingcute:lightning-fill" size="24" />
                </div>
                <div>
                  <h4 class="font-bold text-lg mb-2">{{ t('about_page.benefits.list.mobile.title') }}</h4>
                  <p class="text-base-content/60">{{ t('about_page.benefits.list.mobile.desc') }}</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4 p-6 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors duration-300">
                <div class="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <Icon name="mingcute:safe-shield-fill" size="24" />
                </div>
                <div>
                  <h4 class="font-bold text-lg mb-2">{{ t('about_page.benefits.list.security.title') }}</h4>
                  <p class="text-base-content/60">{{ t('about_page.benefits.list.security.desc') }}</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4 p-6 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors duration-300">
                <div class="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <Icon name="mingcute:earth-fill" size="24" />
                </div>
                <div>
                  <h4 class="font-bold text-lg mb-2">{{ t('about_page.benefits.list.ecosystem.title') }}</h4>
                  <p class="text-base-content/60">{{ t('about_page.benefits.list.ecosystem.desc') }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="w-full lg:w-1/2 relative">
            <div class="absolute -inset-8 bg-linear-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl opacity-30"></div>
            <div class="relative bg-base-100 border border-base-content/10 rounded-3xl p-8 aspect-square flex items-center justify-center">
              <div class="text-center">
                <div class="w-32 h-32 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-8">
                  <Icon name="mingcute:leaf-fill" class="text-white" size="48" />
                </div>
                <h3 class="text-2xl font-bold mb-4">{{ t('about_page.token.title') }}</h3>
                <p class="text-base-content/60">
                  {{ t('about_page.token.desc') }}
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
        <h2 class="text-3xl md:text-5xl font-bold mb-6">{{ t('about_page.benefits.future.title') }}</h2>
        <p class="text-base-100/60 text-lg mb-8 max-w-2xl mx-auto">
          {{ t('about_page.benefits.future.desc') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="btn btn-primary btn-lg rounded-full px-8 text-white">
            {{ t('hero.btn_start') }}
          </button>
           <button class="btn btn-primary btn-lg rounded-full px-8 text-white hover:bg-blue-600">
            {{ t('about_page.benefits.future.btn') }}
            <Icon name="mingcute:book-2-fill" size="20" />
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

<i18n lang="json">
{
  "zh-CN": {
    "nav": {
      "howToUseLife": "如何使用 LIFE"
    },
    "hero": {
      "btn_start": "立即开始"
    },
    "about_page": {
      "header": {
        "badge": "解锁数字生活新体验",
        "title_prefix": "LIFE 能为你",
        "title_highlight": "做什么",
        "description": "从数字资产管理到 Web3 生态探索，LIFE 为您提供全方位的数字生活解决方案，让您在区块链世界中游刃有余。"
      },
      "benefits": {
        "title": "适用场景",
        "subtitle": "无论您是个人用户、开发者还是企业, LIFE 都能满足您的不同需求",
        "list": {
          "mobile": {
            "title": "随时随地管理资产",
            "desc": "无需依赖第三方，自由转账、收款、参与链上活动。"
          },
          "identity": {
            "title": "数字身份与数据主权",
            "desc": "完全掌控您的数字身份和个人数据，支持选择性披露身份。"
          },
          "ecosystem": {
            "title": "Web3 应用生态",
            "desc": "内置 DApp 浏览器，安全访问 DeFi、NFT、GameFi 等创新应用。"
          },
          "control": {
            "desc": "自主授权或撤销第三方访问权限，真正实现数据主权。"
          },
          "security": {
            "title": "安全与隐私保护",
            "desc": "端到端加密、零知识证明，私钥本地存储。"
          }
        },
        "future": {
          "label": "核心价值",
          "title": "重新定义您的数字生活体验",
          "desc": "立即开始您的 Web3 之旅，发现 LIFE 为您带来的无限可能",
          "btn": "查看教程"
        }
      },
      "wallet": {
        "features": {
          "multichain": {
            "desc": "支持 ETH, BSC, Polygon 等多链一站式管理"
          },
          "privacy": {
            "desc": "内置零知识证明隐私保护"
          },
          "storage": {
            "desc": "助记词仅存于您的设备，从不上传云端"
          },
          "opensource": {
            "title": "开源透明",
            "desc": "接受全球社区监督与贡献"
          }
        }
      },
      "token": {
        "title": "LIFE 积分",
        "desc": "生态系统的原生加密资产，用于治理、手续费和激励。",
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
            "desc": "奖励开发者、创作者及节点维护者，保障网络运转。"
          }
        }
      },
      "definition": {
        "main_card": {
          "badge_web3": "Web3 平台",
          "badge_decentralized": "去中心化",
          "badge_sovereignty": "数据主权"
        },
        "small_card_key": {
          "title": "私钥自持"
        },
        "small_card_eco": {
          "desc": "支持 NFT、DAO、AI 等多链资产管理与交互。"
        }
      },
      "safety": {
        "list": {
          "tx": {
            "line1": "区块链转账不可逆，转账前请务必核对地址。"
          },
          "scam": {
            "line2": "请务必通过官网下载资产，防止恶意软件盗取资产。"
          },
          "assets": {
            "line2": "严禁将私钥保存在微信、邮箱、网盘等联网环境中。"
          },
          "support": {
            "line3": "如需帮助，请仅通过官网或官方社群联系，警惕假冒客服。"
          }
        }
      },
      "compliance": {
        "line1": "LIFE 资产不收集、不存储您的个人数据。",
        "line2": "请遵守您所在地区的法律法规，合法使用数字资产。"
      }
    }
  },
  "zh-TW": {
    "nav": {
      "howToUseLife": "如何使用 LIFE"
    },
    "hero": {
      "btn_start": "立即開始"
    },
    "about_page": {
      "header": {
        "badge": "解鎖數字生活新體驗",
        "title_prefix": "LIFE 能為你",
        "title_highlight": "做什麼",
        "description": "從數字資產管理到 Web3 生態探索，LIFE 為您提供全方位的數字生活解決方案，讓您在區塊鏈世界中游刃有餘。"
      },
      "benefits": {
        "title": "適用場景",
        "subtitle": "無論您是個人用戶、開發者還是企業, LIFE 都能滿足您的不同需求",
        "list": {
          "mobile": {
            "title": "隨時隨地管理資產",
            "desc": "無需依賴第三方，自由轉賬、收款、參與鏈上活動。"
          },
          "identity": {
            "title": "數字身份與數據主權",
            "desc": "完全掌控您的數字身份和個人數據，支持選擇性披露身份。"
          },
          "ecosystem": {
            "title": "Web3 應用生態",
            "desc": "內置 DApp 瀏覽器，安全訪問 DeFi、NFT、GameFi 等創新應用。"
          },
          "control": {
            "desc": "自主授權或撤銷第三方訪問權限，真正實現數據主權。"
          },
          "security": {
            "title": "安全與隱私保護",
            "desc": "端到端加密、零知識證明，私鑰本地存儲。"
          }
        },
        "future": {
          "label": "核心價值",
          "title": "重新定義您的數字生活體驗",
          "desc": "立即開始您的 Web3 之旅，發現 LIFE 為您帶來的無限可能",
          "btn": "查看教程"
        }
      },
      "wallet": {
        "features": {
          "multichain": {
            "desc": "支持 ETH, BSC, Polygon 等多鏈一站式管理"
          },
          "privacy": {
            "desc": "內置零知識證明隱私保護"
          },
          "storage": {
            "desc": "助記詞僅存於您的設備，從不上传云端"
          },
          "opensource": {
            "title": "開源透明",
            "desc": "接受全球社區監督與貢獻"
          }
        }
      },
      "token": {
        "title": "LIFE 代幣",
        "desc": "生態系統的原生加密資產，用於治理、手續費和激勵。",
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
            "desc": "獎勵開發者、創作者及節點維護者，保障網絡運轉。"
          }
        }
      },
      "definition": {
        "main_card": {
          "badge_web3": "Web3 平台",
          "badge_decentralized": "去中心化",
          "badge_sovereignty": "數據主權"
        },
        "small_card_key": {
          "title": "私鑰自持"
        },
        "small_card_eco": {
          "desc": "支持 NFT、DAO、AI 等多鏈資產管理與交互。"
        }
      },
      "safety": {
        "list": {
          "tx": {
            "line1": "區塊鏈轉賬不可逆，轉賬前請務必核對地址。"
          },
          "scam": {
            "line2": "請務必通過官網下載錢包，防止惡意軟件盜取資產。"
          },
          "assets": {
            "line2": "嚴禁將私鑰保存在微信、郵箱、網盤等聯網環境中。"
          },
          "support": {
            "line3": "如需幫助，請僅通過官網或官方社群聯繫，警惕假冒客服。"
          }
        }
      },
      "compliance": {
        "line1": "LIFE 錢包不收集、不存儲您的個人數據。",
        "line2": "請遵守您所在地區的法律法規，合法使用數字資產。"
      }
    }
  },
  "en": {
    "nav": {
      "howToUseLife": "How to Use LIFE"
    },
    "hero": {
      "btn_start": "Get Started Now"
    },
    "about_page": {
      "header": {
        "badge": "Unlock New Digital Life Experience",
        "title_prefix": "What Can LIFE",
        "title_highlight": "Do For You",
        "description": "From digital asset management to Web3 ecosystem exploration, LIFE provides comprehensive digital life solutions, allowing you to navigate the blockchain world with ease."
      },
      "benefits": {
        "title": "Use Cases",
        "subtitle": "Whether you are an individual user, developer or enterprise, LIFE can meet your different needs",
        "list": {
          "mobile": {
            "title": "Manage Assets Anywhere",
            "desc": "No reliance on third parties. Transfer, receive, and participate in on-chain activities freely."
          },
          "identity": {
            "title": "Digital Identity & Data Sovereignty",
            "desc": "Fully control your digital identity and personal data, supporting selective disclosure."
          },
          "ecosystem": {
            "title": "Web3 App Ecosystem",
            "desc": "Built-in DApp browser to safely access innovative applications like DeFi, NFT, and GameFi."
          },
          "control": {
            "desc": "Autonomously authorize or revoke third-party access, truly realizing data sovereignty."
          },
          "security": {
            "title": "Security & Privacy",
            "desc": "End-to-end encryption, Zero-Knowledge Proofs, local key storage."
          }
        },
        "future": {
          "label": "Core Values",
          "title": "Redefine Your Digital Life Experience",
          "desc": "Start your Web3 journey now and discover the infinite possibilities LIFE brings to you",
          "btn": "View Tutorial"
        }
      },
      "wallet": {
        "features": {
          "multichain": {
            "desc": "One-stop management for ETH, BSC, Polygon, and more."
          },
          "privacy": {
            "desc": "Built-in Zero-Knowledge Proofs for privacy protection."
          },
          "storage": {
            "desc": "Mnemonic phrases are stored only on your device, never uploaded to the cloud."
          },
          "opensource": {
            "title": "Open Source",
            "desc": "Open to global community supervision and contribution."
          }
        }
      },
      "token": {
        "title": "LIFE Token",
        "desc": "The ecosystem's native crypto asset, used for governance, fees, and incentives.",
        "list": {
          "circulation": {
            "title": "Basic Circulation",
            "desc": "Supports various payment, transfer, and exchange scenarios with high efficiency."
          },
          "governance": {
            "title": "Community Governance",
            "desc": "Holders participate in ecological decisions through proposals and voting."
          },
          "incentive": {
            "desc": "Rewards developers, creators, and node maintainers to ensure network operation."
          }
        }
      },
      "definition": {
        "main_card": {
          "badge_web3": "Web3 Platform",
          "badge_decentralized": "Decentralized",
          "badge_sovereignty": "Data Sovereignty"
        },
        "small_card_key": {
          "title": "Self-Held Keys"
        },
        "small_card_eco": {
          "desc": "Supports multi-chain asset management including NFTs, DAOs, and AI."
        }
      },
      "safety": {
        "list": {
          "tx": {
            "line1": "Blockchain transfers are irreversible. Please verify the address before transferring."
          },
          "scam": {
            "line2": "Be sure to download the wallet from the official website to prevent malware."
          },
          "assets": {
            "line2": "Never store private keys in networked environments like email or cloud drives."
          },
          "support": {
            "line3": "For help, contact only via the official website or community. Be wary of fake support."
          }
        }
      },
      "compliance": {
        "line1": "LIFE Wallet does not collect or store your personal data.",
        "line2": "Please comply with local laws and regulations when using digital assets."
      }
    }
  }
}
</i18n>