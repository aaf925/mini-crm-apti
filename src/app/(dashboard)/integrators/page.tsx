import { getVendors } from "@/app/actions";
import Link from "next/link";

export default async function IntegratorsPage() {
  const vendors = await getVendors();

  return (
    <div className="p-8 space-y-10 max-w-[1600px] mx-auto animate-in slide-in-from-bottom-6 duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-on-surface uppercase">
            Sistema de <span className="text-primary italic">Integradores</span>
          </h2>
          <p className="text-sm text-on-surface-variant mt-2 font-medium tracking-[0.05em] flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
            Directorio de Consultoras y Partners Homologados • Suministros El Parque
          </p>
        </div>
        
        <div className="flex items-center gap-3">
             <div className="relative group max-w-xs w-full">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
                <input 
                    type="text" 
                    placeholder="Filtrar por consultora..."
                    className="bg-surface-container-high border-none rounded-xl py-2 pl-10 pr-4 text-xs focus:ring-1 focus:ring-primary/40 w-full placeholder:text-on-surface-variant/40 transition-all focus:bg-surface-bright"
                />
            </div>
            <Link 
                href="?register=true"
                className="bg-primary text-on-primary px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">person_add</span>
              Añadir Partner
            </Link>
        </div>
      </div>

      {/* Grid of Integrators */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="glass-panel group hover:border-primary/40 transition-all duration-500 overflow-hidden relative flex flex-col h-full bg-gradient-to-br from-surface-container-low to-surface-container">
            <div className="p-8 flex flex-col h-full space-y-6">
              {/* Card Header */}
              <div className="flex justify-between items-start">
                  <div className="w-16 h-16 rounded-2xl bg-surface-container-highest border border-outline-variant/10 flex items-center justify-center font-black text-2xl text-primary group-hover:scale-105 transition-transform shadow-xl shadow-black/40">
                    {vendor.companyName.substring(0, 1)}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Estatus Audit</span>
                    <span className={`mt-1 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${
                        vendor.status === "SELECCIONADO" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                        "bg-primary/10 text-primary border border-primary/20"
                    }`}>
                        {vendor.status.replace(/_/g, " ")}
                    </span>
                  </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black tracking-tight text-on-surface uppercase group-hover:text-primary transition-colors">
                    {vendor.companyName}
                </h3>
                <p className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest italic">{vendor.softwareProposed}</p>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/5">
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase text-on-surface-variant/40 tracking-wider">Internal Owner</p>
                  <p className="text-xs font-bold text-on-surface truncate">
                    <span className="material-symbols-outlined text-[10px] mr-1 text-secondary">verified_user</span>
                    {vendor.internalOwner}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase text-on-surface-variant/40 tracking-wider">Est. Budget</p>
                  <p className="text-xs font-black text-primary">${(vendor.estimatedCost || 0).toLocaleString()}</p>
                </div>
              </div>

              <div className="pt-4 flex-1">
                  <p className="text-[10px] text-on-surface-variant font-medium leading-relaxed italic line-clamp-3">
                    &quot;{vendor.notes || "Pendiente de revisión técnica por el equipo de auditoría."}&quot;
                  </p>
              </div>

              {/* View Profile Button */}
              <div className="pt-6">
                <Link 
                    href={`/vendors/${vendor.id}`}
                    className="w-full py-3 rounded-xl bg-surface-container-highest border border-outline-variant/10 hover:bg-primary hover:text-on-primary hover:border-transparent transition-all flex items-center justify-center gap-2 group/btn"
                >
                    <span className="text-[10px] font-black uppercase tracking-widest">Abrir Perfil Auditor</span>
                    <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State / Add Placeholder */}
        <Link 
            href="?register=true"
            className="border-2 border-dashed border-outline-variant/20 rounded-[32px] flex flex-col items-center justify-center p-12 space-y-4 hover:border-primary/50 hover:bg-primary/5 transition-all group min-h-[300px]"
        >
            <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 group-hover:text-primary transition-colors">add_moderator</span>
            </div>
            <div className="text-center">
                <p className="text-sm font-black text-on-surface group-hover:text-primary">Registrar Nueva Consultora</p>
                <p className="text-[10px] font-bold text-on-surface-variant/40 mt-1 uppercase tracking-widest">Provisioning Node Active</p>
            </div>
        </Link>
      </div>
    </div>
  );
}
