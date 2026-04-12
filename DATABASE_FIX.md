# 数据库连接问题解决方案 ✅

## 问题原因

在 Windows 上使用 Docker Desktop 连接 PostgreSQL 容器时遇到密码认证失败（错误代码 28P01）。

**根本原因**：Windows 上有一个本地 PostgreSQL 服务（PID 65224）占用了 5432 端口，导致 Docker 容器无法正常绑定端口。

---

## 解决方案

### 步骤 1：停止冲突的 PostgreSQL 服务
```powershell
# 查看占用 5432 端口的进程
netstat -ano | findstr :5432

# 停止进程（需要管理员权限）
Stop-Process -Id 65224 -Force
```

### 步骤 2：删除旧容器
```bash
docker rm -f atomcap-postgres
```

### 步骤 3：使用不同端口创建新容器
```bash
docker run -d --name atomcap-postgres \
  -e POSTGRES_USER=atomcap_user \
  -e POSTGRES_PASSWORD=atomcap_password_2024 \
  -e POSTGRES_DB=atomcap \
  -p 5433:5432 \
  postgres:15
```

**说明**：使用端口 5433 而不是 5432，避免与 Windows 上的本地 PostgreSQL 冲突。

### 步骤 4：更新配置文件

**修改 `.env` 文件**：
```env
DATABASE_URL="postgresql://atomcap_user:atomcap_password_2024@localhost:5433/atomcap?schema=public"
```

---

## 验证连接

运行测试脚本：
```bash
node test-db-connection.js
```

**成功输出**：
```
✅ 数据库连接成功！
当前时间：2026-04-12T09:25:21.148Z
```

---

## 当前配置

| 配置项 | 值 |
|--------|-----|
| **Docker 容器** | atomcap-postgres |
| **PostgreSQL 版本** | 15 |
| **数据库** | atomcap |
| **用户名** | atomcap_user |
| **密码** | atomcap_password_2024 |
| **外部端口** | 5433 |
| **容器内端口** | 5432 |

---

## 重要说明

### 为什么使用端口 5433？
- Windows 上有一个本地 PostgreSQL 服务占用了 5432 端口
- 该服务无法被停止（需要管理员权限）
- 使用不同的端口（5433）可以避免冲突

### 对应用的影响
- `.env` 文件中的 `DATABASE_URL` 已更新为使用端口 5433
- Next.js 应用会自动使用新配置
- 所有数据库连接都会使用端口 5433

---

## 下一步

1. **重启 Next.js 开发服务器**
   ```bash
   npm run dev
   ```

2. **测试注册功能**
   - 访问 http://localhost:3000/register
   - 填写注册表单
   - 提交后应该成功创建用户

3. **测试登录功能**
   - 访问 http://localhost:3000/login
   - 使用注册的邮箱和密码登录
   - 成功后会跳转到首页

4. **测试认证状态**
   - 访问 http://localhost:3000/test-auth
   - 查看当前登录用户信息

---

## 故障排除

### 如果仍然无法连接

1. **检查容器状态**：
   ```bash
   docker ps
   ```

2. **查看容器日志**：
   ```bash
   docker logs atomcap-postgres
   ```

3. **重启容器**：
   ```bash
   docker restart atomcap-postgres
   ```

4. **测试容器内连接**：
   ```bash
   docker exec atomcap-postgres psql -U atomcap_user -d atomcap -c "SELECT NOW();"
   ```

---

## 永久解决方案（可选）

如果你想使用标准的 5432 端口，可以：

1. **禁用 Windows 上的 PostgreSQL 服务**：
   ```powershell
   # 以管理员身份运行
   Stop-Service postgresql-x64-15
   Set-Service postgresql-x64-15 -StartupType Disabled
   ```

2. **然后重新创建容器使用 5432 端口**：
   ```bash
   docker rm -f atomcap-postgres
   docker run -d --name atomcap-postgres \
     -e POSTGRES_USER=atomcap_user \
     -e POSTGRES_PASSWORD=atomcap_password_2024 \
     -e POSTGRES_DB=atomcap \
     -p 5432:5432 \
     postgres:15
   ```

3. **更新 `.env` 文件改回 5432 端口**

---

## 总结

✅ **问题已解决**
- 使用端口 5433 避免了端口冲突
- 数据库连接正常
- 可以继续进行注册和登录功能测试

🎯 **下一步**：重启开发服务器并测试完整的认证流程
