<template>
  <div class="mt-10 flex items-center justify-center bg-base-100 text-base-content relative overflow-hidden p-4">
    <div
      class="absolute top-1/4 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none animate-pulse">
    </div>
    <div class="absolute bottom-1/4 -left-20 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] pointer-events-none">
    </div>
    <div class="w-full max-w-md relative z-10">
      <div class="text-center mb-10 animate-fade-in-up">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 mb-6 text-primary backdrop-blur-sm border border-primary/10">
          <nuxt-img src="/favicon.png"></nuxt-img>
        </div>
        <h1 class="text-4xl font-black tracking-tight mb-2">
          {{ t('auth.create_account') }}
        </h1>
        <p class="text-base-content/60">
          {{ t('auth.register_subtitle') }}
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
          <form @submit.prevent="handleRegister" class="space-y-5">
            <div class="form-control">
              <label class="label pt-0">
                <span class="label-text font-bold text-xs uppercase tracking-wider opacity-70">{{
                  t('auth.username_label') }}</span>
              </label>
              <div class="relative group">
                <div
                  class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40 transition-colors">
                  <Icon name="heroicons:user" class="w-5 h-5" />
                </div>
                <input v-model="formData.username" type="text" :placeholder="t('auth.username_placeholder')"
                  class="input input-bordered w-full pl-11 rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary focus:shadow-lg focus:shadow-primary/10 transition-all duration-300 focus-within:outline-0"
                  required :disabled="isLoading" />
              </div>
            </div>

            <div class="form-control">
              <label class="label pt-0">
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
              <label class="label pt-0">
                <span class="label-text font-bold text-xs uppercase tracking-wider opacity-70">{{ t('auth.code_label')
                  || 'Verification Code' }}</span>
              </label>
              <div class="flex gap-2">
                <div class="relative group flex-1">
                  <div
                    class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40 transition-colors">
                    <Icon name="heroicons:shield-check" class="w-5 h-5" />
                  </div>
                  <input v-model="formData.code" type="text" :placeholder="t('auth.code_placeholder') || 'Enter code'"
                    class="input input-bordered w-full pl-11 rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary focus:shadow-lg focus:shadow-primary/10 transition-all duration-300 focus-within:outline-0"
                    required :disabled="isLoading" />
                </div>
                <button type="button" @click="handleSendCode"
                  class="btn btn-neutral rounded-xl px-4 min-w-[100px] transition-all"
                  :disabled="isLoading || countdown > 0 || !isEmailValid">
                  <span v-if="countdown > 0">{{ countdown }}s</span>
                  <span v-else>{{ t('auth.send_code') || 'Send' }}</span>
                </button>
              </div>
            </div>

            <div class="form-control">
              <div class="label pt-0">
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
                  required :disabled="isLoading" minlength="6" />
                <button type="button" @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/40 hover:text-base-content transition-colors cursor-pointer">
                  <Icon :name="showPassword ? 'heroicons:eye' : 'heroicons:eye-slash'" class="w-5 h-5" />
                </button>
              </div>
              <div class="flex gap-1 mt-2 px-1" v-if="formData.password">
                <div class="h-1 rounded-full flex-1 transition-colors duration-300"
                  :class="passwordStrength >= 1 ? 'bg-error' : 'bg-base-content/10'"></div>
                <div class="h-1 rounded-full flex-1 transition-colors duration-300"
                  :class="passwordStrength >= 2 ? 'bg-warning' : 'bg-base-content/10'"></div>
                <div class="h-1 rounded-full flex-1 transition-colors duration-300"
                  :class="passwordStrength >= 3 ? 'bg-success' : 'bg-base-content/10'"></div>
              </div>
            </div>
            <button type="submit"
              class="btn btn-primary btn-lg w-full rounded-xl shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all text-primary-content font-bold mt-2"
              :class="{ 'opacity-80 cursor-not-allowed': isLoading }" :disabled="isLoading">
              <span v-if="isLoading" class="loading loading-spinner loading-md"></span>
              <span v-else>{{ t('auth.btn_register') }}</span>
            </button>
          </form>
          <div class="divider text-xs text-base-content/30 my-6">{{ t('auth.or') }}</div>
          <div class="text-center text-sm">
            <span class="text-base-content/60">{{ t('auth.has_account') }}</span>
            <a href="#" @click.prevent="navigateToLogin"
              class="text-primary font-bold hover:underline ml-2 cursor-pointer">
              {{ t('auth.login_link') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useAppI18n();
const router = useRouter();
const isLoading = ref(false);
const errorMsg = ref('');
const showPassword = ref(false);
const countdown = ref(0);
let timer: NodeJS.Timeout | null = null;

const formData = reactive({
  username: '',
  email: '',
  password: '',
  code: ''
});

const isEmailValid = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
});

const passwordStrength = computed(() => {
  const p = formData.password;
  if (!p) return 0;
  let s = 0;
  if (p.length > 5) s++;
  if (p.length > 8 && /[A-Z]/.test(p)) s++;
  if (p.length > 10 && /[0-9]/.test(p)) s++;
  return s;
});

const startCountdown = () => {
  countdown.value = 60;
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      if (timer) clearInterval(timer);
    }
  }, 1000);
};

const handleSendCode = async () => {
  if (!formData.email) {
    errorMsg.value = t('auth.email_required') || 'Email is required';
    return;
  }
  errorMsg.value = '';
  try {
    const response = await ApiList.auth.sendRegisterCode(formData.email);
    if (response.success) {
      startCountdown();
    } else {
      errorMsg.value = response.message || 'Failed to send code';
    }
  } catch (error: any) {
    const msg = error.response?.data?.message || error.message || 'Network Error';
    errorMsg.value = msg;
  }
};

const handleRegister = async () => {
  errorMsg.value = '';
  isLoading.value = true;
  try {
    const response = await ApiList.auth.register(
      formData.username,
      formData.email,
      formData.password,
      formData.code
    );

    if (response.success) {
      if (response.data.token) {
        const userStore = useUserStore();
        userStore.setUser(response.data.user);
        userStore.setToken(response.data.token);
        userStore.setRefreshToken(response.data.refreshToken)
        navigateTo('/', { replace: true })
      } else {
        navigateTo("/auth/login", { replace: true })
      }
    } else {
      errorMsg.value = response.message || 'Registration failed';
    }
  } catch (error: any) {
    console.error('Register error:', error);
    const msg = error.response?.data?.message || error.message || 'Network Error';
    errorMsg.value = msg;
  } finally {
    isLoading.value = false;
  }
};

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});

const navigateToLogin = () => {
  navigateTo("/auth/login", { replace: true })
};
</script>
