"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { handleSignOut } from "@/app/actions";

const navItems = [
// ...
  { name: "Overview", icon: "dashboard", href: "/" },
  { name: "Evaluations", icon: "assessment", href: "/evaluations" },
  { name: "Integrators", icon: "handshake", href: "/integrators" },
  { name: "Settings", icon: "settings", href: "/settings" },
];

export default function Sidebar({ user }: { user?: { name?: string | null, email?: string | null, department?: string | null, role?: string | null } }) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-slate-950 dark:bg-[#060e20] font-['Inter'] tracking-tight leading-relaxed fixed left-0 top-0 overflow-y-auto z-50">
      <div className="p-8 flex flex-col h-full">
        {/* Logo Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-1">
            <div className="relative w-8 h-8 rounded bg-primary/20 flex items-center justify-center overflow-hidden">
                <Image src="/logo.jpeg" alt="Logo" fill className="object-cover" />
            </div>
            <h1 className="text-xl font-bold tracking-tighter text-emerald-400 dark:text-[#4edea3]">
                ERP Vendor Hub
            </h1>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 mt-1 font-medium">
            Industrial Ops
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 group ${
                  isActive
                    ? "text-emerald-400 dark:text-[#4edea3] font-semibold bg-[#2d3449]"
                    : "text-slate-400 dark:text-[#bbcabf] hover:bg-[#131b2e]"
                }`}
              >
                <span 
                    className={`material-symbols-outlined ${isActive ? "" : "group-hover:text-emerald-400"}`}
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="mt-auto pt-6 border-t border-outline-variant/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low/50">
            <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden relative">
              <div className="bg-emerald-500/20 w-full h-full flex items-center justify-center">
                <span className="material-symbols-outlined text-emerald-400 text-lg">person</span>
              </div>
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-bold text-on-surface truncate">{user?.name || "Auditor"}</p>
              <p className="text-[10px] text-on-surface-variant truncate">
                {user?.department || user?.role || "General Auditor"}
              </p>
            </div>
            <form action={handleSignOut}>
                <button type="submit" className="text-on-surface-variant hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-400/10 group/logout">
                    <span className="material-symbols-outlined text-lg group-hover/logout:font-bold">logout</span>
                </button>
            </form>
          </div>
        </div>
      </div>
    </aside>
  );
}
