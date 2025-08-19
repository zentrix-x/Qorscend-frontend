"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ToolCard } from "@/components/dashboard/tool-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { WorkflowSuggestions } from "@/components/dashboard/workflow-suggestions"
import { Code2, BarChart3, Database, Zap, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome to QORSCEND</h1>
          <p className="text-muted-foreground">
            Your comprehensive quantum computing toolkit for code conversion, benchmarking, and data analysis.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Code Conversions"
            value="1,247"
            change="+12%"
            icon={<Code2 className="h-4 w-4" />}
            description="This month"
          />
          <StatsCard
            title="Benchmarks Run"
            value="89"
            change="+23%"
            icon={<BarChart3 className="h-4 w-4" />}
            description="This week"
          />
          <StatsCard
            title="Data Files Processed"
            value="456"
            change="+8%"
            icon={<Database className="h-4 w-4" />}
            description="This month"
          />
        </div>

        {/* Tools Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Quantum Tools</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ToolCard
              title="QCode Convert™"
              description="Convert quantum code between different Python libraries (Qiskit, Cirq, Braket, etc.)"
              icon={<Code2 className="h-8 w-8" />}
              features={["Multi-library support", "Syntax validation", "Instant conversion"]}
              href="/dashboard/qcode-convert"
              status="Ready"
              statusColor="text-accent"
            />
            <ToolCard
              title="QBenchmark Live™"
              description="Real-time dashboard for quantum provider performance metrics and costs"
              icon={<BarChart3 className="h-8 w-8" />}
              features={["Live queue times", "Cost comparison", "Error rate tracking"]}
              href="/dashboard/qbenchmark-live"
              status="Live"
              statusColor="text-primary"
            />
            <ToolCard
              title="QData Clean™"
              description="Upload, clean, normalize, and visualize quantum experiment results"
              icon={<Database className="h-8 w-8" />}
              features={["JSON/CSV support", "Data visualization", "Export options"]}
              href="/dashboard/qdata-clean"
              status="Ready"
              statusColor="text-accent"
            />
          </div>
        </div>

        <WorkflowSuggestions />

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/dashboard/qcode-convert"
              className="p-4 border rounded-lg hover:bg-card/50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-medium">Convert Code</span>
              </div>
            </Link>
            <Link
              href="/dashboard/qbenchmark-live"
              className="p-4 border rounded-lg hover:bg-card/50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-accent" />
                <span className="font-medium">Check Queue Times</span>
              </div>
            </Link>
            <Link
              href="/dashboard/qbenchmark-live"
              className="p-4 border rounded-lg hover:bg-card/50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-medium">View Analytics</span>
              </div>
            </Link>
            <Link
              href="/dashboard/qdata-clean"
              className="p-4 border rounded-lg hover:bg-card/50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-accent" />
                <span className="font-medium">Upload Data</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
