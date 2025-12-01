<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
    error: NuxtError
}>()

const { t } = useI18n()
const showStack = ref(false)

const statusCode = computed(() => props.error.statusCode)
const is404 = computed(() => statusCode.value === 404)
const is403 = computed(() => statusCode.value === 403)

const config = computed(() => {
    if (is404.value) {
        return {
            icon: 'mingcute:ghost-fill',
            subIcon: 'mingcute:search-3-line',
            color: 'text-secondary',
            bgFrom: 'from-secondary',
            bgTo: 'to-secondary/80',
            shadow: 'shadow-secondary/20',
            title: t('error.404.title'),
            desc: t('error.404.desc'),
            rotate: '-rotate-3'
        }
    } else if (is403.value) {
        return {
            icon: 'mingcute:lock-fill',
            subIcon: 'mingcute:key-2-fill',
            color: 'text-error',
            bgFrom: 'from-error',
            bgTo: 'to-error/80',
            shadow: 'shadow-error/20',
            title: t('error.403.title'),
            desc: t('error.403.desc'),
            rotate: 'rotate-3'
        }
    } else {
        return {
            icon: 'mingcute:plugin-2-fill',
            subIcon: 'mingcute:alert-fill',
            color: 'text-warning',
            bgFrom: 'from-warning',
            bgTo: 'to-warning/80',
            shadow: 'shadow-warning/20',
            title: t('error.500.title'),
            desc: props.error.message || t('error.500.desc'),
            rotate: 'rotate-0'
        }
    }
})

const handleError = () => {
    clearError({ redirect: '/' })
}

const handleRetry = () => {
    clearError()
}
</script>

<template>
    <div
        class="relative w-full min-h-screen bg-base-300 flex items-center justify-center overflow-hidden font-sans selection:bg-base-content/20">
        <div class="absolute inset-0 pointer-events-none">
            <EffectSquares :square-size="20" :speed="0.2" border-color="#ffffff10" />
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
                class="relative overflow-hidden rounded-[2.5rem] bg-base-100/40 backdrop-blur-3xl border border-base-content/5 shadow-2xl dark:shadow-black/50 dark:bg-base-100/10 transition-all duration-300">

                <div
                    class="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none">
                </div>

                <div class="relative p-8 sm:p-12 flex flex-col items-center text-center">

                    <div class="mb-8 relative group cursor-default">
                        <div class="absolute inset-0 blur-3xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                            :class="is404 ? 'bg-secondary/30' : is403 ? 'bg-error/30' : 'bg-warning/30'">
                        </div>

                        <div
                            class="relative w-28 h-28 bg-linear-to-b from-base-100/80 to-base-100/20 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] animate-float">
                            <div class="absolute inset-0 rounded-3xl border border-white/40 mask-gradient opacity-50">
                            </div>

                            <Icon :name="config.icon"
                                class="text-6xl drop-shadow-lg transform transition-transform duration-500 group-hover:scale-110"
                                :class="[config.color, `group-hover:${config.rotate}`]" />
                        </div>

                        <div
                            class="absolute -right-4 -bottom-2 w-12 h-12 bg-base-100/80 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/20 animate-bounce-slow">
                            <Icon :name="config.subIcon" class="text-2xl opacity-80" :class="config.color" />
                        </div>
                    </div>

                    <h1 class="text-4xl sm:text-5xl font-black text-base-content mb-3 tracking-tight">
                        <span
                            class="bg-clip-text text-transparent bg-linear-to-r from-base-content via-base-content to-base-content/50">
                            {{ statusCode }}
                        </span>
                    </h1>

                    <h2 class="text-xl font-bold text-base-content/90 mb-4">
                        {{ config.title }}
                    </h2>

                    <p
                        class="text-base-content/60 mb-8 leading-relaxed text-sm sm:text-base max-w-xs sm:max-w-sm mx-auto wrap-break-word">
                        {{ config.desc }}
                    </p>

                    <div v-if="error.stack" class="w-full mb-8 text-left">
                        <button @click="showStack = !showStack"
                            class="w-full flex items-center justify-between p-3 rounded-xl bg-base-200/50 hover:bg-base-200/80 border border-base-content/5 transition-all text-xs font-mono group cursor-pointer">
                            <span class="opacity-60 group-hover:opacity-90 font-bold uppercase tracking-wider">Debug
                                Stack Trace</span>
                            <Icon name="mingcute:down-line"
                                class="transition-transform duration-300 opacity-60 group-hover:opacity-100"
                                :class="{ 'rotate-180': showStack }" />
                        </button>
                        <div class="grid transition-[grid-template-rows] duration-300 ease-out"
                            :class="showStack ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
                            <div class="overflow-hidden">
                                <div
                                    class="mt-2 p-4 rounded-xl bg-[#1e1e1e] text-red-300 font-mono text-xs overflow-x-auto border border-white/5 shadow-inner leading-5">
                                    <pre class="whitespace-pre-wrap break-all">{{ error.stack }}</pre>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 w-full">
                        <button @click="handleRetry"
                            class="btn h-12 px-6 flex-1 rounded-2xl border border-base-content/10 bg-white/5 hover:bg-white/10 hover:border-base-content/20 text-base-content backdrop-blur-sm transition-all duration-300 active:scale-95">
                            <Icon name="mingcute:refresh-2-line" class="text-xl" />
                            {{ t('error.retry') }}
                        </button>

                        <button @click="handleError"
                            class="btn h-12 px-6 flex-1 rounded-2xl border-none text-white transition-all duration-300 active:scale-95 bg-linear-to-r hover:brightness-110 shadow-lg"
                            :class="[config.bgFrom, config.bgTo, config.shadow]">
                            <Icon name="mingcute:home-4-fill" class="text-xl" />
                            {{ t('error.home') }}
                        </button>
                    </div>

                </div>
            </div>

            <div class="mt-8 text-center">
                <p class="text-xs font-medium text-base-content/30 tracking-widest uppercase">
                    System Error Handler
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
            "retry": "刷新页面",
            "home": "回到首页",
            "404": {
                "title": "页面未找到",
                "desc": "抱歉，我们无法找到您要访问的页面。它可能已被移除、重命名或暂时不可用。"
            },
            "403": {
                "title": "访问被拒绝",
                "desc": "抱歉，您当前没有权限访问此区域。请联系管理员或尝试重新登录。"
            },
            "500": {
                "title": "系统错误",
                "desc": "服务器遇到了一些问题，请稍后重试。"
            }
        }
    },
    "zh-TW": {
        "error": {
            "retry": "重新整理",
            "home": "回到首頁",
            "404": {
                "title": "頁面未找到",
                "desc": "抱歉，我們無法找到您要訪問的頁面。它可能已被移除、重命名或暫時不可用。"
            },
            "403": {
                "title": "訪問被拒絕",
                "desc": "抱歉，您當前沒有權限訪問此區域。請聯繫管理員或嘗試重新登錄。"
            },
            "500": {
                "title": "系統錯誤",
                "desc": "服務器遇到了一些問題，請稍後重試。"
            }
        }
    },
    "en": {
        "error": {
            "retry": "Try Again",
            "home": "Go Home",
            "404": {
                "title": "Page Not Found",
                "desc": "Sorry, we couldn't find the page you're looking for. It might have been removed or renamed."
            },
            "403": {
                "title": "Access Denied",
                "desc": "Sorry, you don't have permission to access this area."
            },
            "500": {
                "title": "System Error",
                "desc": "Something went wrong on our end. Please try again later."
            }
        }
    }
}</i18n>
