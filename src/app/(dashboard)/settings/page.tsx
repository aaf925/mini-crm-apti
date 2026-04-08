import { auth } from "@/auth";
import { handleSignOut } from "@/app/actions";

export default async function SettingsPage() {
  const session = await auth();
  const user = session?.user;

  const initials = user?.name 
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    : "AU";

  return (
    <div className="p-8 space-y-12 max-w-[1200px] mx-auto animate-in fade-in zoom-in-95 duration-1000">
      {/* Header */}
      <div className="border-b border-outline-variant/10 pb-8">
        <h2 className="text-4xl font-black tracking-tight text-on-surface uppercase">
          Configuración <span className="text-primary italic">Auditoría</span>
        </h2>
        <p className="text-on-surface-variant mt-2 font-medium tracking-wide">
          User Preferences & Enterprise Governance Controls
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Profile & Security */}
        <div className="lg:col-span-1 space-y-8">
            {/* Profile Card */}
            <div className="glass-panel p-8 bg-gradient-to-br from-surface-container to-surface-container-high border-primary/10 shadow-2xl shadow-primary/5">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center p-2">
                        <div className="w-full h-full rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-black text-3xl">
                            {initials}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-on-surface tracking-tight">{user?.name || "Auditor"}</h3>
                        <p className="text-[10px] font-black uppercase text-on-surface-variant/40 tracking-[0.2em] mt-1">
                            {user?.department || user?.role || "Lead IT Auditor"}
                        </p>
                    </div>
                    <button className="w-full py-3 bg-surface-container-highest rounded-xl text-[10px] font-black uppercase tracking-widest text-on-surface hover:bg-primary hover:text-on-primary transition-colors">
                        Edit Public Profile
                    </button>
                    <form action={handleSignOut} className="w-full">
                      <button type="submit" className="w-full py-3 bg-red-500/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-colors">
                          Sign Out System
                      </button>
                    </form>
                </div>
            </div>

            {/* Security Status */}
            <div className="glass-panel p-6 space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-secondary">security</span>
                    Governance Status
                </h4>
                <div className="space-y-4">
                    <div className="flex justify-between items-center bg-surface-container-high/40 p-4 rounded-2xl border border-outline-variant/10">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-emerald-400">check_circle</span>
                            <div>
                                <p className="text-xs font-bold text-on-surface leading-none">MFA Enabled</p>
                                <p className="text-[8px] text-on-surface-variant uppercase mt-1">Biometric Layer Active</p>
                            </div>
                        </div>
                        <span className="text-[8px] font-black text-emerald-400">ACTIVE</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column: System Controls */}
        <div className="lg:col-span-2 space-y-10">
            {/* General Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { title: "Notification Sync", desc: "Real-time audit alerts", icon: "notifications_active", active: true },
                    { title: "Data Export Mode", desc: "Auto-JSON serialization", icon: "data_object", active: false },
                    { title: "Privacy Lock", desc: "Obfuscate vendor names", icon: "lock_person", active: false },
                    { title: "Technical Logs", desc: "Extended system debugging", icon: "terminal", active: true }
                ].map((item, i) => (
                    <div key={i} className="glass-panel p-6 flex justify-between items-start group hover:bg-surface-container-highest/20 transition-all">
                        <div className="flex gap-4">
                            <span className={`material-symbols-outlined ${item.active ? 'text-primary' : 'text-on-surface-variant/20'} text-3xl`}>{item.icon}</span>
                            <div>
                                <h4 className="text-sm font-black text-on-surface tracking-tight group-hover:translate-x-1 transition-transform">{item.title}</h4>
                                <p className="text-[10px] font-medium text-on-surface-variant mt-1 italic tracking-wide">{item.desc}</p>
                            </div>
                        </div>
                        <div className={`w-8 h-4 rounded-full relative transition-colors ${item.active ? 'bg-primary' : 'bg-surface-container-highest'}`}>
                            <div className={`absolute top-1 w-2 h-2 rounded-full bg-surface-bright transition-all ${item.active ? 'right-1' : 'left-1'}`}></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Categorization Matrix */}
            <div className="glass-panel p-8 space-y-8">
                <div className="flex justify-between items-end border-b border-outline-variant/10 pb-6">
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-on-surface italic">Category Taxonomy</h3>
                        <p className="text-[10px] text-on-surface-variant mt-1 uppercase font-bold tracking-tighter">Define vendor verticals for audit mapping</p>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-primary text-xl">add</span>
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                        "Cloud Native", "Legacy Bridge", "On-Premise", "Financial Tech", "Logistics Core", "AI Integration"
                    ].map((tag, i) => (
                        <div key={i} className="px-4 py-3 rounded-2xl bg-surface-container-high/50 border border-outline-variant/10 flex items-center justify-between group hover:border-primary/40 transition-colors cursor-pointer">
                            <span className="text-[10px] font-black uppercase tracking-tighter text-on-surface-variant/80 group-hover:text-on-surface">{tag}</span>
                            <span className="material-symbols-outlined text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">close</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-8 bg-primary/5 rounded-[32px] border border-primary/10 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 group">
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
                <div className="flex-1 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary italic">Enterprise Version</p>
                    <h4 className="text-2xl font-black text-on-surface tracking-tight">Audit v4.2.0 stable kernel</h4>
                    <p className="text-xs text-on-surface-variant font-medium leading-relaxed">Your account is currently managed by Suministros El Parque internal IT governance protocols. Some settings represent read-only corporate policies.</p>
                </div>
                <button className="px-8 py-3 rounded-2xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20 whitespace-nowrap">
                    Update System
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
