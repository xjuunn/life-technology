<template>
  <div class="min-h-screen flex items-center justify-center bg-base-100 text-base-content relative overflow-hidden p-4">
    <!-- 背景装饰 -->
    <div class="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none animate-pulse"></div>
    <div class="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[128px] pointer-events-none"></div>
    
    <!-- 返回按钮 -->
    <button @click="navigateToLogin" class="absolute top-4 left-4 btn btn-ghost btn-sm">
      <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-1" />
      {{ t('auth.back_to_login') }}
    </button>

    <div class="w-full max-w-md relative z-10">
      <!-- 标题区域 -->
      <div class="text-center mb-10 animate-fade-in-up">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 mb-6 text-primary backdrop-blur-sm border border-primary/10">
          <Icon name="heroicons:key" class="w-8 h-8" />
        </div>
        <h1 class="text-3xl font-black tracking-tight mb-2">
          {{ t('auth.reset_password') }}
        </h1>
        <p class="text-base-content/60">
          {{ t('auth.reset_subtitle1') }}
        </p>
      </div>

      <!-- 表单卡片 -->
      <div class="card bg-base-100/80 backdrop-blur-md shadow-2xl shadow-primary/5 border border-base-content/5">
        <div class="card-body p-8">
          <!-- 错误信息 -->
          <div v-if="errorMsg" class="alert alert-error shadow-sm mb-4 py-3 rounded-xl animate-shake">
            <Icon name="heroicons:exclamation-triangle" class="w-5 h-5" />
            <span>{{ errorMsg }}</span>
          </div>

          <!-- 成功信息 -->
          <div v-if="successMsg" class="alert alert-success shadow-sm mb-4 py-3 rounded-xl">
            <Icon name="heroicons:check-circle" class="w-5 h-5" />
            <span>{{ successMsg }}</span>
          </div>

          <!-- 步骤指示器 -->
          <div class="mb-8">
            <div class="flex justify-between items-center">
              <div class="flex flex-col items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 border-base-content/20 transition-all duration-300 border-primary bg-primary text-primary-content">
                  1
                </div>
                <div class="text-xs mt-2 opacity-100 font-medium">
                  {{ t('auth.step_email') }}
                </div>
              </div>
              <div class="flex-1 h-1 mx-2 bg-base-content/10">
                <div class="h-full bg-primary transition-all duration-300" 
                     :style="{ width: codeSent ? '100%' : '50%' }"></div>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 border-base-content/20 transition-all duration-300" 
                     :class="codeSent ? 'border-primary bg-primary text-primary-content' : 'border-base-content/20 text-base-content/40'">
                  2
                </div>
                <div class="text-xs mt-2 opacity-100 font-medium">
                  {{ t('auth.step_password') }}
                </div>
              </div>
            </div>
          </div>

          <!-- 邮箱输入 -->
          <div class="space-y-6 animate-[fadeIn_0.5s_ease-out_forwards]">
            <!-- 邮箱输入框 -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-bold text-xs uppercase tracking-wider opacity-70">
                  {{ t('auth.email_label') }}
                </span>
              </label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                  <Icon name="heroicons:envelope" class="w-5 h-5" />
                </div>
                <input v-model="formData.email" type="email" placeholder="name@example.com"
                  class="input input-bordered w-full pl-11 rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary focus:shadow-lg focus:shadow-primary/10 transition-all"
                  :disabled="isLoading || codeSent" />
              </div>
              <p class="text-xs text-base-content/60 mt-2">
                {{ t('auth.forgot_password_hint') }}
              </p>
            </div>

            <!-- 发送验证码按钮 -->
            <div v-if="!codeSent" class="form-control">
              <button @click="sendResetEmail"
                class="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/25 hover:scale-[1.02] transition-all"
                :class="{ 'loading': isLoading }"
                :disabled="isLoading || !isValidEmail">
                {{ isLoading ? t('auth.sending') : t('auth.send_code') }}
              </button>
            </div>

            <!-- 验证码已发送提示 -->
            <div v-if="codeSent" class="alert alert-info shadow-sm py-3 rounded-xl">
              <Icon name="heroicons:check-circle" class="w-5 h-5" />
              <span>{{ t('auth.code_sent') }}</span>
            </div>

            <!-- 验证码输入框 -->
            <div v-if="codeSent" class="form-control">
              <label class="label">
                <span class="label-text font-bold text-xs uppercase tracking-wider opacity-70">
                  {{ t('auth.code_label') }}
                </span>
                <span v-if="countdown > 0" class="label-text-alt text-sm">
                  {{ t('auth.code_expire', { seconds: countdown }) }}
                </span>
                <button v-else @click="resendCode" class="label-text-alt text-primary hover:underline">
                  {{ t('auth.resend_code') }}
                </button>
              </label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                  <Icon name="heroicons:shield-check" class="w-5 h-5" />
                </div>
                <input v-model="formData.code" type="text" :placeholder="t('auth.code_placeholder')"
                  class="input input-bordered w-full pl-11 rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary focus:shadow-lg focus:shadow-primary/10 transition-all"
                  :disabled="isLoading"
                  maxlength="6" />
              </div>
              <p class="text-xs text-base-content/60 mt-2">
                {{ t('auth.code_hint') }}
              </p>
            </div>

            <!-- 新密码输入框 -->
            <div v-if="codeSent" class="form-control">
              <label class="label">
                <span class="label-text font-bold text-xs uppercase tracking-wider opacity-70">
                  {{ t('auth.new_password') }}
                </span>
              </label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                  <Icon name="heroicons:lock-closed" class="w-5 h-5" />
                </div>
                <input v-model="formData.newPassword" :type="showPassword ? 'text' : 'password'"
                  class="input input-bordered w-full pl-11 pr-11 rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary focus:shadow-lg focus:shadow-primary/10 transition-all"
                  :disabled="isLoading" />
                <button type="button" @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/40 hover:text-base-content">
                  <Icon :name="showPassword ? 'heroicons:eye' : 'heroicons:eye-slash'" class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- 确认密码输入框 -->
            <div v-if="codeSent" class="form-control">
              <label class="label">
                <span class="label-text font-bold text-xs uppercase tracking-wider opacity-70">
                  {{ t('auth.confirm_password') }}
                </span>
              </label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                  <Icon name="heroicons:lock-closed" class="w-5 h-5" />
                </div>
                <input v-model="formData.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                  class="input input-bordered w-full pl-11 pr-11 rounded-xl bg-base-200/50 focus:bg-base-100 focus:border-primary focus:shadow-lg focus:shadow-primary/10 transition-all"
                  :disabled="isLoading" />
                <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/40 hover:text-base-content">
                  <Icon :name="showConfirmPassword ? 'heroicons:eye' : 'heroicons:eye-slash'" class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- 密码强度指示器 -->
            <div v-if="formData.newPassword && codeSent" class="p-4 bg-base-200/30 rounded-xl border border-base-content/5">
              <div class="text-xs font-medium mb-1">{{ t('auth.password_strength') }}: {{ passwordStrength }}</div>
              <div class="h-2 w-full bg-base-200 rounded-full overflow-hidden">
                <div class="h-full transition-all duration-300" :class="strengthColor" :style="{ width: strengthPercentage + '%' }"></div>
              </div>
              <ul class="text-xs text-base-content/60 mt-2 space-y-1">
                <li :class="{ 'text-success': hasMinLength }">• {{ t('auth.rule_length') }}</li>
                <li :class="{ 'text-success': hasLowercase }">• {{ t('auth.rule_lowercase') }}</li>
                <li :class="{ 'text-success': hasNumber }">• {{ t('auth.rule_number') }}</li>
              </ul>
            </div>

            <!-- 提交按钮 -->
            <button v-if="codeSent" @click="handleResetPassword"
              class="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/25 hover:scale-[1.02] transition-all mt-6"
              :class="{ 'loading': isLoading }"
              :disabled="isLoading || !isFormValid">
              {{ t('auth.reset_password_btn') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { forgotPassword, resetPassword as apiResetPassword } from '~/api/auth'

const { t } = useI18n();

const isLoading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const codeSent = ref(false);
const countdown = ref(0);
let countdownTimer: NodeJS.Timeout | null = null;

// 表单数据
const formData = reactive({
  email: '',
  code: '',
  newPassword: '',
  confirmPassword: ''
});

// 邮箱验证
const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(formData.email);
});

