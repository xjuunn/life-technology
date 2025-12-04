<template>
  <div class="flex items-center justify-center bg-base-100 text-base-content relative overflow-hidden p-4 flex-1">
    <title>life-设置</title>
    <!-- 背景装饰保持不变 -->
    <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style="animation-delay: 1s"></div>

    <div class="card w-full max-w-4xl bg-base-100/60 backdrop-blur-xl shadow-2xl border border-base-content/5 animate-fade-in-up">
      <div class="card-body p-8 md:p-12">

        <!-- 标题区域 -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 class="text-3xl font-black tracking-tight">{{ t('settings.title') }}</h1>
            <p class="text-base-content/60 text-sm mt-1">{{ t('settings.subtitle') }}</p>
          </div>
          <!-- 状态消息 -->
          <transition name="fade">
            <div v-if="statusMsg.text"
              :class="`badge badge-lg gap-2 ${statusMsg.type === 'error' ? 'badge-error text-white' : 'badge-success text-white'}`">
              <Icon :name="statusMsg.type === 'error' ? 'heroicons:exclamation-circle' : 'heroicons:check-circle'" class="w-4 h-4" />
              {{ statusMsg.text }}
            </div>
          </transition>
        </div>

        <!-- 标签页切换 -->
        <div class="tabs tabs-boxed bg-base-200/50 p-1 rounded-xl mb-8 w-fit">
          <button 
            class="tab tab-lg rounded-lg transition-all duration-300"
            :class="{ 'tab-active bg-base-100 shadow-sm': activeTab === 'profile' }"
            @click="activeTab = 'profile'"
          >
            <Icon name="heroicons:user" class="w-4 h-4 mr-2" />
            {{ t('settings.tab_profile') }}
          </button>
          <button 
            class="tab tab-lg rounded-lg transition-all duration-300"
            :class="{ 'tab-active bg-base-100 shadow-sm': activeTab === 'security' }"
            @click="activeTab = 'security'"
          >
            <Icon name="heroicons:lock-closed" class="w-4 h-4 mr-2" />
            {{ t('settings.tab_security') }}
          </button>
        </div>

        <div class="flex flex-col md:flex-row gap-10">

          <!-- 左侧区域：个人资料和修改密码 -->
          <div class="flex flex-col items-center space-y-4 md:w-1/3 border-r border-base-content/5 pr-0 md:pr-10">
            <div ref="dropZoneRef"
              class="relative group w-40 h-40 rounded-full ring-4 ring-base-200 overflow-hidden shadow-lg transition-all duration-300"
              :class="activeTab === 'profile' ? 'cursor-pointer hover:ring-primary hover:shadow-primary/20' : ''"
              @click="activeTab === 'profile' ? openDialog() : null">
              <img v-if="avatar" :src="avatar"
                class="w-full h-full object-cover transition-transform duration-500" />
              <div v-else class="w-full h-full flex items-center justify-center bg-base-300 text-base-content/30">
                <span class="text-5xl font-bold">{{ username?.charAt(0) || 'U' }}</span>
              </div>

              <div v-if="isUploading" class="absolute inset-0 bg-base-100/60 flex items-center justify-center z-20">
                <span class="loading loading-spinner loading-lg text-primary"></span>
              </div>

              <!-- 只在个人资料页显示上传覆盖层 -->
              <div v-if="activeTab === 'profile'"
                class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white backdrop-blur-xs z-10">
                <Icon name="heroicons:camera" class="w-8 h-8 mb-1" />
                <span class="text-xs font-bold uppercase tracking-wider">{{ t('settings.change_avatar') }}</span>
              </div>
            </div>

            <!-- 动态显示提示文本 -->
            <p class="text-xs text-base-content/40 text-center px-4">
              {{ activeTab === 'profile' ? t('settings.upload_hint') : t('settings.security_hint') }}
            </p>

            <!-- 只在个人资料页显示实名认证按钮 -->
            <nuxt-link v-if="activeTab === 'profile'" to="/auth/real-name-auth/" v-show="!userStore.user?.isAdmin && !userStore.user?.idVerified"
              class="btn btn-soft btn-primary">
              <util-i18n zh="实名认证" tw="實名認證" en="Real-name Authentication"></util-i18n>
            </nuxt-link>
          </div>

          <!-- 右侧内容区域 -->
          <div class="flex-1 space-y-6">
            <!-- 个人资料表单 -->
            <form v-if="activeTab === 'profile'" @submit.prevent="saveProfile" class="space-y-6">
              <!-- 用户名输入 -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-bold text-xs uppercase opacity-70">{{ t('settings.username') }}</span>
                </label>
                <div class="relative group">
                  <div
                    class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40 transition-colors group-focus-within:text-primary">
                    <Icon name="heroicons:user" class="w-5 h-5" />
                  </div>
                  <input v-model="username" type="text"
                    class="input input-bordered w-full pl-11 bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all duration-300 rounded-xl focus-within:outline-0"
                    :placeholder="t('settings.username_placeholder')" :disabled="isSaving" minlength="3" />
                </div>
              </div>

              <!-- 个人简介 -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-bold text-xs uppercase opacity-70">{{ t('settings.bio') }}</span>
                  <span class="label-text-alt opacity-50">{{ bio?.length || 0 }}/200</span>
                </label>
                <textarea v-model="bio"
                  class="textarea focus-within:outline-0 textarea-bordered w-full h-32 bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all duration-300 resize-none rounded-xl text-base leading-relaxed p-4"
                  :placeholder="t('settings.bio_placeholder')" maxlength="200" :disabled="isSaving"></textarea>
              </div>

              <div class="flex justify-end pt-4">
                <button type="submit"
                  class="btn btn-primary btn-lg rounded-xl min-w-40 shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  :disabled="isSaving || isUploading">
                  <span v-if="isSaving" class="loading loading-spinner"></span>
                  {{ t('settings.btn_save') }}
                </button>
              </div>
            </form>

            <!-- 修改密码表单 -->
            <form v-if="activeTab === 'security'" @submit.prevent="changePassword" class="space-y-6">
              <!-- 当前密码 -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-bold text-xs uppercase opacity-70">{{ t('settings.current_password') }}</span>
                </label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                    <Icon name="heroicons:lock-closed" class="w-5 h-5" />
                  </div>
                  <input v-model="passwordForm.currentPassword" :type="showCurrentPassword ? 'text' : 'password'"
                    class="input input-bordered w-full pl-11 bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all duration-300 rounded-xl"
                    :placeholder="t('settings.current_password_placeholder')" :disabled="isChangingPassword" />
                  <button type="button" @click="showCurrentPassword = !showCurrentPassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/40 hover:text-base-content">
                    <Icon :name="showCurrentPassword ? 'heroicons:eye' : 'heroicons:eye-slash'" class="w-5 h-5" />
                  </button>
                </div>
              </div>

              <!-- 新密码 -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-bold text-xs uppercase opacity-70">{{ t('settings.new_password') }}</span>
                </label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                    <Icon name="heroicons:lock-closed" class="w-5 h-5" />
                  </div>
                  <input v-model="passwordForm.newPassword" :type="showNewPassword ? 'text' : 'password'"
                    class="input input-bordered w-full pl-11 bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all duration-300 rounded-xl"
                    :placeholder="t('settings.new_password_placeholder')" :disabled="isChangingPassword" />
                  <button type="button" @click="showNewPassword = !showNewPassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/40 hover:text-base-content">
                    <Icon :name="showNewPassword ? 'heroicons:eye' : 'heroicons:eye-slash'" class="w-5 h-5" />
                  </button>
                </div>
              </div>

              <!-- 确认新密码 -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-bold text-xs uppercase opacity-70">{{ t('settings.confirm_password') }}</span>
                </label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40">
                    <Icon name="heroicons:lock-closed" class="w-5 h-5" />
                  </div>
                  <input v-model="passwordForm.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                    class="input input-bordered w-full pl-11 bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all duration-300 rounded-xl"
                    :placeholder="t('settings.confirm_password_placeholder')" :disabled="isChangingPassword" />
                  <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/40 hover:text-base-content">
                    <Icon :name="showConfirmPassword ? 'heroicons:eye' : 'heroicons:eye-slash'" class="w-5 h-5" />
                  </button>
                </div>
              </div>

              <!-- 密码强度指示器 -->
              <div v-if="passwordForm.newPassword" class="p-4 bg-base-200/30 rounded-xl border border-base-content/5">
                <div class="text-xs font-medium mb-1">{{ t('settings.password_strength') }}: {{ passwordStrength }}</div>
                <div class="h-2 w-full bg-base-200 rounded-full overflow-hidden">
                  <div class="h-full transition-all duration-300" :class="strengthColor" :style="{ width: strengthPercentage + '%' }"></div>
                </div>
                <ul class="text-xs text-base-content/60 mt-2 space-y-1">
                  <li :class="{ 'text-success': hasMinLength }">• {{ t('settings.rule_length') }}</li>
                  <li :class="{ 'text-success': hasLowercase }">• {{ t('settings.rule_lowercase') }}</li>
                  <li :class="{ 'text-success': hasNumber }">• {{ t('settings.rule_number') }}</li>
                </ul>
              </div>

              <div class="flex justify-end pt-4">
                <button type="submit"
                  class="btn btn-primary btn-lg rounded-xl min-w-40 shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  :disabled="isChangingPassword || !isPasswordFormValid">
                  <span v-if="isChangingPassword" class="loading loading-spinner"></span>
                  {{ t('settings.change_password_btn') }}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useAppI18n()
