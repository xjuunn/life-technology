import { ApiList } from "#imports"

export const useUserStore = defineStore('user', () => {
  const _user = ref<ApiList.auth.User>();
  const _token = ref<string>();
  const _refreshToken = ref<string>();
  const user = computed(() => _user.value);
  const token = computed(() => _token.value);
  /**
   * 登录
   * @param email 邮箱
   * @param password 密码
   */
  async function login(email: string, password: string) {
    const result = await ApiList.auth.login(email, password);
    if (!result.success) {
      throw new Error("登录失败：" + (result.error?.message || ""))
    }
    _user.value = result.data.user;
    _token.value = result.data.token;
    _refreshToken.value = result.data.refreshToken
    return result.data
  }
  /**
   * 登出
   */
  async function logout() {
    navigateTo('/auth/login', { replace: true });
    const result = await ApiList.auth.logout();
    if (!result.success) {
      console.warn("退出登录异常：", result.error?.message)
    }
    _user.value = undefined;
    _token.value = undefined;
    _refreshToken.value = undefined;
    return result.success;
  }
  /**
   * 刷新token
   */
  async function refreshToken() {
    if (!_refreshToken.value) {
      console.warn("无法刷新token,因为refreshToken为空");
      return;
    }
    const result = await ApiList.auth.refreshToken(_refreshToken.value);
    if (!result.success) {
      throw new Error("刷新token失败" + (result.error?.message || ''));
    }
    _token.value = result.data.token;
    return result.data.token;
  }

  function setUser(u: ApiList.auth.User) {
    _user.value = u;
  }

  function setToken(t: string) {
    _token.value = t;
  }

  function setRefreshToken(r: string) {
    _refreshToken.value = r;
  }

  return {
    _user,
    _token,
    _refreshToken,
    user,
    token,
    refreshToken,
    login,
    logout,
    setUser,
    setToken,
    setRefreshToken,
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
    pick: ['_user', '_token', '_refreshToken'],
  }
})