// 发送重置邮件（实际上是发送验证码）
const sendResetEmail = async () => {
  if (!isValidEmail.value) {
    errorMsg.value = t('auth.invalid_email');
    return;
  }

  isLoading.value = true;
  errorMsg.value = '';
  successMsg.value = '';
  
  try {
    // 调用忘记密码接口，发送验证码
    const response = await forgotPassword(formData.email);
    
    successMsg.value = response.message || t('auth.code_sent');
    codeSent.value = true;
    
    // 开始5分钟倒计时
    startCountdown(300);
    
  } catch (error: any) {
    console.error('发送验证码错误:', error);
    errorMsg.value = error.message || t('auth.send_failed');
  } finally {
    isLoading.value = false;
  }
};

// 重新发送验证码
const resendCode = async () => {
  await sendResetEmail();
};

// 开始倒计时
const startCountdown = (seconds: number) => {
  // 清除之前的定时器
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
  
  countdown.value = seconds;
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
      }
    }
  }, 1000);
};

// 处理重置密码
const handleResetPassword = async () => {
  // 验证必填字段
  if (!formData.code) {
    errorMsg.value = t('auth.code_required');
    return;
  }
  
  if (!formData.newPassword) {
    errorMsg.value = t('auth.password_required');
    return;
  }
  
  if (formData.newPassword !== formData.confirmPassword) {
    errorMsg.value = t('auth.password_mismatch');
    return;
  }
  
  if (calculatePasswordScore(formData.newPassword) < 40) {
    errorMsg.value = t('auth.password_too_weak');
    return;
  }
  
  // 重置密码
  await resetPasswordWithCode();
};

