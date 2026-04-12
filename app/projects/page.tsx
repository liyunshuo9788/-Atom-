"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProjectsPage() {
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
      <h1 className="text-3xl font-bold mb-6">项目列表</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 mb-4">
          欢迎，{session.user?.name}！这是项目列表页面。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 text-center">
            <div className="text-4xl mb-2">📊</div>
            <h3 className="font-semibold mb-2">进行中项目</h3>
            <p className="text-2xl font-bold text-blue-600">0</p>
          </div>
          
          <div className="border rounded-lg p-6 text-center">
            <div className="text-4xl mb-2">✅</div>
            <h3 className="font-semibold mb-2">已完成项目</h3>
            <p className="text-2xl font-bold text-green-600">0</p>
          </div>
          
          <div className="border rounded-lg p-6 text-center">
            <div className="text-4xl mb-2">⏳</div>
            <h3 className="font-semibold mb-2">待审核项目</h3>
            <p className="text-2xl font-bold text-orange-600">0</p>
          </div>
        </div>
        
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500">
          创建新项目
        </button>
      </div>
    </div>
  )
}
