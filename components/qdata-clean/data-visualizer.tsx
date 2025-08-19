"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { BarChart3, LineChartIcon, ScatterChartIcon as ScatterIcon, Download, Settings } from "lucide-react"
import type { DataFile } from "@/app/dashboard/qdata-clean/page"

interface DataVisualizerProps {
  file: DataFile
}

const chartTypes = [
  { value: "line", label: "Line Chart", icon: LineChartIcon },
  { value: "bar", label: "Bar Chart", icon: BarChart3 },
  { value: "scatter", label: "Scatter Plot", icon: ScatterIcon },
]

export function DataVisualizer({ file }: DataVisualizerProps) {
  const [chartType, setChartType] = useState("line")
  const [xAxis, setXAxis] = useState("")
  const [yAxis, setYAxis] = useState("")

  const getNumericColumns = () => {
    if (file.data.length === 0) return []
    return Object.keys(file.data[0]).filter((key) => {
      return file.data.some((row) => !isNaN(Number(row[key])))
    })
  }

  const getAllColumns = () => {
    if (file.data.length === 0) return []
    return Object.keys(file.data[0])
  }

  const prepareChartData = () => {
    if (!xAxis || !yAxis) return []

    return file.data
      .slice(0, 100) // Limit to first 100 points for performance
      .map((row, index) => ({
        x: row[xAxis] || index,
        y: Number(row[yAxis]) || 0,
        name: `Point ${index + 1}`,
      }))
      .filter((point) => !isNaN(point.y))
  }

  const renderChart = () => {
    const data = prepareChartData()

    if (data.length === 0) {
      return (
        <div className="h-[400px] flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Select X and Y axes to generate visualization</p>
          </div>
        </div>
      )
    }

    const chartConfig = {
      y: {
        label: yAxis,
        color: "hsl(var(--chart-1))",
      },
    }

    switch (chartType) {
      case "line":
        return (
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="y" stroke="var(--color-y)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )

      case "bar":
        return (
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="y" fill="var(--color-y)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )

      case "scatter":
        return (
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis dataKey="y" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Scatter dataKey="y" fill="var(--color-y)" />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartContainer>
        )

      default:
        return null
    }
  }

  const generateStatistics = () => {
    if (!yAxis) return null

    const values = file.data.map((row) => Number(row[yAxis])).filter((val) => !isNaN(val))

    if (values.length === 0) return null

    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    const sorted = [...values].sort((a, b) => a - b)
    const median = sorted[Math.floor(sorted.length / 2)]
    const min = Math.min(...values)
    const max = Math.max(...values)
    const std = Math.sqrt(values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length)

    return { mean, median, min, max, std, count: values.length }
  }

  const stats = generateStatistics()

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Visualization Controls
          </CardTitle>
          <CardDescription>Configure your data visualization settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Chart Type</label>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {chartTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">X-Axis</label>
              <Select value={xAxis} onValueChange={setXAxis}>
                <SelectTrigger>
                  <SelectValue placeholder="Select X-axis column" />
                </SelectTrigger>
                <SelectContent>
                  {getAllColumns().map((column) => (
                    <SelectItem key={column} value={column}>
                      {column}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Y-Axis</label>
              <Select value={yAxis} onValueChange={setYAxis}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Y-axis column" />
                </SelectTrigger>
                <SelectContent>
                  {getNumericColumns().map((column) => (
                    <SelectItem key={column} value={column}>
                      {column}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart Display */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Data Visualization</CardTitle>
              <CardDescription>
                {xAxis && yAxis ? `${yAxis} vs ${xAxis}` : "Interactive chart of your quantum data"}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Chart
            </Button>
          </div>
        </CardHeader>
        <CardContent>{renderChart()}</CardContent>
      </Card>

      {/* Statistics */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>Statistical Summary</CardTitle>
            <CardDescription>Key statistics for {yAxis}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Count</div>
                <div className="text-lg font-bold">{stats.count}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Mean</div>
                <div className="text-lg font-bold">{stats.mean.toFixed(4)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Median</div>
                <div className="text-lg font-bold">{stats.median.toFixed(4)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Min</div>
                <div className="text-lg font-bold">{stats.min.toFixed(4)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Max</div>
                <div className="text-lg font-bold">{stats.max.toFixed(4)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Std Dev</div>
                <div className="text-lg font-bold">{stats.std.toFixed(4)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
