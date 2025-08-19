"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown, Filter, Star } from "lucide-react"

const backends = [
  {
    id: 1,
    name: "ibm_brisbane",
    provider: "IBM Quantum",
    qubits: 127,
    queueTime: 45,
    costPerShot: 0.025,
    errorRate: 0.012,
    availability: 98,
    score: 8.5,
  },
  {
    id: 2,
    name: "sycamore",
    provider: "Google Quantum AI",
    qubits: 70,
    queueTime: 30,
    costPerShot: 0.035,
    errorRate: 0.008,
    availability: 99,
    score: 9.2,
  },
  {
    id: 3,
    name: "IonQ Harmony",
    provider: "Amazon Braket",
    qubits: 11,
    queueTime: 15,
    costPerShot: 0.045,
    errorRate: 0.005,
    availability: 97,
    score: 8.8,
  },
  {
    id: 4,
    name: "Rigetti Aspen-M-3",
    provider: "Amazon Braket",
    qubits: 80,
    queueTime: 90,
    costPerShot: 0.015,
    errorRate: 0.018,
    availability: 92,
    score: 7.6,
  },
  {
    id: 5,
    name: "ibm_kyoto",
    provider: "IBM Quantum",
    qubits: 127,
    queueTime: 120,
    costPerShot: 0.025,
    errorRate: 0.015,
    availability: 95,
    score: 7.8,
  },
]

export function ProviderComparison() {
  const [sortBy, setSortBy] = useState("score")
  const [filterBy, setFilterBy] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const filteredAndSortedBackends = backends
    .filter((backend) => {
      if (filterBy === "all") return true
      return backend.provider.toLowerCase().includes(filterBy.toLowerCase())
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a]
      const bValue = b[sortBy as keyof typeof b]

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue
      }

      return sortOrder === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
    })

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m`
  }

  const getScoreColor = (score: number) => {
    if (score >= 9) return "text-accent"
    if (score >= 8) return "text-primary"
    if (score >= 7) return "text-yellow-500"
    return "text-muted-foreground"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Backend Comparison</CardTitle>
            <CardDescription>Compare quantum backends across all providers</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                <SelectItem value="ibm">IBM Quantum</SelectItem>
                <SelectItem value="google">Google Quantum AI</SelectItem>
                <SelectItem value="amazon">Amazon Braket</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Backend</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead className="text-center">Qubits</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("queueTime")}>
                  <div className="flex items-center gap-1">
                    Queue Time
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("costPerShot")}>
                  <div className="flex items-center gap-1">
                    Cost/Shot
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("errorRate")}>
                  <div className="flex items-center gap-1">
                    Error Rate
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("availability")}>
                  <div className="flex items-center gap-1">
                    Availability
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("score")}>
                  <div className="flex items-center gap-1">
                    Score
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedBackends.map((backend) => (
                <TableRow key={backend.id}>
                  <TableCell className="font-medium">{backend.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{backend.provider}</Badge>
                  </TableCell>
                  <TableCell className="text-center">{backend.qubits}</TableCell>
                  <TableCell>{formatTime(backend.queueTime)}</TableCell>
                  <TableCell>${backend.costPerShot.toFixed(3)}</TableCell>
                  <TableCell>{(backend.errorRate * 100).toFixed(1)}%</TableCell>
                  <TableCell>{backend.availability}%</TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-1 font-medium ${getScoreColor(backend.score)}`}>
                      <Star className="h-4 w-4" />
                      {backend.score}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
