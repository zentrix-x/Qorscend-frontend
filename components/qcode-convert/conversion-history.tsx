"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Copy, Download, Trash2 } from "lucide-react"

const mockHistory = [
  {
    id: 1,
    source: "qiskit",
    target: "cirq",
    timestamp: "2024-01-15 14:30",
    status: "success",
    preview: "from qiskit import QuantumCircuit...",
  },
  {
    id: 2,
    source: "cirq",
    target: "braket",
    timestamp: "2024-01-15 13:45",
    status: "success",
    preview: "import cirq\nimport numpy as np...",
  },
  {
    id: 3,
    source: "pennylane",
    target: "qiskit",
    timestamp: "2024-01-15 12:20",
    status: "error",
    preview: "import pennylane as qml...",
  },
  {
    id: 4,
    source: "braket",
    target: "cirq",
    timestamp: "2024-01-15 11:15",
    status: "success",
    preview: "from braket.circuits import Circuit...",
  },
]

export function ConversionHistory() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Conversion History
          </CardTitle>
          <CardDescription>View and manage your recent code conversions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockHistory.map((conversion) => (
              <div
                key={conversion.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {conversion.source} → {conversion.target}
                    </Badge>
                    <Badge variant={conversion.status === "success" ? "default" : "destructive"} className="text-xs">
                      {conversion.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{conversion.timestamp}</span>
                  </div>
                  <p className="text-sm font-mono text-muted-foreground truncate">{conversion.preview}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
