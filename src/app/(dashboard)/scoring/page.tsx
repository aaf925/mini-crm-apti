const criteria = [
  { key: "COSTES", weight: "25%", sub: [
    { label: "C1. Licencias SaaS (5 us., año 1)", subweight: "20%" },
    { label: "C2. Implantación / consultoría", subweight: "20%" },
    { label: "C3. Migración desde Ejidosoft", subweight: "15%" },
    { label: "C4. Formación inicial", subweight: "15%" },
    { label: "C5. Mantenimiento año 2+", subweight: "30%" },
  ]},
  { key: "PLAZOS", weight: "10%", sub: [
    { label: "P1. Plazo hasta go-live (semanas)", subweight: "60%" },
    { label: "P2. Plan de implantación detallado", subweight: "40%" },
  ]},
  { key: "CALIDAD", weight: "15%", sub: [
    { label: "Q1. Requisitos RFP cubiertos", subweight: "25%" },
    { label: "Q2. Modelo SaaS real (nube pura)", subweight: "20%" },
    { label: "Q3. Código de barras / escáner", subweight: "15%" },
    { label: "Q4. RGPD / servidores UE", subweight: "15%" },
    { label: "Q5. Backups automáticos", subweight: "10%" },
    { label: "Q6. Valor añadido funcional", subweight: "15%" },
  ]},
  { key: "CONFIANZA", weight: "25%", sub: [
    { label: "CF1. Años de experiencia", subweight: "25%" },
    { label: "CF2. Especialización sectorial", subweight: "35%" },
    { label: "CF3. Localización / proximidad", subweight: "25%" },
    { label: "CF4. Solvencia / volumen empresa", subweight: "15%" },
  ]},
  { key: "PLAN", weight: "15%", sub: [
    { label: "PI1. Precio cerrado", subweight: "35%" },
    { label: "PI2. Formación detallada", subweight: "35%" },
    { label: "PI3. Soporte post-arranque", subweight: "30%" },
  ]},
  { key: "VALOR", weight: "10%", sub: [
    { label: "VA1. Diferenciadores específicos para SEP", subweight: "100%" },
  ]},
]

