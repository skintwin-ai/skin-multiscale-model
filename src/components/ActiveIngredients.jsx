import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import {
  Beaker,
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers,
  Atom,
  Activity,
  CheckCircle,
  AlertCircle,
  Droplets,
  Sun
} from 'lucide-react'

const ingredients = [
  {
    id: 'retinoid',
    name: 'Retinoids (Vitamin A)',
    shortName: 'Retinol / Retinoic Acid',
    icon: TrendingUp,
    category: 'Cell Turnover',
    color: 'amber',
    colorClass: 'bg-amber-500',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-200',
    textClass: 'text-amber-700',
    concentration: { min: 0.025, max: 1.0, default: 0.1, unit: '%', step: 0.025 },
    tensor: 'T^{retinoid}',
    summary:
      'Retinol undergoes enzymatic oxidation to all-trans retinoic acid (ATRA), which binds RAR/RXR nuclear receptors and activates RARE promoter elements. This initiates a gene-expression cascade accelerating keratinocyte differentiation (τ_diff ↓ ~40%), inducing collagen I/III synthesis, and suppressing MMP-1.',
    scales: ['molecular', 'cellular', 'tissue'],
    cascadeSteps: [
      { step: 1, label: 'Retinol → Retinal → ATRA', detail: 'ADH / RALDH enzymatic oxidation; τ ~ 10³ s', icon: Atom },
      { step: 2, label: 'RAR/RXR nuclear receptor binding', detail: 'Kd ~ 1 nM; forms heterodimer on RARE', icon: Zap },
      { step: 3, label: 'RARE transcription factor activation', detail: 'Chromatin remodelling H3K27ac; τ_transcription ~ 10³ s', icon: Activity },
      { step: 4, label: 'K5/K14 → K1/K10 switch', detail: 'Differentiation markers shift; τ_diff accelerated', icon: Layers },
      { step: 5, label: 'Accelerated desquamation + collagen ↑', detail: 'SC thinning, DEJ undulation ↑, MMP-1 ↓', icon: TrendingUp }
    ],
    effects: {
      barrier_function: 72,
      anti_aging: 95,
      hydration: 45,
      brightening: 60,
      acne: 80,
      sensitivity: 35
    },
    benefits: ['Collagen I/III synthesis ↑↑', 'Epidermal turnover acceleration', 'MMP-1/3 suppression', 'Fine line reduction', 'Acne comedolytic'],
    cautions: ['Retinoid dermatitis (initiation phase)', 'Photosensitivity ↑', 'Teratogenic (avoid in pregnancy)', 'Start with low concentration']
  },
  {
    id: 'vitamin_c',
    name: 'L-Ascorbic Acid (Vit C)',
    shortName: 'Vitamin C / Ascorbate',
    icon: Sun,
    category: 'Antioxidant / Brightening',
    color: 'yellow',
    colorClass: 'bg-yellow-500',
    bgClass: 'bg-yellow-50',
    borderClass: 'border-yellow-200',
    textClass: 'text-yellow-700',
    concentration: { min: 5, max: 20, default: 10, unit: '%', step: 1 },
    tensor: 'T^{Vit-C}',
    summary:
      'L-Ascorbic acid is a cofactor for prolyl and lysyl hydroxylase (essential for collagen triple-helix stability), a potent ROS scavenger (k ~ 10⁸ M⁻¹s⁻¹ vs •OH), and a melanogenesis inhibitor through tyrosinase copper reduction. Optimal pH ≤ 3.5 for skin penetration.',
    scales: ['molecular', 'cellular', 'tissue'],
    cascadeSteps: [
      { step: 1, label: 'Epidermal penetration (pH ≤ 3.5)', detail: 'Neutral form crosses SC; SVCT1/2 active transport', icon: Droplets },
      { step: 2, label: 'Prolyl/lysyl hydroxylase co-factor', detail: 'Fe²⁺ reduction; collagen triple helix stabilization', icon: Atom },
      { step: 3, label: 'ROS neutralization', detail: 'Ascorbate•⁻ → dehydroascorbate; k ~ 10⁸ M⁻¹s⁻¹', icon: Zap },
      { step: 4, label: 'Tyrosinase Cu²⁺ reduction', detail: 'Cu²⁺ → Cu⁺ inhibits melanin synthesis; dopaquinone ↓', icon: Sun },
      { step: 5, label: 'Collagen I/III ↑, melanin ↓, TEWL ↓', detail: 'Tissue-level brightening, firming, and barrier support', icon: TrendingUp }
    ],
    effects: {
      barrier_function: 60,
      anti_aging: 80,
      hydration: 55,
      brightening: 95,
      acne: 45,
      sensitivity: 70
    },
    benefits: ['Collagen crosslinking support', 'Tyrosinase inhibition (melanin ↓)', 'ROS scavenging ↑↑', 'Photoprotection synergy', 'Pigmentation evening'],
    cautions: ['Oxidation instability (requires anhydrous formulation or pH <3.5)', 'Stinging at high %', 'Can pigment fabrics', 'Combine with Vit E + ferulic for stability']
  },
  {
    id: 'niacinamide',
    name: 'Niacinamide (Vit B3)',
    shortName: 'Niacinamide / Nicotinamide',
    icon: CheckCircle,
    category: 'Multi-target',
    color: 'blue',
    colorClass: 'bg-blue-500',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-200',
    textClass: 'text-blue-700',
    concentration: { min: 2, max: 10, default: 5, unit: '%', step: 0.5 },
    tensor: 'T^{niacinamide}',
    summary:
      'Niacinamide elevates NAD⁺/NADH via the NAD⁺ salvage pathway, activating SIRT1/PARP repair mechanisms. It inhibits melanosome transfer (not synthesis), enhances ceramide and free fatty acid synthesis for barrier reinforcement, and suppresses sebum production and inflammatory cytokines.',
    scales: ['molecular', 'cellular', 'tissue'],
    cascadeSteps: [
      { step: 1, label: 'NAD⁺ salvage pathway activation', detail: 'Niacinamide → NMN → NAD⁺ via NAMPT/NMNAT; τ ~ 10³ s', icon: Atom },
      { step: 2, label: 'SIRT1/PARP1 DNA repair activation', detail: 'NAD⁺ consumer enzymes; genome stability ↑', icon: Zap },
      { step: 3, label: 'Ceramide + FFA synthesis ↑', detail: 'ABCA12 transporter ↑; lamellar body loading ↑', icon: Layers },
      { step: 4, label: 'Melanosome transfer block', detail: 'PAR-2 inhibition on keratinocytes; melanin distribution ↓', icon: Sun },
      { step: 5, label: 'Sebum ↓, cytokine ↓, barrier ↑', detail: 'Multi-target tissue homeostasis restoration', icon: TrendingUp }
    ],
    effects: {
      barrier_function: 90,
      anti_aging: 75,
      hydration: 80,
      brightening: 78,
      acne: 70,
      sensitivity: 90
    },
    benefits: ['Ceramide synthesis ↑↑', 'Melanosome transfer inhibition', 'Sebum regulation', 'Anti-inflammatory (IL-1β, IL-8 ↓)', 'Excellent tolerance profile'],
    cautions: ['Flushing at >10% in some individuals (use ≤5% initially)', 'May interact with high-dose Vit C (niacin conversion at extreme % is debated)', 'Generally very well tolerated']
  },
  {
    id: 'aha',
    name: 'Alpha-Hydroxy Acids',
    shortName: 'Glycolic / Lactic Acid',
    icon: Droplets,
    category: 'Exfoliation',
    color: 'pink',
    colorClass: 'bg-pink-500',
    bgClass: 'bg-pink-50',
    borderClass: 'border-pink-200',
    textClass: 'text-pink-700',
    concentration: { min: 5, max: 30, default: 10, unit: '%', step: 1 },
    tensor: 'T^{AHA}',
    summary:
      'AHAs lower SC pH, disrupting ionic bonds that hold corneodesmosomes together (KLK5/7 activation at pH 5.5–6.0), leading to controlled desquamation. They also stimulate dermal fibroblasts via TGF-β signalling to produce collagen, and hydrate via osmotic water binding (especially lactic acid).',
    scales: ['molecular', 'cellular', 'tissue'],
    cascadeSteps: [
      { step: 1, label: 'SC pH reduction', detail: 'Acid deposition → pH ↓ from ~5.5 to ~3.8; τ ~ minutes', icon: Droplets },
      { step: 2, label: 'Corneodesmosome disruption', detail: 'KLK5/7 serine protease activation; ionic bond weakening', icon: Zap },
      { step: 3, label: 'Accelerated desquamation', detail: 'Corneocyte shedding ↑; SC thickness ↓; τ_desq ↓', icon: Layers },
      { step: 4, label: 'Fibroblast TGF-β signalling', detail: 'Growth factor cascade; collagen I/III ↑; GAG synthesis ↑', icon: Activity },
      { step: 5, label: 'Texture smoothing + hydration ↑', detail: 'NMF ↑ (lactic acid), pore appearance ↓, radiance ↑', icon: TrendingUp }
    ],
    effects: {
      barrier_function: 55,
      anti_aging: 70,
      hydration: 75,
      brightening: 82,
      acne: 68,
      sensitivity: 40
    },
    benefits: ['Exfoliation and skin texture smoothing', 'Collagen stimulation (dermal remodelling)', 'Hyperpigmentation treatment', 'Acne comedolysis', 'Hydration (lactic acid NMF)'],
    cautions: ['Photosensitivity ↑ (always use SPF)', 'Stinging / erythema at high %', 'Not for compromised barriers', 'Avoid eye area', 'pH < 3.5 needed for efficacy']
  },
  {
    id: 'hyaluronic_acid',
    name: 'Hyaluronic Acid',
    shortName: 'HA / Sodium Hyaluronate',
    icon: Droplets,
    category: 'Hydration',
    color: 'cyan',
    colorClass: 'bg-cyan-500',
    bgClass: 'bg-cyan-50',
    borderClass: 'border-cyan-200',
    textClass: 'text-cyan-700',
    concentration: { min: 0.1, max: 2.0, default: 1.0, unit: '%', step: 0.1 },
    tensor: 'T^{HA}',
    summary:
      'Hyaluronic acid (MW-dependent) forms a viscoelastic hydration network in the ECM, binding up to 1000× its weight in water through hydrogen bonding with ordered hydration shells. HMW-HA (>1 MDa) acts as a surface humectant; LMW-HA (<50 kDa) penetrates deeper and activates CD44/RHAMM receptor signalling for proliferation and migration.',
    scales: ['molecular', 'cellular', 'tissue'],
    cascadeSteps: [
      { step: 1, label: 'MW-dependent SC penetration', detail: 'LMW-HA (<50 kDa) penetrates intercellular channels; HMW stays at surface', icon: Droplets },
      { step: 2, label: 'Osmotic water-binding network', detail: 'H-bond clusters bind 1000× weight water; ∇(a_w) ↑', icon: Atom },
      { step: 3, label: 'CD44/RHAMM receptor activation (LMW)', detail: 'PI3K/Akt, ERK1/2 → keratinocyte proliferation ↑, migration ↑', icon: Zap },
      { step: 4, label: 'ECM viscoelastic support', detail: 'Dermis hydration network; mechanical turgor ↑; fibroblast support', icon: Layers },
      { step: 5, label: 'TEWL ↓, plumpness ↑, barrier support', detail: 'Surface film formation; corneocyte hydration; suppleness ↑', icon: TrendingUp }
    ],
    effects: {
      barrier_function: 75,
      anti_aging: 65,
      hydration: 98,
      brightening: 50,
      acne: 30,
      sensitivity: 95
    },
    benefits: ['Intense surface + dermal hydration', 'ECM volume support (plumping)', 'CD44 receptor-mediated repair', 'Excellent tolerability (non-reactive)', 'Multi-molecular-weight layering strategy'],
    cautions: ['HMW-HA can worsen dry environments (draws water from dermis)', 'Apply to damp skin for best effect', 'LMW-HA may cause irritation in sensitive skin', 'Not a barrier repair agent alone']
  },
  {
    id: 'peptides',
    name: 'Bioactive Peptides',
    shortName: 'Signal / Carrier / Inhibitor Peptides',
    icon: Activity,
    category: 'Cell Signalling',
    color: 'violet',
    colorClass: 'bg-violet-500',
    bgClass: 'bg-violet-50',
    borderClass: 'border-violet-200',
    textClass: 'text-violet-700',
    concentration: { min: 1, max: 10, default: 3, unit: '%', step: 0.5 },
    tensor: 'T^{peptide}',
    summary:
      'Bioactive peptides (2–20 amino acids) act as cell-signalling molecules mimicking ECM fragments (matrikines), growth factor binding domains, neurotransmitter inhibitors, or carrier complexes. They activate fibroblast TGF-β and EGF pathways, inhibit ACh release (Argireline), or deliver copper ions to LOX/SOD enzymes.',
    scales: ['molecular', 'cellular', 'tissue'],
    cascadeSteps: [
      { step: 1, label: 'SC penetration via lipophilic delivery', detail: 'Fatty acid conjugation or liposomal encapsulation; τ ~ hours', icon: Atom },
      { step: 2, label: 'Receptor binding / matrikine mimicry', detail: 'TGF-βR, EGF-R, integrin activation; or SNAP-25 inhibition', icon: Zap },
      { step: 3, label: 'Fibroblast collagen cascade', detail: 'SMAD2/3 phosphorylation → COL1A1/COL3A1 transcription ↑', icon: Activity },
      { step: 4, label: 'Matrix enzyme delivery (Cu-peptides)', detail: 'Cu²⁺ → LOX crosslinking ↑, SOD antioxidant ↑', icon: Layers },
      { step: 5, label: 'Collagen ↑, elastin ↑, firmness ↑', detail: 'Tissue-level firming and wrinkle reduction', icon: TrendingUp }
    ],
    effects: {
      barrier_function: 65,
      anti_aging: 80,
      hydration: 60,
      brightening: 55,
      acne: 40,
      sensitivity: 85
    },
    benefits: ['Collagen I/III/V induction (matrikines)', 'Elastin and fibronectin upregulation', 'Neuro-inhibitory relaxation (Argireline)', 'Copper delivery to ECM enzymes', 'Gentle – suitable for sensitive skin'],
    cautions: ['Molecular weight affects penetration', 'Stability issues (heat, pH extremes)', 'Some peptides require occlusion for efficacy', 'Avoid mixing with strong acids (AHA/BHA)']
  }
]

