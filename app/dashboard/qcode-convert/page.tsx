"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CodeConverter } from "@/components/qcode-convert/code-converter"
import { ConversionHistory } from "@/components/qcode-convert/conversion-history"
import { LibraryGuide } from "@/components/qcode-convert/library-guide"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function QCodeConvertPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">QCode Convert™</h1>
          <p className="text-muted-foreground">
            Convert quantum code between different Python libraries with intelligent transpilation.
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="converter" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="converter">Code Converter</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="guide">Library Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="converter" className="space-y-6">
            <CodeConverter />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <ConversionHistory />
          </TabsContent>

          <TabsContent value="guide" className="space-y-6">
            <LibraryGuide />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
