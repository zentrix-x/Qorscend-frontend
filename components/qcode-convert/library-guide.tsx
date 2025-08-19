import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Book, Code, Zap } from "lucide-react"

const libraries = [
  {
    name: "Qiskit",
    description: "IBM's open-source quantum computing framework",
    version: "0.45.0",
    features: ["Circuit construction", "Quantum algorithms", "Hardware backends", "Visualization tools"],
    docs: "https://qiskit.org/documentation/",
    popularity: "High",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    name: "Cirq",
    description: "Google's quantum computing framework for NISQ circuits",
    version: "1.3.0",
    features: ["NISQ circuits", "Quantum simulators", "Hardware integration", "Optimization tools"],
    docs: "https://quantumai.google/cirq",
    popularity: "High",
    color: "bg-green-500/10 text-green-500",
  },
  {
    name: "Amazon Braket",
    description: "AWS quantum computing service with multiple backends",
    version: "1.73.0",
    features: ["Cloud quantum computing", "Multiple backends", "Hybrid algorithms", "Cost optimization"],
    docs: "https://docs.aws.amazon.com/braket/",
    popularity: "Medium",
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    name: "PennyLane",
    description: "Quantum machine learning library with automatic differentiation",
    version: "0.33.0",
    features: ["Quantum ML", "Automatic differentiation", "Hybrid computing", "Optimization"],
    docs: "https://pennylane.ai/",
    popularity: "Medium",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    name: "PyQuil",
    description: "Rigetti's quantum programming language and toolkit",
    version: "4.5.0",
    features: ["Quantum programming", "Forest SDK", "Quantum compilers", "Hardware access"],
    docs: "https://pyquil-docs.rigetti.com/",
    popularity: "Low",
    color: "bg-red-500/10 text-red-500",
  },
]

export function LibraryGuide() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5 text-primary" />
            Quantum Library Guide
          </CardTitle>
          <CardDescription>Learn about supported quantum computing libraries and their key features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {libraries.map((library) => (
              <Card key={library.name} className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{library.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        v{library.version}
                      </Badge>
                      <Badge className={library.color}>{library.popularity}</Badge>
                    </div>
                  </div>
                  <CardDescription>{library.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Key Features
                    </h4>
                    <ul className="space-y-1">
                      {library.features.map((feature, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Code className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={library.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      Documentation
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
