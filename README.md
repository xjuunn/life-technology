# lifeTechnology

[toc]



[Nuxt4目录结构](https://nuxt.com/docs/4.x/directory-structure)

## 开发规范

### 1. 类型安全（非常重要）
- 所有页面、组件、接口、工具函数 **必须使用 TypeScript**。
- 避免使用 `any`，如果遇到不确定类型，优先：
  - 定义接口（interface）
  - 使用类型推断

---

### 2. 命名规范
- 文件与目录全部采用 **kebab-case（短横线命名）**
  - `user-profile.vue`
  - `wallet-address.ts`
- 组件名称使用 **PascalCase**
  - `<UserCard />`
  - `<LoginButton />`
- 变量统一使用 **camelCase**
- 枚举、常量使用 **UPPER_SNAKE_CASE**
  - `DEFAULT_LANGUAGE`
  - `API_TIMEOUT`

| 部分           | 推荐写法       | 示例                          |
| -------------- | -------------- | ----------------------------- |
| 组件文件名     | **PascalCase** | `UserProfile.vue`             |
| 模板中使用     | **kebab-case** | `<user-profile />`            |
| JS/TS 中变量名 | **PascalCase** | `import UserProfile from ...` |

---

### 3. 组件开发规范

#### 3.1 结构顺序
`<script setup>` → `<template>` → `<style scoped>`

#### 3.2 Props 必须声明类型

```ts
const props = defineProps<{
  disabled: boolean
  modelValue: string
}>()
```

#### 3.3 组件尽量保持纯粹

- 组件不直接调用接口
- 业务逻辑放到 composables (`~/app/composables/`)

------

### 4. 页面开发规范

#### 4.1 页面必须支持 i18n

所有可见文字必须使用：

```ts
const { t } = useAppI18n();
{{ t('login.button') }}
```

对应语言包存放于：
 `~/i18n/locales/zh-CN.json`
 `~/i18n/locales/zh-TW.json`
 `~/i18n/locales/en.json`

#### 4.2 页面尽量轻逻辑，主要逻辑放 composables

例如 `useUser()`、`useWallet()` 等。

------

### 5. 接口规范（API）

所有接口都放在：

```
~/app/api/
```

每个模块一个文件，例如：

```
~/app/api/auth.ts
~/app/api/upload.ts
```

> 在~/app/api/index.ts中导出的接口，可以在所有页面自动导入

#### 5.1 请求必须封装

使用 axios 二次封装：

```
~/app/utils/api.util.ts
```

统一处理：

- baseURL
- 错误提示
- token 注入
- 响应格式

#### 5.2 每个接口必须声明类型

```ts
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}
```

------

### 6. 状态管理（Pinia）

状态必须写在：

```
~/app/stores/
```

命名示例：

```
user.ts 导出 -> useUserStore
app.ts 导出 -> useAppStore
wallet.ts 导出 -> useWalletStore
```

Store 内容必须声明类型，且保持轻量。

------

### 7. 图标规范（icons）

项目使用：

- `@nuxt/icon` 统一图标组件
- 若为 Mingcute 图标：
   → 使用 `mingcute:` 前缀
- 若不是 Mingcute 图标：
   → 必须使用本地 SVG
   → 放在 `~/assets/icons/`
   → 不得使用 CDN 图标

示例：

```html
<Icon name="mingcute:flower-4-fill" size="1.2rem" />
```

------

### 8. 版本控制（Git）

- 使用约定式提交（conventional commits）

- 提交格式：

  ```
  feat: 新增功能
  fix: 修复 bug
  refactor: 代码重构
  style: 不影响功能的代码风格调整
  docs: 文档修改
  chore: 杂项
  ```

### 9. 常用库链接

* 状态管理：[Pinia](https://pinia.vuejs.org/zh/)
* CSS原子化：[tailwindcss](https://www.tailwindcss.cn/docs/installation)
* 组合式工具集合：[vueuse](https://vueuse.org/functions.html#category=State)
* 动画库：[animejs](https://animejs.com/)
* 网络请求库：[axios](https://www.axios-http.cn/)
* UI框架：[daisyui](https://daisyui.com/)