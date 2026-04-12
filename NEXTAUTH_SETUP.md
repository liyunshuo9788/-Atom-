# NextAuth 配置完成指南

## ✅ 已完成的配置

### 1. 安装 NextAuth
```bash
npm install next-auth
```

### 2. 环境变量配置 (.env)
```env
NEXTAUTH_SECRET="your-super-secret-jwt-key-change-this-in-production-2024"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. NextAuth API 路由
**文件**: `app/api/auth/[...nextauth]/route.ts`

配置了 Credentials Provider，支持邮箱密码登录。

### 4. Auth Provider
**文件**: `components/AuthProvider.tsx`

在 `app/layout.tsx` 中已包装。

### 5. 登录页面
**文件**: `app/login/page.tsx`

使用 `signIn()` API 处理登录。

### 6. 注册页面
**文件**: `app/register/page.tsx`

调用 `/api/auth/register` API 注册，然后跳转到登录页。

### 7. 测试页面
**文件**: `app/test-auth/page.tsx`

访问 http://localhost:3000/test-auth 可以查看当前登录状态。

---

## 🚀 使用方法

### 登录
```typescript
import { signIn } from "next-auth/react"

await signIn("credentials", {
  email: "test@example.com",
  password: "password123",
  redirect: false,
})
```

### 获取会话
```typescript
import { useSession } from "next-auth/react"

const { data: session, status } = useSession()

if (session) {
  console.log(session.user?.email)
}
```

### 退出登录
```typescript
import { signOut } from "next-auth/react"

await signOut({ callbackUrl: "/" })
```

---

## 📝 下一步需要做的

### 1. 解决数据库连接问题
当前由于 Docker Desktop for Windows 的网络配置问题，从 Windows 直接连接 PostgreSQL 容器时会出现密码认证失败。

**解决方案选项**：
- 重启 Docker Desktop
- 使用 WSL2 运行 Node.js 应用
- 或者在 Docker 容器内运行应用

### 2. 测试注册和登录流程
1. 访问 http://localhost:3000/register 注册账号
2. 访问 http://localhost:3000/login 登录
3. 访问 http://localhost:3000/test-auth 查看登录状态

### 3. 集成到现有页面
- 在首页顶部显示用户信息
- 添加退出登录按钮
- 保护需要登录的页面

---

## 🔐 安全建议

1. **生产环境**：
   - 使用强随机字符串作为 `NEXTAUTH_SECRET`
   - 使用 `openssl rand -base64 32` 生成

2. **密码策略**：
   - 最小长度 8 位
   - 包含大小写字母和数字

3. **HTTPS**：
   - 生产环境必须使用 HTTPS

---

## 📚 参考资料

- [NextAuth.js 官方文档](https://next-auth.js.org/)
- [Auth.js 文档](https://authjs.dev/)
- [Next.js 认证最佳实践](https://nextjs.org/docs/authentication)
