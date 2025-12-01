/**
 * 全局路由守卫：拦截 /admin 开头的路由并检查权限
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
    const isAdminRoute = to.path.startsWith('/admin')
    if (isAdminRoute) {
        if (!useUserStore().user?.isAdmin) return navigateTo('/403')
    }
})