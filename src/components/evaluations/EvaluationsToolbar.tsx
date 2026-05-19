"use client"

import { useState, useMemo } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

type Vendor = {
  id: string
  companyName: string
  softwareProposed: string
  contactName: string
  email: string
  phone: string
  status: string
  estimatedCost: number | null
  estimatedMonths: number | null
  hostingType: string | null
  internalOwner: string
  notes: string | null
  technicalFit: number
  scalability: number
  postSaleSupport: number
  pricingValue: number
  createdAt: string
}

export default function EvaluationsToolbar({ vendors: rawVendors, lastActivityMap }: { vendors: Vendor[], lastActivityMap: Record<string, string | null> }) {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()

  const [search, setSearch] = useState(sp.get("q") || "")
  const [statusFilter, setStatusFilter] = useState(sp.get("status") || "todas")
  const [ownerFilter, setOwnerFilter] = useState(sp.get("owner") || "todos")
  const [sortBy, setSortBy] = useState(sp.get("sort") || "name")
  const [sortDir, setSortDir] = useState(sp.get("dir") === "asc" ? "asc" : "desc")
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [showCompare, setShowCompare] = useState(false)

  // Scoring criteria (from Excel)
  const scoringCriteria = [
    { key: "pricingValue", label: "Coste", weight: 0.25 },
    { key: "postSaleSupport", label: "Confianza", weight: 0.20 },
    { key: "technicalFit", label: "Calidad", weight: 0.25 },
    { key: "estimatedMonths", label: "Implantación", weight: 0.15, invert: true },
    { key: "scalability", label: "Valor añadido", weight: 0.10 },
  ]

  function calcScore(v: Vendor): number {
    let total = 0
    for (const c of scoringCriteria) {
      const val = (v as any)[c.key] ?? 0
      const normalized = c.invert ? Math.max(0, 10 - Math.min(val, 10)) : Math.min(val, 10)
      total += (normalized / 10) * c.weight
    }
    return Math.round(total * 100)
  }

  // Filter + Search
  const filtered = useMemo(() => {
    let result = rawVendors.filter(v => {
      if (search) {
        const q = search.toLowerCase()
        if (!v.companyName.toLowerCase().includes(q) && !v.softwareProposed.toLowerCase().includes(q) && !v.internalOwner.toLowerCase().includes(q)) return false
      }
      if (statusFilter !== "todas" && v.status !== statusFilter) return false
      if (ownerFilter !== "todos" && v.internalOwner !== ownerFilter) return false
      return true
    })

    result.sort((a, b) => {
      let cmp = 0
      switch (sortBy) {
        case "name": cmp = a.companyName.localeCompare(b.companyName); break
        case "cost": cmp = (a.estimatedCost || 0) - (b.estimatedCost || 0); break
        case "months": cmp = (a.estimatedMonths || 0) - (b.estimatedMonths || 0); break
        case "score": cmp = calcScore(a) - calcScore(b); break
        case "owner": cmp = a.internalOwner.localeCompare(b.internalOwner); break
        default: cmp = a.companyName.localeCompare(b.companyName)
      }
      return sortDir === "asc" ? cmp : -cmp
    })
    return result
  }, [rawVendors, search, statusFilter, ownerFilter, sortBy, sortDir])

  const evaluated = filtered.filter(v => v.status !== "DESCARTADO")
  const discarded = filtered.filter(v => v.status === "DESCARTADO")
  const owners = [...new Set(rawVendors.map(v => v.internalOwner))].sort()

  function updateParam(key: string, val: string) {
    const p = new URLSearchParams(sp.toString())
    if (val && val !== "todas" && val !== "todos") p.set(key, val)
    else p.delete(key)
    router.push(`${pathname}?${p.toString()}`)
  }

  function toggleSort(field: string) {
    if (sortBy === field) setSortDir(d => d === "asc" ? "desc" : "asc")
    else { setSortBy(field); setSortDir("desc") }
  }

  function toggleCompare(id: string) {
    setCompareIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function exportCSV() {
    const headers = ["Empresa", "Software", "Contacto", "Email", "Teléfono", "Estado", "Coste", "Meses", "Responsable", "Score", "Ajuste", "Escalabilidad", "Soporte", "Valor"]
    const rows = filtered.map(v => [
      v.companyName, v.softwareProposed, v.contactName, v.email, v.phone,
      v.status, v.estimatedCost ?? "N/A", v.estimatedMonths ?? "N/A",
      v.internalOwner, calcScore(v),
      v.technicalFit, v.scalability, v.postSaleSupport, v.pricingValue
    ])
    const csv = [headers.join(","), ...rows.map(r => r.map(c => `"${c}"`).join(","))].join("\n")
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = "evaluacion_proveedores.csv"; a.click()
    URL.revokeObjectURL(url)
  }

  function SortIcon({ field }: { field: string }) {
    if (sortBy !== field) return <span className="material-symbols-outlined text-[12px] opacity-20">unfold_more</span>
    return <span className="material-symbols-outlined text-[12px]">{sortDir === "asc" ? "arrow_upward" : "arrow_downward"}</span>
  }

  const compareVendors = rawVendors.filter(v => compareIds.includes(v.id))

  return (
    <>
      {/* Toolbar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-lg">search</span>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); updateParam("q", e.target.value) }}
              placeholder="Buscar por nombre, software..."
              className="w-full bg-surface-container-highest border-none rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold focus:ring-1 focus:ring-primary/40 transition-all placeholder:text-on-surface-variant/30"
            />
          </div>

          {/* Status filter */}
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); updateParam("status", e.target.value) }}
            className="bg-surface-container-highest border-none rounded-xl py-2.5 px-3 text-xs font-bold focus:ring-1 focus:ring-primary/40">
            <option value="todas">Todos los estados</option>
            {["PRESUPUESTO_RECIBIDO","ESPERANDO_PRESUPUESTO","NEGOCIANDO","SELECCIONADO","DESCARTADO","IDENTIFICADO"].map(s =>
              <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
            )}
          </select>

          {/* Owner filter */}
          <select value={ownerFilter} onChange={e => { setOwnerFilter(e.target.value); updateParam("owner", e.target.value) }}
            className="bg-surface-container-highest border-none rounded-xl py-2.5 px-3 text-xs font-bold focus:ring-1 focus:ring-primary/40">
            <option value="todos">Todos los responsables</option>
            {owners.map(o => <option key={o} value={o}>{o}</option>)}
          </select>

          {/* Sort */}
          <div className="flex gap-1">
            {[{ key: "name", label: "Nombre" }, { key: "score", label: "Score" }, { key: "cost", label: "Coste" }, { key: "months", label: "Plazo" }].map(s => (
              <button key={s.key} onClick={() => toggleSort(s.key)}
                className={`px-2.5 py-2 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-0.5 transition-colors ${sortBy === s.key ? "bg-primary/20 text-primary" : "bg-surface-container-highest text-on-surface-variant/60 hover:text-on-surface"}`}>
                {s.label} <SortIcon field={s.key} />
              </button>
            ))}
          </div>

          {/* Compare */}
          {compareIds.length >= 2 && (
            <button onClick={() => setShowCompare(true)}
              className="bg-primary text-on-primary px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">compare_arrows</span>
              Comparar ({compareIds.length})
            </button>
          )}

          {/* Export */}
          <button onClick={exportCSV}
            className="bg-surface-container-high hover:bg-surface-bright px-3 py-2 rounded-lg border border-outline-variant/10 text-[9px] font-black uppercase tracking-wider flex items-center gap-1 transition-colors">
            <span className="material-symbols-outlined text-sm">download</span>
            Exportar
          </button>
        </div>

        <p className="text-[10px] text-on-surface-variant/40 font-medium">
          {filtered.length} de {rawVendors.length} proveedores
          {compareIds.length > 0 && ` · ${compareIds.length} seleccionados para comparar`}
        </p>
      </div>

      {/* Evaluated */}
      {evaluated.length > 0 && (
        <>
          <div className="flex items-center gap-3 mt-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <h3 className="text-sm font-black uppercase tracking-widest text-on-surface">Propuestas Evaluadas ({evaluated.length})</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {evaluated.map(v => evalCard(v, lastActivityMap[v.id] ? new Date(lastActivityMap[v.id]!) : null, compareIds.includes(v.id), () => toggleCompare(v.id), calcScore(v)))}
          </div>
        </>
      )}

      {/* Discarded */}
      {discarded.length > 0 && (
        <>
          <div className="flex items-center gap-3 mt-12">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <h3 className="text-sm font-black uppercase tracking-widest text-on-surface/60">Descartados ({discarded.length})</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {discarded.map(v => discardedCard(v, lastActivityMap[v.id] ? new Date(lastActivityMap[v.id]!) : null))}
          </div>
        </>
      )}

      {/* Comparison Modal */}
      <AnimatePresence>
        {showCompare && compareVendors.length >= 2 && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowCompare(false)}
              className="fixed inset-0 bg-surface-dim/70 backdrop-blur-sm z-[60]" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-8 z-[70] overflow-auto rounded-3xl bg-surface-container-low border border-outline-variant/10 shadow-2xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tight">Comparativa</h2>
                <button onClick={() => setShowCompare(false)}
                  className="w-10 h-10 rounded-full hover:bg-surface-container-highest flex items-center justify-center">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/10">
                      <th className="py-3 pr-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 w-40">Métrica</th>
                      {compareVendors.map(v => (
                        <th key={v.id} className="py-3 px-4 text-center">
                          <p className="text-xs font-black">{v.companyName}</p>
                          <p className="text-[8px] text-on-surface-variant/50 uppercase tracking-widest">{v.softwareProposed}</p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/5">
                    {[
                      { l: "Coste estimado", f: (v: Vendor) => `$${(v.estimatedCost || 0).toLocaleString()}` },
                      { l: "Plazo (meses)", f: (v: Vendor) => `${v.estimatedMonths || "N/A"}` },
                      { l: "Ajuste Técnico", f: (v: Vendor) => `${v.technicalFit}/10` },
                      { l: "Escalabilidad", f: (v: Vendor) => `${v.scalability}/10` },
                      { l: "Soporte", f: (v: Vendor) => `${v.postSaleSupport}/10` },
                      { l: "Valor / Precio", f: (v: Vendor) => `${v.pricingValue}/10` },
                      { l: "Score Ponderado", f: (v: Vendor) => `${calcScore(v)}%`, highlight: true },
                      { l: "Estado", f: (v: Vendor) => v.status.replace(/_/g, " ") },
                      { l: "Contacto", f: (v: Vendor) => v.contactName || "N/A" },
                      { l: "Responsable", f: (v: Vendor) => v.internalOwner },
                    ].map(row => (
                      <tr key={row.l} className={`${row.highlight ? "bg-primary/5 font-bold" : ""}`}>
                        <td className="py-3 pr-6 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">{row.l}</td>
                        {compareVendors.map(v => {
                          const best = row.highlight ? Math.max(...compareVendors.map(x => calcScore(x))) : null
                          const val = row.f(v)
                          const isBest = row.highlight && typeof val === "string" && parseInt(val) === best
                          return (
                            <td key={v.id} className={`px-4 py-3 text-center text-xs ${isBest ? "text-emerald-400" : ""}`}>
                              {val}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function evalCard(v: Vendor, lastActivity: Date | null, selected: boolean, onToggle: () => void, score: number) {
  return (
    <div key={v.id} className={`glass-panel group hover:border-primary/40 transition-all duration-500 overflow-hidden relative ${selected ? "ring-2 ring-primary" : ""}`}>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-surface-container-high border border-outline-variant/10 flex items-center justify-center font-black text-xl text-primary group-hover:scale-110 transition-transform">
              {v.companyName.substring(0, 1)}
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight text-on-surface leading-tight">{v.companyName}</h3>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest italic">{v.softwareProposed}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${v.status === "SELECCIONADO" ? "bg-emerald-500/10 text-emerald-400" : "bg-primary/10 text-primary"}`}>
              {v.status.replace(/_/g, " ")}
            </span>
            {lastActivity && <span className="text-[8px] text-on-surface-variant/40">{new Date(lastActivity).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>}
          </div>
        </div>

        {/* Score badge */}
        <div className="flex items-center justify-center gap-2">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-sm ${score >= 70 ? "bg-emerald-500/20 text-emerald-400" : score >= 50 ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"}`}>
            {score}%
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 py-4 border-y border-outline-variant/5">
          <div className="text-center">
            <p className="text-[8px] uppercase font-black text-on-surface-variant/50">Costo</p>
            <p className="text-xs font-black text-primary">${(v.estimatedCost || 0).toLocaleString()}</p>
          </div>
          <div className="text-center border-x border-outline-variant/5">
            <p className="text-[8px] uppercase font-black text-on-surface-variant/50">Meses</p>
            <p className="text-xs font-black text-on-surface">{v.estimatedMonths || "~"}</p>
          </div>
          <div className="text-center">
            <p className="text-[8px] uppercase font-black text-on-surface-variant/50">Score</p>
            <p className="text-xs font-black text-emerald-400">{score}%</p>
          </div>
        </div>

        {/* Scoring bars */}
        <div className="space-y-2">
          {[
            { label: "Coste (25%)", val: v.pricingValue, c: "bg-emerald-500" },
            { label: "Confianza (20%)", val: v.postSaleSupport, c: "bg-blue-500" },
            { label: "Calidad (25%)", val: v.technicalFit, c: "bg-primary" },
            { label: "Escalabilidad (10%)", val: v.scalability, c: "bg-amber-500" },
          ].map(m => (
            <div key={m.label} className="flex items-center gap-2">
              <span className="text-[7px] font-black uppercase tracking-widest text-on-surface-variant/50 w-24">{m.label}</span>
              <div className="flex-1 h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className={`h-full ${m.c} rounded-full`} style={{ width: `${(m.val / 10) * 100}%` }} />
              </div>
              <span className="text-[8px] font-bold text-on-surface-variant/60 w-4 text-right">{m.val}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2 gap-2">
          <button onClick={onToggle}
            className={`px-2 py-1.5 rounded text-[9px] font-black uppercase tracking-wider transition-colors ${selected ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"}`}>
            {selected ? "Quitar" : "Comparar"}
          </button>
          <Link href={`/vendors/${v.id}`} className="flex-1 py-1.5 rounded bg-surface-container-high hover:bg-surface-bright text-[10px] font-bold text-on-surface text-center transition-colors">
            Ver Perfil
          </Link>
          <Link href={`?edit=${v.id}`} className="py-1.5 px-3 rounded bg-primary/10 hover:bg-primary/20 text-[10px] font-bold text-primary text-center transition-colors">
            Editar
          </Link>
        </div>
      </div>
    </div>
  )
}

function discardedCard(v: Vendor, lastActivity: Date | null) {
  return (
    <div key={v.id} className="glass-panel border border-red-500/10 bg-surface-container-low/50 group hover:border-red-500/20 transition-all duration-300 overflow-hidden relative opacity-70 hover:opacity-90">
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center font-black text-xs text-red-400">{v.companyName.substring(0, 1)}</div>
            <div>
              <h4 className="text-xs font-black tracking-tight text-on-surface/70 leading-tight">{v.companyName}</h4>
              <p className="text-[8px] font-bold text-on-surface-variant/50 uppercase tracking-widest">{v.softwareProposed}</p>
            </div>
          </div>
          <span className="px-1.5 py-0.5 rounded text-[7px] font-black uppercase bg-red-500/10 text-red-400/70">DESCARTADO</span>
        </div>
        <p className="text-[9px] text-on-surface-variant/60 leading-relaxed line-clamp-2">{v.notes}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-[8px] font-medium text-on-surface-variant/40">{v.internalOwner}</span>
          <Link href={`/vendors/${v.id}`} className="text-[8px] font-bold text-primary/60 hover:text-primary">Ver →</Link>
        </div>
      </div>
    </div>
  )
}
