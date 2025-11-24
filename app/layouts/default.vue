<template>
  <div class="min-h-screen flex flex-col font-sans ">
    <common-nav></common-nav>
    <main class="mt-22 min-h-[calc(100vh-84px)]">
      <slot />
    </main>
    <common-footer></common-footer>
  </div>
</template>