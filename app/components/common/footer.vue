<template>
  <footer class="border-t border-base-content/10 bg-base-200 py-16 px-4">
    <div class="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8">
      <div class="flex items-center gap-3">
        <nuxt-img src="/favicon.png" width="30"></nuxt-img>
        <span class="text-xl font-bold tracking-tight">LIFE</span>
      </div>

      <div class="flex gap-8 text-sm font-medium text-base-content/60">
        <nuxt-link href="/" class="hover:text-primary transition-colors">{{ t('nav.home') }}</nuxt-link>
        <nuxt-link href="/intro" class="hover:text-primary transition-colors">{{ t('nav.intro') }}</nuxt-link>
        <nuxt-link href="/apps" class="hover:text-primary transition-colors">{{ t('nav.apps') }}</nuxt-link>
        <nuxt-link href="/blog" class="hover:text-primary transition-colors">{{ t('nav.blog') }}</nuxt-link>
      </div>

      <div class="flex gap-4">
        <a href="#" class="btn btn-circle btn-sm btn-ghost hover:bg-base-content hover:text-base-100 transition-all">
          <Icon name="mingcute:wechat-fill" size="20" />
        </a>
        <a href="#" class="btn btn-circle btn-sm btn-ghost hover:bg-base-content hover:text-base-100 transition-all">
          <Icon name="mingcute:weibo-fill" size="20" />
        </a>
        <a href="#" class="btn btn-circle btn-sm btn-ghost hover:bg-base-content hover:text-base-100 transition-all">
          <Icon name="mingcute:mail-fill" size="20" />
        </a>
      </div>
    </div>
    <div class="text-center mt-12 space-y-2">
      <p class="text-xs text-base-content/40">&copy; 2014-2025 {{ t('footer.copyright') }}</p>
      <p class="text-xs text-base-content/30">{{ t('footer.compliance') }}</p>
    </div>
  </footer>
</template>

<script setup>
const { t } = useAppI18n();
</script>

<i18n lang="json">{
  "en": {
    "footer": {
      "copyright": "LIFE Blockchain Technology Co., Ltd. All Rights Reserved.",
      "compliance": "ICP Filing: Beijing ICP No. XXXXXXXX-1 | Blockchain Service Filing: Beijing Cyberspace No. XXXXXXXX"
    },
    "nav": {
      "home": "Home",
      "intro": "About",
      "apps": "Apps",
      "blog": "Blog",
      "login": "Login",
      "connect_wallet": "Connect Assets",
      "connect": "Connect",
      "brand": "LIFE TECHNOLOGY",
      "new_blog": "New Blog",
      "admin_panel": "Admin Panel",
      "profile": "My Profile",
      "settings": "Settings",
      "logout": "Log Out",
      "whatIsLife": "What is LIFE",
      "whatLifeCanDo": "What LIFE Can Do for You",
      "howToUseLife": "How to Use LIFE",
      "thingsYouNeedToKnow": "Things You Need to Know",
      "whitepaper": "LIFE Token White Paper"
    }
  },
  "zh-CN": {
    "footer": {
      "copyright": "LIFE 区块链技术有限公司 版权所有",
      "compliance": "备案号：京ICP备XXXXXXXX号-1 | 区块链信息服务备案编号：京网信备XXXXXXXX号"
    },
    "nav": {
      "home": "首页",
      "intro": "介绍",
      "apps": "应用",
      "blog": "博客",
      "login": "登录",
      "connect_wallet": "连接资产",
      "connect": "连接",
      "brand": "LIFE TECHNOLOGY",
      "new_blog": "新建博客",
      "admin_panel": "管理面板",
      "profile": "个人资料",
      "settings": "账号设置",
      "logout": "退出登录",
      "whatIsLife": "什么是 LIFE",
      "whatLifeCanDo": "LIFE 能为你做什么",
      "howToUseLife": "如何使用 LIFE",
      "thingsYouNeedToKnow": "你需要知道的事情",
      "whitepaper": "LIFE 代币白皮书"
    }
  },
  "zh-TW": {
    "footer": {
      "copyright": "LIFE 區塊鏈技術有限公司 版權所有",
      "compliance": "備案號：京ICP備XXXXXXXX號-1 | 區塊鏈信息服務備案編號：京網信備XXXXXXXX號"
    },
    "nav": {
      "home": "首頁",
      "intro": "介紹",
      "apps": "應用",
      "blog": "博客",
      "login": "登入",
      "connect_wallet": "連接資產",
      "connect": "連接",
      "brand": "LIFE TECHNOLOGY",
      "new_blog": "新建博客",
      "admin_panel": "管理面板",
      "profile": "個人資料",
      "settings": "帳號設定",
      "logout": "登出",
      "whatIsLife": "什麼是 LIFE",
      "whatLifeCanDo": "LIFE 能為你做什麼",
      "howToUseLife": "如何使用 LIFE",
      "thingsYouNeedToKnow": "你需要知道的事情",
      "whitepaper": "LIFE 代幣白皮書"
    }
  }
}</i18n>