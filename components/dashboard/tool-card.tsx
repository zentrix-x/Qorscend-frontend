import type React from "react"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check } from "lucide-react"

interface ToolCardProps {
  title: string
  description: string
  icon: React.ReactNode
  features: string[]
  href: string
  status: string
  statusColor: string
}

export function ToolCard({ title, description, icon, features, href, status, statusColor }: ToolCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <Badge variant="secondary" className={statusColor}>
                {status}
              </Badge>
            </div>
          </div>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-accent" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
          <Link href={href} className="flex items-center gap-2">
            Launch Tool
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
