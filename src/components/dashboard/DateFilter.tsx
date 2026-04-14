'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const PRESETS = [
  { label: 'Últimos 7 días', value: '7d' },
  { label: 'Últimos 30 días', value: '30d' },
  { label: 'Este Año', value: 'year' },
  { label: 'Todo el tiempo', value: 'all' }
]

export default function DateFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  
  const [customRange, setCustomRange] = useState({
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || ''
  })

  const currentFrom = searchParams.get('from')
  const currentTo = searchParams.get('to')

  const handleApply = (from: string, to: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (from) params.set('from', from)
    else params.delete('from')
    
    if (to) params.set('to', to)
    else params.delete('to')
    
    router.push(`?${params.toString()}`)
    setIsOpen(false)
  }

  const applyPreset = (preset: string) => {
    const end = new Date()
    let start = new Date()

    if (preset === '7d') {
      start.setDate(end.getDate() - 7)
    } else if (preset === '30d') {
      start.setDate(end.getDate() - 30)
    } else if (preset === 'year') {
      start = new Date(end.getFullYear(), 0, 1)
    } else if (preset === 'all') {
      handleApply('', '')
      return
    }

    handleApply(
      start.toISOString().split('T')[0], 
      end.toISOString().split('T')[0]
    )
  }

  const getActiveLabel = () => {
    if (!currentFrom && !currentTo) return 'Todo el tiempo'
    
    // Check if it matches a preset for better label
    // (Skipping complex matching for now, just showing dates is informative)
    
    const formatDate = (dateStr: string) => {
      return new Date(dateStr).toLocaleDateString('es-ES', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric' 
      })
    }

    if (currentFrom && currentTo) {
      return `${formatDate(currentFrom)} - ${formatDate(currentTo)}`
    } else if (currentFrom) {
      return `Desde ${formatDate(currentFrom)}`
    } else {
      return `Hasta ${formatDate(currentTo!)}`
    }
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-surface-container-high px-4 py-2 rounded-lg border border-outline-variant/10 flex items-center gap-3 hover:bg-surface-bright transition-all text-on-surface shadow-sm active:scale-95"
      >
        <span className="material-symbols-outlined text-on-surface-variant text-sm">calendar_today</span>
        <span className="text-xs font-bold">{getActiveLabel()}</span>
        <span className={`material-symbols-outlined text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-72 bg-surface-container-highest border border-outline-variant/20 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl"
            >
              <div className="p-3 grid grid-cols-2 gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => applyPreset(preset.value)}
                    className="text-left px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-tight text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all border border-transparent hover:border-primary/20"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              
              <div className="border-t border-outline-variant/10 p-5 space-y-4 bg-surface-container-low/30">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1 h-3 bg-primary rounded-full"></span>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Personalizado</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                          <label className="text-[9px] font-black text-on-surface-variant/30 uppercase tracking-widest px-1">Desde</label>
                          <input 
                              type="date" 
                              value={customRange.from}
                              onChange={(e) => setCustomRange({...customRange, from: e.target.value})}
                              className="w-full bg-surface-container-high border border-outline-variant/10 rounded-lg px-2 py-2 text-[10px] font-bold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                          />
                      </div>
                      <div className="space-y-1.5">
                          <label className="text-[9px] font-black text-on-surface-variant/30 uppercase tracking-widest px-1">Hasta</label>
                          <input 
                              type="date" 
                              value={customRange.to}
                              onChange={(e) => setCustomRange({...customRange, to: e.target.value})}
                              className="w-full bg-surface-container-high border border-outline-variant/10 rounded-lg px-2 py-2 text-[10px] font-bold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                          />
                      </div>
                  </div>
                  
                  <button 
                      onClick={() => handleApply(customRange.from, customRange.to)}
                      className="w-full bg-primary text-on-primary py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                  >
                      Actualizar Métricas
                  </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
