# 用户信息动态化修复说明

## 🎯 问题

前端组件中使用了写死的用户名"张伟"，没有从 NextAuth session 中获取真实用户信息。

---

## ✅ 已修复的组件

### 1. **app-topbar.tsx** - 顶部导航栏

**修改前**:
```tsx
<AvatarFallback className="bg-[#334155] text-[10px] text-white">
  张伟
</AvatarFallback>
<span className="text-sm text-[#CBD5E1]">张伟</span>
```

**修改后**:
```tsx
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export function AppTopbar({ activeNav, onNavigate }: AppTopbarProps) {
  const { data: session } = useSession()
  const router = useRouter()
  
  const userName = session?.user?.name || session?.user?.email?.split("@")[0] || "用户"
  const userInitial = userName.charAt(0).toUpperCase()
  
  return (
    <AvatarFallback className="bg-[#334155] text-[10px] text-white">
      {userInitial}
    </AvatarFallback>
    <span className="text-sm text-[#CBD5E1]">{userName}</span>
    
    // 退出登录功能
    <DropdownMenuItem 
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      退出登录
    </DropdownMenuItem>
  )
}
```

**功能**:
- ✅ 从 session 获取用户名
- ✅ 优先显示 `user.name`
- ✅ 如果没有 name，使用 email 的 @ 前部分
- ✅ 默认显示"用户"
- ✅ 头像显示首字母
- ✅ 退出登录功能

---

### 2. **app-sidebar.tsx** - 侧边栏

**修改前**:
```tsx
<AvatarFallback className="bg-[#334155] text-xs text-white">
  张伟
</AvatarFallback>
<span className="text-sm text-[#CBD5E1]">张伟</span>
```

**修改后**:
```tsx
import { useSession } from "next-auth/react"

export function AppSidebar({ activePage, onNavigate }: AppSidebarProps) {
  const { data: session } = useSession()
  
  const userName = session?.user?.name || session?.user?.email?.split("@")[0] || "用户"
  const userInitial = userName.charAt(0).toUpperCase()
  
  return (
    <AvatarFallback className="bg-[#334155] text-xs text-white">
      {userInitial}
    </AvatarFallback>
    <span className="text-sm text-[#CBD5E1]">{userName}</span>
  )
}
```

**功能**:
- ✅ 从 session 获取用户名
- ✅ 显示逻辑与 topbar 一致
- ✅ 头像显示首字母

---

## 🔧 用户名获取逻辑

```typescript
const userName = session?.user?.name || session?.user?.email?.split("@")[0] || "用户"
const userInitial = userName.charAt(0).toUpperCase()
```

**优先级**:
1. `session.user.name` - 用户姓名（注册时填写）
2. `session.user.email.split("@")[0]` - 邮箱前缀
3. `"用户"` - 默认值

**示例**:
- 如果 `name = "测试用户"` → 显示 "测试用户"，头像显示 "测"
- 如果 `name = null, email = "test@example.com"` → 显示 "test"，头像显示 "T"
- 如果 session 不存在 → 显示 "用户"，头像显示 "用"

---

## 📊 其他仍使用"张伟"的文件

以下文件是**演示数据**或**静态示例**，暂时不需要修改：

| 文件 | 说明 | 是否需要修改 |
|------|------|-------------|
| `components/pages/analysis-frameworks.tsx` | 分析框架示例数据 | ❌ 否（演示用） |
| `components/pages/dashboard.tsx` | 仪表板示例数据 | ❌ 否（演示用） |
| `components/pages/hypothesis-checklist.tsx` | 假设清单示例 | ❌ 否（演示用） |
| `components/pages/project-materials.tsx` | 项目材料示例 | ❌ 否（演示用） |
| `components/pages/project-overview.tsx` | 项目概览示例 | ❌ 否（演示用） |
| `components/pages/projects-grid.tsx` | 项目列表示例 | ❌ 否（演示用） |
| `components/pages/strategies-grid.tsx` | 策略列表示例 | ❌ 否（演示用） |
| `components/pages/strategy-*.tsx` | 策略相关示例 | ❌ 否（演示用） |
| `components/pages/system-settings.tsx` | 系统设置默认值 | ⚠️ 可选（可改为从 session 读取） |
| `components/pages/term-sheet.tsx` | 条款清单示例 | ❌ 否（演示用） |

**说明**: 这些文件中的"张伟"是**示例数据**，用于展示 UI 效果。当实际用户登录时，这些页面应该从 API 获取真实数据，而不是使用硬编码。

---

## 🚀 测试方法

1. **启动开发服务器**:
   ```bash
   npm run dev
   ```

2. **注册新账号**:
   - 访问 `/register`
   - 使用邮箱注册（如：`newuser@example.com`）
   - 填写姓名（如：`新用户）`

3. **登录**:
   - 访问 `/login`
   - 使用新账号登录

4. **验证**:
   - 检查顶部导航栏是否显示 "新用户"
   - 检查侧边栏是否显示 "新用户"
   - 检查头像是否显示 "新"

5. **退出登录**:
   - 点击顶部导航栏的用户名
   - 选择"退出登录"
   - 应该跳转到 `/login` 页面

---

## 📝 注意事项

### 1. **Session 加载状态**
当 session 正在加载时，`session` 为 `undefined`，此时会显示默认值"用户"。

### 2. **性能优化**
如果这些组件在多个页面使用，建议：
- 使用 React Context 统一管理用户信息
- 或使用自定义 hook `useCurrentUser()`

### 3. **国际化**
如果需要支持多语言，"用户"默认值应该使用 i18n：
```typescript
const userName = session?.user?.name || session?.user?.email?.split("@")[0] || t("default_user")
```

---

## 🎨 UI 效果对比

### 修改前
```
┌─────────────────┐
│ 👤 张伟        ▼ │  ← 写死的名字
└─────────────────┘
```

### 修改后
```
┌─────────────────┐
│ 👤 新用户      ▼ │  ← 动态显示真实用户名
└─────────────────┘
```

---

## ✅ 完成状态

| 组件 | 状态 | 说明 |
|------|------|------|
| `app-topbar.tsx` | ✅ 已完成 | 用户名动态显示 + 退出功能 |
| `app-sidebar.tsx` | ✅ 已完成 | 用户名动态显示 |
| 其他演示数据文件 | ⏸️ 保持原样 | 作为 UI 示例保留 |

---

## 🔗 相关文件

- [`components/app-topbar.tsx`](components/app-topbar.tsx) - 顶部导航栏
- [`components/app-sidebar.tsx`](components/app-sidebar.tsx) - 侧边栏
- [`components/AuthProvider.tsx`](components/AuthProvider.tsx) - Session 提供者
- [`app/login/page.tsx`](app/login/page.tsx) - 登录页面
- [`app/register/page.tsx`](app/register/page.tsx) - 注册页面

---

**修复完成时间**: 2026-04-12  
**修复内容**: 将前端写死的"张伟"改为从 NextAuth session 动态获取
