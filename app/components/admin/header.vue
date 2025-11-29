<script setup lang="ts">
// 使用全局封装的 i18n 工具
const { t, locale, changeLocale } = useAppI18n()
const themeStore = useThemeStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

// 定义语言类型
type LocaleType = 'zh-CN' | 'zh-TW' | 'en'

interface LocaleOption {
    code: LocaleType
    name: string
}

// 语言下拉选项配置
const availableLocales: LocaleOption[] = [
    { code: 'zh-CN', name: '简体中文' },
    { code: 'zh-TW', name: '繁体中文' },
    { code: 'en', name: 'English' },
]

// 动态获取页面标题
const pageTitle = computed(() => {
    // 1. 优先使用路由 meta 定义的 title
    if (route.meta.title) {
        return t(route.meta.title as string)
    }

    // 2. 降级处理：根据路由名称生成 key
    // 例如路由是 'admin-users' -> 'users'
    // 例如路由是 'admin' -> 'admin'
    const routeName = route.name?.toString().split('-').pop() || 'dashboard'
    const i18nKey = `admin.nav.${routeName}`

    // 3. 检查翻译是否存在
    // 注意：如果 key 不存在，t() 通常返回 key 本身。我们判断返回值是否包含 'admin.nav' 来决定是否 fallback
    const translated = t(i18nKey)
    return translated !== i18nKey ? translated : capitalize(routeName)
})

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

// 退出登录
const handleLogout = async () => {
    await userStore.logout()
    router.push('/auth/login')
}
</script>

