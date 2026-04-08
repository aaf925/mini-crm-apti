import { getVendors, deleteVendor } from "@/app/actions";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function EvaluationsPage() {
  const vendors = await getVendors();

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto animate-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-on-surface uppercase">
            Matriz <span className="text-primary italic font-black">Comparativa</span>
          </h2>
          <p className="text-sm text-on-surface-variant mt-1 font-medium italic">
            Visualización técnica y estratégica de propuestas ERP
          </p>
        </div>
        
        <div className="flex items-center gap-2">
            <button className="bg-surface-container-high hover:bg-surface-bright px-4 py-2 rounded-lg border border-outline-variant/10 text-xs font-bold transition-all text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                Filtrar
            </button>
            <Link 
                href="?register=true"
                className="bg-primary text-on-primary px-4 py-2 rounded-lg text-xs font-bold transition-all hover:opacity-90 shadow-lg shadow-primary/10 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Nueva Evaluación
            </Link>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="glass-panel group hover:border-primary/40 transition-all duration-500 overflow-hidden relative">
            <div className="p-6 space-y-6">
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high border border-outline-variant/10 flex items-center justify-center font-black text-xl text-primary group-hover:scale-110 transition-transform">
                    {vendor.companyName.substring(0, 1)}
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight text-on-surface leading-tight">
                        {vendor.companyName}
                    </h3>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest italic">{vendor.softwareProposed}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${
                        vendor.status === "SELECCIONADO" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                        "bg-primary/10 text-primary border border-primary/20"
                    }`}>
                        {vendor.status.replace(/_/g, " ")}
                    </span>
                    <span className="text-[10px] text-on-surface-variant/40 font-mono">
                        #{vendor.id.substring(0, 4)}
                    </span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-outline-variant/5">
                <div className="text-center">
                    <p className="text-[8px] uppercase font-black text-on-surface-variant/50">Costo</p>
                    <p className="text-xs font-black text-primary">${(vendor.estimatedCost || 0).toLocaleString()}</p>
                </div>
                <div className="text-center border-x border-outline-variant/5">
                    <p className="text-[8px] uppercase font-black text-on-surface-variant/50">Meses</p>
                    <p className="text-xs font-black text-on-surface">{vendor.estimatedMonths || "~"}</p>
                </div>
                <div className="text-center">
                    <p className="text-[8px] uppercase font-black text-on-surface-variant/50">Rating</p>
                    <div className="flex items-center justify-center gap-0.5">
                        <span className="text-xs font-black text-emerald-400">{(vendor.technicalFit || 0).toFixed(1)}</span>
                        <span className="material-symbols-outlined text-[10px] text-emerald-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                </div>
              </div>

              {/* Progress Bar (Dynamic Audit Integrity) */}
              <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">
                      <span>Audit Integrity</span>
                      <span>{Math.round(((vendor.technicalFit || 0) + (vendor.scalability || 0) + (vendor.postSaleSupport || 0) + (vendor.pricingValue || 0)) / 40 * 100)}%</span>
                  </div>
                  <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full group-hover:animate-pulse transition-all duration-1000"
                        style={{ width: `${Math.round(((vendor.technicalFit || 0) + (vendor.scalability || 0) + (vendor.postSaleSupport || 0) + (vendor.pricingValue || 0)) / 40 * 100)}%` }}
                      ></div>
                  </div>
              </div>

              {/* Small Actions */}
              <div className="flex justify-between items-center pt-2 gap-3">
                <Link 
                    href={`/vendors/${vendor.id}`}
                    className="flex-1 py-1.5 rounded bg-surface-container-high hover:bg-surface-bright text-[10px] font-bold text-on-surface text-center transition-colors flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined text-sm">visibility</span>
                    Ver Perfil
                </Link>
                <Link 
                    href={`?edit=${vendor.id}`}
                    className="flex-1 py-1.5 rounded bg-primary/10 hover:bg-primary/20 text-[10px] font-bold text-primary text-center transition-colors flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined text-sm">edit</span>
                    Editar
                </Link>
                <form action={async () => { "use server"; await deleteVendor(vendor.id); revalidatePath("/evaluations"); }} className="contents">
                    <button className="w-8 h-8 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                </form>
              </div>
            </div>
          </div>
        ))}

        {/* Add Card */}
        <Link 
            href="?register=true"
            className="border-2 border-dashed border-outline-variant/20 rounded-[24px] flex flex-col items-center justify-center p-8 space-y-4 hover:border-primary/50 hover:bg-primary/5 transition-all group"
        >
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant/40 group-hover:text-primary transition-colors">add</span>
            </div>
            <div className="text-center">
                <p className="text-sm font-black text-on-surface/60 group-hover:text-on-surface">Agregar Proveedor</p>
                <p className="text-[10px] font-bold text-on-surface-variant/40 mt-1 uppercase tracking-widest">Nueva Propuesta ERP</p>
            </div>
        </Link>
      </div>
    </div>
  );
}
