import { getVendors } from "@/app/actions"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import EvaluationsToolbar from "@/components/evaluations/EvaluationsToolbar"

export default async function EvaluationsPage() {
  const vendors = await getVendors()

  const vendorIds = vendors.map(v => v.id)
  const lastActivities = await Promise.all(vendorIds.map(id =>
    prisma.timelineEvent.findFirst({
      where: { vendorId: id },
      orderBy: { date: "desc" },
      select: { date: true },
    })
  ))
  const lastActivityMap: Record<string, string | null> = {}
  vendorIds.forEach((id, i) => lastActivityMap[id] = lastActivities[i]?.date?.toISOString() || null)

  const serialized = vendors.map(v => ({
    ...v,
    estimatedCost: v.estimatedCost ? Number(v.estimatedCost) : null,
    estimatedMonths: v.estimatedMonths ? Number(v.estimatedMonths) : null,
    technicalFit: Number(v.technicalFit || 0),
    scalability: Number(v.scalability || 0),
    postSaleSupport: Number(v.postSaleSupport || 0),
    pricingValue: Number(v.pricingValue || 0),
    createdAt: v.createdAt.toISOString(),
    notes: v.notes || "",
  }))

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-on-surface uppercase">
            Matriz <span className="text-primary italic font-black">Comparativa</span>
          </h2>
          <p className="text-sm text-on-surface-variant mt-1 font-medium italic">
            Búsqueda, filtros, scoring y comparativa de proveedores ERP
          </p>
        </div>
        <Link href="?register=true"
          className="bg-primary text-on-primary px-4 py-2 rounded-lg text-xs font-bold transition-all hover:opacity-90 shadow-lg shadow-primary/10 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">add</span>
          Nueva Evaluación
        </Link>
      </div>

      <EvaluationsToolbar vendors={serialized} lastActivityMap={lastActivityMap} />
    </div>
  )
}
