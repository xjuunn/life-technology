<template>
  <div class="mt-10 flex items-center justify-center bg-base-100 text-base-content relative overflow-hidden p-4">
    <div
      class="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none animate-pulse">
    </div>
    <div class="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] pointer-events-none">
    </div>
    <div class="w-full max-w-md relative z-10">
      <div class="text-center mb-10 animate-fade-in-up">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 mb-6 text-primary backdrop-blur-sm border border-primary/10">
          <!-- <Icon name="heroicons:cube-transparent" class="w-8 h-8" /> -->
          <nuxt-img src="/favicon.png"></nuxt-img>
        </div>
        <h1 class="text-4xl font-black tracking-tight mb-2">
          {{ t('auth.welcome_back') }}
        </h1>
        <p class="text-base-content/60">
          {{ t('auth.login_subtitle') }}
        </p>
      </div>
      <div
        class="card bg-base-100/80 backdrop-blur-md shadow-2xl shadow-primary/5 border border-base-content/5 animate-fade-in-up"
        style="animation-delay: 0.1s;">
        <div class="card-body p-8">

          <div v-if="errorMsg" class="alert alert-error shadow-sm mb-4 py-2 rounded-xl text-sm animate-shake">
            <Icon name="heroicons:exclamation-triangle" class="w-5 h-5" />
            <span>{{ errorMsg }}</span>
          </div>
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold text-xs uppercase tracking-wider opacity-70">{{ t('auth.email_label')
                }}</span>
              </label>
              <div class="relative group">
                <div
                  class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40 transition-colors">
                  <Icon name="heroicons:envelope" class="w-5 h-5" />
                </div>
                <input v-model="formData.email" type="email" placeholder="name@example.com"
                  class="input input-bordered w-full pl-11 rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary focus:shadow-lg focus:shadow-primary/10 transition-all duration-300 focus-within:outline-0"
                  required :disabled="isLoading" />
              </div>
            </div>

            <div class="form-control">
              <div class="label">
                <span class="label-text font-bold text-xs uppercase tracking-wider opacity-70">{{
                  t('auth.password_label') }}</span>
              </div>
              <div class="relative group">
                <div
                  class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40 transition-colors">
                  <Icon name="heroicons:lock-closed" class="w-5 h-5" />
                </div>
                <input v-model="formData.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
                  class="input input-bordered w-full pl-11 pr-11 rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary focus:shadow-lg focus:shadow-primary/10 transition-all duration-300 focus-within:outline-none"
                  required :disabled="isLoading" />
                <button type="button" @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/40 hover:text-base-content transition-colors cursor-pointer">
                  <Icon :name="showPassword ? 'heroicons:eye' : 'heroicons:eye-slash'" class="w-5 h-5" />
                </button>
              </div>
              <label class="label pb-0">
                <span class="label-text-alt"></span>
                <a href="#" @click.prevent="navigateToForgot"
                  class="label-text-alt text-primary hover:text-primary-focus hover:underline font-medium transition-colors">
                  {{ t('auth.forgot_password') }}
                </a>
              </label>
            </div>
            <button type="submit"
              class="btn btn-primary btn-lg w-full rounded-xl shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all text-primary-content font-bold"
              :class="{ 'opacity-80 cursor-not-allowed': isLoading }" :disabled="isLoading">
              <span v-if="isLoading" class="loading loading-spinner loading-md"></span>
              <span v-else>{{ t('auth.btn_login') }}</span>
            </button>
          </form>
          <div class="divider text-xs text-base-content/30 my-6">{{ t('auth.or') }}</div>
          <div class="text-center text-sm">
            <span class="text-base-content/60">{{ t('auth.no_account') }}</span>
            <a href="#" @click.prevent="navigateToRegister"
              class="text-primary font-bold hover:underline ml-2 cursor-pointer">
              {{ t('auth.create_account') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useAppI18n();
const isLoading = ref(false);
const errorMsg = ref('');
const showPassword = ref(false);
const userStore = useUserStore();

const formData = reactive({
  email: '',
  password: ''
});

const handleLogin = async () => {
  errorMsg.value = '';
  isLoading.value = true;
  try {
    await userStore.login(formData.email, formData.password);
    navigateTo("/", { replace: true })
  } catch (error: any) {
    console.error('Login error:', error.message);
    errorMsg.value = error.message;
  } finally {
    isLoading.value = false;
  }
};

const navigateToRegister = () => {
  navigateTo('/auth/register', { replace: true })
};

const navigateToForgot = () => {
  navigateTo('/auth/forgot-password', { replace: false })
};
</script>