const baremes: { title: string, rows: [string, string][] }[] = [
  { title: "C1. Coste licencias SaaS (5 us., año 1)", rows: [
    ["Menos de 3.500 EUR/año", "1"], ["Entre 3.500 y 6.500 EUR/año", "0.5"], ["Más de 6.500 EUR/año", "0"],
  ]},
  { title: "C2. Coste implantación / consultoría", rows: [
    ["Incluida en licencia o menos de 4.000 EUR", "1"], ["Entre 4.000 y 8.000 EUR", "0.5"], ["Más de 8.000 EUR", "0"],
  ]},
  { title: "C3. Coste migración desde Ejidosoft", rows: [
    ["Incluida sin coste adicional", "1"], ["No incluida o coste adicional", "0"],
  ]},
  { title: "C4. Coste formación inicial", rows: [
    ["Incluida o menos de 1.500 EUR", "1"], ["Entre 1.500 y 3.000 EUR", "0.5"], ["Más de 3.000 EUR o solo trial", "0"],
  ]},
  { title: "C5. Coste mantenimiento / licencias año 2+", rows: [
    ["Menos de 2.500 EUR/año", "1"], ["Entre 2.500 y 5.500 EUR/año", "0.5"], ["Más de 5.500 EUR/año", "0"],
  ]},
  { title: "P1. Plazo hasta go-live (semanas)", rows: [
    ["Hasta 6 semanas", "1"], ["Entre 7 y 12 semanas", "0.5"], ["Más de 12 semanas o no especificado", "0"],
  ]},
  { title: "P2. Plan de implantación detallado", rows: [
    ["Plan completo con fases e hitos", "1"], ["Plan parcial sin estructura clara", "0.5"], ["Sin plan descrito", "0"],
  ]},
  { title: "Q1. Cobertura requisitos del RFP", rows: [
    ["Más del 85% cubiertos", "1"], ["Entre 70% y 85%", "0.5"], ["Menos del 70%", "0"],
  ]},
  { title: "Q2. Modelo SaaS real (nube pura)", rows: [
    ["SaaS 100% confirmado", "1"], ["No es SaaS puro (licencia + hosting)", "0"],
  ]},
  { title: "Q3. Código de barras / escáner", rows: [
    ["SÍ documentado en propuesta", "1"], ["No incluido o no confirmado", "0"],
  ]},
  { title: "Q4. RGPD / servidores UE", rows: [
    ["Confirmado explícitamente con detalle", "1"], ["Implícito por SaaS UE sin detalle", "0.5"], ["No especificado", "0"],
  ]},
  { title: "Q5. Backups automáticos", rows: [
    ["SÍ incluidos en suscripción", "1"], ["Con coste adicional o no especificado", "0"],
  ]},
  { title: "Q6. Valor añadido funcional", rows: [
    ["3 o más diferenciadores funcionales", "1"], ["1 o 2 diferenciadores relevantes", "0.5"], ["Diferenciadores genéricos", "0"],
  ]},
  { title: "CF1. Años de experiencia", rows: [
    ["Más de 25 años", "1"], ["Entre 10 y 25 años", "0.5"], ["Menos de 10 o no especificado", "0"],
  ]},
  { title: "CF2. Especialización sectorial", rows: [
    ["Especializado distribución agrícola Almería", "1"], ["Distribución industrial/suministros sin Almería", "0.5"], ["Generalista o sin especialización", "0"],
  ]},
  { title: "CF3. Localización / proximidad Almería", rows: [
    ["Sede en Almería con presencial garantizado", "1"], ["Andalucía o Levante (<300 km)", "0.5"], ["Resto España (>300 km)", "0"],
  ]},
  { title: "CF4. Solvencia / volumen empresa", rows: [
    ["Más de 1.000 clientes o gran empresa", "1"], ["Empresa mediana 20-100 empleados", "0.5"], ["Empresa pequeña o sin acreditar", "0"],
  ]},
  { title: "PI1. Precio cerrado", rows: [
    ["Precio 100% cerrado en todas las partidas", "1"], ["Mayoritariamente cerrado con partidas variables", "0.5"], ["Todo por horas o sin precio cerrado", "0"],
  ]},
  { title: "PI2. Formación detallada", rows: [
    ["Formación completa por perfiles con metodología", "1"], ["Formación en bolsa de horas sin detalle", "0.5"], ["Solo trial gratuito o recursos online", "0"],
  ]},
  { title: "PI3. Soporte post-arranque", rows: [
    ["Soporte ilimitado incluido en suscripción", "1"], ["Soporte limitado o acompañamiento temporal", "0.5"], ["Soporte por horas con coste adicional", "0"],
  ]},
  { title: "VA1. Diferenciadores específicos para SEP", rows: [
    ["Altamente relevantes para sector y empresa", "1"], ["Relevantes pero no específicos del sector", "0.5"], ["Genéricos o de poca relevancia", "0"],
  ]},
]

const CRITERIA_KEYS = ["COSTES", "PLAZOS", "CALIDAD", "CONFIANZA", "PLAN", "VALOR"]

