"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign, AlertTriangle, TrendingUp, Wifi } from "lucide-react"

interface MetricData {
  avgQueueTime: number
  avgCostPerShot: number
  totalProviders: number
  activeBackends: number
  avgErrorRate: number
}

export function LiveMetrics() {
  const [metrics, setMetrics] = useState<MetricData>({
    avgQueueTime: 0,
    avgCostPerShot: 0,
    totalProviders: 0,
    activeBackends: 0,
    avgErrorRate: 0,
  })
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    // Simulate real-time data updates
    const updateMetrics = () => {
      setMetrics({
        avgQueueTime: Math.floor(Math.random() * 300) + 60, // 60-360 seconds
        avgCostPerShot: Math.random() * 0.05 + 0.01, // $0.01-$0.06 per shot
        totalProviders: 8,
        activeBackends: Math.floor(Math.random() * 3) + 15, // 15-18 active
        avgErrorRate: Math.random() * 0.02 + 0.001, // 0.1%-2.1% error rate
      })
      setLastUpdate(new Date())
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Queue Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatTime(metrics.avgQueueTime)}</div>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-xs">
              Live
            </Badge>
            <Wifi className="h-3 w-3 text-accent animate-pulse" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Cost/Shot</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${metrics.avgCostPerShot.toFixed(3)}</div>
          <p className="text-xs text-muted-foreground">Per quantum shot</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Backends</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.activeBackends}</div>
          <p className="text-xs text-muted-foreground">of {metrics.totalProviders} providers</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Error Rate</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{(metrics.avgErrorRate * 100).toFixed(2)}%</div>
          <p className="text-xs text-muted-foreground">Across all backends</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last Update</CardTitle>
          <Wifi className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">{lastUpdate.toLocaleTimeString()}</div>
          <p className="text-xs text-muted-foreground">Auto-refresh: 10s</p>
        </CardContent>
      </Card>
    </div>
  )
}
