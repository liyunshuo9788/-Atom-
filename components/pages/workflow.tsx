"use client"

import { useState, useRef, useEffect } from "react"
import {
  User,
  ListChecks,
  FileText,
  FolderOpen,
  Clock,
  ChevronRight,
  Plus,
  Check,
  ArrowRight,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

/* ─── Types ──────────────────────────────────── */
interface PhaseLog {
  action: string
  date: string
  author: string
}

interface Phase {
  id: string
  groupLabel: string
  name: string
  fullLabel: string
  assignee: string
  assigneeAvatar: string
  hypothesesCount: number
  termsCount: number
  materialsCount: number
  status: "completed" | "active" | "upcoming"
  startDate: string
  endDate?: string
  logs: PhaseLog[]
}

const PHASES: Phase[] = [
  {
    id: "setup-1",
    groupLabel: "\u8BBE\u7ACB\u671F",
    name: "\u8BBE\u7ACB\u671F - \u9636\u6BB51",
    fullLabel: "\u8BBE\u7ACB\u671F - \u9636\u6BB51",
    assignee: "\u5F20\u4F1F",
    assigneeAvatar: "\u5F20",
    hypothesesCount: 5,
    termsCount: 3,
    materialsCount: 8,
    status: "completed",
    startDate: "2024-01-05",
    endDate: "2024-01-20",
    logs: [
      { action: "\u521B\u5EFA\u521D\u59CB\u5047\u8BBE\u6E05\u5355", date: "2024-01-06", author: "\u5F20\u4F1F" },
      { action: "\u4E0A\u4F20\u7ADE\u54C1\u5206\u6790\u62A5\u544A", date: "2024-01-12", author: "\u674E\u56DB" },
      { action: "\u5B8C\u6210\u9636\u6BB5\u5BA1\u6838", date: "2024-01-20", author: "\u738B\u4E94" },
    ],
  },
  {
    id: "setup-2",
    groupLabel: "\u8BBE\u7ACB\u671F",
    name: "\u8BBE\u7ACB\u671F - \u9636\u6BB52",
    fullLabel: "\u8BBE\u7ACB\u671F - \u9636\u6BB52",
    assignee: "\u674E\u56DB",
    assigneeAvatar: "\u674E",
    hypothesesCount: 8,
    termsCount: 5,
    materialsCount: 12,
    status: "completed",
    startDate: "2024-01-21",
    endDate: "2024-02-15",
    logs: [
      { action: "\u5F00\u59CB\u6280\u672F\u5C3D\u8C03", date: "2024-01-22", author: "\u674E\u56DB" },
      { action: "\u63D0\u4EA4\u6280\u672F\u67B6\u6784\u8BC4\u4F30\u62A5\u544A", date: "2024-02-05", author: "\u674E\u56DB" },
      { action: "\u66F4\u65B0\u5047\u8BBE\u9A8C\u8BC1\u72B6\u6001", date: "2024-02-10", author: "\u5F20\u4F1F" },
      { action: "\u5B8C\u6210\u9636\u6BB5\u5BA1\u6838", date: "2024-02-15", author: "\u738B\u4E94" },
    ],
  },
  {
    id: "setup-3",
    groupLabel: "\u8BBE\u7ACB\u671F",
    name: "\u8BBE\u7ACB\u671F - \u9636\u6BB53",
    fullLabel: "\u8BBE\u7ACB\u671F - \u9636\u6BB53",
    assignee: "\u5F20\u4F1F",
    assigneeAvatar: "\u5F20",
    hypothesesCount: 10,
    termsCount: 8,
    materialsCount: 15,
    status: "completed",
    startDate: "2024-02-16",
    endDate: "2024-03-10",
    logs: [
      { action: "\u5F00\u59CB\u6761\u6B3E\u6E05\u5355\u6784\u5EFA", date: "2024-02-17", author: "\u5F20\u4F1F" },
      { action: "\u63D0\u4EA4IC\u5BA1\u6838\u6750\u6599", date: "2024-03-01", author: "\u674E\u56DB" },
      { action: "\u5B8C\u6210\u8BBE\u7ACB\u671F\u6700\u7EC8\u5BA1\u6838", date: "2024-03-10", author: "\u9648\u603B" },
    ],
  },
  {
    id: "duration-1",
    groupLabel: "\u5B58\u7EED\u671F",
    name: "\u5B58\u7EED\u671F - \u9636\u6BB51",
    fullLabel: "\u5B58\u7EED\u671F - \u9636\u6BB51",
    assignee: "\u738B\u82B3",
    assigneeAvatar: "\u738B",
    hypothesesCount: 10,
    termsCount: 8,
    materialsCount: 18,
    status: "completed",
    startDate: "2024-03-11",
    endDate: "2024-04-15",
    logs: [
      { action: "\u542F\u52A8\u5B58\u7EED\u671F\u7BA1\u7406", date: "2024-03-12", author: "\u738B\u82B3" },
      { action: "\u7B2C\u4E00\u6B21\u6295\u540E\u8DDF\u8E2A\u62A5\u544A", date: "2024-04-01", author: "\u738B\u82B3" },
      { action: "\u5B8C\u6210\u9636\u6BB5\u5BA1\u6838", date: "2024-04-15", author: "\u5F20\u4F1F" },
    ],
  },
  {
    id: "duration-2",
    groupLabel: "\u5B58\u7EED\u671F",
    name: "\u5B58\u7EED\u671F - \u9636\u6BB52",
    fullLabel: "\u5B58\u7EED\u671F - \u9636\u6BB52",
    assignee: "\u674E\u56DB",
    assigneeAvatar: "\u674E",
    hypothesesCount: 12,
    termsCount: 8,
    materialsCount: 22,
    status: "completed",
    startDate: "2024-04-16",
    endDate: "2024-06-20",
    logs: [
      { action: "\u66F4\u65B0\u5047\u8BBE\u9A8C\u8BC1\u72B6\u6001", date: "2024-05-01", author: "\u674E\u56DB" },
      { action: "\u63D0\u4EA4Q2\u8FD0\u8425\u6570\u636E", date: "2024-06-10", author: "\u738B\u82B3" },
      { action: "\u5B8C\u6210\u9636\u6BB5\u5BA1\u6838", date: "2024-06-20", author: "\u5F20\u4F1F" },
    ],
  },
  {
    id: "duration-3",
    groupLabel: "\u5B58\u7EED\u671F",
    name: "\u5B58\u7EED\u671F - \u9636\u6BB53",
    fullLabel: "\u5B58\u7EED\u671F - \u9636\u6BB53",
    assignee: "\u5F20\u4F1F",
    assigneeAvatar: "\u5F20",
    hypothesesCount: 12,
    termsCount: 9,
    materialsCount: 25,
    status: "completed",
    startDate: "2024-06-21",
    endDate: "2024-09-15",
    logs: [
      { action: "\u66F4\u65B0\u5047\u8BBE\u6E05\u5355\u72B6\u6001", date: "2024-07-10", author: "\u5F20\u4F1F" },
      { action: "\u63D0\u4EA4Q3\u8BF4\u4F53\u62A5\u544A", date: "2024-09-05", author: "\u674E\u56DB" },
      { action: "\u5B8C\u6210\u9636\u6BB5\u5BA1\u6838", date: "2024-09-15", author: "\u9648\u603B" },
    ],
  },
  {
    id: "duration-4",
    groupLabel: "\u5B58\u7EED\u671F",
    name: "\u5B58\u7EED\u671F - \u9636\u6BB54",
    fullLabel: "\u5B58\u7EED\u671F - \u9636\u6BB54",
    assignee: "\u738B\u82B3",
    assigneeAvatar: "\u738B",
    hypothesesCount: 13,
    termsCount: 9,
    materialsCount: 28,
    status: "active",
    startDate: "2024-09-16",
    logs: [
      { action: "\u542F\u52A8\u7B2C\u56DB\u9636\u6BB5\u8DDF\u8E2A", date: "2024-09-17", author: "\u738B\u82B3" },
      { action: "\u66F4\u65B0\u6761\u6B3E\u5BA1\u8BAE\u72B6\u6001", date: "2024-10-05", author: "\u5F20\u4F1F" },
      { action: "\u63D0\u4EA4\u8FD0\u8425\u6570\u636E\u66F4\u65B0", date: "2024-11-01", author: "\u674E\u56DB" },
    ],
  },
  {
    id: "duration-5",
    groupLabel: "\u5B58\u7EED\u671F",
    name: "\u5B58\u7EED\u671F - \u9636\u6BB55",
    fullLabel: "\u5B58\u7EED\u671F - \u9636\u6BB55",
    assignee: "",
    assigneeAvatar: "",
    hypothesesCount: 0,
    termsCount: 0,
    materialsCount: 0,
    status: "upcoming",
    startDate: "",
    logs: [],
  },
]

const statusConfig = {
  completed: {
    label: "\u5DF2\u5B8C\u6210",
    dotCls: "bg-emerald-500",
    badgeCls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    borderCls: "border-emerald-200",
    bgCls: "bg-emerald-50/30",
  },
  active: {
    label: "\u8FDB\u884C\u4E2D",
    dotCls: "bg-[#2563EB]",
    badgeCls: "bg-blue-50 text-blue-700 border-blue-200",
    borderCls: "border-[#2563EB]",
    bgCls: "bg-blue-50/30",
  },
  upcoming: {
    label: "\u5F85\u542F\u52A8",
    dotCls: "bg-[#D1D5DB]",
    badgeCls: "bg-gray-50 text-gray-500 border-gray-200",
    borderCls: "border-[#E5E7EB]",
    bgCls: "bg-white",
  },
}

/* ─── Props ──────────────────────────────────── */
interface WorkflowProps {
  onSelectPhase?: (phaseName: string) => void
}

/* ─── Component ──────────────────────────────── */
export function Workflow({ onSelectPhase }: WorkflowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Default to the latest active or last completed phase
  const defaultPhase = (() => {
    const active = PHASES.find((p) => p.status === "active")
    if (active) return active.id
    const completed = PHASES.filter((p) => p.status === "completed")
    return completed.length > 0 ? completed[completed.length - 1].id : PHASES[0].id
  })()

  const [selectedPhase, setSelectedPhase] = useState(defaultPhase)

  // Notify parent of initial phase on mount
  useEffect(() => {
    const phase = PHASES.find((p) => p.id === defaultPhase)
    if (phase && onSelectPhase) {
      onSelectPhase(phase.fullLabel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Scroll to selected phase card on mount
  useEffect(() => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector(`[data-phase="${defaultPhase}"]`)
      if (card) {
        card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
      }
    }
  }, [defaultPhase])

  function handleSelectPhase(phaseId: string) {
    setSelectedPhase(phaseId)
    const phase = PHASES.find((p) => p.id === phaseId)
    if (phase && onSelectPhase) {
      onSelectPhase(phase.fullLabel)
    }
  }

  function handleStartNextPhase() {
    const nextPhase = PHASES.find((p) => p.status === "upcoming")
    if (nextPhase) {
      setSelectedPhase(nextPhase.id)
      if (onSelectPhase) {
        onSelectPhase(nextPhase.fullLabel)
      }
    }
  }

  // Group phases for rendering group headers
  let lastGroup = ""

  return (
    <div className="flex h-full flex-col bg-[#F3F4F6]">
      {/* Header */}
      <div className="shrink-0 border-b border-[#E5E7EB] bg-white px-8 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">{"\u5DE5\u4F5C\u6D41"}</h1>
            <p className="mt-1 text-sm text-[#6B7280]">
              {"\u9879\u76EE\u751F\u547D\u5468\u671F\u7BA1\u7406 - \u70B9\u51FB\u9636\u6BB5\u5361\u7247\u5207\u6362\u7248\u672C"}
            </p>
          </div>
          <button
            onClick={handleStartNextPhase}
            className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1D4ED8]"
          >
            <Plus className="h-4 w-4" />
            {"\u542F\u52A8\u4E0B\u4E00\u9636\u6BB5"}
          </button>
        </div>
      </div>

      {/* Phase Timeline - Horizontally Scrollable */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto overflow-y-hidden"
      >
        <div className="flex items-start gap-4 p-6 min-w-max h-full">
          {PHASES.map((phase, idx) => {
            const isSelected = selectedPhase === phase.id
            const sc = statusConfig[phase.status]
            const showGroupHeader = phase.groupLabel !== lastGroup
            lastGroup = phase.groupLabel
            const isLastInGroup = idx < PHASES.length - 1 ? PHASES[idx + 1].groupLabel !== phase.groupLabel : true

            return (
              <div key={phase.id} className="flex items-start shrink-0">
                {/* Group header + card */}
                <div className="flex flex-col">
                  {showGroupHeader && (
                    <div className="mb-3 flex items-center gap-2">
                      <span className={cn("h-2.5 w-2.5 rounded-full", phase.groupLabel === "\u8BBE\u7ACB\u671F" ? "bg-violet-500" : "bg-teal-500")} />
                      <span className="text-sm font-semibold text-[#374151]">{phase.groupLabel}</span>
                    </div>
                  )}
                  {!showGroupHeader && <div className="mb-3 h-[22px]" />}

                  {/* Phase Card */}
                  <button
                    data-phase={phase.id}
                    onClick={() => handleSelectPhase(phase.id)}
                    className={cn(
                      "w-[260px] rounded-xl border-2 p-5 text-left transition-all",
                      isSelected
                        ? "border-[#2563EB] bg-blue-50/40 shadow-lg shadow-blue-100/50 ring-1 ring-[#2563EB]/20"
                        : cn("hover:shadow-md", sc.borderCls, sc.bgCls)
                    )}
                  >
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-[#111827]">{phase.name}</h3>
                      <Badge className={cn("text-[10px] px-1.5 py-0", sc.badgeCls)}>
                        <span className={cn("mr-1 inline-block h-1.5 w-1.5 rounded-full", sc.dotCls)} />
                        {sc.label}
                      </Badge>
                    </div>

                    {/* Assignee */}
                    {phase.assignee && (
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-[#E5E7EB] text-[10px] text-[#374151]">
                            {phase.assigneeAvatar}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-[#6B7280]">{"\u8D1F\u8D23\u4EBA: "}{phase.assignee}</span>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="flex items-center gap-1.5 rounded-lg bg-white/80 px-2 py-1.5 border border-[#E5E7EB]">
                        <ListChecks className="h-3 w-3 text-[#2563EB]" />
                        <div>
                          <p className="text-[10px] text-[#9CA3AF]">{"\u5047\u8BBE"}</p>
                          <p className="text-xs font-semibold text-[#111827]">{phase.hypothesesCount}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-lg bg-white/80 px-2 py-1.5 border border-[#E5E7EB]">
                        <FileText className="h-3 w-3 text-emerald-600" />
                        <div>
                          <p className="text-[10px] text-[#9CA3AF]">{"\u6761\u6B3E"}</p>
                          <p className="text-xs font-semibold text-[#111827]">{phase.termsCount}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-lg bg-white/80 px-2 py-1.5 border border-[#E5E7EB]">
                        <FolderOpen className="h-3 w-3 text-amber-600" />
                        <div>
                          <p className="text-[10px] text-[#9CA3AF]">{"\u6750\u6599"}</p>
                          <p className="text-xs font-semibold text-[#111827]">{phase.materialsCount}</p>
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    {phase.startDate && (
                      <div className="text-[11px] text-[#9CA3AF] mb-3">
                        {phase.startDate}
                        {phase.endDate ? ` \u2192 ${phase.endDate}` : " \u2192 \u8FDB\u884C\u4E2D"}
                      </div>
                    )}

                    {/* Recent Logs */}
                    {phase.logs.length > 0 && (
                      <div className="border-t border-[#E5E7EB] pt-3 space-y-1.5">
                        <p className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">{"\u66F4\u65B0\u65E5\u5FD7"}</p>
                        {phase.logs.slice(-2).map((log, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <Clock className="h-3 w-3 mt-0.5 text-[#D1D5DB] shrink-0" />
                            <p className="text-[11px] text-[#6B7280] leading-snug">
                              <span className="text-[#374151] font-medium">{log.author}</span>
                              {" "}{log.action}
                              <span className="text-[#9CA3AF]">{" \u00B7 "}{log.date}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upcoming placeholder */}
                    {phase.status === "upcoming" && (
                      <div className="flex items-center justify-center py-4 text-[#D1D5DB]">
                        <p className="text-xs">{"\u5F85\u542F\u52A8"}</p>
                      </div>
                    )}

                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="mt-3 flex items-center gap-1.5 text-[#2563EB]">
                        <Check className="h-3.5 w-3.5" />
                        <span className="text-xs font-medium">{"\u5F53\u524D\u9009\u4E2D"}</span>
                      </div>
                    )}
                  </button>
                </div>

                {/* Connector Arrow (between cards) */}
                {idx < PHASES.length - 1 && (
                  <div className="flex items-center self-center mt-6 px-1">
                    {isLastInGroup ? (
                      <div className="flex items-center gap-1">
                        <div className="h-px w-4 bg-[#D1D5DB]" />
                        <ChevronRight className="h-4 w-4 text-[#9CA3AF]" />
                        <div className="h-px w-4 bg-[#D1D5DB]" />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="h-px w-6 bg-[#D1D5DB]" />
                        <ArrowRight className="h-3.5 w-3.5 text-[#D1D5DB]" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