const ranking: { name: string, short: string, scores: number[], total: number, category: string }[] = [
  { name: "Clave Informática", short: "ERPClave", scores: [18.75, 10, 15, 23.125, 15, 10], total: 91.875, category: "PRIORITARIO" },
  { name: "Clavei", short: "ClaveiGES PRO", scores: [18.75, 7, 15, 16.25, 15, 10], total: 82, category: "PRIORITARIO" },
  { name: "STEL Order", short: "BUSINESS", scores: [25, 10, 10.875, 10.625, 15, 0], total: 71.5, category: "RECOMENDADO" },
  { name: "Lógica Consultores", short: "Odoo SaaS", scores: [15.625, 7, 13.875, 16.875, 12.75, 5], total: 71.125, category: "RECOMENDADO" },
  { name: "Inforges", short: "Odoo Enterprise", scores: [22.5, 7, 15, 10, 10.5, 5], total: 70, category: "RECOMENDADO" },
  { name: "Daemon4", short: "Multiplo ERP", scores: [25, 3, 6.75, 15.625, 4.875, 10], total: 65.25, category: "RECOMENDADO" },
  { name: "Guaiu", short: "Odoo Almería", scores: [23.125, 4, 7.5, 6.25, 15, 0], total: 55.875, category: "COMPLEMENTARIO" },
  { name: "Vortex ERP", short: "VortexERP Cloud", scores: [21.25, 2, 7.5, 11.25, 7.5, 5], total: 54.5, category: "COMPLEMENTARIO" },
  { name: "Holded", short: "ERP Cloud", scores: [17.5, 8, 8.625, 6.875, 9.75, 0], total: 50.75, category: "COMPLEMENTARIO" },
  { name: "Aqua eSolutions", short: "Aqua Fer ERP", scores: [3.75, 0, 9.75, 4.375, 7.875, 5], total: 30.75, category: "NO RECOMENDADO" },
]

// Sorted by score descending
const evaluations = [
  { name: "Clave Informática — ERPClave", score: 91.875, category: "PRIORITARIO",
    subtotals: [18.75, 10, 15, 23.125, 15, 10] },
  { name: "Clavei — ClaveiGES PRO", score: 82, category: "PRIORITARIO",
    subtotals: [18.75, 7, 15, 16.25, 15, 10] },
  { name: "STEL Order — BUSINESS", score: 71.5, category: "RECOMENDADO",
    subtotals: [25, 10, 10.875, 10.625, 15, 0] },
  { name: "Lógica Consultores — Odoo SaaS", score: 71.125, category: "RECOMENDADO",
    subtotals: [15.625, 7, 13.875, 16.875, 12.75, 5] },
  { name: "Inforges — Odoo Enterprise", score: 70, category: "RECOMENDADO",
    subtotals: [22.5, 7, 15, 10, 10.5, 5] },
  { name: "Daemon4 — Multiplo ERP", score: 65.25, category: "RECOMENDADO",
    subtotals: [25, 3, 6.75, 15.625, 4.875, 10] },
  { name: "Guaiu — Odoo Almería", score: 55.875, category: "COMPLEMENTARIO",
    subtotals: [23.125, 4, 7.5, 6.25, 15, 0] },
  { name: "Vortex ERP — VortexERP Cloud", score: 54.5, category: "COMPLEMENTARIO",
    subtotals: [21.25, 2, 7.5, 11.25, 7.5, 5] },
  { name: "Holded — ERP Cloud", score: 50.75, category: "COMPLEMENTARIO",
    subtotals: [17.5, 8, 8.625, 6.875, 9.75, 0] },
  { name: "Aqua eSolutions — Aqua Fer ERP", score: 30.75, category: "NO RECOMENDADO",
    subtotals: [3.75, 0, 9.75, 4.375, 7.875, 5] },
]

