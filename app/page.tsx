"use client"

import { useState } from "react"
import { AppSidebar, type PageKey } from "@/components/app-sidebar"
import { HypothesisChecklist } from "@/components/pages/hypothesis-checklist"
import { ProjectOverview } from "@/components/pages/project-overview"
import { TermSheet } from "@/components/pages/term-sheet"
import { Workflow } from "@/components/pages/workflow"
import { DataAnalytics } from "@/components/pages/data-analytics"
import { SystemSettings } from "@/components/pages/system-settings"

const pageComponents: Record<PageKey, React.ComponentType> = {
  overview: ProjectOverview,
  hypotheses: HypothesisChecklist,
  terms: TermSheet,
  workflow: Workflow,
  analytics: DataAnalytics,
  settings: SystemSettings,
}

export default function Page() {
  const [activePage, setActivePage] = useState<PageKey>("hypotheses")
  const ActiveComponent = pageComponents[activePage]

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 overflow-hidden">
        <ActiveComponent />
      </main>
    </div>
  )
}
