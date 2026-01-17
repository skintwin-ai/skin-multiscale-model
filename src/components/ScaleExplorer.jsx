import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { 
  Atom, 
  Microscope, 
  Layers, 
  Network,
  ArrowUpDown,
  Zap,
  Timer,
  BarChart3
} from 'lucide-react'

const ScaleExplorer = ({ activeScale, setActiveScale, scales, parameters }) => {
  const [zoomLevel, setZoomLevel] = useState(50)
  const [timeScale, setTimeScale] = useState(1)

  const scaleData = {
    molecular: {
      components: [
        { name: 'Lipid Bilayers', value: 85, description: 'Ceramides, cholesterol, free fatty acids' },
        { name: 'Protein Structures', value: 72, description: 'Filaggrin, loricrin, involucrin' },
        { name: 'Ion Gradients', value: 68, description: 'Ca²⁺, K⁺, Na⁺ concentration fields' },
        { name: 'pH Fields', value: 91, description: 'Acid mantle and buffering systems' },
        { name: 'Water Activity', value: 76, description: 'Hydration and osmotic balance' },
        { name: 'Enzyme Activity', value: 83, description: 'Metabolic and signaling enzymes' }
      ],
      processes: [
        'Molecular diffusion (D ~ 10⁻¹² m²/s)',
        'Enzyme kinetics (τ ~ 10⁻³ s)',
        'Phase transitions (ΔG ~ kT)',
        'Binding interactions (Kd ~ 10⁻⁹ M)'
      ],
      equations: [
        '∂c/∂t = D∇²c + R(c)',
        'v = kcat[E][S]/(Km + [S])',
        'F = ∫[½|∇ψ|² + f(ψ,T)]dx'
      ]
    },
    cellular: {
      components: [
        { name: 'Keratinocytes', value: 94, description: 'Primary epidermal cells' },
        { name: 'Fibroblasts', value: 78, description: 'Dermal matrix producers' },
        { name: 'Melanocytes', value: 65, description: 'Pigment-producing cells' },
        { name: 'Differentiation', value: 82, description: 'Cell maturation state' },
        { name: 'Proliferation', value: 71, description: 'Cell division rate' },
        { name: 'Migration', value: 59, description: 'Cell movement velocity' },
        { name: 'Apoptosis', value: 43, description: 'Programmed cell death' },
        { name: 'Signaling', value: 88, description: 'Intercellular communication' }
      ],
      processes: [
        'Cell cycle progression (τ ~ 24 h)',
        'Differentiation cascades (τ ~ 2-14 days)',
        'Signal transduction (τ ~ min-hours)',
        'Migration dynamics (v ~ μm/h)'
      ],
      equations: [
        '∂n/∂t = D∇²n + rn(1-n/K) - δn',
        '∂D/∂t = k[Ca²⁺]H([Ca²⁺]-θ) - γD',
        'v = χ∇c - μ∇p'
      ]
    },
    tissue: {
      components: [
        { name: 'Barrier Function', value: 89, description: 'TEWL and permeability' },
        { name: 'Mechanical Properties', value: 76, description: 'Elasticity and strength' },
        { name: 'Thickness', value: 82, description: 'Epidermal and dermal layers' },
        { name: 'Vascularization', value: 67, description: 'Blood vessel density' },
        { name: 'Innervation', value: 71, description: 'Nerve fiber distribution' }
      ],
      processes: [
        'Tissue remodeling (τ ~ weeks-months)',
        'Barrier maturation (τ ~ 2-4 weeks)',
        'Mechanical adaptation (τ ~ days-weeks)',
        'Wound healing (τ ~ days-months)'
      ],
      equations: [
        '∇·σ + f = 0',
        'B = ∫ρ(z)κ(z)dz/∫ρ(z)dz',
        '∂h/∂t = G(stress, nutrients) - L(damage)'
      ]
    },
    organ: {
      components: [
        { name: 'Regional Variation', value: 73, description: 'Site-specific properties' },
        { name: 'Systemic Integration', value: 68, description: 'Whole-body coordination' },
        { name: 'Environmental Response', value: 81, description: 'Adaptation to conditions' },
        { name: 'Circadian Rhythms', value: 79, description: 'Daily physiological cycles' },
        { name: 'Immune Integration', value: 85, description: 'Immune system coupling' }
      ],
      processes: [
        'Circadian regulation (τ ~ 24 h)',
        'Seasonal adaptation (τ ~ months)',
        'Aging processes (τ ~ years-decades)',
        'Environmental responses (τ ~ hours-days)'
      ],
      equations: [
        'dΦ/dt = ω + K∑sin(Φj - Φi)',
        '∂T/∂t = α∇²T + Q(metabolism)',
        'R = f(UV, pollution, climate)'
      ]
    }
  }

  const currentScale = scales.find(s => s.id === activeScale)
  const currentData = scaleData[activeScale]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-3xl font-bold">Scale Explorer</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Dive deep into each scale of the integumentary system and understand the specific components and processes
        </p>
      </motion.div>

      {/* Scale Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {scales.map((scale) => (
          <motion.div
            key={scale.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`cursor-pointer transition-all ${
                activeScale === scale.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setActiveScale(scale.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-10 h-10 ${scale.color} rounded-lg flex items-center justify-center`}>
                    <scale.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{scale.name}</h4>
                    <p className="text-xs text-muted-foreground">{scale.range}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{scale.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Current Scale Details */}
      <motion.div
        key={activeScale}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Components */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <currentScale.icon className="w-5 h-5" />
              <span>Components</span>
            </CardTitle>
            <CardDescription>
              Key components at the {currentScale.name.toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentData.components.map((component, index) => (
              <motion.div
                key={component.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{component.name}</span>
                  <Badge variant="outline">{component.value}%</Badge>
                </div>
                <Progress value={component.value} className="h-2" />
                <p className="text-xs text-muted-foreground">{component.description}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Processes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Timer className="w-5 h-5" />
              <span>Processes</span>
            </CardTitle>
            <CardDescription>
              Key processes and their characteristic time scales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentData.processes.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-3 bg-muted rounded-lg"
              >
                <p className="text-sm">{process}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Mathematical Framework */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Equations</span>
            </CardTitle>
            <CardDescription>
              Mathematical descriptions of scale dynamics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentData.equations.map((equation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono text-sm"
              >
                {equation}
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Interactive Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Interactive Controls</span>
          </CardTitle>
          <CardDescription>
            Adjust visualization parameters for the {currentScale.name.toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium">Zoom Level</label>
              <Slider
                value={[zoomLevel]}
                onValueChange={(value) => setZoomLevel(value[0])}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Current zoom: {zoomLevel}% (Resolution: {(zoomLevel * 0.01 * parseFloat(currentScale.range.split(' ')[0].replace('10⁻', '1e-'))).toExponential(2)} m)
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Time Scale Factor</label>
              <Slider
                value={[timeScale]}
                onValueChange={(value) => setTimeScale(value[0])}
                min={0.1}
                max={10}
                step={0.1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Time factor: {timeScale}x (Effective time scale: {(timeScale * 1e-3).toExponential(2)} s)
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowUpDown className="w-4 h-4" />
              <span>Compare Scales</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Simulate Perturbation</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cross-Scale Coupling Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Cross-Scale Coupling</CardTitle>
          <CardDescription>
            How the {currentScale.name.toLowerCase()} interacts with other scales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scales.filter(s => s.id !== activeScale).map((scale) => {
              const couplingStrength = Math.random() * 100 // Simulated coupling strength
              return (
                <div key={scale.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <scale.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{scale.name}</span>
                    </div>
                    <Badge variant="outline">{couplingStrength.toFixed(0)}%</Badge>
                  </div>
                  <Progress value={couplingStrength} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ScaleExplorer

