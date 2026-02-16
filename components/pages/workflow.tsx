"use client"

import { Calendar, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface TaskCard {
  id: string
  title: string
  project: string
  assignee: string
  assigneeAvatar: string
  dueDate: string
  priority: "high" | "medium" | "low"
}

interface KanbanColumn {
  id: string
  label: string
  color: string
  dotColor: string
  cards: TaskCard[]
}

const columns: KanbanColumn[] = [
  {
    id: "todo",
    label: "待启动",
    color: "bg-[#F3F4F6]",
    dotColor: "bg-[#9CA3AF]",
    cards: [
      {
        id: "c1",
        title: "竞品市场调研报告",
        project: "MiniMax",
        assignee: "王芳",
        assigneeAvatar: "王",
        dueDate: "2024-02-15",
        priority: "medium",
      },
      {
        id: "c2",
        title: "法律风险审查",
        project: "MiniMax",
        assignee: "赵强",
        assigneeAvatar: "赵",
        dueDate: "2024-02-20",
        priority: "low",
      },
    ],
  },
  {
    id: "diligence",
    label: "尽调中",
    color: "bg-blue-50",
    dotColor: "bg-[#2563EB]",
    cards: [
      {
        id: "c3",
        title: "技术架构深度评估",
        project: "MiniMax",
        assignee: "张伟",
        assigneeAvatar: "张",
        dueDate: "2024-02-10",
        priority: "high",
      },
      {
        id: "c4",
        title: "财务数据核查",
        project: "MiniMax",
        assignee: "李四",
        assigneeAvatar: "李",
        dueDate: "2024-02-12",
        priority: "high",
      },
      {
        id: "c5",
        title: "客户访谈计划",
        project: "MiniMax",
        assignee: "王芳",
        assigneeAvatar: "王",
        dueDate: "2024-02-18",
        priority: "medium",
      },
    ],
  },
  {
    id: "ic",
    label: "IC 上会",
    color: "bg-amber-50",
    dotColor: "bg-amber-500",
    cards: [
      {
        id: "c6",
        title: "投资备忘录撰写",
        project: "MiniMax",
        assignee: "张伟",
        assigneeAvatar: "张",
        dueDate: "2024-02-25",
        priority: "high",
      },
    ],
  },
  {
    id: "signing",
    label: "协议签署",
    color: "bg-emerald-50",
    dotColor: "bg-emerald-500",
    cards: [
      {
        id: "c7",
        title: "SPA 条款确认",
        project: "ByteAI",
        assignee: "赵强",
        assigneeAvatar: "赵",
        dueDate: "2024-02-08",
        priority: "medium",
      },
    ],
  },
  {
    id: "post",
    label: "投后管理",
    color: "bg-[#F3F4F6]",
    dotColor: "bg-[#6B7280]",
    cards: [
      {
        id: "c8",
        title: "季度运营数据跟踪",
        project: "StarAI",
        assignee: "李四",
        assigneeAvatar: "李",
        dueDate: "2024-03-01",
        priority: "low",
      },
    ],
  },
]

const priorityColors: Record<string, string> = {
  high: "bg-red-50 text-red-600 border-red-200",
  medium: "bg-amber-50 text-amber-600 border-amber-200",
  low: "bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]",
}

const priorityLabels: Record<string, string> = {
  high: "高",
  medium: "中",
  low: "低",
}

export function Workflow() {
  return (
    <div className="flex h-full flex-col bg-[#F3F4F6]">
      {/* Header */}
      <div className="shrink-0 border-b border-[#E5E7EB] bg-white px-8 py-5">
        <h1 className="text-2xl font-bold text-[#111827]">工作流</h1>
        <p className="mt-1 text-sm text-[#6B7280]">
          {"投资项目流程看板 - 跟踪所有项目进展"}
        </p>
      </div>

      {/* Kanban Board */}
      <ScrollArea className="flex-1" orientation="horizontal">
        <div className="flex gap-4 p-6 min-w-max">
          {columns.map((col) => (
            <div key={col.id} className="w-[280px] shrink-0">
              {/* Column Header */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn("h-2.5 w-2.5 rounded-full", col.dotColor)} />
                  <span className="text-sm font-semibold text-[#111827]">
                    {col.label}
                  </span>
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#E5E7EB] text-xs text-[#6B7280]">
                    {col.cards.length}
                  </span>
                </div>
                <button className="text-[#9CA3AF] hover:text-[#6B7280]">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                {col.cards.map((card) => (
                  <div
                    key={card.id}
                    className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm transition-shadow hover:shadow-md cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium text-[#111827] leading-snug">
                        {card.title}
                      </p>
                    </div>
                    <p className="mt-1.5 text-xs text-[#9CA3AF]">{card.project}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-[#E5E7EB] text-[10px] text-[#374151]">
                            {card.assigneeAvatar}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-[#6B7280]">{card.assignee}</span>
                      </div>
                      <Badge
                        className={cn(
                          "text-[10px] px-1.5 py-0",
                          priorityColors[card.priority]
                        )}
                      >
                        {priorityLabels[card.priority]}
                      </Badge>
                    </div>
                    <div className="mt-2.5 flex items-center gap-1 text-xs text-[#9CA3AF]">
                      <Calendar className="h-3 w-3" />
                      {card.dueDate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