const userStore = useUserStore()
const router = useRouter()
const dropZoneRef = ref<HTMLElement>()

const activeTab = ref<'profile' | 'security'>('profile')

const isUploading = ref(false)
const isSaving = ref(false)
const statusMsg = reactive({ type: '', text: '' })
const username = ref('')
const bio = ref('')
const avatar = ref('')

const isChangingPassword = ref(false)
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

onMounted(() => {
  const val = userStore.user
  if (val) {
    username.value = val.username || ''
    bio.value = val.bio || ''
    avatar.value = val.avatar || ''
  }
})

const showMsg = (type: 'success' | 'error', text: string) => {
  statusMsg.type = type
  statusMsg.text = text
  if (type === 'success') {
    setTimeout(() => {
      statusMsg.text = ''
    }, 3000)
  }
}

const handleUpload = async (file: File) => {
  if (!file.type.startsWith('image/')) {
    showMsg('error', t('settings.error_image_type'))
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    showMsg('error', t('settings.error_image_size'))
    return
  }

  isUploading.value = true
  try {
    const res = await ApiList.upload.avatar(file)
    if (res.fullUrl) {
      avatar.value = res.fullUrl
      showMsg('success', t('settings.upload_success'))
    } else if (res.data?.fullUrl) {
      avatar.value = res.data.fullUrl
      showMsg('success', t('settings.upload_success'))
    } else {
      showMsg('error', t('settings.upload_no_url'))  
    }
  } catch (e: any) {
    showMsg('error', e.message || t('settings.upload_failed'))  
  } finally {
    isUploading.value = false
  }
}

