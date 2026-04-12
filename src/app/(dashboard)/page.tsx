import { getRecentActivity, getVendors } from "@/app/actions";
import Link from "next/link";

export default async function DashboardPage() {
  const vendors = await getVendors();
  const activities = await getRecentActivity(5);

  // KPI Calculations
  const totalVendors = vendors.length;
// ... (lines 8-35 remain same)
  const avgCost = totalVendors > 0 
    ? vendors.reduce((acc, v) => acc + (v.estimatedCost || 0), 0) / totalVendors 
    : 0;
  const avgTime = totalVendors > 0
    ? vendors.reduce((acc, v) => acc + (v.estimatedMonths || 0), 0) / totalVendors
    : 0;
  const selectedCount = vendors.filter(v => v.status === "SELECCIONADO").length;
  const selectionRate = totalVendors > 0 ? (selectedCount / totalVendors) * 100 : 0;

  const stats = [
    { label: "Total Proposals", value: totalVendors, icon: "analytics", color: "text-primary" },
    { label: "Avg Est. Cost", value: `$${(avgCost / 1000).toFixed(1)}k`, icon: "payments", color: "text-secondary" },
    { label: "Avg Timeline", value: `${avgTime.toFixed(1)}m`, icon: "schedule", color: "text-tertiary" },
    { label: "Selection Rate", value: `${selectionRate.toFixed(0)}%`, icon: "star", color: "text-emerald-400" },
  ];

  // Audit Health Calculations
  const avgTech = totalVendors > 0 ? vendors.reduce((acc, v) => acc + (v.technicalFit || 0), 0) / totalVendors : 0;
  const avgPricing = totalVendors > 0 ? vendors.reduce((acc, v) => acc + (v.pricingValue || 0), 0) / totalVendors : 0;
  const avgScale = totalVendors > 0 ? vendors.reduce((acc, v) => acc + (v.scalability || 0), 0) / totalVendors : 0;

  const technicalHealth = (avgTech / 10) * 100;
  const financialValidation = (avgPricing / 10) * 100;
  const growthScalability = (avgScale / 10) * 100;

  const highQualityVendors = vendors.filter(v => (v.technicalFit || 0) >= 7.5).length;

  return (
    <div className="p-8 space-y-10 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-on-surface">
            Executive <span className="text-primary italic">Overview</span>
          </h2>
          <p className="text-on-surface-variant mt-2 font-medium tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Real-time Vendor Evaluation Metrics • Suministros El Parque
          </p>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="bg-surface-container-high px-4 py-2 rounded-lg border border-outline-variant/10 flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant text-sm">calendar_today</span>
                <span className="text-xs font-bold text-on-surface">March 2024 - Present</span>
            </div>
            <button className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant/10 flex items-center justify-center hover:bg-surface-bright transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant text-lg">download</span>
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel p-6 group hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <span className={`material-symbols-outlined ${stat.color} text-2xl`}>{stat.icon}</span>
              </div>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded tracking-tighter">
                +12% vs LY
              </span>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 mb-1">
                {stat.label}
              </p>
              <h3 className="text-3xl font-black text-on-surface tracking-tighter group-hover:translate-x-1 transition-transform">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
            <div className="glass-panel overflow-hidden flex flex-col">
              <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/30">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                    <h3 className="text-lg font-black tracking-tight text-on-surface uppercase">Estudio de Mercado Reciente</h3>
                </div>
                <Link href="/evaluations" className="text-xs font-bold text-primary hover:underline flex items-center gap-1 group">
                    Ver Todo <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low/50">
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/10">Consultora</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/10">ERP Propuesto</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/10">Presupuesto</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/10 text-right">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/5">
                    {vendors.slice(0, 6).map((vendor) => (
                      <tr key={vendor.id} className="hover:bg-surface-container-highest/30 transition-colors group">
                        <td className="px-6 py-5">
                          <Link href={`/vendors/${vendor.id}`} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center border border-outline-variant/10 group-hover:border-primary/30 transition-colors uppercase font-bold text-[10px]">
                              {vendor.companyName.substring(0, 2)}
                            </div>
                            <span className="text-xs font-bold text-on-surface">{vendor.companyName}</span>
                          </Link>
                        </td>
                        <td className="px-6 py-5 text-xs text-on-surface-variant font-medium">
                          {vendor.softwareProposed}
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-xs font-black text-on-surface tracking-tighter">
                            {vendor.estimatedCost ? `$${vendor.estimatedCost.toLocaleString()}` : "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter shadow-sm ${
                            vendor.status === "SELECCIONADO" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                            vendor.status === "DESCARTADO" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                            "bg-primary/10 text-primary border border-primary/20"
                          }`}>
                            {vendor.status.replace(/_/g, " ")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Compliance Stats Box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Technical Scoring", progress: Math.round(technicalHealth), color: "bg-primary" },
                    { label: "Financial Validation", progress: Math.round(financialValidation), color: "bg-secondary" },
                    { label: "Vendor Scalability", progress: Math.round(growthScalability), color: "bg-tertiary" }
                ].map((item, i) => (
                    <div key={i} className="glass-panel p-6 space-y-3">
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant font-mono">{item.label}</span>
                            <span className="text-xs font-black text-on-surface">{item.progress}%</span>
                        </div>
                        <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                            <div 
                                className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`} 
                                style={{ width: `${item.progress}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="space-y-8">
            {/* Global Activity Feed */}
            <div className="glass-panel p-6 flex flex-col bg-surface-container-low min-h-[400px]">
                <h3 className="text-sm font-black tracking-tight text-on-surface uppercase flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-primary">dynamic_feed</span>
                    Actividad Global
                </h3>
                <div className="flex-1 space-y-6">
                    {activities.length > 0 ? activities.map((activity: any, i) => (
                        <div key={i} className="flex gap-4 group">
                            <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center border border-outline-variant/10 group-hover:border-primary/30 transition-colors">
                                <span className="material-symbols-outlined text-xs text-primary">{activity.icon || 'history'}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-[11px] font-black text-on-surface tracking-tight uppercase leading-tight truncate">
                                    {activity.vendor.companyName}
                                </h4>
                                <p className="text-[10px] font-bold text-on-surface-variant mt-0.5 truncate italic">
                                    {activity.title}
                                </p>
                                <p className="text-[10px] text-on-surface-variant/50 mt-1">
                                    {new Date(activity.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                                </p>
                            </div>
                        </div>
                    )) : (
                        <p className="text-[10px] text-on-surface-variant/40 italic uppercase tracking-widest text-center py-10">Sin actividad reciente</p>
                    )}
                </div>
                <Link href="/evaluations" className="mt-6 text-[10px] font-black uppercase tracking-widest text-primary text-center hover:underline">
                    Ver todos los proveedores
                </Link>
            </div>

            {/* Audit Alert */}
            <div className="p-6 bg-gradient-to-br from-primary/10 to-primary-container/5 rounded-2xl border border-primary/10 relative overflow-hidden group">
                <div className="absolute -bottom-2 -right-2 p-2 opacity-10">
                    <span className="material-symbols-outlined text-primary text-8xl group-hover:scale-110 transition-transform">verified_user</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Estado de Auditoría</p>
                <p className="text-xs text-on-surface font-medium leading-relaxed relative z-10">
                    {highQualityVendors} proveedor{highQualityVendors !== 1 ? 'es superan' : ' supera'} el umbral técnico de 7.5/10.
                </p>
                <button className="mt-4 text-[10px] font-bold text-on-surface underline hover:text-primary transition-colors relative z-10">
                    Descargar Informe de Audit
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
