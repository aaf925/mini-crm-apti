"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createVendor, updateVendor, getVendorById, type VendorData, type VendorStatusType } from "@/app/actions";

// Local fallback for VendorStatus enum values to match Prisma
const STATUS_OPTIONS: VendorStatusType[] = [
  "IDENTIFICADO",
  "PRIMERA_REUNION",
  "DEMO_REALIZADA",
  "ESPERANDO_PRESUPUESTO",
  "PRESUPUESTO_RECIBIDO",
  "NEGOCIANDO",
  "SELECCIONADO",
  "DESCARTADO",
];

export default function VendorSlideOver() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isOpen = searchParams.get("register") === "true" || !!searchParams.get("edit");
  const vendorId = searchParams.get("edit");

  const [formData, setFormData] = useState<VendorData>({
    companyName: "",
    softwareProposed: "",
    contactName: "",
    email: "",
    phone: "",
    status: "IDENTIFICADO",
    estimatedCost: "",
    estimatedMonths: "",
    internalOwner: "Alex Chen",
    notes: "",
    technicalFit: 0,
    scalability: 0,
    postSaleSupport: 0,
    pricingValue: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vendorId && isOpen) {
      setLoading(true);
      getVendorById(vendorId).then((vendor) => {
        if (vendor) {
          setFormData({
            companyName: vendor.companyName,
            softwareProposed: vendor.softwareProposed,
            contactName: vendor.contactName,
            email: vendor.email,
            phone: vendor.phone,
            status: vendor.status as VendorStatusType,
            estimatedCost: vendor.estimatedCost?.toString() || "",
            estimatedMonths: vendor.estimatedMonths?.toString() || "",
            internalOwner: vendor.internalOwner,
            notes: vendor.notes || "",
            technicalFit: vendor.technicalFit || 0,
            scalability: vendor.scalability || 0,
            postSaleSupport: vendor.postSaleSupport || 0,
            pricingValue: vendor.pricingValue || 0,
          });
        }
        setLoading(false);
      });
    } else if (isOpen) {
        setFormData({
            companyName: "",
            softwareProposed: "",
            contactName: "",
            email: "",
            phone: "",
            status: "IDENTIFICADO",
            estimatedCost: "",
            estimatedMonths: "",
            internalOwner: "Alex Chen",
            notes: "",
            technicalFit: 0,
            scalability: 0,
            postSaleSupport: 0,
            pricingValue: 0,
        });
    }
  }, [vendorId, isOpen]);

  const close = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("register");
    params.delete("edit");
    const qs = params.toString();
    router.push(qs ? `?${qs}` : pathname);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (vendorId) {
        await updateVendor(vendorId, formData);
      } else {
        await createVendor(formData);
      }
      close();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-surface-dim/60 backdrop-blur-sm z-[60]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-[450px] bg-surface-container-low shadow-[-20px_0_40px_rgba(0,0,0,0.4)] z-[70] flex flex-col border-l border-outline-variant/15"
          >
            {/* Header */}
            <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-on-surface">
                  {vendorId ? "Editar Proveedor" : "Registrar Proveedor"}
                </h2>
                <p className="text-sm text-on-surface-variant mt-1">
                  Evaluación de propuesta de consultoría ERP
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="w-10 h-10 rounded-full hover:bg-surface-container-highest flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                <div className="space-y-6">
                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">
                      Nombre de la Consultora
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all placeholder:text-on-surface-variant/40"
                      placeholder="Ej. Seidor, Inforges, Integra..."
                    />
                  </div>

                  {/* Software Proposed */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">
                      Software / ERP Propuesto
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.softwareProposed}
                      onChange={(e) => setFormData({ ...formData, softwareProposed: e.target.value })}
                      className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all placeholder:text-on-surface-variant/40"
                      placeholder="Ej. SAP Business One, Dynamics 365..."
                    />
                  </div>

                   {/* Budget & Time Grid */}
                   <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">
                            Presupuesto (USD)
                            </label>
                            <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">$</span>
                            <input
                                type="number"
                                value={formData.estimatedCost || ""}
                                onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
                                className="w-full bg-surface-container-highest border-none rounded-xl py-3 pl-8 pr-4 focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all placeholder:text-on-surface-variant/40 text-xs"
                                placeholder="0.00"
                            />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">
                                Tiempo (Meses)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold material-symbols-outlined text-sm">schedule</span>
                                <input
                                    type="number"
                                    value={formData.estimatedMonths || ""}
                                    onChange={(e) => setFormData({ ...formData, estimatedMonths: e.target.value })}
                                    className="w-full bg-surface-container-highest border-none rounded-xl py-3 pl-10 pr-4 focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all placeholder:text-on-surface-variant/40 text-xs"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                   </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">
                      Estado de la Evaluación
                    </label>
                    <div className="relative">
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as VendorStatusType })}
                            className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 appearance-none focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all text-on-surface cursor-pointer"
                        >
                            {STATUS_OPTIONS.map((status) => (
                                <option key={status} value={status}>
                                    {status.replace(/_/g, " ")}
                                </option>
                            ))}
                        </select>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant pointer-events-none">
                            expand_more
                        </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                   <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">
                                Contacto (Nombre)
                            </label>
                            <input
                                type="text"
                                value={formData.contactName}
                                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all text-xs"
                                placeholder="..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">
                                Teléfono
                            </label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all text-xs"
                                placeholder="..."
                            />
                        </div>
                   </div>

                   <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all text-xs"
                            placeholder="ejemplo@proveedor.com"
                        />
                   </div>
                   <div className="space-y-4 pt-4 border-t border-outline-variant/10">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1 block">
                            Auditoría Técnica (0-10)
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[9px] font-bold uppercase text-on-surface-variant flex justify-between">
                                    Technical Fit <span>{formData.technicalFit}</span>
                                </label>
                                <input 
                                    type="range" min="0" max="10" step="0.5"
                                    value={formData.technicalFit}
                                    onChange={(e) => setFormData({...formData, technicalFit: parseFloat(e.target.value)})}
                                    className="w-full accent-primary h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-bold uppercase text-on-surface-variant flex justify-between">
                                    Scalability <span>{formData.scalability}</span>
                                </label>
                                <input 
                                    type="range" min="0" max="10" step="0.5"
                                    value={formData.scalability}
                                    onChange={(e) => setFormData({...formData, scalability: parseFloat(e.target.value)})}
                                    className="w-full accent-primary h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-bold uppercase text-on-surface-variant flex justify-between">
                                    Support <span>{formData.postSaleSupport}</span>
                                </label>
                                <input 
                                    type="range" min="0" max="10" step="0.5"
                                    value={formData.postSaleSupport}
                                    onChange={(e) => setFormData({...formData, postSaleSupport: parseFloat(e.target.value)})}
                                    className="w-full accent-primary h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-bold uppercase text-on-surface-variant flex justify-between">
                                    Value <span>{formData.pricingValue}</span>
                                </label>
                                <input 
                                    type="range" min="0" max="10" step="0.5"
                                    value={formData.pricingValue}
                                    onChange={(e) => setFormData({...formData, pricingValue: parseFloat(e.target.value)})}
                                    className="w-full accent-primary h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        </div>
                   </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">
                      Notas de Auditoría
                    </label>
                    <textarea
                      value={formData.notes || ""}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={4}
                      className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all placeholder:text-on-surface-variant/40 resize-none text-sm"
                      placeholder="Agregue observaciones técnicas aquí..."
                    />
                  </div>
                </div>

                {/* Requirement Box */}
                <div className="bg-surface-container-highest/30 p-6 rounded-xl border border-outline-variant/10">
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-secondary">info</span>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-on-surface">Requisito de Evaluación</p>
                      <p className="text-[10px] text-on-surface-variant leading-relaxed">
                        Al registrar, el equipo de Auditoría recibirá una notificación automática para iniciar el scoring técnico.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-8 bg-surface-container border-t border-outline-variant/10 flex gap-4">
                <button
                  type="button"
                  onClick={close}
                  className="flex-1 py-3 text-sm font-bold bg-surface-container-highest text-on-surface rounded-xl hover:bg-surface-bright transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] py-3 text-sm font-bold bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? "Procesando..." : vendorId ? "Guardar Cambios" : "Confirmar Registro"}
                </button>
              </div>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
