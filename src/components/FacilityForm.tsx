'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { createFacility } from '@/app/actions'

export default function FacilityForm() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    
    const formData = new FormData(event.currentTarget)
    await createFacility(formData)
    
    setLoading(false)
    setOpen(false) // Cerrar modal después de guardar
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">Añadir Instalación</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nueva Instalación Deportiva</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre de la Instalación</label>
              <Input name="name" required placeholder="Ej. Polideportivo Sur" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Responsable / Contacto</label>
              <Input name="contactName" required placeholder="Ej. Juan Pérez" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input name="email" type="email" required placeholder="correo@ejemplo.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Teléfono</label>
              <Input name="phone" required placeholder="+34 600..." />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipos de Pista</label>
              <Input name="pitchTypes" required placeholder="Pádel, Tenis, F7..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Precio Hora Estimado (€)</label>
              <Input name="estimatedPricePerHour" type="number" step="0.5" placeholder="15.50" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Estado</label>
              <Select name="status" defaultValue="IDENTIFICADO">
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IDENTIFICADO">Identificado</SelectItem>
                  <SelectItem value="CONTACTADO">Contactado</SelectItem>
                  <SelectItem value="ESPERANDO_PRESUPUESTO">Esperando Presup.</SelectItem>
                  <SelectItem value="NEGOCIANDO">Negociando</SelectItem>
                  <SelectItem value="CERRADO">Cerrado</SelectItem>
                  <SelectItem value="DESCARTADO">Descartado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Asignado a (Owner)</label>
              <Input name="internalOwner" required placeholder="Tu nombre" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notas / Historial</label>
            <Textarea name="notes" placeholder="Detalles de llamadas, acuerdos, etc." />
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Guardando...' : 'Guardar Proveedor'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
