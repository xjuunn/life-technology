
const base = '/auth'

export interface User {
    id: string;
    username: string;
    email: string;
    avatar: string;
    bio: string;
    blogCount: boolean;
    totalLikes: number;
    isActive: boolean;
    idVerified: boolean;
    isAdmin: false;
    createdAt: string;
    updatedAt: string;
}

export interface RegisterResponse {
    message: string;
    token: string;
    refreshToken: string;
    user: User;
}

/**
 * 用户注册
 * @param username 用户名
 * @param email 邮箱
 * @param password 密码
 */
export function register(username: string, email: string, password: string, code: string) {
    return api.post<RegisterResponse>(base + '/register', {
        username,
        email,
        password,
        code
    })
}

export interface LoginResponse {
    message: string;
    token: string;
    refreshToken: string;
    user: User;
}

/**
 * 用户登录
 * @param email 邮箱
 * @param password 密码
 */
export function login(email: string, password: string) {
    return api.post<LoginResponse>(base + "/login", {
        email,
        password
    })
}

/**
 * 获取当前用户资料
 */
export function profile() {
    return api.get<{ user: User }>(base + '/profile')
}

/**
 * 更新用户资料
 * @param data 更新的数据
 */
export function updateProfile(data: {
    username: string;
    bio: string;
    avatar: string;
}) {
    return api.put<{ message: string, user: User }>(base + '/profile', data);
}

/**
 * 更新密码
 * @param currentPassword 当前密码
 * @param newPassword 新密码
 */
export function updatePassword(currentPassword: string, newPassword: string) {
    return api.put<{ message: string }>(base + '/password', {
        currentPassword,
        newPassword
    })
}

/**
 * 刷新token
 * @param refreshToken 刷新token
 */
export function refreshToken(refreshToken: string) {
    return api.post<{ message: string, token: string }>(base + '/refresh-token', {
        refreshToken
    })
}

/**
 * 发送忘记密码邮件
 * @param email 邮箱
 */
export function forgotPassword(email: string) {
    return api.post<{ message: string, expiresIn: string }>(base + '/forgot-password', { email })
}

/**
 * 重置密码
 * @param email 邮箱
 * @param code token
 * @param newPassword 新密码
 */
export function resetPassword(email:string, code: string, newPassword: string) {
    return api.post<any>(base + '/reset-password', {
        email,
        code,
        newPassword
    })
}

/**
 * 退出登录
 */
export function logout() {
    return api.post<{ message: string }>(base + '/logout');
}

/**
 * 发送注册邮箱验证码
 * @param email 邮箱
 */
export function sendRegisterCode(email: string) {
    return api.post(base + '/send-register-code', { email });
}