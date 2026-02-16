"use client"

import { useState } from "react"
import {
  CheckCircle2,
  Link2,
  Edit3,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const verifiedHypotheses = [
  {
    id: "h1",
    title: "创始人具有扎实的AI学术背景",
    category: "团队",
    confidence: "95%",
  },
  {
    id: "h2",
    title: "核心技术团队拥有大模型研发经验",
    category: "团队",
    confidence: "90%",
  },
  {
    id: "h3",
    title: "目标市场规模超过500亿美元",
    category: "市场",
    confidence: "85%",
  },
  {
    id: "h4",
    title: "SaaS模式具备可持续盈利潜力",
    category: "商业",
    confidence: "80%",
  },
]

interface TermItem {
  id: string
  title: string
  content: string
  linkedHypothesis: string | null
}

interface TermGroup {
  id: string
  label: string
  items: TermItem[]
}

const initialTermGroups: TermGroup[] = [
  {
    id: "control",
    label: "控制权",
    items: [
      {
        id: "t1",
        title: "董事会席位",
        content: "投资方有权委派一名董事进入公司董事会，享有与其他董事同等的表决权和知情权。",
        linkedHypothesis: "h1",
      },
      {
        id: "t2",
        title: "重大事项否决权",
        content: "对于公司章程修改、增减注册资本、合并分立等重大事项，投资方享有一票否决权。",
        linkedHypothesis: null,
      },
    ],
  },
  {
    id: "liquidation",
    label: "清算优先权",
    items: [
      {
        id: "t3",
        title: "优先清算条款",
        content: "在公司发生清算事件时，投资方有权优先于普通股股东获得其投资金额1.5倍的回报。",
        linkedHypothesis: "h4",
      },
    ],
  },
  {
    id: "antidilution",
    label: "反稀释保护",
    items: [
      {
        id: "t4",
        title: "加权平均反稀释",
        content: "若公司在后续融资中以低于本轮估值的价格发行新股，投资方享有加权平均反稀释调整权。",
        linkedHypothesis: "h3",
      },
    ],
  },
]

export function TermSheet() {
  const [termGroups] = useState(initialTermGroups)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    control: true,
    liquidation: true,
    antidilution: true,
  })

  function toggleGroup(groupId: string) {
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }))
  }

  function getHypothesisTitle(hId: string | null) {
    if (!hId) return null
    return verifiedHypotheses.find((h) => h.id === hId)
  }

  return (
    <div className="flex h-full bg-[#F3F4F6]">
      {/* Left: Verified Hypotheses Summary */}
      <div className="w-[340px] shrink-0 border-r border-[#E5E7EB] bg-white">
        <div className="border-b border-[#E5E7EB] p-5">
          <h2 className="text-base font-semibold text-[#111827]">已验证假设摘要</h2>
          <p className="mt-1 text-xs text-[#6B7280]">
            {"以下假设已通过验证，可作为条款起草依据"}
          </p>
        </div>
        <ScrollArea className="h-[calc(100vh-130px)]">
          <div className="p-4 space-y-3">
            {verifiedHypotheses.map((h) => (
              <div
                key={h.id}
                className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-4"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#111827]">{h.title}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge className="bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB] text-xs hover:bg-[#F3F4F6]">
                        {h.category}
                      </Badge>
                      <span className="text-xs text-[#9CA3AF]">
                        {"置信度 "}
                        {h.confidence}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right: Term Editor */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-3xl px-8 py-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">条款构建</h1>
            <p className="mt-1 text-sm text-[#6B7280]">
              {"MiniMax B轮投资 - Term Sheet 草案"}
            </p>
          </div>

          {termGroups.map((group) => (
            <div
              key={group.id}
              className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden"
            >
              <button
                onClick={() => toggleGroup(group.id)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <h3 className="text-base font-semibold text-[#111827]">
                  {group.label}
                </h3>
                {expandedGroups[group.id] ? (
                  <ChevronDown className="h-4 w-4 text-[#6B7280]" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-[#6B7280]" />
                )}
              </button>

              {expandedGroups[group.id] && (
                <div className="border-t border-[#E5E7EB] divide-y divide-[#E5E7EB]">
                  {group.items.map((term) => {
                    const linked = getHypothesisTitle(term.linkedHypothesis)
                    return (
                      <div key={term.id} className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-[#111827]">
                            {term.title}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setEditingId(
                                editingId === term.id ? null : term.id
                              )
                            }
                            className="h-7 px-2 text-[#6B7280]"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </Button>
                        </div>

                        {editingId === term.id ? (
                          <Textarea
                            defaultValue={term.content}
                            className="text-sm border-[#E5E7EB]"
                            rows={3}
                          />
                        ) : (
                          <p className="text-sm text-[#374151] leading-relaxed">
                            {term.content}
                          </p>
                        )}

                        {linked && (
                          <div className="mt-3 flex items-center gap-1.5 text-xs text-[#2563EB]">
                            <Link2 className="h-3 w-3" />
                            {"关联假设: "}
                            {linked.title}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
