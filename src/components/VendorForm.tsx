'use client'

import { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createVendor } from '@/app/actions'
import { Plus, Send, X } from 'lucide-react'

const vendorSchema = z.object({
  companyName: z.string().min(2, "Nombre requerido"),
  softwareProposed: z.string().min(2, "Software requerido"),
  contactName: z.string().min(2, "Contacto requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "Teléfono inválido"),
  status: z.string(),
  estimatedCost: z.string().optional(),
  estimatedMonths: z.string().optional(),
  hostingType: z.string().optional(),
  internalOwner: z.string().min(2, "Responsable interno requerido"),
  notes: z.string().optional(),
})

export default function VendorForm() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof vendorSchema>>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      status: "IDENTIFICADO",
      hostingType: "Cloud",
    },
  })

  async function onSubmit(values: z.infer<typeof vendorSchema>) {
    setLoading(true)
    try {
      await createVendor(values)
      form.reset()
      setOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-12 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transition-all duration-300 flex items-center gap-2 group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          REGISTRAR NUEVO PROVEEDOR
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] border-white/5 bg-zinc-950/90 backdrop-blur-3xl shadow-[0_0_100px_-20px_rgba(0,0,0,1)] text-zinc-200 overflow-hidden rounded-3xl p-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500" />
        
        <div className="p-8 space-y-8 max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
              REGISTRO DE PROVEEDOR
              <div className="px-2 py-0.5 rounded-sm bg-indigo-500/10 text-indigo-400 text-[10px] uppercase font-black border border-indigo-500/20 tracking-widest">
                INTERNAL USE
              </div>
            </DialogTitle>
            <p className="text-zinc-500 text-sm font-medium">Completa la ficha técnica y económica para la evaluación del integrador.</p>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                   <h3 className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.2em] mb-4">Información Corporativa</h3>
                   <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 font-bold uppercase text-[10px]">Consultora / Integrador</FormLabel>
                        <FormControl><Input className="bg-white/5 border-white/10 h-11 focus:border-indigo-500 transition-all font-semibold" placeholder="Ej. Seidor" {...field} /></FormControl>
                        <FormMessage className="text-rose-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="softwareProposed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 font-bold uppercase text-[10px]">Software ERP</FormLabel>
                        <FormControl><Input className="bg-white/5 border-white/10 h-11 focus:border-indigo-500 transition-all font-semibold" placeholder="Ej. SAP Business One" {...field} /></FormControl>
                        <FormMessage className="text-rose-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                   <h3 className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.2em] mb-4">Ficha de Contacto</h3>
                   <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 font-bold uppercase text-[10px]">Account Manager</FormLabel>
                        <FormControl><Input className="bg-white/5 border-white/10 h-11 focus:border-indigo-500 transition-all font-semibold" placeholder="Nombre completo" {...field} /></FormControl>
                        <FormMessage className="text-rose-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 font-bold uppercase text-[10px]">Teléfono Directo</FormLabel>
                        <FormControl><Input className="bg-white/5 border-white/10 h-11 focus:border-indigo-500 transition-all font-semibold" placeholder="+34 ..." {...field} /></FormControl>
                        <FormMessage className="text-rose-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 space-y-6">
                <h3 className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.2em]">Parámetros Económicos y Técnicos</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <FormField
                    control={form.control}
                    name="estimatedCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 font-bold uppercase text-[10px]">Presupuesto (€)</FormLabel>
                        <FormControl><Input className="bg-white/5 border-white/10 h-11" type="number" {...field} /></FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="estimatedMonths"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 font-bold uppercase text-[10px]">Despliegue (Meses)</FormLabel>
                        <FormControl><Input className="bg-white/5 border-white/10 h-11" type="number" {...field} /></FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hostingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 font-bold uppercase text-[10px]">Arquitectura</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/5 border-white/10 h-11"><SelectValue /></SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-zinc-900 border-white/10 text-white">
                            <SelectItem value="Cloud">Cloud</SelectItem>
                            <SelectItem value="On-Premise">On-Premise</SelectItem>
                            <SelectItem value="Híbrido">Híbrido</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 font-bold uppercase text-[10px]">Estado Evaluación</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/5 border-white/10 h-11"><SelectValue /></SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-zinc-900 border-white/10 text-white">
                            <SelectItem value="IDENTIFICADO">Identificado</SelectItem>
                            <SelectItem value="PRIMERA_REUNION">Primera Reunión</SelectItem>
                            <SelectItem value="DEMO_REALIZADA">Demo Realizada</SelectItem>
                            <SelectItem value="ESPERANDO_PRESUPUESTO">Esperando Presup.</SelectItem>
                            <SelectItem value="PRESUPUESTO_RECIBIDO">Presup. Recibido</SelectItem>
                            <SelectItem value="NEGOCIANDO">Negociando</SelectItem>
                            <SelectItem value="SELECCIONADO">Seleccionado</SelectItem>
                            <SelectItem value="DESCARTADO">Descartado</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <FormField
                    control={form.control}
                    name="internalOwner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 font-bold uppercase text-[10px]">Validado por (Internal Owner)</FormLabel>
                        <FormControl><Input className="bg-white/5 border-white/10 h-11 font-medium" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 font-bold uppercase text-[10px]">Email Corporativo</FormLabel>
                        <FormControl><Input className="bg-white/5 border-white/10 h-11 font-mono" type="email" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-400 font-bold uppercase text-[10px]">Bitácora Técnica / Notas de Seguimiento</FormLabel>
                    <FormControl><Textarea className="bg-white/5 border-white/10 focus:border-indigo-500 min-h-[100px]" {...field} /></FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4 pt-4 pb-8 border-t border-white/5">
                 <Button variant="ghost" type="button" onClick={() => setOpen(false)} className="text-zinc-500 font-bold uppercase text-[10px] hover:bg-white/5">Cancelar Operación</Button>
                 <Button type="submit" disabled={loading} className="px-10 h-12 bg-white text-black hover:bg-zinc-200 font-black uppercase text-[10px] tracking-widest transition-all">
                    {loading ? "Sincronizando..." : "Finalizar Registro"}
                 </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
