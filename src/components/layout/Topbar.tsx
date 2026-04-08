"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Topbar() {
  const pathname = usePathname();
  const pageName = pathname === "/" ? "Executive Overview" : pathname.split("/")[1].charAt(0).toUpperCase() + pathname.split("/")[1].slice(1);

  return (
    <header className="w-full h-16 flex items-center justify-between px-8 bg-slate-900/80 dark:bg-[#0b1326]/80 backdrop-blur-md sticky top-0 z-40 border-b border-outline-variant/10">
      <div className="flex items-center gap-6 flex-1">
        <div className="flex flex-col">
          <span className="text-lg font-black uppercase tracking-widest text-slate-100 dark:text-[#dae2fd]">
            ERP Tracker
          </span>
          <span className="text-[10px] text-primary font-bold uppercase tracking-widest">
            {pageName}
          </span>
        </div>
        
        {/* Search Bar */}
        <div className="relative hidden lg:block max-w-md w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
            search
          </span>
          <input
            type="text"
            className="bg-surface-container-highest/50 border-none rounded-lg py-1.5 pl-10 pr-4 text-xs focus:ring-1 focus:ring-primary/40 w-full placeholder:text-on-surface-variant/40 transition-all focus:bg-surface-container-high"
            placeholder="Search evaluation criteria..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Registration Trigger */}
        <Link 
            href="?register=true"
            className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-4 py-2 rounded-lg text-xs font-bold transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-primary/10 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          <span>Registrar Proveedor</span>
        </Link>

        {/* Action Icons */}
        <div className="flex items-center gap-3 border-l border-outline-variant/20 pl-4">
          <button className="text-on-surface-variant hover:text-primary transition-colors duration-200">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors duration-200">
            <span className="material-symbols-outlined text-emerald-400">account_circle</span>
          </button>
        </div>
      </div>
    </header>
  );
}
