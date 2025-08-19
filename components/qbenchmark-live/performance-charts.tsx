"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const queueTimeData = [
  { time: "00:00", ibm: 45, google: 30, amazon: 60 },
  { time: "04:00", ibm: 120, google: 25, amazon: 45 },
  { time: "08:00", ibm: 180, google: 40, amazon: 90 },
  { time: "12:00", ibm: 90, google: 35, amazon: 75 },
  { time: "16:00", ibm: 60, google: 20, amazon: 30 },
  { time: "20:00", ibm: 30, google: 15, amazon: 25 },
]

const costComparisonData = [
  { provider: "IonQ", cost: 0.045 },
  { provider: "Google", cost: 0.035 },
  { provider: "IBM", cost: 0.025 },
  { provider: "Rigetti", cost: 0.015 },
]

const errorRateData = [
  { time: "Mon", ibm: 1.2, google: 0.8, amazon: 1.5 },
  { time: "Tue", ibm: 1.5, google: 0.6, amazon: 1.8 },
  { time: "Wed", ibm: 1.0, google: 0.9, amazon: 1.2 },
  { time: "Thu", ibm: 1.3, google: 0.7, amazon: 1.6 },
  { time: "Fri", ibm: 1.1, google: 0.5, amazon: 1.4 },
  { time: "Sat", ibm: 0.9, google: 0.8, amazon: 1.0 },
  { time: "Sun", ibm: 1.2, google: 0.6, amazon: 1.3 },
]

export function PerformanceCharts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Queue Time Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Queue Time Trends</CardTitle>
            <CardDescription>24-hour queue time comparison across providers</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                ibm: {
                  label: "IBM Quantum",
                  color: "hsl(var(--chart-1))",
                },
                google: {
                  label: "Google Quantum AI",
                  color: "hsl(var(--chart-2))",
                },
                amazon: {
                  label: "Amazon Braket",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={queueTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="ibm" stroke="var(--color-ibm)" strokeWidth={2} />
                  <Line type="monotone" dataKey="google" stroke="var(--color-google)" strokeWidth={2} />
                  <Line type="monotone" dataKey="amazon" stroke="var(--color-amazon)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Cost Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Comparison</CardTitle>
            <CardDescription>Average cost per shot across providers</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                cost: {
                  label: "Cost per Shot",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="provider" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="cost" fill="var(--color-cost)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Error Rate Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Error Rate Trends</CardTitle>
          <CardDescription>Weekly error rate comparison across major providers</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              ibm: {
                label: "IBM Quantum",
                color: "hsl(var(--chart-1))",
              },
              google: {
                label: "Google Quantum AI",
                color: "hsl(var(--chart-2))",
              },
              amazon: {
                label: "Amazon Braket",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={errorRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="ibm" stroke="var(--color-ibm)" strokeWidth={2} />
                <Line type="monotone" dataKey="google" stroke="var(--color-google)" strokeWidth={2} />
                <Line type="monotone" dataKey="amazon" stroke="var(--color-amazon)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