const { open: openDialog, onChange } = useFileDialog({ accept: 'image/*', multiple: false })

onChange((files) => {
  if (files?.length && files[0]) {
    handleUpload(files[0])
  }
})

useDropZone(dropZoneRef, {
  onDrop: (files) => {
    if (files?.length && files[0]) {
      handleUpload(files[0])
    }
  },
})

const saveProfile = async () => {
  isSaving.value = true
  statusMsg.text = ''

  const payload = {
    username: username.value,
    bio: bio.value,
    avatar: avatar.value
  }
  try {
    const res = await ApiList.auth.updateProfile(payload)

    if (res.success) {
      showMsg('success', t('settings.save_success'))

      if (res.data?.user) {
        userStore.setUser(res.data.user)
      } else {
        if (userStore.user) {
          userStore.setUser({
            ...userStore.user,
            ...payload
          })
        }
      }
    } else {
      showMsg('error', res.message || t('settings.update_failed'))  
    }
  } catch (e: any) {
    showMsg('error', e.response?.data?.message || e.message)
  } finally {
    isSaving.value = false
  }
}

// 修改密码功能
const changePassword = async () => {

  if (!passwordForm.currentPassword) {
    showMsg('error', t('settings.current_password_required'))
    return
  }
  
  if (!passwordForm.newPassword) {
    showMsg('error', t('settings.new_password_required'))
    return
  }
  
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    showMsg('error', t('settings.password_mismatch'))
    return
  }
  
  if (calculatePasswordScore(passwordForm.newPassword) < 40) {
    showMsg('error', t('settings.password_too_weak'))
    return
  }
  
  isChangingPassword.value = true
  
  try {
    const res = await ApiList.auth.updatePassword(
      passwordForm.currentPassword,
      passwordForm.newPassword
    )
    
    if (res.success || res.message) {
      showMsg('success', t('settings.password_change_success'))

      passwordForm.currentPassword = ''
      passwordForm.newPassword = ''
      passwordForm.confirmPassword = ''
    } else {
      showMsg('error', t('settings.password_change_failed'))
    }
  } catch (error: any) {
    console.error('修改密码失败:', error)

    if (error.response?.status === 401) {
      showMsg('error', t('settings.wrong_current_password'))
    } else if (error.response?.status === 400) {

      const serverError = error.response?.data?.message || error.response?.data?.error

      if (serverError?.includes('current password') || serverError?.includes('原密码')) {
        showMsg('error', t('settings.wrong_current_password'))
      } else if (serverError?.includes('weak') || serverError?.includes('弱')) {
        showMsg('error', t('settings.password_too_weak'))
      } else {
        showMsg('error', serverError || t('settings.password_validation_failed'))
      }
    } else if (error.message?.includes('Network Error')) {
      showMsg('error', t('settings.network_error'))
    } else if (error.message?.includes('timeout')) {
      showMsg('error', t('settings.request_timeout'))
    } else {
      showMsg('error', t('settings.password_change_failed'))
    }
  } finally {
    isChangingPassword.value = false
  }
}

