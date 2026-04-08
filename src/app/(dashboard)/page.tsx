import { getVendors } from "@/app/actions";
import Link from "next/link";

export default async function DashboardPage() {
  const vendors = await getVendors();

  // KPI Calculations
  const totalVendors = vendors.length;
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
      {/* ... (Header and KPI Grid remain same) */}
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
        <div className="xl:col-span-2 glass-panel overflow-hidden flex flex-col">
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
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center border border-outline-variant/10 group-hover:border-primary/30 transition-colors uppercase font-bold text-[10px]">
                          {vendor.companyName.substring(0, 2)}
                        </div>
                        <span className="text-xs font-bold text-on-surface">{vendor.companyName}</span>
                      </div>
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

        <div className="glass-panel p-8 flex flex-col space-y-8 bg-gradient-to-br from-surface-container-low to-surface-container">
            <h3 className="text-lg font-black tracking-tight text-on-surface uppercase flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">security</span>
                Audit Health
            </h3>

            <div className="space-y-6">
                {[
                    { label: "Technical Scoring", progress: Math.round(technicalHealth), color: "bg-primary" },
                    { label: "Financial Validation", progress: Math.round(financialValidation), color: "bg-secondary" },
                    { label: "Vendor Scalability", progress: Math.round(growthScalability), color: "bg-tertiary" }
                ].map((item, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{item.label}</span>
                            <span className="text-xs font-black text-on-surface">{item.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                            <div 
                                className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`} 
                                style={{ width: `${item.progress}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-auto p-6 bg-surface-container-highest/50 rounded-2xl border border-outline-variant/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2">
                    <span className="material-symbols-outlined text-primary/20 text-4xl group-hover:scale-110 transition-transform">verified_user</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Compliance Alert</p>
                <p className="text-xs text-on-surface font-medium leading-relaxed">
                    {highQualityVendors} vendor{highQualityVendors !== 1 ? 's' : ''} currently exceed{highQualityVendors === 1 ? 's' : ''} the technical threshold of 7.5/10 units.
                </p>
                <button className="mt-4 text-[10px] font-bold text-on-surface underline hover:text-primary transition-colors">
                    Download Full Audit Report
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
