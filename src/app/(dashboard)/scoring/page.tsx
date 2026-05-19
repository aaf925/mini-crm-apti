import Link from "next/link"

const criteria = [
  { key: "COSTES", weight: "25%", sub: [
    { label: "Coste total año 1", subweight: "70%" },
    { label: "Mantenimiento año 2+", subweight: "30%" },
  ]},
  { key: "PLAZOS", weight: "10%", sub: [
    { label: "Tiempo implantación (semanas)", subweight: "60%" },
    { label: "Plan detallado con fases", subweight: "40%" },
  ]},
  { key: "CALIDAD", weight: "15%", sub: [
    { label: "% Requisitos RFP cubiertos", subweight: "40%" },
    { label: "Modelo SaaS real", subweight: "35%" },
    { label: "Valor añadido / diferencial", subweight: "25%" },
  ]},
  { key: "CONFIANZA", weight: "25%", sub: [
    { label: "Años de funcionamiento", subweight: "30%" },
    { label: "Especialización sectorial", subweight: "40%" },
    { label: "Localización / proximidad", subweight: "30%" },
  ]},
  { key: "PLAN IMPLANT.", weight: "15%", sub: [
    { label: "Precio cerrado", subweight: "50%" },
    { label: "Formación detallada", subweight: "50%" },
  ]},
  { key: "VALOR AÑAD.", weight: "10%", sub: [
    { label: "Elementos diferenciales", subweight: "100%" },
  ]},
]

const baremes: { title: string, rows: [string, string][] }[] = [
  { title: "Costes — Coste total año 1", rows: [
    ["Menos de 5.000 €", "1"], ["Entre 5.000 y 10.000 €", "0.75"], ["Entre 10.000 y 16.000 €", "0.5"], ["Entre 16.000 y 22.000 €", "0.25"], ["Más de 22.000 €", "0"],
  ]},
  { title: "Costes — Mantenimiento / licencias año 2+", rows: [
    ["Menos de 2.500 €/año", "1"], ["Entre 2.500 y 5.000 €/año", "0.75"], ["Entre 5.000 y 7.000 €/año", "0.5"], ["Más de 7.000 €/año", "0"],
  ]},
  { title: "Plazos — Semanas hasta go-live", rows: [
    ["Hasta 10 semanas", "1"], ["Entre 11 y 15 semanas", "0.5"], ["Más de 15 semanas o no especificado", "0"],
  ]},
  { title: "Plazos — Plan detallado con fases", rows: [
    ["Fases, duración, hitos y actividades", "1"], ["Descripción parcial", "0.5"], ["Sin metodología", "0"],
  ]},
  { title: "Calidad — % Requisitos RFP cubiertos", rows: [
    ["100%", "1"], ["75-99%", "0.75"], ["50-74%", "0.5"], ["Menos del 50%", "0"],
  ]},
  { title: "Calidad — SaaS real", rows: [
    ["SaaS 100% datos UE, sin instalación local", "1"], ["SaaS / cloud sin confirmar UE", "0.5"], ["Licencia on-premise o mixto", "0"],
  ]},
  { title: "Calidad — Funcionalidades extra / valor añadido", rows: [
    ["3 o más elementos relevantes", "1"], ["1 o 2 elementos", "0.5"], ["Ninguno", "0"],
  ]},
  { title: "Confianza — Años de funcionamiento", rows: [
    ["Más de 20 años", "1"], ["Entre 10 y 20 años", "0.75"], ["Entre 5 y 10 años", "0.5"], ["Menos de 5 o no especificado", "0"],
  ]},
  { title: "Confianza — Especialización en distribución / agrícola", rows: [
    ["Especialización demostrada con referencias", "1"], ["Distribución general sin especialización", "0.5"], ["Sin experiencia sectorial", "0"],
  ]},
  { title: "Confianza — Localización / proximidad Almería", rows: [
    ["Almería ciudad — presencial", "1"], ["Andalucía o Murcia/Levante (<250km)", "0.75"], ["Resto de España", "0.5"], ["Internacional", "0"],
  ]},
  { title: "Plan — Precio cerrado", rows: [
    ["Precio cerrado en todas las partidas", "1"], ["Parcialmente cerrado", "0.5"], ["Todo por horas / sin cerrar", "0"],
  ]},
  { title: "Plan — Formación detallada", rows: [
    ["Formación completa con horas y perfiles", "1"], ["Formación en bolsa sin detallar", "0.5"], ["No incluida", "0"],
  ]},
]

