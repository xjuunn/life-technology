<template>
  <div class="flex items-center justify-center bg-base-100 text-base-content relative overflow-hidden p-4 flex-1">
    <div
      class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse">
    </div>
    <div
      class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none animate-pulse"
      style="animation-delay: 1s"></div>

    <div
      class="card w-full max-w-4xl bg-base-100/60 backdrop-blur-xl shadow-2xl border border-base-content/5 animate-fade-in-up">
      <div class="card-body p-8 md:p-12">

        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 class="text-3xl font-black tracking-tight">{{ t('settings.title') }}</h1>
            <p class="text-base-content/60 text-sm mt-1">{{ t('settings.subtitle') }}</p>
          </div>
          <transition name="fade">
            <div v-if="statusMsg.text"
              :class="`badge badge-lg gap-2 ${statusMsg.type === 'error' ? 'badge-error text-white' : 'badge-success text-white'}`">
              <Icon :name="statusMsg.type === 'error' ? 'heroicons:exclamation-circle' : 'heroicons:check-circle'"
                class="w-4 h-4" />
              {{ statusMsg.text }}
            </div>
          </transition>
        </div>

        <div class="flex flex-col md:flex-row gap-10">

          <div class="flex flex-col items-center space-y-4 md:w-1/3 border-r border-base-content/5 pr-0 md:pr-10">
            <div ref="dropZoneRef"
              class="relative group w-40 h-40 rounded-full ring-4 ring-base-200 cursor-pointer overflow-hidden shadow-lg transition-all duration-300 hover:ring-primary hover:shadow-primary/20"
              @click="() => {
                openDialog()
              }">
              <img v-if="avatar" :src="avatar"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div v-else class="w-full h-full flex items-center justify-center bg-base-300 text-base-content/30">
                <span class="text-5xl font-bold">{{ username?.charAt(0) || 'U' }}</span>
              </div>

              <div v-if="isUploading" class="absolute inset-0 bg-base-100/60 flex items-center justify-center z-20">
                <span class="loading loading-spinner loading-lg text-primary"></span>
              </div>

              <div
                class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white backdrop-blur-xs z-10">
                <Icon name="heroicons:camera" class="w-8 h-8 mb-1" />
                <span class="text-xs font-bold uppercase tracking-wider">{{ t('settings.change_avatar') }}</span>
              </div>
            </div>
            <p class="text-xs text-base-content/40 text-center px-4">{{ t('settings.upload_hint') }}</p>
          </div>

          <div class="flex-1 space-y-6">
            <form @submit.prevent="saveProfile" class="space-y-6">
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
                    :placeholder="t('settings.username_placeholder')" :disabled="isSaving" />
                </div>
              </div>

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
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useAppI18n()
const userStore = useUserStore()
const dropZoneRef = ref<HTMLElement>()

const isUploading = ref(false)
const isSaving = ref(false)
const statusMsg = reactive({ type: '', text: '' })
const username = ref('')
const bio = ref('')
const avatar = ref('')

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
      showMsg('error', 'Upload failed: No URL returned')
    }
  } catch (e: any) {
    showMsg('error', e.message || 'Upload failed')
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
      showMsg('error', res.message || 'Update failed')
    }
  } catch (e: any) {
    showMsg('error', e.response?.data?.message || e.message)
  } finally {
    isSaving.value = false
  }
}
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

<i18n lang="json">{
  "en": {
    "settings": {
      "title": "Edit Profile",
      "subtitle": "Update your personal information",
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
      "error_image_size": "Image too large (Max 5MB)"
    }
  },
  "zh-CN": {
    "settings": {
      "title": "编辑资料",
      "subtitle": "更新您的个人信息",
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
      "error_image_size": "图片过大 (最大 5MB)"
    }
  },
  "zh-TW": {
    "settings": {
      "title": "編輯資料",
      "subtitle": "更新您的個人資訊",
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
      "error_image_size": "圖片過大 (最大 5MB)"
    }
  }
}</i18n>