const calculatePasswordScore = (password: string): number => {
  let score = 0
  if (!password) return 0

  score += Math.min(password.length * 4, 40)
  
  // 字符类型
  if (/[a-z]/.test(password)) score += 15
  if (/[A-Z]/.test(password)) score += 15
  if (/[0-9]/.test(password)) score += 15
  if (/[^a-zA-Z0-9]/.test(password)) score += 15
  
  return Math.min(Math.max(score, 0), 100)
}

const passwordStrength = computed(() => {
  const score = calculatePasswordScore(passwordForm.newPassword)
  if (score >= 80) return t('settings.strong')
  if (score >= 60) return t('settings.good')
  if (score >= 40) return t('settings.weak')
  return t('settings.very_weak')
})

const strengthPercentage = computed(() => calculatePasswordScore(passwordForm.newPassword))

const strengthColor = computed(() => {
  const score = calculatePasswordScore(passwordForm.newPassword)
  if (score >= 80) return 'bg-success'
  if (score >= 60) return 'bg-warning'
  if (score >= 40) return 'bg-warning/70'
  return 'bg-error'
})

const hasMinLength = computed(() => passwordForm.newPassword.length >= 8)
const hasLowercase = computed(() => /[a-z]/.test(passwordForm.newPassword))
const hasNumber = computed(() => /[0-9]/.test(passwordForm.newPassword))