const ranking: { name: string, short: string, scores: number[], total: number, isProvisional?: boolean }[] = [
  { name: "Clave Informática", short: "ERPClave", scores: [14.38, 10, 13.5, 25, 15, 10], total: 87.88 },
  { name: "Daemon4", short: "Multiplo ERP", scores: [20.62, 8, 13.5, 23.12, 11.25, 10], total: 86.50 },
  { name: "Inforges", short: "SAP B1 Cloud", scores: [20.62, 7, 13.5, 18.12, 15, 10], total: 84.25, isProvisional: true },
  { name: "Clavei", short: "ClaveiGES PRO", scores: [12.5, 7, 13.5, 22.5, 13.12, 10], total: 78.62 },
  { name: "Lógica Consultores", short: "Odoo SaaS", scores: [10, 7, 15, 21.25, 15, 10], total: 78.25 },
  { name: "Vortex ERP", short: "VortexERP", scores: [23.12, 2, 9.38, 18.12, 7.5, 7.5], total: 67.62 },
  { name: "Guaiu", short: "Odoo Almería", scores: [20.62, 2, 11.62, 12.5, 13.12, 7.5], total: 67.36 },
  { name: "Holded", short: "ERP Cloud", scores: [20.62, 6, 11.62, 9.38, 7.5, 5], total: 60.12 },
  { name: "Aqua eSolutions", short: "Aqua Fer ERP", scores: [0, 0, 10.88, 15.62, 13.12, 10], total: 49.62 },
  { name: "STEL Order", short: "ERP Cloud", scores: [0, 0, 5.25, 16.25, 0, 0], total: 21.5, isProvisional: true },
]

