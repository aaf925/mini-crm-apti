import { getFacilities } from './actions'
import FacilityForm from '@/components/FacilityForm'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

function getStatusBadge(status: string) {
  const statusColors: Record<string, string> = {
    IDENTIFICADO: 'bg-slate-500',
    CONTACTADO: 'bg-blue-500',
    ESPERANDO_PRESUPUESTO: 'bg-yellow-500',
    NEGOCIANDO: 'bg-orange-500',
    CERRADO: 'bg-emerald-500',
    DESCARTADO: 'bg-red-500',
  }
  return <Badge className={`${statusColors[status]} hover:${statusColors[status]}`}>{status}</Badge>
}

export default async function Dashboard() {
  // Llama directamente a la BD en el servidor
  const facilities = await getFacilities()
  
  // Calcular KPIs
  const totalFacilities = facilities.length
  const closedFacilities = facilities.filter(f => f.status === 'CERRADO').length

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Cabecera */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">CRM de Proveedores</h1>
            <p className="text-slate-500">Gestión de instalaciones deportivas</p>
          </div>
          <FacilityForm />
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Total Instalaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalFacilities}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Acuerdos Cerrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">{closedFacilities}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabla de Datos */}
        <div className="rounded-md border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Instalación</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Pistas</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="text-right">Añadido</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {facilities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24 text-slate-500">
                    No hay instalaciones registradas. Añade la primera.
                  </TableCell>
                </TableRow>
              ) : (
                facilities.map((fac) => (
                  <TableRow key={fac.id}>
                    <TableCell className="font-medium">
                      {fac.name}
                      <div className="text-xs text-slate-500">{fac.email}</div>
                    </TableCell>
                    <TableCell>
                      {fac.contactName}
                      <div className="text-xs text-slate-500">{fac.phone}</div>
                    </TableCell>
                    <TableCell>{fac.pitchTypes}</TableCell>
                    <TableCell>{getStatusBadge(fac.status)}</TableCell>
                    <TableCell>{fac.internalOwner}</TableCell>
                    <TableCell className="text-right">
                      {new Date(fac.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

      </div>
    </div>
  )
}
