"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createTimelineEvent } from "@/app/actions";

export default function TimelineSlideOver({ vendorId }: { vendorId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isOpen = searchParams.get("add_observation") === "true";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "clinical_notes",
  });

  const [loading, setLoading] = useState(false);

  const close = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("add_observation");
    const qs = params.toString();
    router.push(qs ? `?${qs}` : pathname);
    setFormData({ title: "", description: "", icon: "clinical_notes" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTimelineEvent(vendorId, formData);
      close();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar la observación.");
    } finally {
      setLoading(false);
    }
  };

  const icons = [
    { id: "clinical_notes", label: "Nota", symbol: "clinical_notes" },
    { id: "event", label: "Evento", symbol: "event" },
    { id: "call", label: "Llamada", symbol: "call" },
    { id: "mail", label: "Email", symbol: "mail" },
    { id: "groups", label: "Reunión", symbol: "groups" },
    { id: "verified", label: "Hito", symbol: "verified" },
  ];

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
            className="fixed inset-y-0 right-0 w-full max-w-[400px] bg-surface-container-low shadow-[-20px_0_40px_rgba(0,0,0,0.4)] z-[70] flex flex-col border-l border-outline-variant/15"
          >
            {/* Header */}
            <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-on-surface">
                  Nueva Observación
                </h2>
                <p className="text-sm text-on-surface-variant mt-1 uppercase tracking-widest font-bold text-[10px]">
                  Seguimiento de Proveedor
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
                  {/* Icon Selector */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">
                      Tipo de Actividad
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {icons.map((icon) => (
                        <button
                          key={icon.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, icon: icon.symbol })}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                            formData.icon === icon.symbol
                              ? "bg-primary/10 border-primary text-primary"
                              : "bg-surface-container-highest border-outline-variant/10 text-on-surface-variant hover:border-primary/30"
                          }`}
                        >
                          <span className="material-symbols-outlined text-xl">{icon.symbol}</span>
                          <span className="text-[8px] font-black uppercase tracking-tighter">{icon.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">
                      Título del Hito
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all placeholder:text-on-surface-variant/40 font-bold"
                      placeholder="Ej. Llamada de seguimiento, Demo técnica..."
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">
                      Detalle de la Observación
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={6}
                      className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all placeholder:text-on-surface-variant/40 resize-none text-sm"
                      placeholder="Escriba los detalles aquí..."
                    />
                  </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1 italic">Nota de Auditoría</p>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed">
                    Esta entrada será visible para todo el equipo de evaluación y quedará registrada permanentemente en el historial.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-8 bg-surface-container border-t border-outline-variant/10 flex gap-4">
                <button
                  type="button"
                  onClick={close}
                  className="flex-1 py-3 text-sm font-bold bg-surface-container-highest text-on-surface rounded-xl hover:bg-surface-bright transition-colors"
                >
                  Descartar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] py-3 text-sm font-bold bg-primary text-on-primary rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? "Guardando..." : "Guardar Hito"}
                </button>
              </div>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