const evaluations: { name: string, score: number, sub: { label: string, subweight: string, eval: string, points: number }[] }[] = [
  { name: "Daemon4 — Multiplo ERP", score: 86.5,
    sub: [
      { label: "Coste total año 1", subweight: "70%", eval: "0.75", points: 13.125 },
      { label: "Mantenimiento año 2+", subweight: "30%", eval: "1", points: 7.5 },
      { label: "Tiempo implantación", subweight: "60%", eval: "1", points: 6 },
      { label: "Plan con fases", subweight: "40%", eval: "0.5", points: 2 },
      { label: "% Requisitos RFP", subweight: "40%", eval: "0.75", points: 4.5 },
      { label: "SaaS real", subweight: "35%", eval: "1", points: 5.25 },
      { label: "Valor añadido", subweight: "25%", eval: "1", points: 3.75 },
      { label: "Años funcionamiento", subweight: "30%", eval: "1", points: 7.5 },
      { label: "Especialización sector", subweight: "40%", eval: "1", points: 10 },
      { label: "Localización", subweight: "30%", eval: "0.75", points: 5.625 },
      { label: "Precio cerrado", subweight: "50%", eval: "1", points: 7.5 },
      { label: "Formación detallada", subweight: "50%", eval: "0.5", points: 3.75 },
      { label: "Elementos diferenciales", subweight: "100%", eval: "1", points: 10 },
    ]
  },
  { name: "Lógica Consultores — Odoo SaaS", score: 78.25,
    sub: [
      { label: "Coste total año 1", subweight: "70%", eval: "0.25", points: 4.375 },
      { label: "Mantenimiento año 2+", subweight: "30%", eval: "0.75", points: 5.625 },
      { label: "Tiempo implantación", subweight: "60%", eval: "0.5", points: 3 },
      { label: "Plan con fases", subweight: "40%", eval: "1", points: 4 },
      { label: "% Requisitos RFP", subweight: "40%", eval: "1", points: 6 },
      { label: "SaaS real", subweight: "35%", eval: "1", points: 5.25 },
      { label: "Valor añadido", subweight: "25%", eval: "1", points: 3.75 },
      { label: "Años funcionamiento", subweight: "30%", eval: "0.75", points: 5.625 },
      { label: "Especialización sector", subweight: "40%", eval: "1", points: 10 },
      { label: "Localización", subweight: "30%", eval: "0.75", points: 5.625 },
      { label: "Precio cerrado", subweight: "50%", eval: "1", points: 7.5 },
      { label: "Formación detallada", subweight: "50%", eval: "1", points: 7.5 },
      { label: "Elementos diferenciales", subweight: "100%", eval: "1", points: 10 },
    ]
  },
  { name: "Clave Informática — ERPClave", score: 87.88,
    sub: [
      { label: "Coste total año 1", subweight: "70%", eval: "0.5", points: 8.75 },
      { label: "Mantenimiento año 2+", subweight: "30%", eval: "0.75", points: 5.625 },
      { label: "Tiempo implantación", subweight: "60%", eval: "1", points: 6 },
      { label: "Plan con fases", subweight: "40%", eval: "1", points: 4 },
      { label: "% Requisitos RFP", subweight: "40%", eval: "0.75", points: 4.5 },
      { label: "SaaS real", subweight: "35%", eval: "1", points: 5.25 },
      { label: "Valor añadido", subweight: "25%", eval: "1", points: 3.75 },
      { label: "Años funcionamiento", subweight: "30%", eval: "1", points: 7.5 },
      { label: "Especialización sector", subweight: "40%", eval: "1", points: 10 },
      { label: "Localización", subweight: "30%", eval: "1", points: 7.5 },
      { label: "Precio cerrado", subweight: "50%", eval: "1", points: 7.5 },
      { label: "Formación detallada", subweight: "50%", eval: "1", points: 7.5 },
      { label: "Elementos diferenciales", subweight: "100%", eval: "1", points: 10 },
    ]
  },
  { name: "Clavei — ClaveiGES PRO", score: 78.62,
    sub: [
      { label: "Coste total año 1", subweight: "70%", eval: "0.5", points: 8.75 },
      { label: "Mantenimiento año 2+", subweight: "30%", eval: "0.5", points: 3.75 },
      { label: "Tiempo implantación", subweight: "60%", eval: "0.5", points: 3 },
      { label: "Plan con fases", subweight: "40%", eval: "1", points: 4 },
      { label: "% Requisitos RFP", subweight: "40%", eval: "0.75", points: 4.5 },
      { label: "SaaS real", subweight: "35%", eval: "1", points: 5.25 },
      { label: "Valor añadido", subweight: "25%", eval: "1", points: 3.75 },
      { label: "Años funcionamiento", subweight: "30%", eval: "1", points: 7.5 },
      { label: "Especialización sector", subweight: "40%", eval: "0.75", points: 7.5 },
      { label: "Localización", subweight: "30%", eval: "1", points: 7.5 },
      { label: "Precio cerrado", subweight: "50%", eval: "1", points: 7.5 },
      { label: "Formación detallada", subweight: "50%", eval: "0.75", points: 5.625 },
      { label: "Elementos diferenciales", subweight: "100%", eval: "1", points: 10 },
    ]
  },
  { name: "Guaiu — Odoo Almería", score: 67.36,
    sub: [
      { label: "Coste total año 1", subweight: "70%", eval: "0.75", points: 13.125 },
      { label: "Mantenimiento año 2+", subweight: "30%", eval: "1", points: 7.5 },
      { label: "Tiempo implantación", subweight: "60%", eval: "0", points: 0 },
      { label: "Plan con fases", subweight: "40%", eval: "0.5", points: 2 },
      { label: "% Requisitos RFP", subweight: "40%", eval: "0.75", points: 4.5 },
      { label: "SaaS real", subweight: "35%", eval: "1", points: 5.25 },
      { label: "Valor añadido", subweight: "25%", eval: "0.5", points: 1.875 },
      { label: "Años funcionamiento", subweight: "30%", eval: "0", points: 0 },
      { label: "Especialización sector", subweight: "40%", eval: "0.5", points: 5 },
      { label: "Localización", subweight: "30%", eval: "1", points: 7.5 },
      { label: "Precio cerrado", subweight: "50%", eval: "1", points: 7.5 },
      { label: "Formación detallada", subweight: "50%", eval: "0.75", points: 5.625 },
      { label: "Elementos diferenciales", subweight: "100%", eval: "0.75", points: 7.5 },
    ]
  },
  { name: "Holded — ERP Cloud", score: 60.12,
    sub: [
      { label: "Coste total año 1", subweight: "70%", eval: "0.75", points: 13.125 },
      { label: "Mantenimiento año 2+", subweight: "30%", eval: "1", points: 7.5 },
      { label: "Tiempo implantación", subweight: "60%", eval: "1", points: 6 },
      { label: "Plan con fases", subweight: "40%", eval: "0", points: 0 },
      { label: "% Requisitos RFP", subweight: "40%", eval: "0.75", points: 4.5 },
      { label: "SaaS real", subweight: "35%", eval: "1", points: 5.25 },
      { label: "Valor añadido", subweight: "25%", eval: "0.5", points: 1.875 },
      { label: "Años funcionamiento", subweight: "30%", eval: "0.75", points: 5.625 },
      { label: "Especialización sector", subweight: "40%", eval: "0", points: 0 },
      { label: "Localización", subweight: "30%", eval: "0.5", points: 3.75 },
      { label: "Precio cerrado", subweight: "50%", eval: "0.5", points: 3.75 },
      { label: "Formación detallada", subweight: "50%", eval: "0.5", points: 3.75 },
      { label: "Elementos diferenciales", subweight: "100%", eval: "0.5", points: 5 },
    ]
  },
  { name: "Vortex ERP — VortexERP Cloud", score: 67.62,
    sub: [
      { label: "Coste total año 1", subweight: "70%", eval: "1", points: 17.5 },
      { label: "Mantenimiento año 2+", subweight: "30%", eval: "0.75", points: 5.625 },
      { label: "Tiempo implantación", subweight: "60%", eval: "0", points: 0 },
      { label: "Plan con fases", subweight: "40%", eval: "0.5", points: 2 },
      { label: "% Requisitos RFP", subweight: "40%", eval: "0.5", points: 3 },
      { label: "SaaS real", subweight: "35%", eval: "0.5", points: 2.625 },
      { label: "Valor añadido", subweight: "25%", eval: "1", points: 3.75 },
      { label: "Años funcionamiento", subweight: "30%", eval: "1", points: 7.5 },
      { label: "Especialización sector", subweight: "40%", eval: "0.5", points: 5 },
      { label: "Localización", subweight: "30%", eval: "0.75", points: 5.625 },
      { label: "Precio cerrado", subweight: "50%", eval: "0.5", points: 3.75 },
      { label: "Formación detallada", subweight: "50%", eval: "0.5", points: 3.75 },
      { label: "Elementos diferenciales", subweight: "100%", eval: "0.75", points: 7.5 },
    ]
  },
  { name: "Aqua eSolutions — Aqua Fer ERP", score: 49.62,
    sub: [
      { label: "Coste total año 1", subweight: "70%", eval: "0", points: 0 },
      { label: "Mantenimiento año 2+", subweight: "30%", eval: "0", points: 0 },
      { label: "Tiempo implantación", subweight: "60%", eval: "0", points: 0 },
      { label: "Plan con fases", subweight: "40%", eval: "0", points: 0 },
      { label: "% Requisitos RFP", subweight: "40%", eval: "0.75", points: 4.5 },
      { label: "SaaS real", subweight: "35%", eval: "0.5", points: 2.625 },
      { label: "Valor añadido", subweight: "25%", eval: "1", points: 3.75 },
      { label: "Años funcionamiento", subweight: "30%", eval: "0", points: 0 },
      { label: "Especialización sector", subweight: "40%", eval: "1", points: 10 },
      { label: "Localización", subweight: "30%", eval: "0.75", points: 5.625 },
      { label: "Precio cerrado", subweight: "50%", eval: "1", points: 7.5 },
      { label: "Formación detallada", subweight: "50%", eval: "0.75", points: 5.625 },
      { label: "Elementos diferenciales", subweight: "100%", eval: "1", points: 10 },
    ]
  },
  { name: "STEL Order — ERP Cloud", score: 21.5,
    sub: [
      { label: "Coste total año 1", subweight: "70%", eval: "0", points: 0 },
      { label: "Mantenimiento año 2+", subweight: "30%", eval: "0", points: 0 },
      { label: "Tiempo implantación", subweight: "60%", eval: "0", points: 0 },
      { label: "Plan con fases", subweight: "40%", eval: "0", points: 0 },
      { label: "% Requisitos RFP", subweight: "40%", eval: "0", points: 0 },
      { label: "SaaS real", subweight: "35%", eval: "1", points: 5.25 },
      { label: "Valor añadido", subweight: "25%", eval: "0", points: 0 },
      { label: "Años funcionamiento", subweight: "30%", eval: "0.75", points: 5.625 },
      { label: "Especialización sector", subweight: "40%", eval: "0.5", points: 5 },
      { label: "Localización", subweight: "30%", eval: "0.75", points: 5.625 },
      { label: "Precio cerrado", subweight: "50%", eval: "0", points: 0 },
      { label: "Formación detallada", subweight: "50%", eval: "0", points: 0 },
      { label: "Elementos diferenciales", subweight: "100%", eval: "0", points: 0 },
    ]
  },
  { name: "Inforges — Odoo Enterprise OpenRed", score: 84.25,
    sub: [
      { label: "Coste total año 1", subweight: "70%", eval: "0.75", points: 13.125 },
      { label: "Mantenimiento año 2+", subweight: "30%", eval: "1", points: 7.5 },
      { label: "Tiempo implantación", subweight: "60%", eval: "0.5", points: 3 },
      { label: "Plan con fases", subweight: "40%", eval: "1", points: 4 },
      { label: "% Requisitos RFP", subweight: "40%", eval: "0.75", points: 4.5 },
      { label: "SaaS real", subweight: "35%", eval: "1", points: 5.25 },
      { label: "Valor añadido", subweight: "25%", eval: "1", points: 3.75 },
      { label: "Años funcionamiento", subweight: "30%", eval: "1", points: 7.5 },
      { label: "Especialización sector", subweight: "40%", eval: "0.5", points: 5 },
      { label: "Localización", subweight: "30%", eval: "0.75", points: 5.625 },
      { label: "Precio cerrado", subweight: "50%", eval: "1", points: 7.5 },
      { label: "Formación detallada", subweight: "50%", eval: "1", points: 7.5 },
      { label: "Elementos diferenciales", subweight: "100%", eval: "1", points: 10 },
    ]
  },
]