const isPasswordFormValid = computed(() => {
  return passwordForm.currentPassword &&
         passwordForm.newPassword &&
         passwordForm.confirmPassword &&
         passwordForm.newPassword === passwordForm.confirmPassword &&
         calculatePasswordScore(passwordForm.newPassword) >= 40
})
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<i18n lang="json">
{
  "en": {
    "settings": {
      "title": "Settings",
      "subtitle": "Manage your account settings",
      "tab_profile": "Profile",
      "tab_security": "Security",
      "btn_save": "Save Changes",
      "username": "Display Name",
      "username_placeholder": "Enter your username",
      "bio": "Bio",
      "bio_placeholder": "Brief description for your profile...",
      "change_avatar": "Change",
      "upload_hint": "Click or drag image to upload",
      "upload_success": "Avatar uploaded",
      "save_success": "Saved successfully",
      "error_image_type": "Invalid image format",
      "error_image_size": "Image too large (Max 5MB)",
      "security_hint": "Secure your account with a strong password",
      "current_password": "Current Password",
      "current_password_placeholder": "Enter your current password",
      "new_password": "New Password",
      "new_password_placeholder": "Enter your new password",
      "confirm_password": "Confirm New Password",
      "confirm_password_placeholder": "Confirm your new password",
      "change_password_btn": "Change Password",
      "password_strength": "Password Strength",
      "strong": "Strong",
      "good": "Good",
      "weak": "Weak",
      "very_weak": "Very Weak",
      "rule_length": "At least 8 characters",
      "rule_lowercase": "At least one lowercase letter",
      "rule_number": "At least one number",
      "password_change_success": "Password changed successfully",
      "password_change_failed": "Failed to change password",
      "wrong_current_password": "Current password is incorrect",
      "password_validation_failed": "Password validation failed",
      "current_password_required": "Please enter current password",
      "new_password_required": "Please enter new password",
      "password_mismatch": "Passwords do not match",
      "password_too_weak": "Password is too weak. Please choose a stronger password.",
      "upload_no_url": "Upload failed: No URL returned",
      "upload_failed": "Upload failed",
      "update_failed": "Update failed",
      "network_error": "Network error, please check your connection",
      "request_timeout": "Request timeout, please try again",
      "server_error": "Server error, please try again later",
      "invalid_response": "Invalid server response",
      "unknown_error": "Unknown error occurred"
    }
  },
  "zh-CN": {
    "settings": {
      "title": "设置",
      "subtitle": "管理您的账户设置",
      "tab_profile": "个人信息",
      "tab_security": "安全设置",
      "btn_save": "保存修改",
      "username": "显示昵称",
      "username_placeholder": "请输入昵称",
      "bio": "个人简介",
      "bio_placeholder": "一句话介绍你自己...",
      "change_avatar": "更换头像",
      "upload_hint": "点击或拖拽图片以上传",
      "upload_success": "头像上传成功",
      "save_success": "保存成功",
      "error_image_type": "图片格式无效",
      "error_image_size": "图片过大 (最大 5MB)",
      "security_hint": "使用强密码保护您的账户",
      "current_password": "当前密码",
      "current_password_placeholder": "请输入当前密码",
      "new_password": "新密码",
      "new_password_placeholder": "请输入新密码",
      "confirm_password": "确认新密码",
      "confirm_password_placeholder": "请再次输入新密码",
      "change_password_btn": "修改密码",
      "password_strength": "密码强度",
      "strong": "强",
      "good": "良好",
      "weak": "弱",
      "very_weak": "非常弱",
      "rule_length": "至少8个字符",
      "rule_lowercase": "至少一个小写字母",
      "rule_number": "至少一个数字",
      "password_change_success": "密码修改成功",
      "password_change_failed": "密码修改失败",
      "wrong_current_password": "当前密码错误",
      "password_validation_failed": "密码验证失败",
      "current_password_required": "请输入当前密码",
      "new_password_required": "请输入新密码",
      "password_mismatch": "密码不匹配",
      "password_too_weak": "密码强度太弱，请选择更安全的密码",
      "upload_no_url": "上传失败：未返回URL",
      "upload_failed": "上传失败",
      "update_failed": "更新失败",
      "network_error": "网络错误，请检查网络连接",
      "request_timeout": "请求超时，请重试",
      "server_error": "服务器错误，请稍后重试",
      "invalid_response": "服务器响应无效",
      "unknown_error": "发生未知错误"
    }
  },
  "zh-TW": {
    "settings": {
      "title": "設定",
      "subtitle": "管理您的帳戶設定",
      "tab_profile": "個人資料",
      "tab_security": "安全設定",
      "btn_save": "儲存變更",
      "username": "顯示暱稱",
      "username_placeholder": "請輸入暱稱",
      "bio": "個人簡介",
      "bio_placeholder": "一句話介紹你自己...",
      "change_avatar": "更換頭像",
      "upload_hint": "點擊或拖曳圖片以上傳",
      "upload_success": "頭像上傳成功",
      "save_success": "儲存成功",
      "error_image_type": "圖片格式無效",
      "error_image_size": "圖片過大 (最大 5MB)",
      "security_hint": "使用強密碼保護您的帳戶",
      "current_password": "當前密碼",
      "current_password_placeholder": "請輸入當前密碼",
      "new_password": "新密碼",
      "new_password_placeholder": "請輸入新密碼",
      "confirm_password": "確認新密碼",
      "confirm_password_placeholder": "請再次輸入新密碼",
      "change_password_btn": "修改密碼",
      "password_strength": "密碼強度",
      "strong": "強",
      "good": "良好",
      "weak": "弱",
      "very_weak": "非常弱",
      "rule_length": "至少8個字符",
      "rule_lowercase": "至少一個小寫字母",
      "rule_number": "至少一個數字",
      "password_change_success": "密碼修改成功",
      "password_change_failed": "密碼修改失敗",
      "wrong_current_password": "當前密碼錯誤",
      "password_validation_failed": "密碼驗證失敗",
      "current_password_required": "請輸入當前密碼",
      "new_password_required": "請輸入新密碼",
      "password_mismatch": "密碼不匹配",
      "password_too_weak": "密碼強度太弱，請選擇更安全的密碼",
      "upload_no_url": "上傳失敗：未返回URL",
      "upload_failed": "上傳失敗",
      "update_failed": "更新失敗",
      "network_error": "網路錯誤，請檢查網路連接",
      "request_timeout": "請求超時，請重試",
      "server_error": "伺服器錯誤，請稍後重試",
      "invalid_response": "伺服器回應無效",
      "unknown_error": "發生未知錯誤"
    }
  }
}
</i18n>