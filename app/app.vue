<template>
  <client-only>
    <common-global-toast />
    <common-dialog></common-dialog>
    <div class="min-h-screen font-sans text-base-content overflow-x-hidden">
      <nuxt-layout>
        <nuxt-page></nuxt-page>
      </nuxt-layout>
    </div>
  </client-only>
</template>
