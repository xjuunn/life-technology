<template>
  <div
    class="min-h-full h-[calc(100vh-90px)] bg-base-100 text-base-content font-sans relative overflow-hidden selection:bg-primary selection:text-primary-content flex flex-col">
    <div class="absolute inset-0 bg-base-100 z-0"></div>
    <!--背景图片--> 
    <div 
      class="absolute inset-y-0 right-0 w-2/3 z-0 "
      :style="{
        backgroundImage: 'url(/imgs/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'left center',
        backgroundRepeat: 'no-repeat'
      }"
    > 
    </div>
     <div class="absolute inset-0 z-0">     
      <!-- 中心高亮点 -->
      <div class="absolute right-1/4 top-1/3 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
    </div>

    <main class="flex-1 w-full flex items-center py-8 sm:py-12 lg:py-0 overflow-y-auto overflow-x-hidden">
      <div class="container mx-auto sm:px-6">
        <div class="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16">
          <div class="w-full lg:w-1/2 text-center lg:text-left space-y-5 sm:space-y-6 z-10 order-2 lg:order-1">
            <div class="space-y-3">
              <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1]">
                {{ t('download_page.title_line1') }}<br>
                <span class="text-primary">{{ t('download_page.title_line2') }}</span>
              </h1>
              <p class="text-sm sm:text-base text-base-content/60 max-w-md mx-auto lg:mx-0 leading-relaxed">
                {{ t('download_page.description') }}
              </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                class="btn btn-md sm:btn-lg h-auto py-3 px-4 sm:px-6 rounded-xl border-0 bg-base-content text-base-100 hover:bg-primary hover:scale-[1.02] transition-all shadow-lg shadow-base-content/10 flex items-center justify-start gap-3 group text-left">
                <Icon name="logos:android-icon" class="w-6 h-6 sm:w-7 sm:h-7 shrink-0" />
                <div class="flex flex-col">
                  <span class="text-[10px] sm:text-xs opacity-70 font-medium">{{ t('download_page.android_sub')
                  }}</span>
                  <span class="text-sm sm:text-base font-bold">{{ t('download_page.android_label') }}</span>
                </div>
                <Icon name="heroicons:arrow-down-tray"
                  class="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all ml-auto" />
              </button>

              <button
                class="btn btn-md sm:btn-lg h-auto py-3 px-4 sm:px-6 rounded-xl bg-base-200 text-base-content border border-base-content/5 hover:bg-base-300 hover:scale-[1.02] transition-all flex items-center justify-start gap-3 group text-left">
                <Icon name="mingcute:apple-fill" size="1.5rem"
                  class="w-6 h-6 sm:w-7 sm:h-7 text-base-content shrink-0" />
                <div class="flex flex-col">
                  <span class="text-[10px] sm:text-xs opacity-60 font-medium">{{ t('download_page.ios_sub') }}</span>
                  <span class="text-sm sm:text-base font-bold">{{ t('download_page.ios_label') }}</span>
                </div>
              </button>
            </div>

            <div class="hidden lg:flex items-center gap-3 pt-2 opacity-70">
              <div class="p-1 bg-white rounded-lg">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://life.app"
                  class="w-14 h-14 xl:w-16 xl:h-16 mix-blend-multiply" alt="QR Code">
              </div>
              <div class="text-xs xl:text-sm text-base-content/60">
                <p class="font-bold text-base-content">{{ t('download_page.qr_title') }}</p>
                <p>{{ t('download_page.qr_desc') }}</p>
              </div>
            </div>

            <div
              class="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 text-[9px] sm:text-[10px] font-bold text-base-content/40 uppercase tracking-wider flex-wrap">
              <span class="flex items-center gap-1.5">
                <Icon name="heroicons:shield-check" class="text-success shrink-0" /> {{ t('download_page.features.aes')
                }}
              </span>
              <span class="flex items-center gap-1.5">
                <Icon name="heroicons:cube-transparent" class="shrink-0" /> {{ t('download_page.features.multichain') }}
              </span>
              <span class="flex items-center gap-1.5">
                <Icon name="heroicons:lock-closed" class="shrink-0" /> {{ t('download_page.features.custodial') }}
              </span>
            </div>
          </div>

          <div class="w-full lg:w-2/5 flex justify-center relative order-1 lg:order-2">
            <div class="relative w-full max-w-[390px] lg:max-w-[400px] xl:max-w-[450px] flex items-center justify-center">
        
              <img 
                src="/imgs/phone.png" 
                alt="LifeChain App Preview" 
                class="w-full h-auto object-contain transform transition-transform duration-700 hover:scale-105 z-20 relative"
              >
              <!-- 手机图片中心高亮 -->
              <div class="absolute inset-0 flex items-center justify-center z-10">
                <div class="w-64 h-64 bg-primary/40 rounded-full blur-2xl animate-pulse"></div>
                <div class="w-32 h-32 bg-white/30 rounded-full blur-xl absolute"></div>
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const { t } = useAppI18n();
</script>