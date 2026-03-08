"use client"

import {
  Cpu,
  TrendingUp,
  Calendar,
  Users,
  DollarSign,
  Target,
  ArrowUpRight,
  Inbox,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { type Strategy } from "@/components/pages/strategies-grid"

// Default strategy info for existing strategies (fallback)
const defaultStrategyInfo = {
  name: "AI基础设施",
  type: "主题策略",
  typeColor: "bg-blue-50 text-blue-700 border-blue-200",
  description:
    "聚焦AI算力、模型训练框架和基础软件生态投资。本策略围绕人工智能产业的底层基础设施进行布局，涵盖GPU/TPU算力芯片、分布式训练框架、模型推理优化、数据标注平台、MLOps工具链等核心领域，旨在捕捉AI产业爆发期的底层价值。",
  createdAt: "2023-06-15",
  updatedAt: "2024-01-20",
  manager: "张伟",
  status: "活跃",
  projectCount: 12,
  totalInvest: "8.5亿",
  returnRate: "+32%",
  avgValuation: "15亿",
}

const appliedProjects = [
  {
    id: "1",
    name: "MiniMax",
    logo: "M",
    logoBg: "bg-[#1F2937]",
    round: "B轮",
    status: "尽调中",
    statusColor: "bg-blue-50 text-blue-700 border-blue-200",
    valuation: "10亿 USD",
    investAmount: "5000万 USD",
  },
  {
    id: "2",
    name: "智谱AI",
    logo: "智",
    logoBg: "bg-violet-600",
    round: "A轮",
    status: "已投资",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    valuation: "8亿 USD",
    investAmount: "3000万 USD",
  },
  {
    id: "3",
    name: "壁仞科技",
    logo: "壁",
    logoBg: "bg-rose-600",
    round: "C轮",
    status: "已投资",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    valuation: "25亿 USD",
    investAmount: "1亿 USD",
  },
  {
    id: "4",
    name: "摩尔线程",
    logo: "摩",
    logoBg: "bg-amber-600",
    round: "B轮",
    status: "观察中",
    statusColor: "bg-gray-50 text-gray-600 border-gray-200",
    valuation: "12亿 USD",
    investAmount: "-",
  },
  {
    id: "5",
    name: "烧原科技",
    logo: "烧",
    logoBg: "bg-cyan-600",
    round: "C轮",
    status: "已投资",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    valuation: "18亿 USD",
    investAmount: "8000万 USD",
  },
]

const investFocus = [
  { label: "GPU/TPU算力芯片", weight: "高" },
  { label: "分布式训练框架", weight: "高" },
  { label: "模型推理优化", weight: "中" },
  { label: "数据标注平台", weight: "中" },
  { label: "MLOps工具链", weight: "低" },
]

interface StrategyOverviewProps {
  strategy?: Strategy
}

export function StrategyOverview({ strategy }: StrategyOverviewProps) {
  // If strategy is provided (new strategy), use its data
  // Otherwise use default strategy info
  const isNewStrategy = strategy && strategy.id.startsWith("new-")
  
  const info = strategy ? {
    name: strategy.name,
    type: strategy.type,
    typeColor: strategy.typeColor,
    description: strategy.description,
    createdAt: strategy.createdAt,
    updatedAt: strategy.createdAt, // Same as createdAt for new strategies
    manager: "\u5f20\u4f1f",
    status: isNewStrategy ? "新建" : "活跃",
    projectCount: strategy.projectCount,
    totalInvest: strategy.totalInvest,
    returnRate: strategy.returnRate,
    avgValuation: isNewStrategy ? "-" : "15\u4EBF",
    iconBg: strategy.iconBg,
    Icon: strategy.icon,
  } : {
    ...defaultStrategyInfo,
    iconBg: "bg-blue-100 text-blue-600",
    Icon: Cpu,
  }

  return (
    <div className="h-full overflow-auto bg-[#F3F4F6]">
      <div className="mx-auto max-w-5xl px-8 py-8 space-y-6">
        {/* Strategy Info Card */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
          <div className="flex items-start gap-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${info.iconBg}`}>
              <info.Icon className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-[#111827]">
                  {info.name}
                </h2>
                <Badge className={`${info.typeColor} hover:bg-blue-50`}>
                  {info.type}
                </Badge>
                <Badge className={isNewStrategy ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50" : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50"}>
                  {info.status}
                </Badge>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                {info.description}
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-[#9CA3AF]">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  创建: {info.createdAt}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  更新: {info.updatedAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <Avatar className="h-4 w-4">
                    <AvatarFallback className="bg-[#E5E7EB] text-[8px] text-[#374151]">
                      {info.manager.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  负责人: {info.manager}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#6B7280]">{"\u9879\u76EE\u6570"}</span>
              <Target className="h-4 w-4 text-[#9CA3AF]" />
            </div>
            <p className="text-2xl font-bold text-[#111827]">
              {info.projectCount}
            </p>
            <p className="mt-1 text-xs text-[#9CA3AF]">{"\u4E2A\u5DF2\u5173\u8054\u9879\u76EE"}</p>
          </div>
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#6B7280]">{"\u603B\u6295\u8D44\u989D"}</span>
              <DollarSign className="h-4 w-4 text-[#9CA3AF]" />
            </div>
            <p className="text-2xl font-bold text-[#111827]">
              {info.totalInvest}
            </p>
            <p className="mt-1 text-xs text-[#9CA3AF]">USD</p>
          </div>
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#6B7280]">{"\u6536\u76CA\u7387"}</span>
              <TrendingUp className="h-4 w-4 text-[#9CA3AF]" />
            </div>
            <p className={`text-2xl font-bold ${info.returnRate === "+0%" ? "text-[#9CA3AF]" : "text-emerald-600"}`}>
              {info.returnRate}
            </p>
            <p className="mt-1 text-xs text-[#9CA3AF]">{"\u7EFC\u5408\u56DE\u62A5"}</p>
          </div>
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#6B7280]">{"\u5E73\u5747\u4F30\u503C"}</span>
              <ArrowUpRight className="h-4 w-4 text-[#9CA3AF]" />
            </div>
            <p className="text-2xl font-bold text-[#111827]">
              {info.avgValuation}
            </p>
            <p className="mt-1 text-xs text-[#9CA3AF]">USD</p>
          </div>
        </div>

        {/* Investment Focus */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
          <h3 className="text-base font-semibold text-[#111827] mb-4">投资重点领域</h3>
          {isNewStrategy ? (
            <div className="flex flex-col items-center justify-center py-8 text-[#9CA3AF]">
              <Inbox className="h-10 w-10 mb-2" />
              <p className="text-sm">暂无投资重点领域</p>
              <p className="text-xs mt-1">请在假设清单中添加投资重点</p>
            </div>
          ) : (
            <div className="space-y-3">
              {investFocus.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3"
                >
                  <span className="text-sm text-[#374151]">{item.label}</span>
                  <Badge
                    className={
                      item.weight === "高"
                        ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50"
                        : item.weight === "中"
                          ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-50"
                    }
                  >
                    优先级: {item.weight}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Applied Projects */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-[#111827]">已应用项目</h3>
            <span className="text-xs text-[#9CA3AF]">共 {isNewStrategy ? 0 : appliedProjects.length} 个项目</span>
          </div>
          {isNewStrategy ? (
            <div className="flex flex-col items-center justify-center py-8 text-[#9CA3AF]">
              <Inbox className="h-10 w-10 mb-2" />
              <p className="text-sm">暂无关联项目</p>
              <p className="text-xs mt-1">待将策略应用到项目中</p>
            </div>
          ) : (
            <div className="space-y-3">
              {appliedProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center gap-4 rounded-lg border border-[#E5E7EB] px-4 py-3 transition-colors hover:bg-[#F9FAFB]"
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold text-white ${project.logoBg}`}
                  >
                    {project.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#111827]">
                      {project.name}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      {"\u4F30\u503C: "}
                      {project.valuation}
                    </p>
                  </div>
                  <Badge className="bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-50 text-xs">
                    {project.round}
                  </Badge>
                  <Badge className={`${project.statusColor} text-xs`}>
                    {project.status}
                  </Badge>
                  <span className="text-sm text-[#374151] w-28 text-right">
                    {project.investAmount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
