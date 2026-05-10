import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { 
  Settings, 
  RotateCcw, 
  Save,
  Upload,
  Download,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Activity
} from 'lucide-react'

const ParameterController = ({ parameters, setParameters, scales }) => {
  const [presetName, setPresetName] = useState('')
  const [validationResults, setValidationResults] = useState(null)
  const fileInputRef = React.useRef(null)

  const saveParameters = () => {
    const data = JSON.stringify(parameters, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'skin-model-parameters.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const loadParameters = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result)
        setParameters(parsed)
      } catch {
        alert('Invalid parameter file. Please upload a valid JSON file.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const computeStability = () => {
    const { barrier_strength } = parameters.tissue
    const { molecular_cellular, cellular_tissue, feedback_strength } = parameters.coupling
    const totalCoupling = molecular_cellular + cellular_tissue + feedback_strength
    // High barrier strength and moderate coupling maximise stability
    const stabilityScore = barrier_strength * 65 + Math.max(0, (0.5 - totalCoupling)) * 50
    return Math.round(Math.min(100, Math.max(0, stabilityScore)))
  }

  const parameterDefinitions = {
    molecular: {
      diffusion: {
        name: 'Diffusion Coefficient',
        description: 'Molecular diffusion rate in lipid matrix',
        unit: 'm²/s',
        min: 1e-15,
        max: 1e-8,
        default: 1e-10,
        scientific: true
      },
      reaction_rate: {
        name: 'Reaction Rate',
        description: 'Enzyme kinetics and chemical reaction rates',
        unit: 's⁻¹',
        min: 1e-8,
        max: 1e-2,
        default: 1e-4,
        scientific: true
      },
      binding_affinity: {
        name: 'Binding Affinity',
        description: 'Protein-ligand and receptor binding strength',
        unit: 'M',
        min: 1e-12,
        max: 1e-3,
        default: 1e-7,
        scientific: true
      }
    },
    cellular: {
      growth_rate: {
        name: 'Growth Rate',
        description: 'Cell proliferation and division rate',
        unit: 's⁻¹',
        min: 1e-8,
        max: 1e-3,
        default: 1e-5,
        scientific: true
      },
      death_rate: {
        name: 'Death Rate',
        description: 'Apoptosis and cell death rate',
        unit: 's⁻¹',
        min: 1e-9,
        max: 1e-4,
        default: 1e-6,
        scientific: true
      },
      migration_rate: {
        name: 'Migration Rate',
        description: 'Cell movement and motility',
        unit: 'm/s',
        min: 1e-10,
        max: 1e-5,
        default: 1e-7,
        scientific: true
      }
    },
    tissue: {
      elastic_modulus: {
        name: 'Elastic Modulus',
        description: 'Tissue mechanical stiffness',
        unit: 'Pa',
        min: 1e3,
        max: 1e7,
        default: 1e5,
        scientific: false
      },
      permeability: {
        name: 'Permeability',
        description: 'Barrier permeability coefficient',
        unit: 'm/s',
        min: 1e-18,
        max: 1e-10,
        default: 1e-13,
        scientific: true
      },
      barrier_strength: {
        name: 'Barrier Strength',
        description: 'Overall barrier function effectiveness',
        unit: 'dimensionless',
        min: 0.1,
        max: 1.0,
        default: 0.8,
        scientific: false
      }
    },
    coupling: {
      molecular_cellular: {
        name: 'Molecular-Cellular Coupling',
        description: 'Strength of upward coupling from molecular to cellular scale',
        unit: 'dimensionless',
        min: 0.01,
        max: 1.0,
        default: 0.1,
        scientific: false
      },
      cellular_tissue: {
        name: 'Cellular-Tissue Coupling',
        description: 'Strength of upward coupling from cellular to tissue scale',
        unit: 'dimensionless',
        min: 0.01,
        max: 1.0,
        default: 0.05,
        scientific: false
      },
      feedback_strength: {
        name: 'Feedback Strength',
        description: 'Strength of downward feedback mechanisms',
        unit: 'dimensionless',
        min: 0.001,
        max: 0.1,
        default: 0.02,
        scientific: false
      }
    }
  }

  const presets = {
    healthy_young: {
      name: 'Healthy Young Skin',
      description: 'Optimal parameters for healthy young adult skin',
      parameters: {
        molecular: { diffusion: 1e-10, reaction_rate: 1e-4, binding_affinity: 1e-7 },
        cellular: { growth_rate: 1e-5, death_rate: 1e-6, migration_rate: 1e-7 },
        tissue: { elastic_modulus: 1e5, permeability: 1e-13, barrier_strength: 0.9 },
        coupling: { molecular_cellular: 0.1, cellular_tissue: 0.05, feedback_strength: 0.02 }
      }
    },
    aged_skin: {
      name: 'Aged Skin',
      description: 'Parameters reflecting age-related changes',
      parameters: {
        molecular: { diffusion: 5e-11, reaction_rate: 5e-5, binding_affinity: 2e-7 },
        cellular: { growth_rate: 3e-6, death_rate: 2e-6, migration_rate: 5e-8 },
        tissue: { elastic_modulus: 3e4, permeability: 5e-13, barrier_strength: 0.6 },
        coupling: { molecular_cellular: 0.06, cellular_tissue: 0.03, feedback_strength: 0.015 }
      }
    },
    damaged_barrier: {
      name: 'Damaged Barrier',
      description: 'Compromised barrier function parameters',
      parameters: {
        molecular: { diffusion: 2e-10, reaction_rate: 2e-4, binding_affinity: 5e-7 },
        cellular: { growth_rate: 8e-6, death_rate: 3e-6, migration_rate: 2e-7 },
        tissue: { elastic_modulus: 5e4, permeability: 1e-12, barrier_strength: 0.4 },
        coupling: { molecular_cellular: 0.15, cellular_tissue: 0.08, feedback_strength: 0.03 }
      }
    },
    sensitive_skin: {
      name: 'Sensitive Skin',
      description: 'Heightened reactivity and inflammation',
      parameters: {
        molecular: { diffusion: 1.5e-10, reaction_rate: 3e-4, binding_affinity: 3e-7 },
        cellular: { growth_rate: 6e-6, death_rate: 1.5e-6, migration_rate: 1.2e-7 },
        tissue: { elastic_modulus: 7e4, permeability: 3e-13, barrier_strength: 0.7 },
        coupling: { molecular_cellular: 0.12, cellular_tissue: 0.07, feedback_strength: 0.025 }
      }
    }
  }

  const formatScientific = (value, precision = 2) => {
    return value.toExponential(precision)
  }

  const formatValue = (value, param) => {
    if (param.scientific) {
      return formatScientific(value)
    }
    return value.toFixed(3)
  }

  const validateParameters = () => {
    const results = {
      valid: true,
      warnings: [],
      errors: []
    }

    // Check parameter ranges
    Object.entries(parameterDefinitions).forEach(([scale, params]) => {
      Object.entries(params).forEach(([paramName, paramDef]) => {
        const value = parameters[scale][paramName]
        if (value < paramDef.min || value > paramDef.max) {
          results.errors.push(`${paramDef.name} is outside valid range`)
          results.valid = false
        }
      })
    })

    // Check coupling consistency
    const mcCoupling = parameters.coupling.molecular_cellular
    const ctCoupling = parameters.coupling.cellular_tissue
    if (mcCoupling < ctCoupling) {
      results.warnings.push('Molecular-cellular coupling is weaker than cellular-tissue coupling')
    }

    // Check stability conditions
    const totalCoupling = mcCoupling + ctCoupling + parameters.coupling.feedback_strength
    if (totalCoupling > 0.5) {
      results.warnings.push('High coupling strength may lead to system instability')
    }

    setValidationResults(results)
    return results
  }

  const resetToDefaults = () => {
    const defaultParams = {}
    Object.entries(parameterDefinitions).forEach(([scale, params]) => {
      defaultParams[scale] = {}
      Object.entries(params).forEach(([paramName, paramDef]) => {
        defaultParams[scale][paramName] = paramDef.default
      })
    })
    setParameters(defaultParams)
  }

  const loadPreset = (presetKey) => {
    setParameters(presets[presetKey].parameters)
  }

  const updateParameter = (scale, paramName, value) => {
    setParameters(prev => ({
      ...prev,
      [scale]: {
        ...prev[scale],
        [paramName]: value
      }
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-3xl font-bold">Parameter Controller</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Fine-tune the multiscale model parameters to explore different skin conditions and behaviors
        </p>
      </motion.div>

      {/* Presets and Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Presets</span>
            </CardTitle>
            <CardDescription>
              Load predefined parameter sets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(presets).map(([key, preset]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => loadPreset(key)}
                >
                  <div>
                    <div className="font-semibold">{preset.name}</div>
                    <div className="text-xs text-muted-foreground">{preset.description}</div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>
              Parameter management and validation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full flex items-center space-x-2"
              onClick={resetToDefaults}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset to Defaults</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center space-x-2"
              onClick={validateParameters}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Validate Parameters</span>
            </Button>
            
            <div className="flex space-x-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={loadParameters}
              />
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-1" />
                Load
              </Button>
              <Button variant="outline" size="sm" className="flex-1" onClick={saveParameters}>
                <Download className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Validation</CardTitle>
            <CardDescription>
              Parameter consistency and stability
            </CardDescription>
          </CardHeader>
          <CardContent>
            {validationResults ? (
              <div className="space-y-3">
                <div className={`flex items-center space-x-2 ${
                  validationResults.valid ? 'text-green-600' : 'text-red-600'
                }`}>
                  {validationResults.valid ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <AlertTriangle className="w-4 h-4" />
                  )}
                  <span className="font-semibold">
                    {validationResults.valid ? 'Valid' : 'Invalid'}
                  </span>
                </div>
                
                {validationResults.errors.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-red-600">Errors:</div>
                    {validationResults.errors.map((error, index) => (
                      <div key={index} className="text-xs text-red-600">• {error}</div>
                    ))}
                  </div>
                )}
                
                {validationResults.warnings.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-orange-600">Warnings:</div>
                    {validationResults.warnings.map((warning, index) => (
                      <div key={index} className="text-xs text-orange-600">• {warning}</div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                Click "Validate Parameters" to check consistency
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Parameter Controls */}
      {Object.entries(parameterDefinitions).map(([scale, params]) => {
        const scaleInfo = scales.find(s => s.id === scale) || { name: scale, color: 'bg-gray-500', icon: Settings }
        
        return (
          <Card key={scale}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className={`w-6 h-6 ${scaleInfo.color} rounded flex items-center justify-center`}>
                  <scaleInfo.icon className="w-4 h-4 text-white" />
                </div>
                <span className="capitalize">{scale} Scale Parameters</span>
              </CardTitle>
              <CardDescription>
                Adjust parameters for the {scale} scale dynamics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(params).map(([paramName, paramDef]) => {
                  const currentValue = parameters[scale][paramName]
                  
                  return (
                    <motion.div
                      key={paramName}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-medium">{paramDef.name}</label>
                          <Badge variant="outline" className="text-xs">
                            {formatValue(currentValue, paramDef)} {paramDef.unit}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{paramDef.description}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Slider
                          value={[paramDef.scientific ? Math.log10(currentValue) : currentValue]}
                          onValueChange={(value) => {
                            const newValue = paramDef.scientific ? Math.pow(10, value[0]) : value[0]
                            updateParameter(scale, paramName, newValue)
                          }}
                          min={paramDef.scientific ? Math.log10(paramDef.min) : paramDef.min}
                          max={paramDef.scientific ? Math.log10(paramDef.max) : paramDef.max}
                          step={paramDef.scientific ? 0.1 : (paramDef.max - paramDef.min) / 100}
                          className="w-full"
                        />
                        
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{formatValue(paramDef.min, paramDef)}</span>
                          <span>{formatValue(paramDef.max, paramDef)}</span>
                        </div>
                      </div>
                      
                      <Input
                        type="number"
                        value={currentValue}
                        onChange={(e) => updateParameter(scale, paramName, parseFloat(e.target.value))}
                        className="text-xs"
                        step={paramDef.scientific ? "any" : (paramDef.max - paramDef.min) / 1000}
                      />
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* System Response Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>System Response</span>
          </CardTitle>
          <CardDescription>
            Real-time visualization of parameter effects on system behavior
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Stability</h4>
              <div className="w-full h-20 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900 to-green-800 rounded-lg flex items-center justify-center">
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {computeStability()}%
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">Coupling Efficiency</h4>
              <div className="w-full h-20 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 to-blue-800 rounded-lg flex items-center justify-center">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {((parameters.coupling.molecular_cellular + parameters.coupling.cellular_tissue) * 100).toFixed(0)}%
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">Response Time</h4>
              <div className="w-full h-20 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900 to-orange-800 rounded-lg flex items-center justify-center">
                <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                  {(1 / (parameters.molecular.reaction_rate * 1000)).toFixed(1)}s
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ParameterController

