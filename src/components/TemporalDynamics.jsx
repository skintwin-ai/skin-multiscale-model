import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { 
  Timer, 
  Play, 
  Pause,
  RotateCcw,
  Zap,
  TrendingUp,
  Activity,
  BarChart3
} from 'lucide-react'

const TemporalDynamics = ({ parameters, scales }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [timeScale, setTimeScale] = useState(1)
  const [perturbationType, setPerturbationType] = useState('none')
  const [perturbationStrength, setPerturbationStrength] = useState(50)
  const [simulationData, setSimulationData] = useState([])

  const timeScales = {
    molecular: { min: 1e-15, max: 1e-3, characteristic: 1e-9, color: '#3b82f6' },
    cellular: { min: 1e-3, max: 1e5, characteristic: 1e3, color: '#f97316' },
    tissue: { min: 1e5, max: 1e8, characteristic: 1e6, color: '#22c55e' },
    organ: { min: 1e6, max: 1e9, characteristic: 1e7, color: '#a855f7' }
  }

  const perturbationTypes = [
    { id: 'none', name: 'No Perturbation', description: 'Baseline dynamics' },
    { id: 'uv_damage', name: 'UV Damage', description: 'Ultraviolet radiation exposure' },
    { id: 'chemical_irritant', name: 'Chemical Irritant', description: 'Harsh chemical exposure' },
    { id: 'mechanical_stress', name: 'Mechanical Stress', description: 'Physical deformation' },
    { id: 'temperature_shock', name: 'Temperature Shock', description: 'Rapid temperature change' },
    { id: 'dehydration', name: 'Dehydration', description: 'Water loss stress' }
  ]

  // Simulate temporal evolution
  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + timeScale)
        
        // Generate simulation data
        const newDataPoint = generateDataPoint(currentTime)
        setSimulationData(prev => [...prev.slice(-99), newDataPoint])
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, timeScale, currentTime, perturbationType, perturbationStrength])

  const generateDataPoint = (time) => {
    const perturbation = getPerturbationEffect(time)
    
    return {
      time: time,
      molecular: {
        diffusion: Math.sin(time * 0.001) * 0.1 + 1 + perturbation.molecular * 0.3,
        reaction: Math.cos(time * 0.002) * 0.15 + 1 + perturbation.molecular * 0.2,
        binding: Math.sin(time * 0.0015 + Math.PI/4) * 0.08 + 1 + perturbation.molecular * 0.1
      },
      cellular: {
        proliferation: Math.sin(time * 0.0001) * 0.2 + 1 + perturbation.cellular * 0.4,
        differentiation: Math.cos(time * 0.00015) * 0.18 + 1 + perturbation.cellular * 0.3,
        migration: Math.sin(time * 0.00012 + Math.PI/3) * 0.12 + 1 + perturbation.cellular * 0.2
      },
      tissue: {
        barrier: Math.sin(time * 0.00001) * 0.25 + 1 + perturbation.tissue * 0.5,
        elasticity: Math.cos(time * 0.000008) * 0.2 + 1 + perturbation.tissue * 0.3,
        thickness: Math.sin(time * 0.000012 + Math.PI/6) * 0.15 + 1 + perturbation.tissue * 0.2
      },
      coupling: {
        molecular_cellular: parameters.coupling.molecular_cellular * (1 + Math.sin(time * 0.0005) * 0.1),
        cellular_tissue: parameters.coupling.cellular_tissue * (1 + Math.cos(time * 0.0003) * 0.1),
        feedback: parameters.coupling.feedback_strength * (1 + Math.sin(time * 0.0008) * 0.05)
      }
    }
  }

  const getPerturbationEffect = (time) => {
    if (perturbationType === 'none') {
      return { molecular: 0, cellular: 0, tissue: 0 }
    }

    const strength = perturbationStrength / 100
    const perturbationStart = 1000
    const perturbationDuration = 500

    if (time < perturbationStart || time > perturbationStart + perturbationDuration) {
      return { molecular: 0, cellular: 0, tissue: 0 }
    }

    const progress = (time - perturbationStart) / perturbationDuration
    const envelope = Math.sin(progress * Math.PI) // Bell curve

    switch (perturbationType) {
      case 'uv_damage':
        return {
          molecular: envelope * strength * 0.8,
          cellular: envelope * strength * 0.6,
          tissue: envelope * strength * 0.4
        }
      case 'chemical_irritant':
        return {
          molecular: envelope * strength * 1.0,
          cellular: envelope * strength * 0.8,
          tissue: envelope * strength * 0.3
        }
      case 'mechanical_stress':
        return {
          molecular: envelope * strength * 0.2,
          cellular: envelope * strength * 0.5,
          tissue: envelope * strength * 1.0
        }
      case 'temperature_shock':
        return {
          molecular: envelope * strength * 0.9,
          cellular: envelope * strength * 0.4,
          tissue: envelope * strength * 0.2
        }
      case 'dehydration':
        return {
          molecular: envelope * strength * 0.6,
          cellular: envelope * strength * 0.7,
          tissue: envelope * strength * 0.8
        }
      default:
        return { molecular: 0, cellular: 0, tissue: 0 }
    }
  }

  const formatTime = (time) => {
    if (time < 1e-6) return `${(time * 1e9).toFixed(1)} ns`
    if (time < 1e-3) return `${(time * 1e6).toFixed(1)} μs`
    if (time < 1) return `${(time * 1e3).toFixed(1)} ms`
    if (time < 60) return `${time.toFixed(1)} s`
    if (time < 3600) return `${(time / 60).toFixed(1)} min`
    if (time < 86400) return `${(time / 3600).toFixed(1)} h`
    return `${(time / 86400).toFixed(1)} days`
  }

  const resetSimulation = () => {
    setCurrentTime(0)
    setSimulationData([])
    setIsPlaying(false)
  }

  const currentData = simulationData[simulationData.length - 1]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-3xl font-bold">Temporal Dynamics</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore how the multiscale system evolves over time and responds to perturbations
        </p>
      </motion.div>

      {/* Simulation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Timer className="w-5 h-5" />
            <span>Simulation Controls</span>
          </CardTitle>
          <CardDescription>
            Control the temporal evolution simulation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center space-x-2"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={resetSimulation}
                  className="flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </Button>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Time</label>
                <div className="text-2xl font-bold text-blue-600">
                  {formatTime(currentTime)}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Scale Factor</label>
                <Slider
                  value={[Math.log10(timeScale)]}
                  onValueChange={(value) => setTimeScale(Math.pow(10, value[0]))}
                  min={-2}
                  max={3}
                  step={0.1}
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground">
                  {timeScale.toExponential(1)}x speed
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Perturbation Type</label>
                <select
                  value={perturbationType}
                  onChange={(e) => setPerturbationType(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {perturbationTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {perturbationType !== 'none' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Perturbation Strength</label>
                  <Slider
                    value={[perturbationStrength]}
                    onValueChange={(value) => setPerturbationStrength(value[0])}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground">
                    {perturbationStrength}% intensity
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Scale Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Time Scale Hierarchy</span>
          </CardTitle>
          <CardDescription>
            Characteristic time scales across different levels of organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(timeScales).map(([scale, data]) => {
              const scaleInfo = scales.find(s => s.id === scale) || { name: scale, icon: Timer }
              const isActive = currentTime >= data.min && currentTime <= data.max
              
              return (
                <motion.div
                  key={scale}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-lg border ${
                    isActive ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200' : 'bg-muted'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center`} style={{ backgroundColor: data.color }}>
                        <scaleInfo.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold capitalize">{scale} Scale</h4>
                        <p className="text-xs text-muted-foreground">
                          {formatTime(data.min)} - {formatTime(data.max)}
                        </p>
                      </div>
                    </div>
                    <Badge variant={isActive ? "default" : "outline"}>
                      τ = {formatTime(data.characteristic)}
                    </Badge>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        backgroundColor: data.color,
                        width: isActive ? '100%' : '20%',
                        opacity: isActive ? 1 : 0.3
                      }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>System State</span>
            </CardTitle>
            <CardDescription>
              Current values across all scales
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentData && (
              <div className="space-y-4">
                {Object.entries(currentData).filter(([key]) => key !== 'time').map(([scale, values]) => (
                  <div key={scale} className="space-y-2">
                    <h4 className="font-semibold capitalize">{scale} Scale</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(values).map(([param, value]) => (
                        <div key={param} className="flex justify-between">
                          <span className="capitalize">{param.replace('_', ' ')}:</span>
                          <span className="font-medium">{value.toFixed(3)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Trajectory Visualization</span>
            </CardTitle>
            <CardDescription>
              System evolution over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-64 bg-slate-50 dark:bg-slate-800 rounded-lg overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 400 250">
                {/* Grid */}
                <defs>
                  <pattern id="timeGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#timeGrid)" />
                
                {/* Time series data */}
                {simulationData.length > 1 && (
                  <>
                    {/* Molecular scale */}
                    <polyline
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      points={simulationData.map((d, i) => 
                        `${(i / simulationData.length) * 400},${125 - d.molecular.diffusion * 50}`
                      ).join(' ')}
                    />
                    
                    {/* Cellular scale */}
                    <polyline
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="2"
                      points={simulationData.map((d, i) => 
                        `${(i / simulationData.length) * 400},${125 - d.cellular.proliferation * 50}`
                      ).join(' ')}
                    />
                    
                    {/* Tissue scale */}
                    <polyline
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                      points={simulationData.map((d, i) => 
                        `${(i / simulationData.length) * 400},${125 - d.tissue.barrier * 50}`
                      ).join(' ')}
                    />
                  </>
                )}
                
                {/* Current time indicator */}
                <line
                  x1={simulationData.length > 0 ? 400 : 0}
                  y1="0"
                  x2={simulationData.length > 0 ? 400 : 0}
                  y2="250"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </svg>
            </div>
            
            <div className="mt-4 flex justify-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Molecular</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span>Cellular</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Tissue</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Perturbation Analysis */}
      {perturbationType !== 'none' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Perturbation Analysis</span>
            </CardTitle>
            <CardDescription>
              Response to {perturbationTypes.find(p => p.id === perturbationType)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Recovery Time</h4>
                <div className="text-2xl font-bold text-blue-600">
                  {formatTime(500 / timeScale)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Time to return to baseline
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Max Deviation</h4>
                <div className="text-2xl font-bold text-orange-600">
                  {(perturbationStrength * 0.8).toFixed(0)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Peak response amplitude
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Resilience</h4>
                <div className="text-2xl font-bold text-green-600">
                  {(100 - perturbationStrength * 0.3).toFixed(0)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  System stability measure
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default TemporalDynamics

