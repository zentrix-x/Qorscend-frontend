"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ExternalLink, Zap, Clock, DollarSign, AlertCircle } from "lucide-react"

const providers = [
  {
    name: "IBM Quantum",
    status: "online",
    backends: [
      {
        name: "ibm_brisbane",
        qubits: 127,
        queueTime: 45,
        costPerShot: 0.025,
        errorRate: 0.012,
        availability: 98,
      },
      {
        name: "ibm_kyoto",
        qubits: 127,
        queueTime: 120,
        costPerShot: 0.025,
        errorRate: 0.015,
        availability: 95,
      },
    ],
  },
  {
    name: "Google Quantum AI",
    status: "online",
    backends: [
      {
        name: "sycamore",
        qubits: 70,
        queueTime: 30,
        costPerShot: 0.035,
        errorRate: 0.008,
        availability: 99,
      },
    ],
  },
  {
    name: "Amazon Braket",
    status: "online",
    backends: [
      {
        name: "Rigetti Aspen-M-3",
        qubits: 80,
        queueTime: 90,
        costPerShot: 0.015,
        errorRate: 0.018,
        availability: 92,
      },
      {
        name: "IonQ Harmony",
        qubits: 11,
        queueTime: 15,
        costPerShot: 0.045,
        errorRate: 0.005,
        availability: 97,
      },
    ],
  },
  {
    name: "Xanadu",
    status: "maintenance",
    backends: [
      {
        name: "X-Series",
        qubits: 216,
        queueTime: 0,
        costPerShot: 0.02,
        errorRate: 0.01,
        availability: 0,
      },
    ],
  },
]

export function ProviderOverview() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-accent text-accent-foreground"
      case "maintenance":
        return "bg-yellow-500/10 text-yellow-500"
      case "offline":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const formatTime = (seconds: number) => {
    if (seconds === 0) return "N/A"
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m`
  }

  return (
    <div className="space-y-6">
      {providers.map((provider) => (
        <Card key={provider.name}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-3">
                  {provider.name}
                  <Badge className={getStatusColor(provider.status)}>{provider.status}</Badge>
                </CardTitle>
                <CardDescription>{provider.backends.length} quantum backends available</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {provider.backends.map((backend) => (
                <div key={backend.name} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{backend.name}</h4>
                    <Badge variant="outline">{backend.qubits} qubits</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Queue Time
                      </div>
                      <div className="font-medium">{formatTime(backend.queueTime)}</div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        Cost/Shot
                      </div>
                      <div className="font-medium">${backend.costPerShot.toFixed(3)}</div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertCircle className="h-4 w-4" />
                        Error Rate
                      </div>
                      <div className="font-medium">{(backend.errorRate * 100).toFixed(1)}%</div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="h-4 w-4" />
                        Availability
                      </div>
                      <div className="space-y-1">
                        <div className="font-medium">{backend.availability}%</div>
                        <Progress value={backend.availability} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
