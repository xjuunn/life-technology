<template>
  <div class="drawer lg:drawer-open h-screen w-full bg-base-100 text-base-content overflow-hidden font-sans">
    <input id="admin-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side z-50 lg:z-0">
      <label for="admin-drawer" aria-label="close sidebar"
        class="drawer-overlay bg-black/20 backdrop-blur-[2px]"></label>
      <div
        class="w-72 h-full bg-base-100/95 backdrop-blur-xl border-r border-base-content/10 flex flex-col transition-transform duration-300">
        <admin-sidebar class="h-full w-full" />
      </div>
    </div>
    <div class="drawer-content flex flex-col h-full relative transition-all duration-300">
      <div class="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div
          class="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-60 animate-pulse">
        </div>
        <div
          class="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] opacity-40 animate-pulse"
          style="animation-delay: 2s"></div>
        <div
          class="absolute bottom-[-20%] right-[20%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px] opacity-30">
        </div>
      </div>
      <div class="sticky top-0 z-40 w-full">
        <admin-header />
      </div>
      <main class="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 scroll-smooth custom-scrollbar">
        <div class="container mx-auto max-w-7xl min-h-[calc(100vh-8rem)] animate-fade-in-up">
          <slot />
        </div>
        <div class="mt-10 py-6 text-center text-xs opacity-40">
          <p>&copy; {{ new Date().getFullYear() }} LIFE Admin Panel. All Rights Reserved.</p>
        </div>
      </main>
    </div>

  </div>
</template>

<script setup lang="ts">
const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: oklch(var(--bc) / 0.1);
  border-radius: 10px;
  transition: background-color 0.2s;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: oklch(var(--bc) / 0.2);
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
