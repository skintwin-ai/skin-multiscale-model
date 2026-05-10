import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Zap,
  AlertTriangle,
  Activity,
  Microscope,
  Sun,
  Wind,
  Heart,
  Shield,
  Layers,
  Clock,
  TrendingDown,
  TrendingUp,
  ArrowRight
} from 'lucide-react'

const diseases = [
  {
    id: 'acne',
    name: 'Acne Pathogenesis',
    icon: AlertTriangle,
    category: 'Sebaceous',
    severity: 'moderate',
    color: 'orange',
    colorClass: 'bg-orange-500',
    textClass: 'text-orange-700',
    borderClass: 'border-orange-200',
    bgClass: 'bg-orange-50',
    tensor: 'Ξ^{acne}',
    description:
      'Multifactorial inflammatory disease driven by androgen-mediated sebum overproduction, follicular hyperkeratinization, C. acnes dysbiosis, and immune cascade activation.',
    affectedScales: ['molecular', 'cellular', 'tissue'],
    keyProcesses: [
      { name: 'Sebum Overproduction', value: 92, description: '5α-Reductase ↑, J_sebum > 2.5 μg/cm²/min' },
      { name: 'Follicular Occlusion', value: 85, description: 'Corneocyte cohesion ↑, desquamation failure → microcomedo' },
      { name: 'Microbial Dysbiosis', value: 78, description: 'C. acnes > 10⁶ CFU, biofilm formation, lipase activity' },
      { name: 'Inflammatory Cascade', value: 88, description: 'TLR2/4 activation, IL-1β, IL-8, TNF-α production' },
      { name: 'Barrier Disruption', value: 71, description: 'FFA-induced cytotoxicity, pH elevation' }
    ],
    molecularMarkers: ['DHT gradient ∇(DHT)↑', 'IL-1β, IL-8, TNF-α', 'Porphyrins (C. acnes)', 'FFA accumulation'],
    timeConstants: ['Sebum flux: τ ~ hours', 'Comedo formation: τ ~ days–weeks', 'Resolution: τ ~ weeks–months'],
    therapeuticTargets: ['5α-Reductase inhibition', 'Antimicrobial (benzoyl peroxide)', 'Retinoid-mediated normalization', 'Anti-inflammatory (niacinamide)']
  },
  {
    id: 'psoriasis',
    name: 'Psoriasis Tensor Model',
    icon: Zap,
    category: 'Autoimmune',
    severity: 'high',
    color: 'red',
    colorClass: 'bg-red-500',
    textClass: 'text-red-700',
    borderClass: 'border-red-200',
    bgClass: 'bg-red-50',
    tensor: 'Ξ^{psoriasis}',
    description:
      'Chronic autoimmune disease characterized by hyperproliferation (turnover τ = 3–4 d vs 28 d), Th17-driven inflammation, and aberrant differentiation. Genetic susceptibility loci include HLA-Cw6 and PSORS1-9.',
    affectedScales: ['molecular', 'cellular', 'tissue', 'organ'],
    keyProcesses: [
      { name: 'Hyperproliferation', value: 95, description: 'τ_turnover 3–4 d vs 28 d, mitotic rate ×10, acanthosis' },
      { name: 'Th17 Immune Axis', value: 90, description: 'DC → IL-23 → Th17 → IL-17A/F, TNF-α amplification' },
      { name: 'Aberrant Differentiation', value: 87, description: 'K16/K17 ↑, K1/K10 ↓, involucrin premature expression' },
      { name: 'Vascular Remodelling', value: 75, description: 'VEGF gradient ∇(VEGF), angiogenesis, capillary tortuosity' },
      { name: 'Epigenetic Dysregulation', value: 68, description: 'IL23R, CARD14 variants, epigenetic triggers' }
    ],
    molecularMarkers: ['IL-17A/F, IL-23', 'TNF-α amplification', 'VEGF gradient', 'K16/K17 expression', 'CARD14 mutations'],
    timeConstants: ['Th17 differentiation: τ ~ days', 'Plaque formation: τ ~ weeks', 'Chronic cycles: τ ~ months–years'],
    therapeuticTargets: ['IL-17A/F blockade (secukinumab)', 'IL-23 inhibition (risankizumab)', 'TNF-α inhibitors', 'JAK inhibitors']
  },
  {
    id: 'atopic_dermatitis',
    name: 'Atopic Dermatitis',
    icon: Shield,
    category: 'Inflammatory',
    severity: 'high',
    color: 'purple',
    colorClass: 'bg-purple-500',
    textClass: 'text-purple-700',
    borderClass: 'border-purple-200',
    bgClass: 'bg-purple-50',
    tensor: 'Ξ^{AD}',
    description:
      'Chronic relapsing inflammatory dermatosis driven by impaired barrier (filaggrin loss-of-function), Th2-skewed immunity, microbiome dysbiosis, and itch–scratch amplification cycle.',
    affectedScales: ['molecular', 'cellular', 'tissue'],
    keyProcesses: [
      { name: 'Barrier Deficiency', value: 93, description: 'Filaggrin null mutations, ceramide ↓, TEWL ↑' },
      { name: 'Th2 Immune Skewing', value: 88, description: 'IL-4, IL-13, IL-31 → IgE production, mast cell priming' },
      { name: 'Microbiome Dysbiosis', value: 82, description: 'S. aureus dominance, α-diversity ↓, toxin release' },
      { name: 'Itch–Scratch Cycle', value: 79, description: 'IL-31, TSLP neuronal sensitization, scratch-induced damage' },
      { name: 'Sensitization', value: 74, description: 'Allergen penetration through impaired barrier → IgE sensitization' }
    ],
    molecularMarkers: ['Filaggrin mutations (FLG)', 'IL-4, IL-13, IL-31', 'TSLP, IL-33', 'IgE elevation', 'Ceramide deficit'],
    timeConstants: ['Barrier breach: τ ~ hours', 'Acute flare: τ ~ days', 'Sensitization: τ ~ weeks–months'],
    therapeuticTargets: ['IL-4Rα blockade (dupilumab)', 'Barrier restoration (ceramide emollients)', 'Microbiome modulation', 'JAK inhibitors (abrocitinib)']
  },
  {
    id: 'wound_healing',
    name: 'Wound Healing Tensor',
    icon: Heart,
    category: 'Repair',
    severity: 'dynamic',
    color: 'green',
    colorClass: 'bg-green-500',
    textClass: 'text-green-700',
    borderClass: 'border-green-200',
    bgClass: 'bg-green-50',
    tensor: 'Ξ^{wound}',
    description:
      'Orchestrated four-phase repair cascade: hemostasis → inflammation → proliferation → remodelling. Each phase is governed by distinct molecular gradients and cellular phenotype transitions.',
    affectedScales: ['molecular', 'cellular', 'tissue', 'organ'],
    keyProcesses: [
      { name: 'Hemostasis (0–1 h)', value: 100, description: 'Platelet activation, fibrin mesh, vasoconstriction (τ ~ 10³ s)' },
      { name: 'Inflammation (1–72 h)', value: 90, description: 'Neutrophil infiltration, ∇(chemokine), M1 macrophage, debris clearance' },
      { name: 'Proliferation (3–21 d)', value: 80, description: 'Keratinocyte migration, re-epithelialization, granulation tissue (τ ~ 10⁶ s)' },
      { name: 'Remodelling (weeks–years)', value: 60, description: 'Collagen maturation, scar reorganization, MMP/TIMP balance' },
      { name: 'Molecular Gradients', value: 85, description: 'VEGF, EGF/TGF-α, FGF-2, PDGF chemotaxis' }
    ],
    molecularMarkers: ['VEGF gradient ∇(VEGF)', 'EGF/TGF-α release', 'FGF-2 diffusion', 'MMP/TIMP ratio', 'TGF-β1 (fibrosis)'],
    timeConstants: ['Hemostasis: τ ~ 10³ s (≈15 min)', 'Inflammation: τ ~ 10⁵ s (≈28 h)', 'Proliferation: τ ~ 10⁶ s (≈12 d)', 'Remodelling: τ ~ 10⁷–10⁸ s (months)'],
    therapeuticTargets: ['Growth factor delivery (EGF, PDGF)', 'Matrix scaffolds', 'Anti-fibrotic (TGF-β inhibition)', 'Electrical stimulation']
  },
  {
    id: 'aging',
    name: 'Aging Deterioration',
    icon: TrendingDown,
    category: 'Chronobiology',
    severity: 'progressive',
    color: 'slate',
    colorClass: 'bg-slate-500',
    textClass: 'text-slate-700',
    borderClass: 'border-slate-200',
    bgClass: 'bg-slate-50',
    tensor: 'Ξ^{aging}',
    description:
      'Progressive deterioration of skin homeostasis driven by telomere erosion, accumulation of senescent cells, ECM remodelling failure, and declining stem-cell self-renewal.',
    affectedScales: ['molecular', 'cellular', 'tissue', 'organ'],
    keyProcesses: [
      { name: 'Cellular Senescence', value: 85, description: 'p16/p21 ↑, SASP, telomere shortening, ΔΨm loss' },
      { name: 'ECM Degradation', value: 80, description: 'Collagen I/III ↓, MMP-1/3 ↑, crosslinking ↑, elastin fragmentation' },
      { name: 'Stem Cell Exhaustion', value: 75, description: 'Epidermal stem cell self-renewal ↓, transit-amplifying pool ↓' },
      { name: 'Barrier Decline', value: 70, description: 'Ceramide production ↓, TEWL ↑, SC thickness ↑ (paradox)' },
      { name: 'Microbiome Shift', value: 65, description: 'Diversity ↓, Cutibacterium ↓, opportunist colonization ↑' }
    ],
    molecularMarkers: ['p16^{INK4a}, p21^{WAF1}', 'SASP: IL-6, IL-8, MMP', 'Telomere length ↓', 'Collagen I/III ratio ↓', 'Ceramide deficit'],
    timeConstants: ['Telomere erosion: τ ~ decades', 'SASP onset: τ ~ months–years', 'ECM remodelling: τ ~ months', 'Circadian dampening: τ ~ years'],
    therapeuticTargets: ['Senolytic agents (dasatinib+quercetin)', 'Retinoid collagen induction', 'Peptide stem-cell activation', 'Antioxidant defense']
  },
  {
    id: 'uv_damage',
    name: 'UV Photodamage',
    icon: Sun,
    category: 'Environmental',
    severity: 'acute/chronic',
    color: 'yellow',
    colorClass: 'bg-yellow-500',
    textClass: 'text-yellow-700',
    borderClass: 'border-yellow-200',
    bgClass: 'bg-yellow-50',
    tensor: 'Ξ^{UV}',
    description:
      'UV radiation (UVB 280–315 nm, UVA 315–400 nm) induces CPD/6-4PP DNA lesions, ROS cascade, immunosuppression, and melanogenesis. Chronic exposure drives photoaging and carcinogenesis.',
    affectedScales: ['molecular', 'cellular', 'tissue'],
    keyProcesses: [
      { name: 'DNA Lesion Formation', value: 95, description: 'CPD and 6-4PP photoproducts, UVB direct absorption (τ ~ ns)' },
      { name: 'ROS Cascade', value: 88, description: 'UVA → ¹O₂, H₂O₂, •OH generation, oxidative stress ∇(ROS)' },
      { name: 'Melanogenesis Activation', value: 82, description: 'α-MSH → MC1R → MITF → tyrosinase → melanin synthesis' },
      { name: 'Immunosuppression', value: 76, description: 'Langerhans cell depletion, urocanic acid isomerization, IL-10 ↑' },
      { name: 'p53 Sunburn Response', value: 90, description: 'p53 stabilization → apoptosis, NER repair (τ ~ hours)' }
    ],
    molecularMarkers: ['CPD, 6-4PP lesions', 'ROS gradient ∇(ROS)', 'p53 mutation (CC→TT)', 'α-MSH/MC1R axis', 'MMP-1 ↑, collagen ↓'],
    timeConstants: ['Photon absorption: τ ~ 10⁻¹⁵ s', 'ROS cascade: τ ~ 10⁻⁹–10⁻³ s', 'DNA repair (NER): τ ~ hours', 'Tanning response: τ ~ days'],
    therapeuticTargets: ['Broad-spectrum SPF (UVA+UVB)', 'DNA photolyase repair', 'Antioxidants (Vit C, E)', 'DNA repair enzymes']
  },
  {
    id: 'pollution',
    name: 'Pollution Stress',
    icon: Wind,
    category: 'Environmental',
    severity: 'chronic',
    color: 'gray',
    colorClass: 'bg-gray-500',
    textClass: 'text-gray-700',
    borderClass: 'border-gray-200',
    bgClass: 'bg-gray-50',
    tensor: 'Ξ^{pollution}',
    description:
      'Airborne particulate matter (PM2.5, PM10), PAHs, and NOₓ activate AhR signalling, induce oxidative stress, and disrupt the skin barrier through adsorption and direct chemical injury.',
    affectedScales: ['molecular', 'cellular', 'tissue'],
    keyProcesses: [
      { name: 'AhR Pathway Activation', value: 85, description: 'PAH → AhR → CYP1A1/1B1 → ROS → MMP induction' },
      { name: 'PM2.5 Barrier Penetration', value: 80, description: 'Particle adsorption, lipid disruption, ceramide oxidation' },
      { name: 'Oxidative Stress', value: 88, description: 'NOₓ → peroxynitrite, PM-catalysed ROS, antioxidant depletion' },
      { name: 'Inflammatory Signalling', value: 76, description: 'NF-κB activation, IL-6/IL-8/TNF-α, mast cell degranulation' },
      { name: 'Pigmentation Dysregulation', value: 65, description: 'AhR-mediated MITF, oxidative melanogenesis, uneven tone' }
    ],
    molecularMarkers: ['AhR activation', 'CYP1A1/1B1 induction', 'NF-κB activation', 'Peroxynitrite', 'Carbonyl proteins'],
    timeConstants: ['AhR activation: τ ~ hours', 'Oxidative stress peak: τ ~ hours', 'Inflammatory response: τ ~ hours–days', 'Chronic remodelling: τ ~ weeks–months'],
    therapeuticTargets: ['AhR antagonists', 'Antioxidant barrier (Vit C, E, niacinamide)', 'Anti-pollution cleansing', 'Barrier reinforcement']
  }
]

