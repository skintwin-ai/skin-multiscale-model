import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Microscope, 
  Layers, 
  Activity, 
  Settings, 
  BarChart3, 
  Zap, 
  Atom, 
  Network,
  Timer,
  Target,
  Beaker,
  Brain,
  AlertTriangle,
  FlaskConical
} from 'lucide-react'
import ModelOverview from './ModelOverview'
import ScaleExplorer from './ScaleExplorer'
import TensorFieldVisualizer from './TensorFieldVisualizer'
import FormulationDesigner from './FormulationDesigner'
import ParameterController from './ParameterController'
import TemporalDynamics from './TemporalDynamics'
import DiseaseModels from './DiseaseModels'
import ActiveIngredients from './ActiveIngredients'
import '../App.css'

function App() {
  const [activeScale, setActiveScale] = useState('molecular')
  const [modelParameters, setModelParameters] = useState({
    molecular: {
      diffusion: 1e-10,
      reaction_rate: 1e-4,
      binding_affinity: 1e-7
    },
    cellular: {
      growth_rate: 1e-5,
      death_rate: 1e-6,
      migration_rate: 1e-7
    },
    tissue: {
      elastic_modulus: 1e5,
      permeability: 1e-13,
      barrier_strength: 0.8
    },
    coupling: {
      molecular_cellular: 0.1,
      cellular_tissue: 0.05,
      feedback_strength: 0.02
    }
  })

  const scales = [
    {
      id: 'molecular',
      name: 'Molecular Scale',
      icon: Atom,
      description: 'Nanometer-scale interactions',
      range: '10⁻⁹ - 10⁻⁶ m',
      color: 'bg-blue-500'
    },
    {
      id: 'cellular',
      name: 'Cellular Scale',
      icon: Microscope,
      description: 'Micrometer-scale dynamics',
      range: '10⁻⁶ - 10⁻⁴ m',
      color: 'bg-orange-500'
    },
    {
      id: 'tissue',
      name: 'Tissue Scale',
      icon: Layers,
      description: 'Millimeter-scale organization',
      range: '10⁻⁴ - 10⁻² m',
      color: 'bg-green-500'
    },
    {
      id: 'organ',
      name: 'Organ Scale',
      icon: Network,
      description: 'Centimeter-scale integration',
      range: '10⁻² m and above',
      color: 'bg-purple-500'
    }
  ]

  const features = [
    {
      icon: Layers,
      title: 'Multiscale Architecture',
      description: 'Explore the hierarchical organization from molecules to organs'
    },
    {
      icon: Zap,
      title: 'Dynamic Coupling',
      description: 'Visualize cross-scale interactions and feedback mechanisms'
    },
    {
      icon: Activity,
      title: 'Temporal Evolution',
      description: 'Understand how the system evolves across different time scales'
    },
    {
      icon: Target,
      title: 'Formulation Design',
      description: 'Apply the model to optimize skincare formulations'
    },
    {
      icon: BarChart3,
      title: 'Parameter Analysis',
      description: 'Adjust model parameters and observe system responses'
    },
    {
      icon: Brain,
      title: 'Self-Organization',
      description: 'Discover emergent properties and homeostatic mechanisms'
    },
    {
      icon: AlertTriangle,
      title: 'Disease Models',
      description: 'Explore tensor representations of skin pathologies'
    },
    {
      icon: FlaskConical,
      title: 'Active Ingredients',
      description: 'Multiscale molecular cascades of key skincare actives'
    }
  ]

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <motion.div 
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Microscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Skin Model Explorer
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Integumentary Multiscale Tensor Field Model
                  </p>
                </div>
              </motion.div>
              
              <div className="flex items-center space-x-2">
                {scales.map((scale) => (
                  <Badge 
                    key={scale.id}
                    variant={activeScale === scale.id ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      activeScale === scale.id ? scale.color + ' text-white' : ''
                    }`}
                    onClick={() => setActiveScale(scale.id)}
                  >
                    <scale.icon className="w-3 h-3 mr-1" />
                    {scale.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <div className="space-y-8">
                {/* Hero Section */}
                <motion.div 
                  className="text-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                    Comprehensive Multiscale Model of the Skin
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Explore the integumentary system through a unified tensor field framework 
                    that captures molecular, cellular, tissue, and organ-level dynamics.
                  </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {features.map((feature, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <feature.icon className="w-5 h-5 text-white" />
                          </div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>

                {/* Main Interface Tabs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-8">
                      <TabsTrigger value="overview" className="flex items-center space-x-2">
                        <Layers className="w-4 h-4" />
                        <span>Overview</span>
                      </TabsTrigger>
                      <TabsTrigger value="scales" className="flex items-center space-x-2">
                        <Microscope className="w-4 h-4" />
                        <span>Scales</span>
                      </TabsTrigger>
                      <TabsTrigger value="tensor" className="flex items-center space-x-2">
                        <Network className="w-4 h-4" />
                        <span>Tensor Field</span>
                      </TabsTrigger>
                      <TabsTrigger value="temporal" className="flex items-center space-x-2">
                        <Timer className="w-4 h-4" />
                        <span>Temporal</span>
                      </TabsTrigger>
                      <TabsTrigger value="disease" className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Disease</span>
                      </TabsTrigger>
                      <TabsTrigger value="actives" className="flex items-center space-x-2">
                        <FlaskConical className="w-4 h-4" />
                        <span>Actives</span>
                      </TabsTrigger>
                      <TabsTrigger value="formulation" className="flex items-center space-x-2">
                        <Beaker className="w-4 h-4" />
                        <span>Formulation</span>
                      </TabsTrigger>
                      <TabsTrigger value="parameters" className="flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Parameters</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                      <ModelOverview 
                        activeScale={activeScale} 
                        setActiveScale={setActiveScale}
                        scales={scales}
                      />
                    </TabsContent>

                    <TabsContent value="scales">
                      <ScaleExplorer 
                        activeScale={activeScale}
                        setActiveScale={setActiveScale}
                        scales={scales}
                        parameters={modelParameters}
                      />
                    </TabsContent>

                    <TabsContent value="tensor">
                      <TensorFieldVisualizer 
                        parameters={modelParameters}
                        activeScale={activeScale}
                      />
                    </TabsContent>

                    <TabsContent value="temporal">
                      <TemporalDynamics 
                        parameters={modelParameters}
                        scales={scales}
                      />
                    </TabsContent>

                    <TabsContent value="disease">
                      <DiseaseModels />
                    </TabsContent>

                    <TabsContent value="actives">
                      <ActiveIngredients />
                    </TabsContent>

                    <TabsContent value="formulation">
                      <FormulationDesigner 
                        parameters={modelParameters}
                        setParameters={setModelParameters}
                      />
                    </TabsContent>

                    <TabsContent value="parameters">
                      <ParameterController 
                        parameters={modelParameters}
                        setParameters={setModelParameters}
                        scales={scales}
                      />
                    </TabsContent>
                  </Tabs>
                </motion.div>
              </div>
            } />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Integumentary Multiscale Tensor Field Model - A comprehensive framework for understanding skin biology
              </p>
              <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                <span>Mathematical Framework: Ξ^{'{'}skin{'}'}_αβγ</span>
                <Separator orientation="vertical" className="h-4" />
                <span>Cross-Scale Coupling</span>
                <Separator orientation="vertical" className="h-4" />
                <span>Self-Organization</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App

