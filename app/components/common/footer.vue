<script setup lang="ts">
const { t } = useAppI18n()
const year = new Date().getFullYear()

const socialLinks = [
  { name: 'WeChat', icon: 'mingcute:wechat-fill', url: '#' },
  { name: 'Weibo', icon: 'mingcute:weibo-fill', url: '#' },
  { name: 'Email', icon: 'mingcute:mail-fill', url: 'mailto:contact@life.tech' },
  { name: 'Twitter', icon: 'mingcute:social-x-line', url: '#' }
]
</script>

<template>
  <footer class="bg-base-200 text-base-content font-sans border-t border-base-content/5">
    <div class="container mx-auto px-6 py-16">
      <div class="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">

        <!-- 左侧：品牌与简介 -->
        <div class="lg:w-1/4 flex flex-col items-start space-y-6">
          <div class="flex items-center gap-3">
            <nuxt-img src="/favicon.png" width="40" height="40" alt="LIFE Logo" class="rounded-lg" />
            <span class="text-2xl font-bold tracking-tight">LIFE</span>
          </div>
          <p class="text-base-content/60 leading-relaxed text-sm max-w-xs">
            {{ t('footer.description') }}
          </p>
          <!-- 社交图标 -->  
          <div class="flex gap-2">
            <a v-for="social in socialLinks" :key="social.name" :href="social.url"
              class="btn btn-circle btn-sm btn-ghost hover:bg-primary/10 hover:text-primary transition-all"
              :aria-label="social.name">
              <Icon :name="social.icon" size="20" />
            </a>
          </div>
        </div>

        <!-- 右侧：4列链接 -->
        <div class="lg:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <!-- Column 1: 产品 -->
          <nav class="flex flex-col gap-4">
            <h6 class="footer-title opacity-100 text-base-content mb-0">{{ t('footer.col1.title') }}</h6>
            <nuxt-link to="/apps"
              class="link link-hover text-base-content/60 hover:text-primary transition-colors text-sm">{{ t('nav.apps')
              }}</nuxt-link>
            <nuxt-link to="#"
              class="link link-hover text-base-content/60 hover:text-primary transition-colors text-sm">{{
                t('footer.col1.pricing') }}</nuxt-link>
            <nuxt-link to="#"
              class="link link-hover text-base-content/60 hover:text-primary transition-colors text-sm">Watch H</nuxt-link>
          </nav>

          <!-- Column 2: 资源 -->
          <nav class="flex flex-col gap-4">
            <h6 class="footer-title opacity-100 text-base-content mb-0">{{ t('footer.col2.title') }}</h6>
            <nuxt-link to="/blog"
              class="link link-hover text-base-content/60 hover:text-primary transition-colors text-sm">{{ t('nav.blog')
              }}</nuxt-link>
            <nuxt-link to="#"
              class="link link-hover text-base-content/60 hover:text-primary transition-colors text-sm">{{
                t('nav.whitepaper') }}</nuxt-link>
            <nuxt-link to="#"
              class="link link-hover text-base-content/60 hover:text-primary transition-colors text-sm">{{
                t('footer.col2.help') }}</nuxt-link>
            <nuxt-link to="#"
              class="link link-hover text-base-content/60 hover:text-primary transition-colors text-sm">{{
                t('footer.col2.status') }}</nuxt-link>
          </nav>

          <!-- Column 3: 公司 -->
          <nav class="flex flex-col gap-4">
            <h6 class="footer-title opacity-100 text-base-content mb-0">{{ t('footer.col3.title') }}</h6>
            <nuxt-link to="/intro"
              class="link link-hover text-base-content/60 hover:text-primary transition-colors text-sm">{{
                t('nav.intro') }}</nuxt-link>
            <nuxt-link to="#"
              class="link link-hover text-base-content/60 hover:text-primary transition-colors text-sm">{{
                t('footer.col3.careers') }}</nuxt-link>
            <nuxt-link to="#"
              class="link link-hover text-base-content/60 hover:text-primary transition-colors text-sm">{{
                t('footer.col3.media') }}</nuxt-link>
            <nuxt-link to="#"
              class="link link-hover text-base-content/60 hover:text-primary transition-colors text-sm">{{
                t('footer.col3.contact') }}</nuxt-link>
          </nav>

          <!-- Column 4: 法律 -->
          <nav class="flex flex-col gap-4">
            <h6 class="footer-title opacity-100 text-base-content mb-0">{{ t('footer.col4.title') }}</h6>
            <nuxt-link to="#"
              class="link link-hover text-base-content/60 hover:text-primary transition-colors text-sm">{{
                t('footer.col4.terms') }}</nuxt-link>
            <nuxt-link to="#"
              class="link link-hover text-base-content/60 hover:text-primary transition-colors text-sm">{{
                t('footer.col4.privacy') }}</nuxt-link>
            <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" rel="noopener noreferrer"
              class="link link-hover text-base-content/60 hover:text-primary transition-colors text-sm">
              {{ t('footer.icp_short') }}
            </a>
          </nav>
        </div>
      </div>
    </div>

    <!-- 底部版权栏 -->
    <div class="border-t border-base-content/10 bg-base-300/30">
      <div
        class="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-base-content/40">
        <p>&copy; {{ year }} {{ t('footer.copyright') }}</p>
        <div class="flex gap-6">
          <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" rel="noopener noreferrer"
            class="hover:text-base-content/80 transition-colors">
            {{ t('footer.compliance') }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<i18n lang="json">{
  "en": {
    "footer": {
      "description": "Connecting life and technology to build a smarter, more sustainable future for everyone.",
      "copyright": "Tianjin Chengjiu Network Technology Co., Ltd. All Rights Reserved.",
      "compliance": "ICP Filing: Tianjin ICP No. 2025040555-1",
      "icp_short": "ICP Info",
      "col1": {
        "title": "Product",
        "pricing": "Pricing",
        "features": "Features"
      },
      "col2": {
        "title": "Resources",
        "help": "Help Center",
        "community": "Community",
        "status": "System Status"
      },
      "col3": {
        "title": "Company",
        "careers": "Careers",
        "media": "Media Kit",
        "contact": "Contact Us"
      },
      "col4": {
        "title": "Legal",
        "terms": "Terms of Service",
        "privacy": "Privacy Policy"
      }
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
      "description": "连接生命与科技，构建更智能、可持续的未来。",
      "copyright": "天津成久网络科技有限公司 版权所有",
      "compliance": "备案号：津ICP备2025040555号-1",
      "icp_short": "ICP备案信息",
      "col1": {
        "title": "产品",
        "pricing": "价格方案",
        "features": "功能特性"
      },
      "col2": {
        "title": "资源",
        "help": "帮助中心",
        "community": "社区",
        "status": "系统状态"
      },
      "col3": {
        "title": "公司",
        "careers": "加入我们",
        "media": "媒体资料",
        "contact": "联系我们"
      },
      "col4": {
        "title": "法律",
        "terms": "服务条款",
        "privacy": "隐私政策"
      }
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
      "whitepaper": "LIFE 积分白皮书"
    }
  },
  "zh-TW": {
    "footer": {
      "description": "連接生命與科技，構建更智能、可持續的未來。",
      "copyright": "天津成久網絡科技有限公司 版權所有",
      "compliance": "備案號：津ICP備2025040555號-1",
      "icp_short": "ICP備案資訊",
      "col1": {
        "title": "產品",
        "pricing": "價格方案",
        "features": "功能特性"
      },
      "col2": {
        "title": "資源",
        "help": "幫助中心",
        "community": "社區",
        "status": "系統狀態"
      },
      "col3": {
        "title": "公司",
        "careers": "加入我們",
        "media": "媒體資料",
        "contact": "聯絡我們"
      },
      "col4": {
        "title": "法律",
        "terms": "服務條款",
        "privacy": "隱私政策",
        "cookies": "白皮書"
      }
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