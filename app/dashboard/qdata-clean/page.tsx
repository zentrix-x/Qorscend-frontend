"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DataUploader } from "@/components/qdata-clean/data-uploader"
import { DataProcessor } from "@/components/qdata-clean/data-processor"
import { DataVisualizer } from "@/components/qdata-clean/data-visualizer"
import { DataExporter } from "@/components/qdata-clean/data-exporter"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export interface DataFile {
  id: string
  name: string
  type: string
  size: number
  data: any[]
  processed: boolean
  uploadedAt: Date
}

export default function QDataCleanPage() {
  const [uploadedFiles, setUploadedFiles] = useState<DataFile[]>([])
  const [activeFile, setActiveFile] = useState<DataFile | null>(null)

  const handleFileUpload = (file: DataFile) => {
    setUploadedFiles((prev) => [...prev, file])
    setActiveFile(file)
  }

  const handleFileProcess = (processedFile: DataFile) => {
    setUploadedFiles((prev) => prev.map((f) => (f.id === processedFile.id ? processedFile : f)))
    setActiveFile(processedFile)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">QData Clean™</h1>
          <p className="text-muted-foreground">
            Upload, clean, normalize, and visualize quantum experiment data with powerful analytics tools.
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload">Upload Data</TabsTrigger>
            <TabsTrigger value="process" disabled={!activeFile}>
              Process & Clean
            </TabsTrigger>
            <TabsTrigger value="visualize" disabled={!activeFile?.processed}>
              Visualize
            </TabsTrigger>
            <TabsTrigger value="export" disabled={!activeFile?.processed}>
              Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <DataUploader onFileUpload={handleFileUpload} uploadedFiles={uploadedFiles} onFileSelect={setActiveFile} />
          </TabsContent>

          <TabsContent value="process" className="space-y-6">
            {activeFile && <DataProcessor file={activeFile} onProcess={handleFileProcess} />}
          </TabsContent>

          <TabsContent value="visualize" className="space-y-6">
            {activeFile && <DataVisualizer file={activeFile} />}
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            {activeFile && <DataExporter file={activeFile} />}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
