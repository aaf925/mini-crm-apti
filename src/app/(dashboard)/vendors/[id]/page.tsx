import { getVendorById, getVendors } from "@/app/actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import TimelineSlideOver from "@/components/vendors/TimelineSlideOver";

export default async function VendorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vendor = await getVendorById(id);
  if (!vendor) notFound();

  const ratings = [
    { label: "Ajuste Técnico", score: vendor.technicalFit || 0 },
    { label: "Escalabilidad", score: vendor.scalability || 0 },
    { label: "Soporte Post-Venta", score: vendor.postSaleSupport || 0 },
    { label: "Precio / Valor", score: vendor.pricingValue || 0 },
  ];

  return (
    <div className="p-8 space-y-10 max-w-[1400px] mx-auto animate-in slide-in-from-right-4 duration-700">
      {/* Breadcrumbs & Simple Actions */}
      <div className="flex items-center justify-between border-b border-outline-variant/10 pb-6">
        <div className="flex items-center gap-4 text-on-surface-variant font-bold text-[10px] uppercase tracking-widest">
            <Link href="/evaluations" className="hover:text-primary transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Volver a la Matriz
            </Link>
            <span className="opacity-20">/</span>
            <span className="text-on-surface">Inteligencia de Proveedores</span>
        </div>
        <div className="flex items-center gap-3">
             <Link 
                href={`?edit=${vendor.id}`}
                className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
            >
                <span className="material-symbols-outlined text-sm">edit</span>
                Modificar Propuesta
            </Link>
            <button className="bg-surface-container-high hover:bg-surface-bright px-3 py-1.5 rounded-lg border border-outline-variant/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant text-sm">more_horiz</span>
            </button>
        </div>
      </div>

      {/* Profile Header Block */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="w-48 h-48 rounded-[32px] bg-gradient-to-br from-primary/20 to-primary-container/20 border border-primary/20 flex items-center justify-center relative group">
              <div className="absolute inset-4 bg-surface-container-high rounded-[24px] border border-outline-variant/10 flex items-center justify-center font-black text-6xl text-primary group-hover:scale-105 transition-transform">
                  {vendor.companyName.substring(0, 1)}
              </div>
          </div>
          <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                  <h1 className="text-6xl font-black tracking-tight text-on-surface uppercase">{vendor.companyName}</h1>
                  <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                      vendor.status === "SELECCIONADO" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                      "bg-primary/10 text-primary border border-primary/20"
                  }`}>
                      {vendor.status.replace(/_/g, " ")}
                  </span>
              </div>
              <p className="text-xl text-on-surface-variant font-medium max-w-2xl">
                  {vendor.notes || "No se han proporcionado notas técnicas adicionales para este ciclo de evaluación."}
              </p>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Implementación</span>
                    <span className="text-2xl font-black text-on-surface">{vendor.softwareProposed}</span>
                </div>
                <div className="w-px h-10 bg-outline-variant/10"></div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Responsable</span>
                    <span className="text-2xl font-black text-emerald-400">{vendor.internalOwner}</span>
                </div>
              </div>
          </div>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:h-[600px]">
          {/* Detailed Stats Column */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Scoring Chart Mock */}
                <div className="glass-panel p-8 bg-surface-container-low flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-8">
                        <h3 className="text-sm font-black uppercase tracking-widest text-on-surface">Puntuación Técnica</h3>
                        <span className="text-primary material-symbols-outlined text-4xl">radar</span>
                    </div>
                    <div className="space-y-6">
                        {ratings.map((rate, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-on-surface-variant">{rate.label}</span>
                                    <span className="text-primary">{rate.score}/10</span>
                                </div>
                                <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${rate.score * 10}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel p-8 bg-surface-container flex flex-col">
                    <h3 className="text-sm font-black uppercase tracking-widest text-on-surface mb-8">Resumen Financiero</h3>
                    <div className="flex-1 flex flex-col justify-center space-y-10">
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Valor Total del Contrato</p>
                            <h4 className="text-5xl font-black tracking-tighter text-on-surface">${(vendor.estimatedCost || 0).toLocaleString()}</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/10 text-center">
                                <p className="text-[8px] font-black uppercase text-on-surface-variant mb-1">Duración</p>
                                <p className="text-lg font-black text-on-surface">{vendor.estimatedMonths || "~"} Meses</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-surface-container-high border border-outline-variant/10 text-center">
                                <p className="text-[8px] font-black uppercase text-on-surface-variant mb-1">Tipo</p>
                                <p className="text-lg font-black text-on-surface">{vendor.hostingType || "SaaS"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Card */}
                <div className="md:col-span-2 glass-panel p-8 bg-gradient-to-tr from-surface-container-low to-surface-bright flex items-center gap-10">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-5xl">contact_mail</span>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 flex-1 gap-6">
                        <div>
                            <p className="text-[8px] font-black uppercase text-on-surface-variant mb-1">Contacto Clave</p>
                            <p className="text-sm font-bold text-on-surface">{vendor.contactName || "Sin asignar"}</p>
                        </div>
                        <div>
                            <p className="text-[8px] font-black uppercase text-on-surface-variant mb-1">Correo Corporativo</p>
                            <p className="text-sm font-bold text-primary underline">{vendor.email || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-[8px] font-black uppercase text-on-surface-variant mb-1">Teléfono</p>
                            <p className="text-sm font-bold text-on-surface">{vendor.phone || "N/A"}</p>
                        </div>
                        <button className="bg-surface-container-highest rounded-xl text-xs font-black uppercase py-2 hover:bg-primary hover:text-on-primary transition-colors">
                            Solicitar Demo
                        </button>
                    </div>
                </div>
          </div>

          {/* Timeline Column */}
          <div className="lg:col-span-4 glass-panel p-8 flex flex-col bg-surface-container-low">
                <h3 className="text-sm font-black uppercase tracking-widest text-on-surface mb-8 italic outline-text">Línea de Tiempo</h3>
                <div className="flex-1 space-y-8 relative overflow-y-auto no-scrollbar max-h-[400px]">
                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-outline-variant/10"></div>
                    {vendor.timeline && vendor.timeline.length > 0 ? (
                      vendor.timeline.map((step, i) => (
                        <div key={i} className="flex gap-6 relative group">
                            <div className={`z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-125 ${
                                step.status === "SELECCIONADO" ? "bg-emerald-500 text-on-primary" : 
                                step.status === "DESCARTADO" ? "bg-error text-on-error" :
                                "bg-primary text-on-primary ring-4 ring-primary/20"
                            }`}>
                                <span className="material-symbols-outlined text-[12px]">{step.icon || "event"}</span>
                            </div>
                            <div className="pb-2 flex-1">
                                <h4 className="text-xs font-black uppercase tracking-widest text-on-surface">
                                    {step.title}
                                </h4>
                                <p className="text-[10px] text-on-surface-variant font-medium mt-1 uppercase tracking-tight">
                                    {new Date(step.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>
                                {step.description && (
                                  <p className="text-[10px] text-on-surface-variant/70 mt-2 bg-surface-container-highest/20 p-2 rounded-lg border border-outline-variant/5">{step.description}</p>
                                )}
                            </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-[10px] text-on-surface-variant/40 italic uppercase tracking-widest text-center py-10">Sin actividad registrada</p>
                    )}
                </div>
                <Link 
                    href="?add_observation=true"
                    className="mt-8 w-full py-4 rounded-2xl bg-surface-container-highest border border-outline-variant/10 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface hover:bg-primary hover:text-on-primary hover:border-transparent transition-all shadow-xl shadow-black/20 text-center"
                >
                    Añadir Observación
                </Link>
          </div>
      </div>
      <TimelineSlideOver vendorId={vendor.id} />
    </div>
  );
}