// 使用验证码重置密码
const resetPasswordWithCode = async () => {
  isLoading.value = true;
  errorMsg.value = '';
  
  try {
    if (formData.code.length !== 6) {
      throw new Error(t('auth.invalid_code_length'));
    }
    // 注意：这里使用验证码作为token调用重置密码接口
    // 根据邮件内容，验证码是6位数字，后端应该将其视为重置令牌
    const response = await apiResetPassword(
      formData.email,
      formData.code, 
      formData.newPassword);
    
    console.log('重置密码API响应:', response);
    successMsg.value = response.message || t('auth.reset_success');
    
    // 重置成功，3秒后跳转到登录页
    setTimeout(() => {
      navigateToLogin();
    }, 3000);
    
  } catch (error: any) {
    console.error('重置密码错误:', error);
    errorMsg.value = error.message || t('auth.reset_failed');
  } finally {
    isLoading.value = false;
  }
};

// 密码强度检查
const passwordStrength = computed(() => {
  const score = calculatePasswordScore(formData.newPassword);
  if (score >= 80) return t('auth.strong');
  if (score >= 60) return t('auth.good');
  if (score >= 40) return t('auth.weak');
  return t('auth.very_weak');
});

const strengthPercentage = computed(() => calculatePasswordScore(formData.newPassword));

const strengthColor = computed(() => {
  const score = calculatePasswordScore(formData.newPassword);
  if (score >= 80) return 'bg-success';
  if (score >= 60) return 'bg-warning';
  if (score >= 40) return 'bg-warning/70';
  return 'bg-error';
});

// 密码规则检查
const hasMinLength = computed(() => formData.newPassword.length >= 8);
const hasLowercase = computed(() => /[a-z]/.test(formData.newPassword));
const hasNumber = computed(() => /[0-9]/.test(formData.newPassword));

// 表单验证
const isFormValid = computed(() => {
  if (!codeSent.value) return false;
  
  return formData.code.length === 6 &&
         formData.newPassword.length >= 8 &&
         formData.newPassword === formData.confirmPassword &&
         calculatePasswordScore(formData.newPassword) >= 40;
});

// 密码评分函数
const calculatePasswordScore = (password: string): number => {
  let score = 0;
  if (!password) return 0;
  
  // 长度
  score += Math.min(password.length * 4, 40);
  
  // 字符类型
  if (/[a-z]/.test(password)) score += 15;
  if (/[0-9]/.test(password)) score += 15;
  
  // 重复字符惩罚
  const repeatedChars = password.match(/(.)\1+/g);
  if (repeatedChars) {
    score -= repeatedChars.length * 5;
  }
  
  return Math.min(Math.max(score, 0), 100);
};

// 导航函数
const navigateToLogin = () => {
  navigateTo('/auth/login');
};

// 组件卸载时清除定时器
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
});
</script>

