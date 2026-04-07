import { getVendors } from './actions'
import VendorForm from '@/components/VendorForm'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

function getVendorStatusBadge(status: string) {
  const statusColors: Record<string, string> = {
    IDENTIFICADO: 'bg-slate-500',
    PRIMERA_REUNION: 'bg-indigo-500',
    DEMO_REALIZADA: 'bg-blue-500',
    ESPERANDO_PRESUPUESTO: 'bg-amber-500',
    PRESUPUESTO_RECIBIDO: 'bg-cyan-500',
    NEGOCIANDO: 'bg-orange-500',
    SELECCIONADO: 'bg-emerald-600',
    DESCARTADO: 'bg-rose-600',
  }
  return <Badge className={`${statusColors[status]} hover:${statusColors[status]} text-white border-none shrink-0`}>{status.replace(/_/g, ' ')}</Badge>
}

export default async function Dashboard() {
  const vendors = await getVendors()
  
  // KPIs
  const totalVendors = vendors.length
  
  const totalCost = vendors.reduce((acc, v) => acc + (v.estimatedCost || 0), 0)
  const averageCost = totalVendors > 0 ? (totalCost / totalVendors).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) : '0 €'
  
  const finalPhaseCount = vendors.filter(v => v.status === 'NEGOCIANDO' || v.status === 'PRESUPUESTO_RECIBIDO').length

  return (
    <div className="min-h-screen bg-zinc-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 uppercase italic">Suministros El Parque</h1>
            <p className="text-slate-600 font-medium tracking-wide">Evaluación de Proveedores Tecnológicos (Proyecto ERP)</p>
          </div>
          <VendorForm />
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-slate-900 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-500">Proveedores Evaluados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-slate-900">{totalVendors}</div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-blue-600 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-500">Presupuesto Medio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-blue-700">{averageCost}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-500">En Fase Final / Selección</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-orange-600">{finalPhaseCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Technical Data Table */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          <div className="bg-slate-900 text-white p-4 border-b border-slate-800">
            <h2 className="text-sm font-bold uppercase tracking-wider">Matriz de Selección ERP</h2>
          </div>
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-bold text-slate-800 py-4">Consultora / Integrador</TableHead>
                <TableHead className="font-bold text-slate-800">Software Propuesto</TableHead>
                <TableHead className="font-bold text-slate-800">Inversión Est.</TableHead>
                <TableHead className="font-bold text-slate-800">Meses</TableHead>
                <TableHead className="font-bold text-slate-800">Alojamiento</TableHead>
                <TableHead className="font-bold text-slate-800">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-48 text-slate-400 font-medium italic">
                    Sin proveedores registrados en la base de datos ERP.
                  </TableCell>
                </TableRow>
              ) : (
                vendors.map((v) => (
                  <TableRow key={v.id} className="hover:bg-slate-50 transition-colors border-b last:border-none">
                    <TableCell className="py-4">
                      <div className="font-bold text-slate-900">{v.companyName}</div>
                      <div className="text-[11px] text-slate-500 bg-slate-100 px-1 inline-block mt-1 font-mono uppercase tracking-tighter">{v.contactName}</div>
                    </TableCell>
                    <TableCell className="font-semibold text-blue-900">{v.softwareProposed}</TableCell>
                    <TableCell className="font-mono text-slate-700">
                      {v.estimatedCost ? v.estimatedCost.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) : 'TBD'}
                    </TableCell>
                    <TableCell className="text-slate-600 font-medium">
                      {v.estimatedMonths ? `${v.estimatedMonths} m` : '-'}
                    </TableCell>
                    <TableCell>
                      <span className="text-[10px] font-bold py-0.5 px-2 bg-zinc-100 border border-zinc-200 rounded text-zinc-700 uppercase">
                        {v.hostingType || 'N/A'}
                      </span>
                    </TableCell>
                    <TableCell>{getVendorStatusBadge(v.status)}</TableCell>
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
