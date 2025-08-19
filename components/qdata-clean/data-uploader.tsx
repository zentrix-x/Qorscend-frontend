"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, Database, CheckCircle, AlertCircle, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { DataFile } from "@/app/dashboard/qdata-clean/page"

interface DataUploaderProps {
  onFileUpload: (file: DataFile) => void
  uploadedFiles: DataFile[]
  onFileSelect: (file: DataFile) => void
}

export function DataUploader({ onFileUpload, uploadedFiles, onFileSelect }: DataUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const processFile = async (file: File): Promise<DataFile> => {
    const text = await file.text()
    let data: any[] = []

    try {
      if (file.name.endsWith(".json")) {
        const parsed = JSON.parse(text)
        data = Array.isArray(parsed) ? parsed : [parsed]
      } else if (file.name.endsWith(".csv")) {
        const lines = text.split("\n").filter((line) => line.trim())
        const headers = lines[0].split(",").map((h) => h.trim())
        data = lines.slice(1).map((line) => {
          const values = line.split(",").map((v) => v.trim())
          const obj: any = {}
          headers.forEach((header, index) => {
            obj[header] = values[index] || ""
          })
          return obj
        })
      }
    } catch (error) {
      throw new Error("Failed to parse file")
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      data,
      processed: false,
      uploadedAt: new Date(),
    }
  }

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const files = Array.from(e.dataTransfer.files)
      await handleFiles(files)
    },
    [onFileUpload],
  )

  const handleFileInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      await handleFiles(files)
    },
    [onFileUpload],
  )

  const handleFiles = async (files: File[]) => {
    for (const file of files) {
      if (!file.name.endsWith(".json") && !file.name.endsWith(".csv")) {
        toast({
          title: "Unsupported File Type",
          description: "Please upload JSON or CSV files only.",
          variant: "destructive",
        })
        continue
      }

      setIsUploading(true)
      setUploadProgress(0)

      try {
        // Simulate upload progress
        for (let i = 0; i <= 100; i += 10) {
          setUploadProgress(i)
          await new Promise((resolve) => setTimeout(resolve, 50))
        }

        const dataFile = await processFile(file)
        onFileUpload(dataFile)

        toast({
          title: "File Uploaded Successfully",
          description: `${file.name} has been processed and is ready for cleaning.`,
        })
      } catch (error) {
        toast({
          title: "Upload Failed",
          description: `Failed to process ${file.name}. Please check the file format.`,
          variant: "destructive",
        })
      } finally {
        setIsUploading(false)
        setUploadProgress(0)
      }
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Quantum Data
          </CardTitle>
          <CardDescription>
            Upload JSON or CSV files containing quantum experiment results for processing and analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Drop files here or click to browse</h3>
                <p className="text-sm text-muted-foreground">Supports JSON and CSV files up to 10MB</p>
              </div>
              <div className="flex justify-center gap-2">
                <Badge variant="outline">JSON</Badge>
                <Badge variant="outline">CSV</Badge>
              </div>
              <input
                type="file"
                multiple
                accept=".json,.csv"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <Button asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  Select Files
                </label>
              </Button>
            </div>
          </div>

          {isUploading && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading and processing...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-accent" />
              Uploaded Files
            </CardTitle>
            <CardDescription>Manage your uploaded quantum data files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => onFileSelect(file)}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{file.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatFileSize(file.size)} • {file.data.length} records • {file.uploadedAt.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.processed ? (
                      <Badge className="bg-accent text-accent-foreground">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Processed
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Raw
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
