"use client"

import { useState } from "react"
import { GitPullRequest, Search, Check, X, Eye, Clock } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import type { PendingStrategy, Strategy } from "./strategies-grid"

interface ChangeRequestsProps {
  pendingStrategies: PendingStrategy[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export function ChangeRequests({ pendingStrategies, onApprove, onReject }: ChangeRequestsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<PendingStrategy | null>(null)

  const filteredRequests = pendingStrategies.filter(
    (r) =>
      r.changeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.changeId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  function handleViewDetail(request: PendingStrategy) {
    setSelectedRequest(request)
    setDetailOpen(true)
  }

  return (
    <div className="h-full overflow-auto bg-[#F3F4F6]">
      <div className="mx-auto max-w-6xl px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED] text-white">
              <GitPullRequest className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">{"\u53D8\u66F4\u8BF7\u6C42"}</h1>
              <p className="text-sm text-[#6B7280]">
                {"\u5171 "}{pendingStrategies.length}{" \u6761\u5F85\u5BA1\u6838\u8BF7\u6C42"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2">
            <Search className="h-4 w-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder={"\u641C\u7D22\u53D8\u66F4\u8BF7\u6C42..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 bg-transparent text-sm text-[#374151] outline-none placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        {/* Requests List */}
        {filteredRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E5E7EB]">
              <GitPullRequest className="h-8 w-8 text-[#9CA3AF]" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827]">{"\u6682\u65E0\u5F85\u5BA1\u6838\u8BF7\u6C42"}</h3>
            <p className="mt-1 text-sm text-[#6B7280]">{"\u6240\u6709\u53D8\u66F4\u8BF7\u6C42\u5DF2\u5904\u7406\u5B8C\u6BD5"}</p>
          </div>
        ) : (
          <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[140px_1fr_120px_120px_180px_160px] gap-4 border-b border-[#E5E7EB] bg-[#F9FAFB] px-6 py-3">
              <div className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">{"\u53D8\u66F4ID"}</div>
              <div className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">{"\u53D8\u66F4\u540D"}</div>
              <div className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">{"\u53D1\u8D77\u4EBA"}</div>
              <div className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">{"\u53D1\u8D77\u65F6\u95F4"}</div>
              <div className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">{"\u5BA1\u6838\u4EBA"}</div>
              <div className="text-xs font-medium text-[#6B7280] uppercase tracking-wider text-right">{"\u64CD\u4F5C"}</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-[#E5E7EB]">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="grid grid-cols-[140px_1fr_120px_120px_180px_160px] gap-4 px-6 py-4 hover:bg-[#F9FAFB] transition-colors items-center"
                >
                  {/* Change ID */}
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-mono text-[#374151]">{request.changeId}</span>
                  </div>

                  {/* Change Name */}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#111827] truncate">{request.changeName}</p>
                    <p className="text-xs text-[#6B7280] truncate">{"\u7B56\u7565\u7C7B\u578B: "}{request.strategy.type}</p>
                  </div>

                  {/* Initiator */}
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-[#DBEAFE] text-[9px] text-[#2563EB]">
                        {request.initiator.initials.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-[#374151]">{request.initiator.name}</span>
                  </div>

                  {/* Initiated At */}
                  <div className="text-sm text-[#6B7280]">{request.initiatedAt}</div>

                  {/* Reviewers */}
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {request.reviewers.slice(0, 3).map((reviewer, index) => (
                        <Avatar key={reviewer.id} className="h-7 w-7 border-2 border-white" title={reviewer.name}>
                          <AvatarFallback className="bg-[#E5E7EB] text-[9px] text-[#374151]">
                            {reviewer.initials.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {request.reviewers.length > 3 && (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#F3F4F6] text-[10px] font-medium text-[#6B7280]">
                          +{request.reviewers.length - 3}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onApprove(request.id)}
                      className="flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
                    >
                      <Check className="h-3.5 w-3.5" />
                      {"\u63A5\u53D7"}
                    </button>
                    <button
                      onClick={() => onReject(request.id)}
                      className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-100"
                    >
                      <X className="h-3.5 w-3.5" />
                      {"\u62D2\u7EDD"}
                    </button>
                    <button
                      onClick={() => handleViewDetail(request)}
                      className="flex items-center gap-1 rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      {"\u8BE6\u60C5"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-[#111827]">{"\u53D8\u66F4\u8BF7\u6C42\u8BE6\u60C5"}</DialogTitle>
            <DialogDescription className="text-sm text-[#6B7280]">
              {selectedRequest?.changeId}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div className="rounded-lg border border-[#E5E7EB] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">{"\u53D8\u66F4\u540D\u79F0"}</span>
                  <span className="text-sm font-medium text-[#111827]">{selectedRequest.changeName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">{"\u7B56\u7565\u540D\u79F0"}</span>
                  <span className="text-sm font-medium text-[#111827]">{selectedRequest.strategy.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">{"\u7B56\u7565\u7C7B\u578B"}</span>
                  <Badge className={cn("text-xs", selectedRequest.strategy.typeColor)}>
                    {selectedRequest.strategy.type}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">{"\u8D1F\u8D23\u4EBA"}</span>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="bg-[#E5E7EB] text-[8px] text-[#374151]">
                        {selectedRequest.strategy.owner.initials.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-[#111827]">{selectedRequest.strategy.owner.name}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">{"\u53D1\u8D77\u4EBA"}</span>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="bg-[#DBEAFE] text-[8px] text-[#2563EB]">
                        {selectedRequest.initiator.initials.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-[#111827]">{selectedRequest.initiator.name}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">{"\u53D1\u8D77\u65F6\u95F4"}</span>
                  <span className="text-sm font-medium text-[#111827]">{selectedRequest.initiatedAt}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-[#374151] mb-2">{"\u7B56\u7565\u7B80\u4ECB"}</p>
                <p className="text-sm text-[#6B7280] bg-[#F9FAFB] rounded-lg p-3">
                  {selectedRequest.strategy.description}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-[#374151] mb-2">{"\u5BA1\u6838\u4EBA"}</p>
                <div className="flex items-center gap-2">
                  {selectedRequest.reviewers.map((reviewer) => (
                    <div key={reviewer.id} className="flex items-center gap-1.5 rounded-full bg-[#F3F4F6] px-2.5 py-1">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="bg-[#E5E7EB] text-[8px] text-[#374151]">
                          {reviewer.initials.slice(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-[#374151]">{reviewer.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => {
                if (selectedRequest) onReject(selectedRequest.id)
                setDetailOpen(false)
              }}
              className="flex items-center gap-1.5 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
            >
              <X className="h-4 w-4" />
              {"\u62D2\u7EDD"}
            </button>
            <button
              onClick={() => {
                if (selectedRequest) onApprove(selectedRequest.id)
                setDetailOpen(false)
              }}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
            >
              <Check className="h-4 w-4" />
              {"\u63A5\u53D7"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
