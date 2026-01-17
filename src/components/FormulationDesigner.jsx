import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { 
  Beaker, 
  Target, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Zap,
  BarChart3,
  Droplets
} from 'lucide-react'

const FormulationDesigner = ({ parameters, setParameters }) => {
  const [selectedIngredients, setSelectedIngredients] = useState({
    niacinamide: 2.0,
    retinoid: 0.5,
    vitamin_c: 10.0,
    hyaluronic_acid: 1.0,
    peptides: 3.0,
    ceramides: 2.5
  })

  const [formulationGoals, setFormulationGoals] = useState({
    barrier_function: 85,
    anti_aging: 75,
    hydration: 90,
    brightening: 70,
    sensitivity: 20
  })

  const [optimizationResults, setOptimizationResults] = useState(null)

  const ingredients = [
    {
      id: 'niacinamide',
      name: 'Niacinamide',
      description: 'Vitamin B3 derivative for barrier function and oil control',
      maxConcentration: 10,
      unit: '%',
      effects: {
        barrier_function: 0.8,
        anti_aging: 0.6,
        hydration: 0.4,
        brightening: 0.7,
        sensitivity: -0.1
      },
      mechanism: 'Enhances NAD+ pathway, improves ceramide synthesis'
    },
    {
      id: 'retinoid',
      name: 'Retinoid',
      description: 'Vitamin A derivative for cellular turnover',
      maxConcentration: 2,
      unit: '%',
      effects: {
        barrier_function: 0.3,
        anti_aging: 0.9,
        hydration: -0.2,
        brightening: 0.5,
        sensitivity: 0.6
      },
      mechanism: 'Accelerates cellular differentiation and collagen synthesis'
    },
    {
      id: 'vitamin_c',
      name: 'Vitamin C',
      description: 'L-Ascorbic acid for antioxidant protection',
      maxConcentration: 20,
      unit: '%',
      effects: {
        barrier_function: 0.4,
        anti_aging: 0.8,
        hydration: 0.2,
        brightening: 0.9,
        sensitivity: 0.3
      },
      mechanism: 'Enhances collagen synthesis, antioxidant protection'
    },
    {
      id: 'hyaluronic_acid',
      name: 'Hyaluronic Acid',
      description: 'High molecular weight humectant',
      maxConcentration: 5,
      unit: '%',
      effects: {
        barrier_function: 0.6,
        anti_aging: 0.4,
        hydration: 0.9,
        brightening: 0.1,
        sensitivity: -0.2
      },
      mechanism: 'Water retention, extracellular matrix support'
    },
    {
      id: 'peptides',
      name: 'Peptides',
      description: 'Signal peptides for cellular communication',
      maxConcentration: 10,
      unit: '%',
      effects: {
        barrier_function: 0.7,
        anti_aging: 0.8,
        hydration: 0.3,
        brightening: 0.2,
        sensitivity: -0.1
      },
      mechanism: 'Cellular signaling, protein synthesis stimulation'
    },
    {
      id: 'ceramides',
      name: 'Ceramides',
      description: 'Lipid barrier components',
      maxConcentration: 5,
      unit: '%',
      effects: {
        barrier_function: 0.9,
        anti_aging: 0.3,
        hydration: 0.7,
        brightening: 0.1,
        sensitivity: -0.3
      },
      mechanism: 'Lipid bilayer reinforcement, barrier repair'
    }
  ]

  const calculateFormulationScore = () => {
    let totalScore = 0
    let totalWeight = 0

    Object.entries(formulationGoals).forEach(([goal, weight]) => {
      let goalScore = 0
      Object.entries(selectedIngredients).forEach(([ingredientId, concentration]) => {
        const ingredient = ingredients.find(i => i.id === ingredientId)
        if (ingredient) {
          const effect = ingredient.effects[goal] || 0
          goalScore += effect * (concentration / ingredient.maxConcentration)
        }
      })
      totalScore += goalScore * weight
      totalWeight += weight
    })

    return Math.min(100, (totalScore / totalWeight) * 100)
  }

  const optimizeFormulation = () => {
    // Simulated optimization algorithm
    const optimized = { ...selectedIngredients }
    
    // Simple gradient-based optimization simulation
    Object.keys(optimized).forEach(ingredientId => {
      const ingredient = ingredients.find(i => i.id === ingredientId)
      let bestScore = calculateFormulationScore()
      let bestConcentration = optimized[ingredientId]
      
      // Test different concentrations
      for (let conc = 0; conc <= ingredient.maxConcentration; conc += 0.1) {
        const testFormulation = { ...optimized, [ingredientId]: conc }
        setSelectedIngredients(testFormulation)
        const score = calculateFormulationScore()
        if (score > bestScore) {
          bestScore = score
          bestConcentration = conc
        }
      }
      
      optimized[ingredientId] = bestConcentration
    })

    setSelectedIngredients(optimized)
    setOptimizationResults({
      score: calculateFormulationScore(),
      improvements: Object.keys(optimized).map(id => ({
        ingredient: ingredients.find(i => i.id === id).name,
        oldConc: selectedIngredients[id],
        newConc: optimized[id],
        change: optimized[id] - selectedIngredients[id]
      }))
    })
  }

  const currentScore = calculateFormulationScore()

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-3xl font-bold">Formulation Designer</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Design and optimize skincare formulations using the multiscale tensor field model
        </p>
      </motion.div>

      {/* Formulation Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Formulation Goals</span>
          </CardTitle>
          <CardDescription>
            Set target outcomes for your formulation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(formulationGoals).map(([goal, value]) => (
            <div key={goal} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium capitalize">
                  {goal.replace('_', ' ')}
                </label>
                <Badge variant="outline">{value}%</Badge>
              </div>
              <Slider
                value={[value]}
                onValueChange={(newValue) => 
                  setFormulationGoals(prev => ({ ...prev, [goal]: newValue[0] }))
                }
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Current Formulation Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Formulation Score</span>
            </div>
            <Badge 
              variant={currentScore > 80 ? "default" : currentScore > 60 ? "secondary" : "destructive"}
              className="text-lg px-3 py-1"
            >
              {currentScore.toFixed(1)}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={currentScore} className="h-4 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(formulationGoals).map(([goal, target]) => {
              let achievedScore = 0
              Object.entries(selectedIngredients).forEach(([ingredientId, concentration]) => {
                const ingredient = ingredients.find(i => i.id === ingredientId)
                if (ingredient) {
                  const effect = ingredient.effects[goal] || 0
                  achievedScore += effect * (concentration / ingredient.maxConcentration) * 100
                }
              })
              achievedScore = Math.min(100, achievedScore)
              
              return (
                <div key={goal} className="text-center space-y-2">
                  <div className="text-sm font-medium capitalize">
                    {goal.replace('_', ' ')}
                  </div>
                  <div className="text-2xl font-bold">
                    {achievedScore.toFixed(0)}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Target: {target}%
                  </div>
                  {achievedScore >= target ? (
                    <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-orange-500 mx-auto" />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Ingredient Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Beaker className="w-5 h-5" />
              <span>Active Ingredients</span>
            </CardTitle>
            <CardDescription>
              Adjust concentrations of active ingredients
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {ingredients.map((ingredient) => (
              <motion.div
                key={ingredient.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{ingredient.name}</h4>
                    <p className="text-xs text-muted-foreground">{ingredient.description}</p>
                  </div>
                  <Badge variant="outline">
                    {selectedIngredients[ingredient.id]?.toFixed(1)}{ingredient.unit}
                  </Badge>
                </div>
                
                <Slider
                  value={[selectedIngredients[ingredient.id] || 0]}
                  onValueChange={(value) => 
                    setSelectedIngredients(prev => ({ ...prev, [ingredient.id]: value[0] }))
                  }
                  max={ingredient.maxConcentration}
                  step={0.1}
                  className="w-full"
                />
                
                <div className="text-xs text-muted-foreground">
                  {ingredient.mechanism}
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Predicted Effects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Predicted Effects</span>
            </CardTitle>
            <CardDescription>
              Multiscale model predictions for current formulation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Molecular Level Effects */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Molecular Scale</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span>Lipid Organization:</span>
                  <span className="font-medium">+{(selectedIngredients.ceramides * 10).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Protein Synthesis:</span>
                  <span className="font-medium">+{(selectedIngredients.peptides * 8).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Antioxidant Activity:</span>
                  <span className="font-medium">+{(selectedIngredients.vitamin_c * 4).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>NAD+ Pathway:</span>
                  <span className="font-medium">+{(selectedIngredients.niacinamide * 12).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            {/* Cellular Level Effects */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Cellular Scale</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span>Cell Turnover:</span>
                  <span className="font-medium">+{(selectedIngredients.retinoid * 25).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Differentiation:</span>
                  <span className="font-medium">+{(selectedIngredients.niacinamide * 6).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Proliferation:</span>
                  <span className="font-medium">+{(selectedIngredients.peptides * 7).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Hydration:</span>
                  <span className="font-medium">+{(selectedIngredients.hyaluronic_acid * 18).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            {/* Tissue Level Effects */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Tissue Scale</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span>Barrier Function:</span>
                  <span className="font-medium">+{((selectedIngredients.ceramides * 15 + selectedIngredients.niacinamide * 8)).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Elasticity:</span>
                  <span className="font-medium">+{(selectedIngredients.vitamin_c * 6 + selectedIngredients.peptides * 9).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Thickness:</span>
                  <span className="font-medium">+{(selectedIngredients.retinoid * 12).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>TEWL Reduction:</span>
                  <span className="font-medium">-{(selectedIngredients.ceramides * 20 + selectedIngredients.hyaluronic_acid * 10).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>AI-Powered Optimization</span>
          </CardTitle>
          <CardDescription>
            Use the multiscale model to optimize your formulation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Button onClick={optimizeFormulation} className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Optimize Formulation</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Droplets className="w-4 h-4" />
              <span>Stability Analysis</span>
            </Button>
          </div>

          {optimizationResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200"
            >
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Optimization Complete!
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                Improved formulation score to {optimizationResults.score.toFixed(1)}%
              </p>
              <div className="space-y-1">
                {optimizationResults.improvements.map((improvement, index) => (
                  <div key={index} className="text-xs text-green-600 dark:text-green-400">
                    {improvement.ingredient}: {improvement.oldConc.toFixed(1)}% → {improvement.newConc.toFixed(1)}% 
                    ({improvement.change > 0 ? '+' : ''}{improvement.change.toFixed(1)}%)
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default FormulationDesigner

