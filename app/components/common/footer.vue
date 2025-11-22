<template>
  <footer class="border-t border-base-content/10 bg-base-200 py-16 px-4">
    <div class="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8">
      <div class="flex items-center gap-3">
        <nuxt-img src="/favicon.png" width="30"></nuxt-img>
        <span class="text-xl font-bold tracking-tight">LIFE</span>
      </div>

      <div class="flex gap-8 text-sm font-medium text-base-content/60">
        <nuxt-link href="/" class="hover:text-primary transition-colors">首页</nuxt-link>
        <nuxt-link href="/introduction" class="hover:text-primary transition-colors">介绍</nuxt-link>
        <nuxt-link href="/apps" class="hover:text-primary transition-colors">应用</nuxt-link>
        <nuxt-link href="/blog" class="hover:text-primary transition-colors">博客</nuxt-link>
      </div>

      <div class="flex gap-4">
        <a href="#" class="btn btn-circle btn-sm btn-ghost hover:bg-base-content hover:text-base-100 transition-all">
          <Icon name="ri:wechat-fill" size="20" />
        </a>
        <a href="#" class="btn btn-circle btn-sm btn-ghost hover:bg-base-content hover:text-base-100 transition-all">
          <Icon name="ri:weibo-fill" size="20" />
        </a>
        <a href="#" class="btn btn-circle btn-sm btn-ghost hover:bg-base-content hover:text-base-100 transition-all">
          <Icon name="ri:mail-fill" size="20" />
        </a>
      </div>
    </div>
    <div class="text-center mt-12 space-y-2">
      <p class="text-xs text-base-content/40">&copy; 2014-2025 LIFE 区块链技术有限公司 版权所有</p>
      <p class="text-xs text-base-content/30">备案号：京ICP备XXXXXXXX号-1 | 区块链信息服务备案编号：京网信备XXXXXXXX号</p>
    </div>
  </footer>
</template>