<template>
    <div
        class="navbar sticky top-0 z-30 bg-base-100/85 backdrop-blur-xl border-b border-base-content/5 h-16 min-h-16 px-4 gap-2 transition-all duration-300">

        <!-- Mobile Sidebar Toggle -->
        <div class="flex-none lg:hidden">
            <label for="admin-drawer" aria-label="open sidebar"
                class="btn btn-square btn-ghost hover:bg-base-content/10 transition-colors">
                <Icon name="mingcute:menu-fill" size="24" />
            </label>
        </div>

        <!-- Breadcrumbs / Page Title -->
        <div class="flex-1 px-2 mx-2">
            <!-- Desktop Breadcrumbs -->
            <div class="text-sm breadcrumbs hidden sm:block">
                <ul>
                    <li class="text-base-content/60 gap-2 font-medium">
                        <Icon name="mingcute:safe-lock-fill" size="16" />
                        {{ t('admin.title') }}
                    </li>
                    <li class="font-extrabold text-primary gap-2 tracking-wide">
                        {{ pageTitle }}
                    </li>
                </ul>
            </div>
            <!-- Mobile Title -->
            <span class="sm:hidden font-black text-lg text-base-content flex items-center gap-2">
                <Icon name="mingcute:safe-lock-fill" class="text-primary" size="20" />
                Admin
            </span>
        </div>

        <!-- Right Actions -->
        <div class="flex-none gap-2">
            <!-- Back to Home -->
            <nuxt-link to="/"
                class="btn btn-ghost btn-circle btn-sm md:btn-md text-base-content/70 hover:text-primary hover:bg-primary/10 tooltip tooltip-bottom"
                :data-tip="t('admin.nav.backToHome')">
                <Icon name="mingcute:home-3-line" size="20" />
            </nuxt-link>

            <!-- Language Switcher -->
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button"
                    class="btn btn-ghost btn-circle btn-sm md:btn-md text-base-content/70 hover:bg-base-content/5 hover:text-base-content transition-colors">
                    <Icon name="mingcute:translate-2-fill" size="20" />
                </div>
                <ul tabindex="0"
                    class="dropdown-content z-1 menu p-2 shadow-2xl bg-base-100/90 backdrop-blur-xl border border-base-content/5 rounded-2xl w-36 mt-4">
                    <li v-for="item in availableLocales" :key="item.code">
                        <button @click="changeLocale(item.code)" class="rounded-xl font-medium"
                            :class="{ 'active text-primary bg-primary/10 hover:bg-primary/15': locale === item.code }">
                            {{ item.name }}
                        </button>
                    </li>
                </ul>
            </div>

            <!-- Theme Toggle (Animated) -->
            <button
                class="btn btn-ghost btn-circle btn-sm md:btn-md hover:bg-base-content/5 text-base-content overflow-hidden relative"
                @click="themeStore.toggleTheme" :aria-label="t('common.toggleTheme')">
                <div class="relative w-full h-full flex items-center justify-center">
                    <Icon name="mingcute:sun-fill" class="absolute w-5 h-5 transition-all duration-500 ease-spring"
                        :class="themeStore.isDark ? 'translate-y-8 opacity-0 rotate-90' : 'translate-y-0 opacity-100 rotate-0'" />
                    <Icon name="mingcute:moon-fill" class="absolute w-5 h-5 transition-all duration-500 ease-spring"
                        :class="themeStore.isDark ? 'translate-y-0 opacity-100 rotate-0' : '-translate-y-8 opacity-0 -rotate-90'" />
                </div>
            </button>

            <!-- User Avatar Dropdown -->
            <div class="dropdown dropdown-end ml-1">
                <div tabindex="0" role="button"
                    class="btn btn-ghost btn-circle avatar btn-sm md:btn-md border border-base-content/10 hover:border-primary/50 transition-colors">
                    <div
                        class="w-8 md:w-9 rounded-full ring ring-transparent group-hover:ring-primary/20 transition-all">
                        <img v-if="userStore.user?.avatar" :src="userStore.user.avatar" />
                        <div v-else
                            class="bg-neutral text-neutral-content w-full h-full flex items-center justify-center text-xs font-bold">
                            {{ userStore.user?.username?.charAt(0).toUpperCase() || 'A' }}
                        </div>
                    </div>
                </div>
                <ul tabindex="0"
                    class="menu dropdown-content z-1 p-2 shadow-2xl bg-base-100/90 backdrop-blur-xl border border-base-content/5 rounded-2xl w-60 mt-4">
                    <!-- User Info Header -->
                    <li class="menu-title px-4 py-2 opacity-100">
                        <div class="flex flex-col gap-1">
                            <span class="text-base font-bold text-base-content">{{ userStore.user?.username || 'Admin'
                                }}</span>
                            <span class="text-xs font-normal opacity-50 truncate">{{ userStore.user?.email ||
                                'admin@example.com' }}</span>
                        </div>
                    </li>
                    <li class="divider my-0 h-px opacity-10"></li>

                    <!-- Menu Items -->
                    <li>
                        <nuxt-link to="/user/profile" class="py-3 font-medium rounded-xl hover:bg-base-content/5">
                            <Icon name="mingcute:user-3-line" size="18" />
                            {{ t('admin.nav.profile') }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/user/settings" class="py-3 font-medium rounded-xl hover:bg-base-content/5">
                            <Icon name="mingcute:settings-3-line" size="18" />
                            {{ t('admin.nav.settings') }}
                        </nuxt-link>
                    </li>

                    <li class="divider my-0 h-px opacity-10"></li>

                    <!-- Logout -->
                    <li>
                        <button @click="handleLogout"
                            class="py-3 font-medium rounded-xl text-error hover:bg-error/10 hover:text-error">
                            <Icon name="mingcute:exit-line" size="18" />
                            {{ t('admin.nav.logout') }}
                        </button>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<style scoped>
.ease-spring {
    transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}
.breadcrumbs>ul>li+li:before {
    opacity: 0.3;
}
</style>

<i18n lang="json">{
    "en": {
        "common": {
            "toggleTheme": "Toggle Theme"
        },
        "admin": {
            "title": "Admin Panel",
            "nav": {
                "admin": "Dashboard",
                "backToHome": "Back to Website",
                "dashboard": "Dashboard",
                "users": "User List",
                "blogs": "Blog Posts",
                "system": "Settings",
                "profile": "My Profile",
                "settings": "Account Settings",
                "logout": "Log Out"
            }
        }
    },
    "zh-CN": {
        "common": {
            "toggleTheme": "切换主题"
        },
        "admin": {
            "title": "管理后台",
            "nav": {
                "admin": "仪表盘",
                "backToHome": "返回前台",
                "dashboard": "仪表盘",
                "users": "用户列表",
                "blogs": "博客管理",
                "system": "系统设置",
                "profile": "个人资料",
                "settings": "账号设置",
                "logout": "退出登录"
            }
        }
    },
    "zh-TW": {
        "common": {
            "toggleTheme": "切換主題"
        },
        "admin": {
            "title": "管理後台",
            "nav": {
                "admin": "儀表板",
                "backToHome": "返回前台",
                "dashboard": "儀表板",
                "users": "用戶列表",
                "blogs": "博客管理",
                "system": "系統設置",
                "profile": "個人資料",
                "settings": "帳號設定",
                "logout": "登出"
            }
        }
    }
}</i18n>