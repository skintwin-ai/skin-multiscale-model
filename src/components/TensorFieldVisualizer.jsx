import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { 
  Network, 
  Zap, 
  Activity,
  ArrowUpDown,
  RotateCcw,
  Play,
  Pause
} from 'lucide-react'

const TensorFieldVisualizer = ({ parameters, activeScale }) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [couplingStrength, setCouplingStrength] = useState(50)
  const [fieldIntensity, setFieldIntensity] = useState(75)
  const [timeStep, setTimeStep] = useState(0)

  useEffect(() => {
    let interval
    if (isAnimating) {
      interval = setInterval(() => {
        setTimeStep(prev => (prev + 1) % 100)
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isAnimating])

  // Simulated tensor field data
  const generateTensorField = () => {
    const field = []
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        const x = (i - 10) / 10
        const y = (j - 10) / 10
        const intensity = Math.sin(x * 2 + timeStep * 0.1) * Math.cos(y * 2 + timeStep * 0.1) * fieldIntensity / 100
        field.push({
          x: i * 20 + 10,
          y: j * 20 + 10,
          intensity: intensity,
          direction: Math.atan2(y, x) + timeStep * 0.05
        })
      }
    }
    return field
  }

  const tensorField = generateTensorField()

  const tensorComponents = {
    molecular: {
      α: ['pH', 'Water Activity', 'Lipid Conc', 'Protein Conc', 'Ion Gradients', 'Temperature'],
      equations: [
        'Ξ^{molecular}_α = [c_lipid, c_protein, pH, a_w, ε, T]',
        '∂c_i/∂t = D_i∇²c_i + R_i(c_1,...,c_N)',
        'F[ψ] = ∫[½|∇ψ|² + f(ψ,T,c)]dx'
      ]
    },
    cellular: {
      β: ['Keratinocytes', 'Fibroblasts', 'Melanocytes', 'Differentiation', 'Proliferation', 'Migration', 'Apoptosis', 'Signaling'],
      equations: [
        'Ξ^{cellular}_β = [n_k, n_f, n_m, D, P, M, A, S]',
        '∂n_i/∂t = ∇·(D_i∇n_i) + r_i n_i(1-n_i/K_i) - δ_i n_i',
        '∂D/∂t = k[Ca²⁺]H([Ca²⁺] - θ) - γD'
      ]
    },
    tissue: {
      γ: ['Barrier Function', 'Elastic Modulus', 'Thickness', 'Vascular Density', 'Permeability'],
      equations: [
        'Ξ^{tissue}_γ = [B, E, h, V, κ]',
        '∇·σ + f = 0, σ = C:ε',
        'B = ∫ρ(z)κ(z)dz/∫ρ(z)dz'
      ]
    }
  }

  const couplingOperators = [
    {
      name: 'Molecular → Cellular',
      symbol: 'T^{↑}_{α→β}',
      description: 'Upward coupling from molecular to cellular scale',
      strength: couplingStrength * 0.8,
      equation: '∂Ξ^{cellular}/∂t|_coupling = ∫K^{α→β}(x,x\')Ξ^{molecular}(x\',t)dx\''
    },
    {
      name: 'Cellular → Tissue',
      symbol: 'T^{↑}_{β→γ}',
      description: 'Upward coupling from cellular to tissue scale',
      strength: couplingStrength * 0.6,
      equation: '∂Ξ^{tissue}/∂t|_coupling = F[⟨Ξ^{cellular}⟩_local]'
    },
    {
      name: 'Tissue → Cellular',
      symbol: 'T^{↓}_{γ→β}',
      description: 'Downward feedback from tissue to cellular scale',
      strength: couplingStrength * 0.4,
      equation: '∂Ξ^{cellular}/∂t|_feedback = -γ∇(σ_tissue·n_cell)'
    },
    {
      name: 'Cellular → Molecular',
      symbol: 'T^{↓}_{β→α}',
      description: 'Downward feedback from cellular to molecular scale',
      strength: couplingStrength * 0.3,
      equation: '∂Ξ^{molecular}/∂t|_feedback = -γ∇μ_tissue'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-3xl font-bold">Tensor Field Visualizer</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the mathematical foundation of the integumentary multiscale tensor field model Ξ^{'{'}skin{'}'}_αβγ
        </p>
      </motion.div>

      {/* Master Equation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Network className="w-5 h-5" />
            <span>Master Equation</span>
          </CardTitle>
          <CardDescription>
            The complete system evolution equation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
            <div className="text-center text-lg font-bold">
              ∂Ξ^{'{'}skin{'}'}/∂t = L_molecular Ξ^{'{'}molecular{'}'} + L_cellular Ξ^{'{'}cellular{'}'} + L_tissue Ξ^{'{'}tissue{'}'}
            </div>
            <div className="text-center">
              + T^{'{'}↑{'}'}_{'{'}α→β{'}'} + T^{'{'}↑{'}'}_{'{'}β→γ{'}'} + T^{'{'}↓{'}'}_{'{'}γ→β{'}'} + T^{'{'}↓{'}'}_{'{'}β→α{'}'}
            </div>
            <div className="text-center">
              + Γ_cross[Ξ^{'{'}molecular{'}'}, Ξ^{'{'}cellular{'}'}, Ξ^{'{'}tissue{'}'}]
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tensor Field Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Field Dynamics</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsAnimating(!isAnimating)}
                >
                  {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTimeStep(0)}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              Real-time tensor field evolution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-80 bg-slate-50 dark:bg-slate-800 rounded-lg overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 400 400">
                {/* Grid */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Tensor field vectors */}
                {tensorField.map((point, index) => (
                  <g key={index}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={Math.abs(point.intensity) * 3 + 1}
                      fill={point.intensity > 0 ? '#3b82f6' : '#ef4444'}
                      opacity={0.6}
                    />
                    <line
                      x1={point.x}
                      y1={point.y}
                      x2={point.x + Math.cos(point.direction) * Math.abs(point.intensity) * 10}
                      y2={point.y + Math.sin(point.direction) * Math.abs(point.intensity) * 10}
                      stroke={point.intensity > 0 ? '#3b82f6' : '#ef4444'}
                      strokeWidth="1"
                      markerEnd="url(#arrowhead)"
                    />
                  </g>
                ))}
                
                {/* Arrow marker */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                          refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                  </marker>
                </defs>
              </svg>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Field Intensity</label>
                <Slider
                  value={[fieldIntensity]}
                  onValueChange={(value) => setFieldIntensity(value[0])}
                  max={100}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Coupling Strength</label>
                <Slider
                  value={[couplingStrength]}
                  onValueChange={(value) => setCouplingStrength(value[0])}
                  max={100}
                  step={1}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tensor Components */}
        <Card>
          <CardHeader>
            <CardTitle>Tensor Components</CardTitle>
            <CardDescription>
              Scale-specific tensor field components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(tensorComponents).map(([scale, data]) => (
              <motion.div
                key={scale}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-lg border ${
                  activeScale === scale ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200' : 'bg-muted'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold capitalize">{scale} Scale</h4>
                  <Badge variant="outline">
                    Ξ^{'{' + scale + '}'}_{Object.keys(data)[0]}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>Components:</strong> {data[Object.keys(data)[0]].join(', ')}
                  </div>
                  
                  <div className="space-y-1">
                    {data.equations.map((eq, index) => (
                      <div key={index} className="text-xs font-mono bg-white dark:bg-slate-800 p-2 rounded">
                        {eq}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Coupling Operators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowUpDown className="w-5 h-5" />
            <span>Coupling Operators</span>
          </CardTitle>
          <CardDescription>
            Cross-scale interaction mechanisms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {couplingOperators.map((operator, index) => (
              <motion.div
                key={operator.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-4 border rounded-lg space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{operator.name}</h4>
                  <Badge variant="outline">{operator.symbol}</Badge>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${operator.strength}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                </div>
                
                <p className="text-sm text-muted-foreground">{operator.description}</p>
                
                <div className="text-xs font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded">
                  {operator.equation}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Phase Space */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Phase Space Dynamics</span>
          </CardTitle>
          <CardDescription>
            System trajectories and attractors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Homeostatic Attractor</h4>
              <div className="w-full h-32 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 to-green-800 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-green-600 rounded-full animate-pulse" />
              </div>
              <p className="text-xs text-muted-foreground">Stable equilibrium state</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">Perturbation Response</h4>
              <div className="w-full h-32 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 to-orange-800 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-orange-600 rounded-full animate-bounce" />
              </div>
              <p className="text-xs text-muted-foreground">Transient dynamics</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">Pathological State</h4>
              <div className="w-full h-32 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900 to-red-800 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-red-600 rounded-full animate-ping" />
              </div>
              <p className="text-xs text-muted-foreground">Unstable attractor</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TensorFieldVisualizer