const effectLabels = {
  barrier_function: 'Barrier Function',
  anti_aging: 'Anti-Aging',
  hydration: 'Hydration',
  brightening: 'Brightening',
  acne: 'Acne Control',
  sensitivity: 'Sensitivity Safety'
}

const effectColors = {
  barrier_function: 'bg-green-500',
  anti_aging: 'bg-purple-500',
  hydration: 'bg-cyan-500',
  brightening: 'bg-yellow-500',
  acne: 'bg-orange-500',
  sensitivity: 'bg-teal-500'
}

const categoryColors = {
  'Cell Turnover': 'bg-amber-100 text-amber-800',
  'Antioxidant / Brightening': 'bg-yellow-100 text-yellow-800',
  'Multi-target': 'bg-blue-100 text-blue-800',
  'Exfoliation': 'bg-pink-100 text-pink-800',
  'Hydration': 'bg-cyan-100 text-cyan-800',
  'Cell Signalling': 'bg-violet-100 text-violet-800'
}

const scaleColors = {
  molecular: 'bg-blue-100 text-blue-800',
  cellular: 'bg-orange-100 text-orange-800',
  tissue: 'bg-green-100 text-green-800'
}

const ActiveIngredients = () => {
  const [selectedIngredient, setSelectedIngredient] = useState(null)
  const [concentration, setConcentration] = useState({})

  const ingredient = selectedIngredient ? ingredients.find(i => i.id === selectedIngredient) : null

  const getConcentration = (id) => {
    const ing = ingredients.find(i => i.id === id)
    return concentration[id] ?? ing?.concentration.default ?? 0
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Beaker className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Active Ingredient Cascades</h2>
            <p className="text-sm text-muted-foreground">
              Multiscale molecular mechanisms of key actives
            </p>
          </div>
        </div>
        <p className="text-muted-foreground max-w-3xl">
          Each active ingredient is modelled as a coupling operator T^&#123;ingredient&#125; acting on specific
          layers of the skin tensor. Explore the molecular → cellular → tissue cascade for each compound
          and adjust concentrations to understand dose–response relationships.
        </p>
      </motion.div>

      {/* Ingredient grid */}
      {!ingredient && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {ingredients.map((ing, i) => (
            <motion.div
              key={ing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card
                className={`cursor-pointer hover:shadow-lg transition-all border-2 hover:${ing.borderClass} ${ing.borderClass}`}
                onClick={() => setSelectedIngredient(ing.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 ${ing.colorClass} rounded-lg flex items-center justify-center`}>
                        <ing.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{ing.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{ing.shortName}</p>
                      </div>
                    </div>
                    <Badge className={categoryColors[ing.category]} variant="outline">
                      {ing.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Top 3 effects */}
                  <div className="space-y-1.5">
                    {Object.entries(ing.effects)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 3)
                      .map(([key, val]) => (
                        <div key={key} className="space-y-0.5">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">{effectLabels[key]}</span>
                            <span className="font-medium">{val}%</span>
                          </div>
                          <Progress value={val} className={`h-1.5`} />
                        </div>
                      ))}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{ing.cascadeSteps.length}-step cascade</span>
                    <ArrowRight className="w-3 h-3 ml-auto" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Ingredient detail */}
      {ingredient && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <Button variant="outline" size="sm" onClick={() => setSelectedIngredient(null)}>
            ← Back to all ingredients
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-1 space-y-4">
              <Card className={`border-2 ${ingredient.borderClass}`}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${ingredient.colorClass} rounded-xl flex items-center justify-center`}>
                      <ingredient.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle>{ingredient.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{ingredient.shortName}</p>
                      <code className="text-xs text-muted-foreground">{ingredient.tensor}</code>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{ingredient.summary}</p>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Target Scales</p>
                    <div className="flex flex-wrap gap-1">
                      {ingredient.scales.map(s => (
                        <span key={s} className={`text-xs px-2 py-1 rounded-full font-medium ${scaleColors[s]}`}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Concentration slider */}
                  <div className={`${ingredient.bgClass} rounded-lg p-3 space-y-2`}>
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Concentration</span>
                      <span className={ingredient.textClass}>
                        {getConcentration(ingredient.id)} {ingredient.concentration.unit}
                      </span>
                    </div>
                    <Slider
                      min={ingredient.concentration.min}
                      max={ingredient.concentration.max}
                      step={ingredient.concentration.step}
                      value={[getConcentration(ingredient.id)]}
                      onValueChange={([val]) =>
                        setConcentration(prev => ({ ...prev, [ingredient.id]: val }))
                      }
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{ingredient.concentration.min}{ingredient.concentration.unit}</span>
                      <span>{ingredient.concentration.max}{ingredient.concentration.unit}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits & Cautions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Benefits</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {ingredient.benefits.map((b, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <span>Cautions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {ingredient.cautions.map((c, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start space-x-2">
                        <AlertCircle className="w-3 h-3 text-amber-500 mt-0.5 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right column */}
            <div className="lg:col-span-2 space-y-4">
              {/* Cascade steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Molecular Cascade</span>
                  </CardTitle>
                  <CardDescription>
                    Step-by-step mechanism from skin contact to tissue-level effect
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative space-y-4">
                    {ingredient.cascadeSteps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className="flex items-start space-x-4"
                      >
                        {/* Step number + connector */}
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 ${ingredient.colorClass} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                            {step.step}
                          </div>
                          {i < ingredient.cascadeSteps.length - 1 && (
                            <div className="w-px h-6 bg-gray-200 mt-1" />
                          )}
                        </div>
                        {/* Content */}
                        <div className="flex-1 pb-2">
                          <div className="flex items-center space-x-2">
                            <step.icon className="w-4 h-4 text-muted-foreground" />
                            <p className="text-sm font-medium">{step.label}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{step.detail}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Effect profile */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Efficacy Profile</span>
                  </CardTitle>
                  <CardDescription>
                    Multidimensional effect profile across skin health dimensions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(ingredient.effects).map(([key, val]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{effectLabels[key]}</span>
                        <span className="text-muted-foreground">{val}%</span>
                      </div>
                      <div className="relative h-2 rounded-full bg-primary/10 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${effectColors[key]}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${val}%` }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Tensor operator representation */}
              <Card className={ingredient.bgClass}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center space-x-2">
                    <Atom className="w-4 h-4" />
                    <span>Tensor Coupling Operator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="font-mono text-xs bg-white/80 rounded-lg p-3 space-y-1 border">
                    <p className="text-slate-500">// Ingredient coupling into master equation</p>
                    <p>∂Ξ^skin/∂t += {ingredient.tensor} · [c] · Ξ^target</p>
                    <p className="text-slate-500 mt-1">// Where [c] = current concentration</p>
                    <p>[c] = {getConcentration(ingredient.id)} {ingredient.concentration.unit}</p>
                    <p className="text-slate-500 mt-1">// Target tensor layers</p>
                    <p>Ξ^target ∈ &#123;{ingredient.scales.map(s => 'Ξ^' + s).join(', ')}&#125;</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Each active is modelled as a perturbation operator that modifies specific layers of
                    the skin state tensor proportionally to its concentration and the skin's current state.
                    Adjust the concentration slider to see how the operator magnitude changes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ActiveIngredients
