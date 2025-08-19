"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Settings, Play, CheckCircle, AlertTriangle, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { DataFile } from "@/app/dashboard/qdata-clean/page"

interface DataProcessorProps {
  file: DataFile
  onProcess: (processedFile: DataFile) => void
}

const processingOptions = [
  { id: "remove_nulls", label: "Remove null/empty values", description: "Clean up missing data points" },
  { id: "normalize_numbers", label: "Normalize numerical values", description: "Scale values to 0-1 range" },
  {
    id: "remove_outliers",
    label: "Remove statistical outliers",
    description: "Filter extreme values using IQR method",
  },
  { id: "standardize_format", label: "Standardize data format", description: "Ensure consistent data types" },
  { id: "aggregate_duplicates", label: "Aggregate duplicate entries", description: "Combine similar measurements" },
]

export function DataProcessor({ file, onProcess }: DataProcessorProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["remove_nulls", "standardize_format"])
  const [isProcessing, setIsProcessing] = useState(false)
  const [previewData, setPreviewData] = useState(file.data.slice(0, 10))
  const { toast } = useToast()

  const handleOptionChange = (optionId: string, checked: boolean) => {
    setSelectedOptions((prev) => (checked ? [...prev, optionId] : prev.filter((id) => id !== optionId)))
  }

  const processData = async () => {
    setIsProcessing(true)

    // Simulate data processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    let processedData = [...file.data]

    // Apply selected processing options
    if (selectedOptions.includes("remove_nulls")) {
      processedData = processedData.filter((row) => Object.values(row).some((value) => value !== null && value !== ""))
    }

    if (selectedOptions.includes("normalize_numbers")) {
      const numericColumns = Object.keys(processedData[0] || {}).filter((key) => {
        return processedData.some((row) => !isNaN(Number(row[key])))
      })

      numericColumns.forEach((column) => {
        const values = processedData.map((row) => Number(row[column])).filter((val) => !isNaN(val))
        const min = Math.min(...values)
        const max = Math.max(...values)

        processedData = processedData.map((row) => ({
          ...row,
          [column]: !isNaN(Number(row[column])) ? ((Number(row[column]) - min) / (max - min)).toFixed(4) : row[column],
        }))
      })
    }

    if (selectedOptions.includes("remove_outliers")) {
      // Simple outlier removal simulation
      processedData = processedData.slice(0, Math.floor(processedData.length * 0.95))
    }

    const processedFile: DataFile = {
      ...file,
      data: processedData,
      processed: true,
    }

    onProcess(processedFile)
    setIsProcessing(false)

    toast({
      title: "Data Processing Complete",
      description: `Applied ${selectedOptions.length} processing steps to ${file.name}`,
    })
  }

  const getDataQualityScore = () => {
    const totalRows = file.data.length
    const completeRows = file.data.filter((row) =>
      Object.values(row).every((value) => value !== null && value !== ""),
    ).length
    return Math.round((completeRows / totalRows) * 100)
  }

  const getColumnInfo = () => {
    if (file.data.length === 0) return []

    const columns = Object.keys(file.data[0])
    return columns.map((column) => {
      const values = file.data.map((row) => row[column]).filter((val) => val !== null && val !== "")
      const nullCount = file.data.length - values.length
      const isNumeric = values.some((val) => !isNaN(Number(val)))

      return {
        name: column,
        type: isNumeric ? "numeric" : "text",
        nullCount,
        uniqueValues: new Set(values).size,
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Data Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Data Overview
          </CardTitle>
          <CardDescription>Review your data quality and structure before processing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Total Records</div>
              <div className="text-2xl font-bold">{file.data.length.toLocaleString()}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Data Quality Score</div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">{getDataQualityScore()}%</div>
                {getDataQualityScore() >= 80 ? (
                  <CheckCircle className="h-5 w-5 text-accent" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Columns</div>
              <div className="text-2xl font-bold">{getColumnInfo().length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Column Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Column Analysis</CardTitle>
          <CardDescription>Detailed breakdown of your data structure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Column Name</TableHead>
                  <TableHead>Data Type</TableHead>
                  <TableHead>Unique Values</TableHead>
                  <TableHead>Missing Values</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getColumnInfo().map((column) => (
                  <TableRow key={column.name}>
                    <TableCell className="font-medium">{column.name}</TableCell>
                    <TableCell>
                      <Badge variant={column.type === "numeric" ? "default" : "secondary"}>{column.type}</Badge>
                    </TableCell>
                    <TableCell>{column.uniqueValues}</TableCell>
                    <TableCell>
                      {column.nullCount > 0 ? (
                        <Badge variant="destructive">{column.nullCount}</Badge>
                      ) : (
                        <Badge className="bg-accent text-accent-foreground">0</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Processing Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-accent" />
            Processing Options
          </CardTitle>
          <CardDescription>Select data cleaning and normalization steps to apply</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {processingOptions.map((option) => (
              <div key={option.id} className="flex items-start space-x-3">
                <Checkbox
                  id={option.id}
                  checked={selectedOptions.includes(option.id)}
                  onCheckedChange={(checked) => handleOptionChange(option.id, checked as boolean)}
                />
                <div className="space-y-1">
                  <label htmlFor={option.id} className="text-sm font-medium cursor-pointer">
                    {option.label}
                  </label>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <Button onClick={processData} disabled={isProcessing || selectedOptions.length === 0} className="w-full">
              {isProcessing ? (
                "Processing Data..."
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Process Data ({selectedOptions.length} steps)
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Data Preview</CardTitle>
          <CardDescription>First 10 rows of your dataset</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(previewData[0] || {}).map((column) => (
                    <TableHead key={column}>{column}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewData.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, cellIndex) => (
                      <TableCell key={cellIndex} className="font-mono text-xs">
                        {String(value)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
