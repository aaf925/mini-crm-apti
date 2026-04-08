'use client'

import { useEffect, useState } from 'react'
import NextImage from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { getVendors } from './actions'
import VendorForm from '@/components/VendorForm'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Building2, 
  Euro, 
  CalendarClock, 
  LayoutDashboard, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Briefcase
} from 'lucide-react'

function getVendorStatusBadge(status: string) {
  const statusColors: Record<string, string> = {
    IDENTIFICADO: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    PRIMERA_REUNION: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    DEMO_REALIZADA: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    ESPERANDO_PRESUPUESTO: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    PRESUPUESTO_RECIBIDO: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    NEGOCIANDO: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    SELECCIONADO: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    DESCARTADO: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  }
  return (
    <Badge variant="outline" className={`${statusColors[status]} font-semibold px-3 py-1 rounded-full whitespace-nowrap`}>
      {status.replace(/_/g, ' ')}
    </Badge>
  )
}

export default function Dashboard() {
  const [vendors, setVendors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await getVendors()
      setVendors(data)
      setLoading(false)
    }
    load()
  }, [])
  
  // KPIs
  const totalVendors = vendors.length
  const totalCost = vendors.reduce((acc, v) => acc + (v.estimatedCost || 0), 0)
  const averageCost = totalVendors > 0 
    ? (totalCost / totalVendors).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) 
    : '0 €'
  const finalPhaseCount = vendors.filter(v => ['NEGOCIANDO', 'PRESUPUESTO_RECIBIDO', 'SELECCIONADO'].includes(v.status)).length

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen relative text-zinc-200">
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 space-y-12">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <NextImage 
                  src="/logo.jpeg" 
                  alt="Suministros El Parque Logo" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-indigo-400 font-bold tracking-widest uppercase text-[10px]">
                  <div className="w-6 h-[1.5px] bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                  <span>Suministros El Parque</span>
                </div>
                <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-3">
                  ERP Vendor HUB
                  <LayoutDashboard size={28} className="text-indigo-500" />
                </h1>
              </div>
            </div>
            <p className="text-zinc-500 font-medium max-w-xl text-md leading-relaxed">
              Sistema inteligente de evaluación y gestión de proveedores tecnológicos para el despliegue del ERP integral.
            </p>
          </div>
          <VendorForm />
        </motion.div>

        {/* KPI Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div variants={itemVariants}>
            <Card className="glass-card overflow-hidden group cursor-default">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Volumen Evaluación</CardTitle>
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                  <Briefcase size={16} />
                </div>
              </CardHeader>
              <CardHeader className="pt-0">
                <div className="text-4xl font-black text-white group-hover:text-indigo-400 transition-colors duration-500">{totalVendors}</div>
                <p className="text-[11px] text-zinc-500 mt-1 font-medium italic select-none flex items-center gap-1">
                  <TrendingUp size={12} className="text-emerald-500" /> +12% vs mes anterior
                </p>
              </CardHeader>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="glass-card overflow-hidden group cursor-default">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Inversión Media</CardTitle>
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                  <Euro size={16} />
                </div>
              </CardHeader>
              <CardHeader className="pt-0">
                <div className="text-4xl font-black text-white group-hover:text-emerald-400 transition-colors duration-500">{averageCost}</div>
                <p className="text-[11px] text-zinc-500 mt-1 font-medium">Basado en propuestas actuales</p>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-card overflow-hidden group cursor-default">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Fase de Selección</CardTitle>
                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20 transition-colors">
                  <ChevronRight size={16} />
                </div>
              </CardHeader>
              <CardHeader className="pt-0">
                <div className="text-4xl font-black text-white group-hover:text-orange-400 transition-colors duration-500">{finalPhaseCount}</div>
                <p className="text-[11px] text-zinc-500 mt-1 font-medium font-mono text-orange-500/60 tracking-wider">PRIORIDAD ALTA</p>
              </CardHeader>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Table Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] border border-white/5"
        >
          <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2">
              Matriz Técnica de Integradores
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_emerald]" />
            </h2>
          </div>
          
          <Table>
            <TableHeader className="bg-white/[0.03]">
              <TableRow className="border-b border-white/5 hover:bg-transparent">
                <TableHead className="py-4 px-8 text-zinc-500 font-bold uppercase text-[10px]">Empresa / Contacto</TableHead>
                <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Solución Proyectada</TableHead>
                <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Propuesta Económica</TableHead>
                <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Esfuerzo (Meses)</TableHead>
                <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Despliegue</TableHead>
                <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Estatus</TableHead>
                <TableHead className="text-right px-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {vendors.length === 0 && !loading ? (
                  <TableRow>
                     <TableCell colSpan={7} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center space-y-4 opacity-30">
                          <Building2 size={48} className="text-zinc-600" />
                          <p className="text-xl font-medium italic">Base de datos sincronizada. Sin registros.</p>
                        </div>
                     </TableCell>
                  </TableRow>
                ) : (
                  vendors.map((v, idx) => (
                    <motion.tr 
                      key={v.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group border-b border-white/5 hover:bg-white/[0.03] transition-all duration-300 relative truncate"
                    >
                      <TableCell className="py-5 px-8">
                        <div className="font-bold text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight text-md">
                          {v.companyName}
                        </div>
                        <div className="text-[11px] text-zinc-500 font-medium flex items-center gap-1 mt-0.5">
                          {v.contactName} • <span className="text-zinc-600">{v.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                           <span className="font-semibold text-blue-200">{v.softwareProposed}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-zinc-300 font-bold">
                        {v.estimatedCost 
                          ? v.estimatedCost.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) 
                          : <span className="opacity-30 italic text-[10px]">PTTE. COTIZACIÓN</span>
                        }
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-zinc-400 font-medium">
                           <CalendarClock size={14} className="text-zinc-600" />
                           {v.estimatedMonths ? `${v.estimatedMonths} meses` : '-'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-[9px] font-black py-1 px-2.5 bg-zinc-800 text-zinc-300 rounded border border-white/5 uppercase tracking-wider group-hover:border-indigo-500/50 transition-all">
                          {v.hostingType || 'VIRTUAL'}
                        </span>
                      </TableCell>
                      <TableCell>{getVendorStatusBadge(v.status)}</TableCell>
                      <TableCell className="text-right px-8">
                        <button className="p-2 rounded-lg bg-white/5 hover:bg-indigo-500 text-zinc-400 hover:text-white transition-all">
                           <ExternalLink size={14} />
                        </button>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </motion.div>

        {/* Footer info */}
        <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest text-zinc-600 opacity-60">
           <span>Suministros El Parque • Internal Management ERP System v4.0</span>
           <span className="flex items-center gap-2">
              Encrypt Sync <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
           </span>
        </div>

      </div>
    </div>
  )
}
