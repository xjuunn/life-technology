<template>
  <div
    class="min-h-screen bg-base-100 text-base-content font-sans relative overflow-x-hidden selection:bg-primary selection:text-primary-content">
    <div class="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div
        class="absolute -top-32 -right-32 w-[30rem] h-[30rem] lg:w-[40rem] lg:h-[40rem] bg-primary/10 rounded-full blur-[100px] lg:blur-[128px] opacity-40 dark:opacity-30">
      </div>
      <div
        class="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] lg:w-[40rem] lg:h-[40rem] bg-secondary/10 rounded-full blur-[100px] lg:blur-[128px] opacity-40 dark:opacity-30">
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <section class="min-h-[40vh] lg:min-h-[45vh] flex flex-col justify-end pb-8 lg:pb-12 pt-24 sm:pt-28 lg:pt-32">
        <div class="max-w-3xl mx-auto w-full text-center space-y-6 lg:space-y-8">
          <div class="space-y-3 lg:space-y-4">
            <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-tight">
              探索 <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Web3 视界</span>
            </h1>
            <p class="text-base-content/60 text-sm sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
              洞察行业趋势，掌握技术前沿，与 LIFE 一起定义数字未来
            </p>
          </div>

          <div
            class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-base-200/50 dark:bg-base-200/30 backdrop-blur-xl border border-base-content/5 p-2 sm:p-2.5 rounded-2xl lg:rounded-3xl shadow-lg">
            <div class="relative flex-1">
              <div class="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Icon name="heroicons:magnifying-glass" class="w-4 h-4 sm:w-5 sm:h-5 text-base-content/40" />
              </div>
              <input type="text" placeholder="搜索文章、教程或观点..."
                class="input input-sm sm:input-md w-full pl-9 sm:pl-11 bg-transparent border-0 focus:bg-base-100 dark:focus:bg-base-300/50 rounded-xl transition-colors placeholder:text-base-content/30 text-sm sm:text-base" />
            </div>

            <div class="flex items-center justify-center gap-1 sm:gap-2 flex-shrink-0">
              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button"
                  class="btn btn-ghost btn-xs sm:btn-sm rounded-full font-normal text-base-content/70 gap-1 sm:gap-2 px-2 sm:px-3">
                  <Icon name="heroicons:tag" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span class="hidden sm:inline">分类</span>
                  <Icon name="heroicons:chevron-down" class="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </div>
                <ul tabindex="0"
                  class="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 dark:bg-base-200 rounded-xl w-44 sm:w-52 border border-base-content/5 mt-2 text-sm">
                  <li><a class="rounded-lg">全部文章</a></li>
                  <li><a class="rounded-lg">技术科普</a></li>
                  <li><a class="rounded-lg">行业动态</a></li>
                  <li><a class="rounded-lg">安全指南</a></li>
                </ul>
              </div>

              <div class="h-4 w-px bg-base-content/10"></div>

              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button"
                  class="btn btn-ghost btn-xs sm:btn-sm rounded-full font-normal text-base-content/70 gap-1 sm:gap-2 px-2 sm:px-3">
                  <Icon name="heroicons:arrows-up-down" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span class="hidden sm:inline">排序</span>
                </div>
                <ul tabindex="0"
                  class="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 dark:bg-base-200 rounded-xl w-44 sm:w-52 border border-base-content/5 mt-2 text-sm">
                  <li><a class="rounded-lg">最新发布</a></li>
                  <li><a class="rounded-lg">最多阅读</a></li>
                  <li><a class="rounded-lg">最早发布</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="flex gap-2 justify-center flex-wrap px-2">
            <div v-for="tag in ['#区块链', '#数据主权', '#DAO', '#NFT', '#DeFi']" :key="tag"
              class="badge badge-outline badge-sm sm:badge-md hover:bg-primary hover:text-primary-content hover:border-primary cursor-pointer transition-all duration-200 py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm">
              {{ tag }}
            </div>
          </div>
        </div>
      </section>

      <section class="pb-16 lg:pb-24">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          <div v-for="n in 12" :key="n"
            class="card bg-base-100 dark:bg-base-200/50 border border-base-content/5 rounded-2xl lg:rounded-3xl overflow-hidden">
            <div class="p-3 sm:p-4">
              <div class="skeleton aspect-[16/10] w-full rounded-xl lg:rounded-2xl"></div>

              <div class="pt-4 space-y-3">
                <div class="flex items-center gap-2">
                  <div class="skeleton h-5 w-16 rounded-full"></div>
                  <div class="skeleton h-4 w-20 rounded"></div>
                </div>

                <div class="space-y-2">
                  <div class="skeleton h-5 w-full rounded"></div>
                  <div class="skeleton h-5 w-4/5 rounded"></div>
                </div>

                <div class="space-y-1.5 pt-1">
                  <div class="skeleton h-3 w-full rounded"></div>
                  <div class="skeleton h-3 w-full rounded"></div>
                  <div class="skeleton h-3 w-3/4 rounded"></div>
                </div>
              </div>

              <div class="flex items-center justify-between mt-5 pt-4 border-t border-base-content/5">
                <div class="flex items-center gap-2">
                  <div class="skeleton w-7 h-7 rounded-full"></div>
                  <div class="skeleton h-3 w-16 rounded"></div>
                </div>
                <div class="skeleton h-3 w-14 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center mt-10 lg:mt-16">
          <div class="join">
            <button
              class="join-item btn btn-sm sm:btn-md btn-outline border-base-content/10 text-base-content/50 hover:bg-base-content hover:text-base-100 hover:border-base-content">
              <Icon name="heroicons:chevron-left" class="w-4 h-4" />
            </button>
            <button
              class="join-item btn btn-sm sm:btn-md btn-outline border-base-content/10 text-base-content/60 hover:bg-base-content hover:text-base-100 hover:border-base-content">1</button>
            <button
              class="join-item btn btn-sm sm:btn-md bg-primary text-primary-content border-primary hover:bg-primary/90 hover:border-primary/90">2</button>
            <button
              class="join-item btn btn-sm sm:btn-md btn-outline border-base-content/10 text-base-content/60 hover:bg-base-content hover:text-base-100 hover:border-base-content">3</button>
            <button
              class="join-item btn btn-sm sm:btn-md btn-outline border-base-content/10 text-base-content/50 hover:bg-base-content hover:text-base-100 hover:border-base-content">
              <Icon name="heroicons:chevron-right" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>