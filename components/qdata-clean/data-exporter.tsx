"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileText, Database, ImageIcon, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { DataFile } from "@/app/dashboard/qdata-clean/page"

interface DataExporterProps {
  file: DataFile
}

const exportFormats = [
  { value: "csv", label: "CSV", description: "Comma-separated values", icon: FileText },
  { value: "json", label: "JSON", description: "JavaScript Object Notation", icon: Database },
  { value: "xlsx", label: "Excel", description: "Microsoft Excel format", icon: ImageIcon },
  { value: "png", label: "PNG Chart", description: "Chart as PNG image", icon: ImageIcon },
]

const exportOptions = [
  { id: "include_metadata", label: "Include metadata", description: "Add processing information and timestamps" },
  { id: "include_statistics", label: "Include statistics", description: "Add statistical summary" },
  { id: "compress_output", label: "Compress output", description: "Create ZIP archive for large files" },
]

export function DataExporter({ file }: DataExporterProps) {
  const [exportFormat, setExportFormat] = useState("csv")
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["include_metadata"])
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const handleOptionChange = (optionId: string, checked: boolean) => {
    setSelectedOptions((prev) => (checked ? [...prev, optionId] : prev.filter((id) => id !== optionId)))
  }

  const generateFileName = () => {
    const timestamp = new Date().toISOString().split("T")[0]
    const baseName = file.name.replace(/\.[^/.]+$/, "")
    return `${baseName}_processed_${timestamp}.${exportFormat}`
  }

  const exportData = async () => {
    setIsExporting(true)

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    let exportContent = ""
    const fileName = generateFileName()

    switch (exportFormat) {
      case "csv":
        if (file.data.length > 0) {
          const headers = Object.keys(file.data[0])
          const csvHeaders = headers.join(",")
          const csvRows = file.data.map((row) => headers.map((header) => row[header]).join(","))
          exportContent = [csvHeaders, ...csvRows].join("\n")
        }
        break

      case "json":
        const exportData = {
          metadata: {
            originalFile: file.name,
            processedAt: new Date().toISOString(),
            recordCount: file.data.length,
            processed: file.processed,
          },
          data: file.data,
        }
        exportContent = JSON.stringify(exportData, null, 2)
        break

      case "xlsx":
        exportContent = "Excel export would be generated here"
        break

      case "png":
        exportContent = "Chart image would be generated here"
        break
    }

    // Create and download file
    const blob = new Blob([exportContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setIsExporting(false)

    toast({
      title: "Export Successful",
      description: `${fileName} has been downloaded to your device.`,
    })
  }

  const getFileSize = () => {
    const dataString = JSON.stringify(file.data)
    const sizeInBytes = new Blob([dataString]).size
    return (sizeInBytes / 1024).toFixed(1) + " KB"
  }

  return (
    <div className="space-y-6">
      {/* Export Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            Export Summary
          </CardTitle>
          <CardDescription>Review your processed data before export</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">File Name</div>
              <div className="font-medium">{file.name}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Records</div>
              <div className="font-medium">{file.data.length.toLocaleString()}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Size</div>
              <div className="font-medium">{getFileSize()}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Status</div>
              <Badge className="bg-accent text-accent-foreground">
                <CheckCircle className="h-3 w-3 mr-1" />
                Processed
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Export Configuration</CardTitle>
          <CardDescription>Choose your export format and options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Format Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Export Format</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exportFormats.map((format) => (
                <div
                  key={format.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    exportFormat === format.value ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setExportFormat(format.value)}
                >
                  <div className="flex items-center gap-3">
                    <format.icon className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{format.label}</div>
                      <div className="text-sm text-muted-foreground">{format.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Export Options</label>
            <div className="space-y-3">
              {exportOptions.map((option) => (
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
          </div>

          {/* Export Button */}
          <div className="pt-4 border-t">
            <Button onClick={exportData} disabled={isExporting} className="w-full" size="lg">
              {isExporting ? (
                "Exporting..."
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export as {exportFormat.toUpperCase()} ({generateFileName()})
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Export History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Exports</CardTitle>
          <CardDescription>Your recent data exports and downloads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">quantum_results_processed_2024-01-15.csv</div>
                  <div className="text-sm text-muted-foreground">Exported 2 hours ago • 1,247 records</div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Database className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">experiment_data_processed_2024-01-14.json</div>
                  <div className="text-sm text-muted-foreground">Exported yesterday • 856 records</div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
