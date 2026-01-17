import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Layers, 
  Zap, 
  Target, 
  Activity,
  ArrowRight,
  Info
} from 'lucide-react'

// Import visualizations
import multiscaleOverview from '../assets/visualizations/multiscale_overview.png'
import tensorFieldDynamics from '../assets/visualizations/tensor_field_dynamics.png'
import formulationFramework from '../assets/visualizations/formulation_design_framework.png'
import barrierFunction from '../assets/visualizations/barrier_function_emergence.png'
import selfOrganization from '../assets/visualizations/self_organization_principles.png'
import temporalEvolution from '../assets/visualizations/temporal_evolution_cascade.png'

const ModelOverview = ({ activeScale, setActiveScale, scales }) => {
  const visualizations = [
    {
      id: 'multiscale',
      title: 'Multiscale Architecture',
      description: 'Hierarchical organization from molecular to organ scale',
      image: multiscaleOverview,
      category: 'Core Framework',
      details: 'Shows the complete tensor field decomposition across four spatial scales with cross-scale coupling mechanisms.'
    },
    {
      id: 'tensor',
      title: 'Tensor Field Dynamics',
      description: 'Mathematical foundation and coupling mechanisms',
      image: tensorFieldDynamics,
      category: 'Mathematical Framework',
      details: 'Illustrates the tensor product decomposition Ξ^{skin}_{αβγ} and dynamic evolution equations.'
    },
    {
      id: 'formulation',
      title: 'Formulation Design',
      description: 'Practical application to skincare development',
      image: formulationFramework,
      category: 'Applications',
      details: 'Complete workflow from skin analysis to multiscale integration for formulation optimization.'
    },
    {
      id: 'barrier',
      title: 'Barrier Function Emergence',
      description: 'How barrier properties emerge from multiscale organization',
      image: barrierFunction,
      category: 'Mechanisms',
      details: 'Detailed view of stratum corneum organization and barrier effectiveness calculations.'
    },
    {
      id: 'self-org',
      title: 'Self-Organization Principles',
      description: 'Homeostatic mechanisms and emergent properties',
      image: selfOrganization,
      category: 'Mechanisms',
      details: 'Four key self-organizing mechanisms: gradients, thresholds, feedback, and attractors.'
    },
    {
      id: 'temporal',
      title: 'Temporal Evolution',
      description: 'Cross-scale coupling across different time scales',
      image: temporalEvolution,
      category: 'Dynamics',
      details: 'How perturbations cascade through molecular, cellular, and tissue time scales.'
    }
  ]

  const categories = ['All', 'Core Framework', 'Mathematical Framework', 'Applications', 'Mechanisms', 'Dynamics']
  const [selectedCategory, setSelectedCategory] = React.useState('All')
  const [selectedVisualization, setSelectedVisualization] = React.useState(null)

  const filteredVisualizations = selectedCategory === 'All' 
    ? visualizations 
    : visualizations.filter(viz => viz.category === selectedCategory)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-3xl font-bold">Model Overview</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the comprehensive visualizations that illustrate the integumentary multiscale tensor field model
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="transition-all"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Visualizations Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        {filteredVisualizations.map((viz, index) => (
          <motion.div
            key={viz.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="relative">
                <img 
                  src={viz.image} 
                  alt={viz.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onClick={() => setSelectedVisualization(viz)}
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-white/90 text-slate-700">
                    {viz.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {viz.title}
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setSelectedVisualization(viz)}
                  >
                    <Info className="w-4 h-4" />
                  </Button>
                </CardTitle>
                <CardDescription>{viz.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {viz.details}
                </p>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => setSelectedVisualization(viz)}
                >
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Scale Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layers className="w-5 h-5" />
            <span>Scale Navigation</span>
          </CardTitle>
          <CardDescription>
            Explore different scales of the integumentary system
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                      <div className={`w-8 h-8 ${scale.color} rounded-lg flex items-center justify-center`}>
                        <scale.icon className="w-4 h-4 text-white" />
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
        </CardContent>
      </Card>

      {/* Detailed Visualization Modal */}
      {selectedVisualization && (
        <motion.div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedVisualization(null)}
        >
          <motion.div 
            className="bg-white dark:bg-slate-900 rounded-lg max-w-4xl max-h-[90vh] overflow-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{selectedVisualization.title}</h3>
                  <Badge variant="outline" className="mt-2">
                    {selectedVisualization.category}
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedVisualization(null)}
                >
                  ×
                </Button>
              </div>
              
              <img 
                src={selectedVisualization.image} 
                alt={selectedVisualization.title}
                className="w-full rounded-lg mb-4"
              />
              
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {selectedVisualization.description}
                </p>
                <p className="text-sm">
                  {selectedVisualization.details}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default ModelOverview

