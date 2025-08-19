"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Copy, ArrowRight, Zap, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const libraries = [
  { value: "qiskit", label: "Qiskit", description: "IBM's quantum computing framework" },
  { value: "cirq", label: "Cirq", description: "Google's quantum computing framework" },
  { value: "braket", label: "Amazon Braket", description: "AWS quantum computing service" },
  { value: "pennylane", label: "PennyLane", description: "Quantum machine learning library" },
  { value: "pyquil", label: "PyQuil", description: "Rigetti's quantum programming language" },
]

const exampleCode = {
  qiskit: `from qiskit import QuantumCircuit, execute, Aer
from qiskit.visualization import plot_histogram

# Create a quantum circuit
qc = QuantumCircuit(2, 2)
qc.h(0)  # Hadamard gate on qubit 0
qc.cx(0, 1)  # CNOT gate
qc.measure_all()

# Execute the circuit
backend = Aer.get_backend('qasm_simulator')
job = execute(qc, backend, shots=1024)
result = job.result()
counts = result.get_counts(qc)
print(counts)`,
  cirq: `import cirq
import numpy as np

# Create qubits
q0, q1 = cirq.LineQubit.range(2)

# Create a circuit
circuit = cirq.Circuit()
circuit.append(cirq.H(q0))  # Hadamard gate
circuit.append(cirq.CNOT(q0, q1))  # CNOT gate
circuit.append(cirq.measure(q0, q1, key='result'))

# Simulate the circuit
simulator = cirq.Simulator()
result = simulator.run(circuit, repetitions=1024)
print(result.histogram(key='result'))`,
}

export function CodeConverter() {
  const [sourceLibrary, setSourceLibrary] = useState("")
  const [targetLibrary, setTargetLibrary] = useState("")
  const [inputCode, setInputCode] = useState("")
  const [outputCode, setOutputCode] = useState("")
  const [isConverting, setIsConverting] = useState(false)
  const [conversionStatus, setConversionStatus] = useState<"idle" | "success" | "error">("idle")
  const { toast } = useToast()

  const handleConvert = async () => {
    if (!sourceLibrary || !targetLibrary || !inputCode.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select source and target libraries and provide input code.",
        variant: "destructive",
      })
      return
    }

    setIsConverting(true)
    setConversionStatus("idle")

    // Simulate conversion process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock conversion result
    const mockConvertedCode = `# Converted from ${sourceLibrary} to ${targetLibrary}
${exampleCode[targetLibrary as keyof typeof exampleCode] || "# Conversion completed"}

# Original code structure preserved
# Quantum gates and measurements translated
# Backend configuration updated for ${targetLibrary}`

    setOutputCode(mockConvertedCode)
    setConversionStatus("success")
    setIsConverting(false)

    toast({
      title: "Conversion Successful",
      description: `Code successfully converted from ${sourceLibrary} to ${targetLibrary}`,
    })
  }

  const handleCopyOutput = async () => {
    if (outputCode) {
      await navigator.clipboard.writeText(outputCode)
      toast({
        title: "Copied to Clipboard",
        description: "Converted code has been copied to your clipboard.",
      })
    }
  }

  const loadExample = (library: string) => {
    const example = exampleCode[library as keyof typeof exampleCode]
    if (example) {
      setInputCode(example)
      setSourceLibrary(library)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Source Code
          </CardTitle>
          <CardDescription>Paste your quantum code and select the source library</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Source Library</label>
            <Select value={sourceLibrary} onValueChange={setSourceLibrary}>
              <SelectTrigger>
                <SelectValue placeholder="Select source library" />
              </SelectTrigger>
              <SelectContent>
                {libraries.map((lib) => (
                  <SelectItem key={lib.value} value={lib.value}>
                    <div className="flex flex-col">
                      <span>{lib.label}</span>
                      <span className="text-xs text-muted-foreground">{lib.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Target Library</label>
            <Select value={targetLibrary} onValueChange={setTargetLibrary}>
              <SelectTrigger>
                <SelectValue placeholder="Select target library" />
              </SelectTrigger>
              <SelectContent>
                {libraries.map((lib) => (
                  <SelectItem key={lib.value} value={lib.value}>
                    <div className="flex flex-col">
                      <span>{lib.label}</span>
                      <span className="text-xs text-muted-foreground">{lib.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Input Code</label>
              <div className="flex gap-2">
                {Object.keys(exampleCode).map((lib) => (
                  <Button key={lib} variant="outline" size="sm" onClick={() => loadExample(lib)} className="text-xs">
                    {lib}
                  </Button>
                ))}
              </div>
            </div>
            <Textarea
              placeholder="Paste your quantum code here..."
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
          </div>

          <Button onClick={handleConvert} disabled={isConverting} className="w-full">
            {isConverting ? (
              "Converting..."
            ) : (
              <>
                Convert Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-accent" />
            Converted Code
            {conversionStatus === "success" && <Badge className="bg-accent text-accent-foreground">Success</Badge>}
            {conversionStatus === "error" && <Badge variant="destructive">Error</Badge>}
          </CardTitle>
          <CardDescription>Your converted quantum code ready to use</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Output Code</label>
              {outputCode && (
                <Button variant="outline" size="sm" onClick={handleCopyOutput}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              )}
            </div>
            <Textarea
              placeholder="Converted code will appear here..."
              value={outputCode}
              readOnly
              className="min-h-[300px] font-mono text-sm bg-muted/50"
            />
          </div>

          {conversionStatus === "success" && (
            <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="flex items-center gap-2 text-accent">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Conversion Complete</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Code has been successfully converted and is ready to use in your target environment.
              </p>
            </div>
          )}

          {conversionStatus === "error" && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Conversion Error</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Unable to convert the code. Please check your input and try again.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
