"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl">加载中...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">仪表板</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">欢迎回来！</h2>
        <div className="space-y-2">
          <p><strong>姓名:</strong> {session.user?.name}</p>
          <p><strong>邮箱:</strong> {session.user?.email}</p>
          <p><strong>用户 ID:</strong> {session.user?.id}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">项目</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
          <p className="text-gray-500 text-sm mt-2">管理的项目</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">策略</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
          <p className="text-gray-500 text-sm mt-2">投资策略</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">待办</h3>
          <p className="text-3xl font-bold text-orange-600">0</p>
          <p className="text-gray-500 text-sm mt-2">待处理事项</p>
        </div>
      </div>
    </div>
  )
}