// Detailed subcriteria for each evaluation
const evalDetails: Record<string, { label: string, subweight: string, eval: string, points: number }[]> = {
  "Clave Informática — ERPClave": [
    { label: "C1. Licencias SaaS", subweight: "20%", eval: "0.5", points: 2.5 },
    { label: "C2. Implantación", subweight: "20%", eval: "1", points: 5 },
    { label: "C3. Migración", subweight: "15%", eval: "1", points: 3.75 },
    { label: "C4. Formación", subweight: "15%", eval: "1", points: 3.75 },
    { label: "C5. Mantenimiento año 2+", subweight: "30%", eval: "0.5", points: 3.75 },
    { label: "P1. Plazo go-live", subweight: "60%", eval: "1", points: 6 },
    { label: "P2. Plan implantación", subweight: "40%", eval: "1", points: 4 },
    { label: "Q1. Requisitos RFP", subweight: "25%", eval: "1", points: 3.75 },
    { label: "Q2. SaaS real", subweight: "20%", eval: "1", points: 3 },
    { label: "Q3. Código barras", subweight: "15%", eval: "1", points: 2.25 },
    { label: "Q4. RGPD/UE", subweight: "15%", eval: "1", points: 2.25 },
    { label: "Q5. Backups", subweight: "10%", eval: "1", points: 1.5 },
    { label: "Q6. Valor añadido", subweight: "15%", eval: "1", points: 2.25 },
    { label: "CF1. Experiencia", subweight: "25%", eval: "1", points: 6.25 },
    { label: "CF2. Especialización", subweight: "35%", eval: "1", points: 8.75 },
    { label: "CF3. Localización", subweight: "25%", eval: "1", points: 6.25 },
    { label: "CF4. Solvencia", subweight: "15%", eval: "0.5", points: 1.875 },
    { label: "PI1. Precio cerrado", subweight: "35%", eval: "1", points: 5.25 },
    { label: "PI2. Formación detallada", subweight: "35%", eval: "1", points: 5.25 },
    { label: "PI3. Soporte post-arranque", subweight: "30%", eval: "1", points: 4.5 },
    { label: "VA1. Diferenciadores SEP", subweight: "100%", eval: "1", points: 10 },
  ],
  "Clavei — ClaveiGES PRO": [
    { label: "C1. Licencias SaaS", subweight: "20%", eval: "1", points: 5 },
    { label: "C2. Implantación", subweight: "20%", eval: "0.5", points: 2.5 },
    { label: "C3. Migración", subweight: "15%", eval: "1", points: 3.75 },
    { label: "C4. Formación", subweight: "15%", eval: "1", points: 3.75 },
    { label: "C5. Mantenimiento año 2+", subweight: "30%", eval: "0.5", points: 3.75 },
    { label: "P1. Plazo go-live", subweight: "60%", eval: "0.5", points: 3 },
    { label: "P2. Plan implantación", subweight: "40%", eval: "1", points: 4 },
    { label: "Q1. Requisitos RFP", subweight: "25%", eval: "1", points: 3.75 },
    { label: "Q2. SaaS real", subweight: "20%", eval: "1", points: 3 },
    { label: "Q3. Código barras", subweight: "15%", eval: "1", points: 2.25 },
    { label: "Q4. RGPD/UE", subweight: "15%", eval: "1", points: 2.25 },
    { label: "Q5. Backups", subweight: "10%", eval: "1", points: 1.5 },
    { label: "Q6. Valor añadido", subweight: "15%", eval: "1", points: 2.25 },
    { label: "CF1. Experiencia", subweight: "25%", eval: "1", points: 6.25 },
    { label: "CF2. Especialización", subweight: "35%", eval: "0", points: 0 },
    { label: "CF3. Localización", subweight: "25%", eval: "1", points: 6.25 },
    { label: "CF4. Solvencia", subweight: "15%", eval: "1", points: 3.75 },
    { label: "PI1. Precio cerrado", subweight: "35%", eval: "1", points: 5.25 },
    { label: "PI2. Formación detallada", subweight: "35%", eval: "1", points: 5.25 },
    { label: "PI3. Soporte post-arranque", subweight: "30%", eval: "1", points: 4.5 },
    { label: "VA1. Diferenciadores SEP", subweight: "100%", eval: "1", points: 10 },
  ],
  "STEL Order — BUSINESS": [
    { label: "C1. Licencias SaaS", subweight: "20%", eval: "1", points: 5 },
    { label: "C2. Implantación", subweight: "20%", eval: "1", points: 5 },
    { label: "C3. Migración", subweight: "15%", eval: "1", points: 3.75 },
    { label: "C4. Formación", subweight: "15%", eval: "1", points: 3.75 },
    { label: "C5. Mantenimiento año 2+", subweight: "30%", eval: "1", points: 7.5 },
    { label: "P1. Plazo go-live", subweight: "60%", eval: "1", points: 6 },
    { label: "P2. Plan implantación", subweight: "40%", eval: "1", points: 4 },
    { label: "Q1. Requisitos RFP", subweight: "25%", eval: "0.5", points: 1.875 },
    { label: "Q2. SaaS real", subweight: "20%", eval: "1", points: 3 },
    { label: "Q3. Código barras", subweight: "15%", eval: "1", points: 2.25 },
    { label: "Q4. RGPD/UE", subweight: "15%", eval: "1", points: 2.25 },
    { label: "Q5. Backups", subweight: "10%", eval: "1", points: 1.5 },
    { label: "Q6. Valor añadido", subweight: "15%", eval: "0", points: 0 },
    { label: "CF1. Experiencia", subweight: "25%", eval: "0.5", points: 3.125 },
    { label: "CF2. Especialización", subweight: "35%", eval: "0.5", points: 4.375 },
    { label: "CF3. Localización", subweight: "25%", eval: "0.5", points: 3.125 },
    { label: "CF4. Solvencia", subweight: "15%", eval: "0", points: 0 },
    { label: "PI1. Precio cerrado", subweight: "35%", eval: "1", points: 5.25 },
    { label: "PI2. Formación detallada", subweight: "35%", eval: "1", points: 5.25 },
    { label: "PI3. Soporte post-arranque", subweight: "30%", eval: "1", points: 4.5 },
    { label: "VA1. Diferenciadores SEP", subweight: "100%", eval: "0", points: 0 },
  ],
  "Daemon4 — Multiplo ERP": [
    { label: "C1. Licencias SaaS", subweight: "20%", eval: "1", points: 5 },
    { label: "C2. Implantación", subweight: "20%", eval: "1", points: 5 },
    { label: "C3. Migración", subweight: "15%", eval: "1", points: 3.75 },
    { label: "C4. Formación", subweight: "15%", eval: "1", points: 3.75 },
    { label: "C5. Mantenimiento año 2+", subweight: "30%", eval: "1", points: 7.5 },
    { label: "P1. Plazo go-live", subweight: "60%", eval: "0.5", points: 3 },
    { label: "P2. Plan implantación", subweight: "40%", eval: "0", points: 0 },
    { label: "Q1. Requisitos RFP", subweight: "25%", eval: "0", points: 0 },
    { label: "Q2. SaaS real", subweight: "20%", eval: "0", points: 0 },
    { label: "Q3. Código barras", subweight: "15%", eval: "1", points: 2.25 },
    { label: "Q4. RGPD/UE", subweight: "15%", eval: "1", points: 2.25 },
    { label: "Q5. Backups", subweight: "10%", eval: "0", points: 0 },
    { label: "Q6. Valor añadido", subweight: "15%", eval: "1", points: 2.25 },
    { label: "CF1. Experiencia", subweight: "25%", eval: "1", points: 6.25 },
    { label: "CF2. Especialización", subweight: "35%", eval: "0.5", points: 4.375 },
    { label: "CF3. Localización", subweight: "25%", eval: "0.5", points: 3.125 },
    { label: "CF4. Solvencia", subweight: "15%", eval: "0.5", points: 1.875 },
    { label: "PI1. Precio cerrado", subweight: "35%", eval: "0", points: 0 },
    { label: "PI2. Formación detallada", subweight: "35%", eval: "0.5", points: 2.625 },
    { label: "PI3. Soporte post-arranque", subweight: "30%", eval: "0.5", points: 2.25 },
    { label: "VA1. Diferenciadores SEP", subweight: "100%", eval: "1", points: 10 },
  ],
}