<i18n lang="json">
{
  "en": {
    "auth": {
      "back_to_login": "Back to Login",
      "reset_password": "Reset Password",
      "reset_subtitle1": "Enter your email and new password to reset",
      "step_email": "Email",
      "step_password": "Password",
      "email_label": "Email Address",
      "new_password": "New Password",
      "confirm_password": "Confirm Password",
      "password_strength": "Password Strength",
      "strong": "Strong",
      "good": "Good",
      "weak": "Weak",
      "very_weak": "Very Weak",
      "rule_length": "At least 8 characters",
      "rule_lowercase": "At least one lowercase letter",
      "rule_number": "At least one number",
      "reset_password_btn": "Reset Password",
      "send_code": "Send Verification Code",
      "code_label": "Verification Code",
      "code_placeholder": "Enter 6-digit code",
      "code_hint": "Enter the 6-digit code sent to your email",
      "code_sent": "Verification code has been sent to your email",
      "code_expire": "Expires in {seconds} seconds",
      "resend_code": "Resend Code",
      "code_verified": "Code verified successfully",
      "code_verify_failed": "Failed to verify code",
      "reset_email_sent": "Password reset email sent. Check your inbox for the reset code.",
      "reset_success": "Password Reset Successful",
      "reset_failed": "Failed to reset password",
      "send_failed": "Failed to send reset email",
      "sending": "Sending...",
      "forgot_password_hint": "We'll send you a verification code to your email",
      "invalid_email": "Please enter a valid email address",
      "code_required": "Please enter the verification code",
      "password_required": "Please enter new password",
      "password_too_weak": "Password is too weak. Please choose a stronger password.",
      "password_mismatch": "Passwords do not match"
    }
  },
  "zh-TW": {
    "auth": {
      "back_to_login": "返回登入",
      "reset_password": "重設密碼",
      "reset_subtitle1": "輸入您的電子郵件和新密碼以重設",
      "step_email": "郵箱",
      "step_password": "密碼",
      "email_label": "電子郵件地址",
      "new_password": "新密碼",
      "confirm_password": "確認密碼",
      "password_strength": "密碼強度",
      "strong": "強",
      "good": "良好",
      "weak": "弱",
      "very_weak": "非常弱",
      "rule_length": "至少8個字符",
      "rule_lowercase": "至少一個小寫字母",
      "rule_number": "至少一個數字",
      "reset_password_btn": "重設密碼",
      "send_code": "發送驗證碼",
      "code_label": "驗證碼",
      "code_placeholder": "請輸入6位驗證碼",
      "code_hint": "輸入發送到您郵箱的6位驗證碼",
      "code_sent": "驗證碼已發送到您的郵箱",
      "code_expire": "將於{seconds}秒後過期",
      "resend_code": "重新發送驗證碼",
      "code_verified": "驗證碼驗證成功",
      "code_verify_failed": "驗證碼驗證失敗",
      "reset_email_sent": "密碼重設郵件已發送，請檢查收件箱獲取驗證碼",
      "reset_success": "密碼重設成功",
      "reset_failed": "重設密碼失敗",
      "send_failed": "發送重設郵件失敗",
      "sending": "發送中...",
      "forgot_password_hint": "我們將向您的郵箱發送驗證碼",
      "invalid_email": "請輸入有效的電子郵件地址",
      "code_required": "請輸入驗證碼",
      "password_required": "請輸入新密碼",
      "password_too_weak": "密碼強度太弱，請選擇更強的密碼",
      "password_mismatch": "密碼不匹配"
    }
  },
  "zh-CN": {
    "auth": {
      "back_to_login": "返回登录",
      "reset_password": "重置密码",
      "reset_subtitle1": "输入您的邮箱和新密码以重置",
      "step_email": "邮箱",
      "step_password": "密码",
      "email_label": "电子邮件地址",
      "new_password": "新密码",
      "confirm_password": "确认密码",
      "password_strength": "密码强度",
      "strong": "强",
      "good": "良好",
      "weak": "弱",
      "very_weak": "非常弱",
      "rule_length": "至少8个字符",
      "rule_lowercase": "至少一个小写字母",
      "rule_number": "至少一个数字",
      "reset_password_btn": "重置密码",
      "send_code": "发送验证码",
      "code_label": "验证码",
      "code_placeholder": "请输入6位验证码",
      "code_hint": "输入发送到您邮箱的6位验证码",
      "code_sent": "验证码已发送到您的邮箱",
      "code_expire": "将于{seconds}秒后过期",
      "resend_code": "重新发送验证码",
      "code_verified": "验证码验证成功",
      "code_verify_failed": "验证码验证失败",
      "reset_email_sent": "密码重置邮件已发送，请检查收件箱获取验证码",
      "reset_success": "密码重置成功",
      "reset_failed": "重置密码失败",
      "send_failed": "发送重置邮件失败",
      "sending": "发送中...",
      "forgot_password_hint": "我们将向您的邮箱发送验证码",
      "invalid_email": "请输入有效的电子邮件地址",
      "code_required": "请输入验证码",
      "password_required": "请输入新密码",
      "password_too_weak": "密码强度太弱，请选择更强的密码",
      "password_mismatch": "密码不匹配"
    }
  }
}
</i18n>