const CRITERIA_KEYS = ["COSTES", "PLAZOS", "CALIDAD", "CONFIANZA", "PLAN IMPLANT.", "VALOR AÑAD."]

export default function ScoringPage() {
  return (
    <div className="p-8 space-y-10 max-w-[1600px] mx-auto animate-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-on-surface uppercase">
          Matriz de <span className="text-primary italic font-black">Evaluación</span>
        </h1>
        <p className="text-sm text-on-surface-variant mt-1 font-medium italic">
          Scoring ponderado según criterios estandarizados — Suministros El Parque S.L.
        </p>
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
                <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60">#</th>
                <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60">Proveedor</th>
                {CRITERIA_KEYS.map(k => (
                  <th key={k} className="px-3 py-3 text-[8px] font-black uppercase tracking-widest text-on-surface-variant/60 text-center">{k}</th>
                ))}
                <th className="px-4 py-3 text-[9px] font-black uppercase tracking-widest text-emerald-400 text-center bg-emerald-500/5">TOTAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {ranking.map((r, i) => (
                <tr key={r.name} className={`hover:bg-surface-container-highest/30 transition-colors ${i < 3 ? "bg-primary/5" : ""}`}>
                  <td className="px-4 py-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black ${
                      i === 0 ? "bg-amber-500/20 text-amber-400" :
                      i === 1 ? "bg-slate-400/20 text-slate-400" :
                      i === 2 ? "bg-amber-700/20 text-amber-700" :
                      "bg-surface-container-high text-on-surface-variant/60"
                    }`}>{i + 1}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs font-bold">{r.name}</p>
                    <p className="text-[9px] text-on-surface-variant/60">{r.short}{r.isProvisional && " *"}</p>
                  </td>
                  {r.scores.map((s, j) => (
                    <td key={j} className="px-3 py-3 text-center text-xs font-mono text-on-surface-variant/80">{s.toFixed(2)}</td>
                  ))}
                  <td className="px-4 py-3 text-center bg-emerald-500/5">
                    <span className="text-base font-black text-emerald-400">{r.total.toFixed(2)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-outline-variant/10 text-[9px] text-on-surface-variant/40 italic">
          * Puntuación provisional — pendiente de propuesta formal
        </div>
      </div>

      {/* Criteria & Weights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {criteria.map(c => (
          <div key={c.key} className="glass-panel p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-black uppercase tracking-widest">{c.key}</h3>
              <span className="text-sm font-black text-primary">{c.weight}</span>
            </div>
            <div className="space-y-2">
              {c.sub.map(s => (
                <div key={s.label} className="flex justify-between text-[9px] text-on-surface-variant/70">
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
          Tablas de Evaluación (Baremos)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {baremes.map(b => (
            <div key={b.title} className="bg-surface-container-highest/30 rounded-xl p-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface mb-3">{b.title}</h3>
              <div className="space-y-1.5">
                {b.rows.map(([cond, val]) => (
                  <div key={cond} className="flex justify-between items-center text-[9px]">
                    <span className="text-on-surface-variant/70">{cond}</span>
                    <span className="font-black text-primary w-8 text-center">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Evaluations */}
      <div className="space-y-6">
        <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">assignment</span>
          Evaluaciones Individuales
        </h2>
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
                <span className="material-symbols-outlined text-on-surface-variant/40 group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="px-5 pb-5 space-y-2">
                {ev.sub.map(s => (
                  <div key={s.label} className="flex items-center gap-3 py-1.5 border-t border-outline-variant/5">
                    <span className="text-[9px] text-on-surface-variant/70 w-40">{s.label}</span>
                    <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${parseFloat(s.eval) * 100}%` }} />
                    </div>
                    <span className="text-[9px] font-mono text-on-surface-variant/60 w-8 text-center">{s.eval}</span>
                    <span className="text-[9px] font-black text-primary w-12 text-right">{s.points.toFixed(1)}</span>
                  </div>
                ))}
                <div className="flex justify-end pt-3 border-t border-outline-variant/10">
                  <span className="text-xs font-black text-emerald-400">Total: {ev.score}/100</span>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