const scaleColors = {
  molecular: 'bg-blue-100 text-blue-800',
  cellular: 'bg-orange-100 text-orange-800',
  tissue: 'bg-green-100 text-green-800',
  organ: 'bg-purple-100 text-purple-800'
}

const categoryColors = {
  Sebaceous: 'bg-orange-100 text-orange-800',
  Autoimmune: 'bg-red-100 text-red-800',
  Inflammatory: 'bg-purple-100 text-purple-800',
  Repair: 'bg-green-100 text-green-800',
  Chronobiology: 'bg-slate-100 text-slate-800',
  Environmental: 'bg-yellow-100 text-yellow-800'
}

const DiseaseModels = () => {
  const [selectedDisease, setSelectedDisease] = useState(null)
  const [categoryFilter, setCategoryFilter] = useState('All')

  const categories = ['All', ...Array.from(new Set(diseases.map(d => d.category)))]

  const filtered = categoryFilter === 'All'
    ? diseases
    : diseases.filter(d => d.category === categoryFilter)

  const disease = selectedDisease ? diseases.find(d => d.id === selectedDisease) : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Disease Models</h2>
            <p className="text-sm text-muted-foreground">
              Tensor field representations of skin pathologies
            </p>
          </div>
        </div>
        <p className="text-muted-foreground max-w-3xl">
          Each disease is modelled as a perturbation of the homeostatic skin tensor Ξ^&#123;skin&#125;.
          Explore the multiscale molecular, cellular, and tissue-level mechanisms underlying common
          skin conditions.
        </p>
      </motion.div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <Button
            key={cat}
            variant={categoryFilter === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => { setCategoryFilter(cat); setSelectedDisease(null) }}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Disease grid */}
      {!disease && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {filtered.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card
                className={`cursor-pointer hover:shadow-lg transition-all border-2 hover:border-opacity-50 ${d.borderClass}`}
                onClick={() => setSelectedDisease(d.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 ${d.colorClass} rounded-lg flex items-center justify-center`}>
                        <d.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{d.name}</CardTitle>
                        <code className="text-xs text-muted-foreground">{d.tensor}</code>
                      </div>
                    </div>
                    <Badge className={categoryColors[d.category]} variant="outline">
                      {d.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription className="text-xs line-clamp-3">{d.description}</CardDescription>
                  <div className="flex flex-wrap gap-1">
                    {d.affectedScales.map(s => (
                      <span key={s} className={`text-xs px-2 py-0.5 rounded-full font-medium ${scaleColors[s]}`}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{d.keyProcesses.length} key processes</span>
                    <ArrowRight className="w-3 h-3 ml-auto" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Disease detail view */}
      {disease && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <Button variant="outline" size="sm" onClick={() => setSelectedDisease(null)}>
            ← Back to all diseases
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column: overview */}
            <div className="lg:col-span-1 space-y-4">
              <Card className={`border-2 ${disease.borderClass}`}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${disease.colorClass} rounded-xl flex items-center justify-center`}>
                      <disease.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <CardTitle>{disease.name}</CardTitle>
                      <code className="text-sm text-muted-foreground">{disease.tensor}</code>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{disease.description}</p>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Affected Scales</p>
                    <div className="flex flex-wrap gap-1">
                      {disease.affectedScales.map(s => (
                        <span key={s} className={`text-xs px-2 py-1 rounded-full font-medium ${scaleColors[s]}`}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Key Molecular Markers</p>
                    <ul className="space-y-1">
                      {disease.molecularMarkers.map((m, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start space-x-1">
                          <span className="text-blue-500 mt-0.5">•</span>
                          <code>{m}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Time Constants</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {disease.timeConstants.map((t, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start space-x-2">
                        <span className="text-purple-500 mt-0.5">τ</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Therapeutic Targets</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {disease.therapeuticTargets.map((t, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start space-x-2">
                        <span className="text-green-500 mt-0.5">→</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right column: key processes */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Layers className="w-5 h-5" />
                    <span>Pathological Processes</span>
                  </CardTitle>
                  <CardDescription>
                    Relative intensity of each process in the disease state (arbitrary units normalized to peak)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {disease.keyProcesses.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      className="space-y-1"
                    >
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{p.name}</span>
                        <span className="text-muted-foreground">{p.value}%</span>
                      </div>
                      <Progress value={p.value} className="h-2" />
                      <p className="text-xs text-muted-foreground">{p.description}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Master equation context */}
              <Card className={disease.bgClass}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center space-x-2">
                    <Microscope className="w-4 h-4" />
                    <span>Tensor Field Representation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="font-mono text-xs bg-white/80 rounded-lg p-3 space-y-1 border">
                    <p className="text-slate-500">// Disease as tensor perturbation</p>
                    <p>∂{disease.tensor}/∂t = L_mol Ξ^mol + L_cell Ξ^cell + L_tiss Ξ^tiss</p>
                    <p className="text-slate-500 mt-1">// Plus cross-scale pathological coupling</p>
                    <p>+ Γ_disease[Ξ^mol, Ξ^cell, Ξ^tiss]</p>
                    <p className="text-slate-500 mt-1">// Deviation from homeostatic state</p>
                    <p>δΞ = {disease.tensor} − Ξ^&#123;healthy&#125;</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The disease state is represented as a structured perturbation δΞ of the healthy skin
                    tensor. Each pathological process modifies specific tensor components, creating a
                    characteristic signature that can be targeted therapeutically.
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

export default DiseaseModels
