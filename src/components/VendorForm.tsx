'use client'

import { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createVendor } from '@/app/actions'

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
        <Button className="bg-slate-900 hover:bg-slate-800 text-white">Registrar Nuevo Proveedor</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Registro de Proveedor ERP</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consultora / Integrador</FormLabel>
                    <FormControl><Input placeholder="Ej. Seidor" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="softwareProposed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Software ERP</FormLabel>
                    <FormControl><Input placeholder="Ej. SAP Business One" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contacto Comercial</FormLabel>
                    <FormControl><Input placeholder="Nombre del Account Manager" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="internalOwner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Responsable Interno</FormLabel>
                    <FormControl><Input placeholder="Suministros El Parque" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="estimatedCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Presupuesto (€)</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estimatedMonths"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meses Despliegue</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hostingType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hosting</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Cloud">Cloud</SelectItem>
                        <SelectItem value="On-Premise">On-Premise</SelectItem>
                        <SelectItem value="Híbrido">Híbrido</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado del Proceso</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="IDENTIFICADO">Identificado</SelectItem>
                      <SelectItem value="PRIMERA_REUNION">Primera Reunión</SelectItem>
                      <SelectItem value="DEMO_REALIZADA">Demo Realizada</SelectItem>
                      <SelectItem value="ESPERANDO_PRESUPUESTO">Esperando Presupuesto</SelectItem>
                      <SelectItem value="PRESUPUESTO_RECIBIDO">Presupuesto Recibido</SelectItem>
                      <SelectItem value="NEGOCIANDO">Negociando</SelectItem>
                      <SelectItem value="SELECCIONADO">Seleccionado</SelectItem>
                      <SelectItem value="DESCARTADO">Descartado</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas / Impresiones Técnicas</FormLabel>
                  <FormControl><Textarea rows={3} {...field} /></FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading} className="w-full bg-blue-700 hover:bg-blue-800">
              {loading ? "Guardando..." : "Guardar Proveedor"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