const CATEGORY_COLORS: Record<string, string> = {
  "PRIORITARIO": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  "RECOMENDADO": "text-blue-400 bg-blue-500/10 border-blue-500/20",
  "COMPLEMENTARIO": "text-amber-400 bg-amber-500/10 border-amber-500/20",
  "NO RECOMENDADO": "text-red-400 bg-red-500/10 border-red-500/20",
}

export default function ScoringPage() {
  return (
    <div className="p-8 space-y-10 max-w-[1600px] mx-auto animate-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-on-surface uppercase">
          Matriz de <span className="text-primary italic font-black">Evaluación</span>
        </h1>
        <p className="text-sm text-on-surface-variant mt-1 font-medium italic">
          Scoring ponderado · 21 subcriterios · Costes homogeneizados a 5 usuarios · v10
        </p>
      </div>

      {/* Hero: Top 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ranking.slice(0, 3).map((r, i) => (
          <div key={r.name} className={`glass-panel p-6 ${i === 0 ? "ring-2 ring-emerald-500/30 bg-emerald-500/5" : ""}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${
                i === 0 ? "bg-amber-500/20 text-amber-400" : i === 1 ? "bg-slate-400/20 text-slate-400" : "bg-amber-700/20 text-amber-700"
              }`}>{i + 1}</span>
              <div>
                <h3 className="text-lg font-black tracking-tight">{r.name}</h3>
                <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-widest">{r.short}</p>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-black tracking-tighter text-emerald-400">{r.total.toFixed(1)}</span>
              <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider ${CATEGORY_COLORS[r.category]}`}>{r.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Ranking Table */}
      <div className="glass-panel overflow-hidden">
        <div className="p-6 border-b border-outline-variant/10">
          <h2 className="text-lg font-black uppercase tracking-widest flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">leaderboard</span>
            Ranking Comparativo
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-4 py-3 text-[9px] font-black tracking-widest text-on-surface-variant/60">#</th>
                <th className="px-4 py-3 text-[9px] font-black tracking-widest text-on-surface-variant/60">Proveedor</th>
                {CRITERIA_KEYS.map(k => (
                  <th key={k} className="px-3 py-3 text-[8px] font-black tracking-widest text-on-surface-variant/60 text-center">{k}</th>
                ))}
                <th className="px-4 py-3 text-[9px] font-black tracking-widest text-emerald-400 text-center bg-emerald-500/5">TOTAL</th>
                <th className="px-4 py-3 text-[9px] font-black tracking-widest text-on-surface-variant/60 text-center">Categoría</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {ranking.map((r, i) => (
                <tr key={r.name} className="hover:bg-surface-container-highest/30 transition-colors">
                  <td className="px-4 py-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black ${
                      i === 0 ? "bg-amber-500/20 text-amber-400" : i === 1 ? "bg-slate-400/20 text-slate-400" : i === 2 ? "bg-amber-700/20 text-amber-700" : "bg-surface-container-high text-on-surface-variant/60"
                    }`}>{i + 1}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs font-bold">{r.name}</p>
                    <p className="text-[9px] text-on-surface-variant/60">{r.short}</p>
                  </td>
                  {r.scores.map((s, j) => (
                    <td key={j} className="px-3 py-3 text-center text-xs font-mono text-on-surface-variant/80">{s.toFixed(1)}</td>
                  ))}
                  <td className="px-4 py-3 text-center bg-emerald-500/5">
                    <span className="text-base font-black text-emerald-400">{r.total.toFixed(1)}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${CATEGORY_COLORS[r.category]}`}>{r.category}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-outline-variant/10 flex gap-6 text-[9px] text-on-surface-variant/40">
          <span><span className="inline-block w-2 h-2 rounded bg-emerald-500/50 mr-1"></span> PRIORITARIO ≥ 80</span>
          <span><span className="inline-block w-2 h-2 rounded bg-blue-500/50 mr-1"></span> RECOMENDADO 60-79</span>
          <span><span className="inline-block w-2 h-2 rounded bg-amber-500/50 mr-1"></span> COMPLEMENTARIO 40-59</span>
          <span><span className="inline-block w-2 h-2 rounded bg-red-500/50 mr-1"></span> NO RECOMENDADO &lt; 40</span>
        </div>
      </div>

      {/* Criteria */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {criteria.map(c => (
          <div key={c.key} className="glass-panel p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-black uppercase tracking-widest">{c.key}</h3>
              <span className="text-sm font-black text-primary">{c.weight}</span>
            </div>
            <div className="space-y-1.5">
              {c.sub.map(s => (
                <div key={s.label} className="flex justify-between text-[8px] text-on-surface-variant/70">
                  <span>{s.label}</span>
                  <span className="font-bold">{s.subweight}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Baremes */}
      <div className="glass-panel p-6">
        <h2 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">table</span>
          Tablas de Evaluación (21 subcriterios)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {baremes.map(b => (
            <div key={b.title} className="bg-surface-container-highest/30 rounded-xl p-4">
              <h3 className="text-[9px] font-black uppercase tracking-widest text-on-surface mb-2">{b.title}</h3>
              <div className="space-y-1">
                {b.rows.map(([cond, val]) => (
                  <div key={cond} className="flex justify-between items-center text-[8px]">
                    <span className="text-on-surface-variant/70">{cond}</span>
                    <span className="font-black text-primary w-6 text-center">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Evaluations - sorted by score descending */}
      <div className="space-y-6">
        <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">assignment</span>
          Evaluaciones Individuales
        </h2>
        <p className="text-[10px] text-on-surface-variant/40 -mt-4">Ordenadas por puntuación (mejor a peor)</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {evaluations.map(ev => (
            <details key={ev.name} className="glass-panel group open:border-primary/40 transition-all overflow-hidden">
              <summary className="p-5 cursor-pointer hover:bg-surface-container-highest/20 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-black text-sm text-primary">
                    {ev.score.toFixed(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-black tracking-tight">{ev.name.split(" —")[0]}</h3>
                    <p className="text-[10px] text-on-surface-variant/60">{ev.name.split("— ")[1] || ""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${CATEGORY_COLORS[ev.category]}`}>{ev.category}</span>
                  <span className="material-symbols-outlined text-on-surface-variant/40 group-open:rotate-180 transition-transform">expand_more</span>
                </div>
              </summary>
              <div className="px-5 pb-5 space-y-2">
                {CRITERIA_KEYS.map((ck, ci) => (
                  <div key={ck}>
                    <div className="flex justify-between items-center py-2 mt-2 border-t border-outline-variant/10 first:border-t-0 first:mt-0">
                      <span className="text-[9px] font-black uppercase tracking-widest text-on-surface/80">{ck}</span>
                      <span className="text-[10px] font-black text-primary">{ev.subtotals[ci].toFixed(1)}</span>
                    </div>
                    {evalDetails[ev.name]?.filter(s => s.label.startsWith(ck[0] === "C" ? "C" : ck[0])).slice(0, 5).map(s => (
                      <div key={s.label} className="flex items-center gap-3 py-1">
                        <span className="text-[8px] text-on-surface-variant/70 w-36">{s.label}</span>
                        <div className="flex-1 h-1 bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${parseFloat(s.eval) * 100}%` }} />
                        </div>
                        <span className="text-[8px] font-mono text-on-surface-variant/60 w-5 text-center">{s.eval}</span>
                        <span className="text-[8px] font-black text-primary w-10 text-right">{s.points.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="flex justify-between items-center pt-3 mt-3 border-t border-outline-variant/10">
                  <span className="text-[9px] font-black uppercase tracking-widest">TOTAL</span>
                  <span className="text-base font-black text-emerald-400">{ev.score.toFixed(3)} / 100</span>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
