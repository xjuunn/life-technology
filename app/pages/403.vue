<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()

definePageMeta({
  layout: "empty"
})

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    navigateTo('/')
  }
}
</script>

<template>
  <div
    class="relative w-full min-h-screen bg-base-300 flex items-center justify-center overflow-hidden font-sans selection:bg-error/20">
    <div
      class="absolute inset-0 pointer-events-none ">
      <EffectSquares :square-size="20" :speed="0.2" border-color="#ffffff10"></EffectSquares>
    </div>
    <div
      class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full animate-blob mix-blend-multiply dark:mix-blend-screen">
    </div>
    <div
      class="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-secondary/20 blur-[100px] rounded-full animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen">
    </div>
    <div
      class="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen">
    </div>

    <div class="relative w-full max-w-lg p-4 z-10">
      <div
        class="relative overflow-hidden rounded-[2.5rem] bg-base-100/40 backdrop-blur-3xl border border-base-content/5 shadow-2xl dark:shadow-black/50 dark:bg-base-100/10">
        <div
          class="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none">
        </div>

        <div class="relative p-8 sm:p-12 flex flex-col items-center text-center">
          <div class="mb-8 relative group cursor-default">
            <div
              class="absolute inset-0 bg-error/30 blur-3xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500">
            </div>

            <div
              class="relative w-28 h-28 bg-linear-to-b from-base-100/80 to-base-100/20 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] animate-float">
              <div class="absolute inset-0 rounded-3xl border border-white/40 mask-gradient opacity-50"></div>
              <Icon name="mingcute:lock-fill"
                class="text-6xl text-error drop-shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
            </div>

            <div
              class="absolute -right-4 -bottom-2 w-12 h-12 bg-base-100/80 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/20 animate-bounce-slow">
              <Icon name="mingcute:key-2-fill" class="text-2xl text-warning" />
            </div>
          </div>

          <h1 class="text-4xl sm:text-5xl font-black text-base-content mb-3 tracking-tight">
            <span
              class="bg-clip-text text-transparent bg-linear-to-r from-base-content via-base-content to-base-content/50">403</span>
          </h1>

          <h2 class="text-xl font-bold text-base-content/90 mb-4">
            {{ t('error.403.title') }}
          </h2>

          <p class="text-base-content/60 mb-10 leading-relaxed text-sm sm:text-base max-w-xs sm:max-w-sm mx-auto">
            {{ t('error.403.desc') }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4 w-full">
            <button @click="goBack"
              class="btn h-12 px-6 flex-1 rounded-2xl border border-base-content/10 bg-white/5 hover:bg-white/10 hover:border-base-content/20 text-base-content backdrop-blur-sm transition-all duration-300 active:scale-95">
              <Icon name="mingcute:arrow-left-line" class="text-xl" />
              {{ t('error.back') }}
            </button>

            <NuxtLink to="/"
              class="btn h-12 px-6 flex-1 rounded-2xl border-none bg-linear-to-r from-primary to-primary/80 hover:to-primary text-primary-content shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 active:scale-95">
              <Icon name="mingcute:home-4-fill" class="text-xl" />
              {{ t('error.home') }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="mt-8 text-center">
        <p class="text-xs font-medium text-base-content/30 tracking-widest uppercase">
          Access Permission System
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }

  33% {
    transform: translate(30px, -50px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }

  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 10s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-12px);
  }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

@keyframes bounce-slow {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-6px) rotate(5deg);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 5s ease-in-out infinite;
}

.mask-gradient {
  -webkit-mask-image: linear-gradient(to bottom, black, transparent);
  mask-image: linear-gradient(to bottom, black, transparent);
}
</style>

<i18n lang="json">{
  "zh-CN": {
    "error": {
      "403": {
        "title": "访问被拒绝",
        "desc": "抱歉，您当前没有权限访问此区域。这可能是因为您的账户权限不足或会话已过期。"
      },
      "back": "返回上一页",
      "home": "回到首页"
    }
  },
  "zh-TW": {
    "error": {
      "403": {
        "title": "訪問被拒絕",
        "desc": "抱歉，您當前沒有權限訪問此區域。這可能是因為您的賬戶權限不足或會話已過期。"
      },
      "back": "返回上一頁",
      "home": "回到首頁"
    }
  },
  "en": {
    "error": {
      "403": {
        "title": "Access Denied",
        "desc": "Sorry, you don't have permission to access this area. This might be due to insufficient privileges or an expired session."
      },
      "back": "Go Back",
      "home": "Go Home"
    }
  }
}</i18n>
