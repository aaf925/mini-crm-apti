"use client";

import { useState } from "react";
import { registerUser } from "@/app/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await registerUser(formData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      setError(result.error || "An error occurred during registration.");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center p-6">
        <div className="glass-panel p-10 rounded-2xl text-center space-y-6 max-w-md border-primary/20 shadow-2xl shadow-primary/10">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-500/5">
             <span className="material-symbols-outlined text-emerald-400 text-4xl" style={{ fontVariationSettings: "'wght' 700" }}>check_circle</span>
          </div>
          <h2 className="text-3xl font-black text-on-surface tracking-tight uppercase">Request sent</h2>
          <p className="text-on-surface-variant font-medium leading-relaxed">
            Your system enrollment request has been submitted for provisioning. Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center p-6 selection:bg-primary selection:text-on-primary w-full py-20">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-xl bg-surface-container-low border border-outline-variant/10 shadow-2xl">
        {/* Left Column: Vision */}
        <div className="lg:col-span-5 relative hidden lg:block overflow-hidden min-h-[600px]">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-60"></div>
          <img
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity"
            alt="Industrial gear architecture"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw6qQXk4q5ebJZWdukvQm-R7OT2XnHJ_GDFG30E9vUY_Z6orVtiB7UiFbKItLOQjvqxXof3QZk3rem8grYUPzEwNhizJY4J5EHGGPsnwrzkS1hqIJZeHPbmKTPphGoT1hpvLV9DqmhagEB0a_B3pyHLWwXxx_93ii9sr04F2Hh1s6tSibqTB_VGW7zniat9DWX8E9fJbRaVdyRdqulaXU2ZnnmRLVVFf4xGJxZvqxT09_9tsSaXKeLSmBEpBHEHs07kShIZczntc2z"
          />
          <div className="relative z-20 h-full flex flex-col justify-between p-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-gradient rounded flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>dataset</span>
              </div>
              <span className="text-xl font-black tracking-tighter text-primary uppercase">ERP Nexus Hub</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl font-black tracking-tight text-on-surface leading-tight uppercase">
                Precision control <br />
                <span className="text-primary italic">Industrial framework</span>
              </h1>
              <p className="text-on-surface-variant max-w-xs leading-relaxed font-label italic uppercase tracking-wider text-[10px]">
                Suministros El Parque internal network. Access restricted to authorized personnel only. Secure encryption active.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                 {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-surface-container-low bg-surface-container-highest flex items-center justify-center text-[10px] font-black text-on-surface-variant">
                        U{i}
                    </div>
                 ))}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Active nodes: 1,248</span>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-surface-container-low">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2 block italic">System enrollment</span>
              <h2 className="text-4xl font-black tracking-tighter text-on-surface uppercase">Request Access</h2>
              <p className="text-on-surface-variant mt-2 font-medium">Submit your credentials for system provisioning.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                 <div className="bg-error-container/10 border border-error/20 p-4 rounded-xl text-error text-xs font-bold flex items-center gap-3">
                    <span className="material-symbols-outlined text-sm">error</span>
                    {error}
                 </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-on-surface-variant ml-1">Full name</label>
                  <input
                    required
                    name="name"
                    className="w-full bg-surface-container-highest border-none rounded-lg py-3.5 px-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all outline-none"
                    placeholder="John Doe"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-on-surface-variant ml-1">Work email</label>
                  <input
                    required
                    name="email"
                    className="w-full bg-surface-container-highest border-none rounded-lg py-3.5 px-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all outline-none"
                    placeholder="j.doe@elparque.com"
                    type="email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-on-surface-variant ml-1">Department</label>
                  <select
                    required
                    name="department"
                    className="w-full bg-surface-container-highest border-none rounded-lg py-3.5 px-4 text-on-surface focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option disabled selected value="">Select Department</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Operations">Operations</option>
                    <option value="Procurement">Procurement</option>
                    <option value="IT Infrastructure">IT Infrastructure</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-on-surface-variant ml-1">Password</label>
                  <input
                    required
                    name="password"
                    className="w-full bg-surface-container-highest border-none rounded-lg py-3.5 px-4 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all outline-none"
                    placeholder="••••••••••••"
                    type="password"
                  />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 flex gap-4 items-start shadow-inner">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'wght' 300" }}>verified_user</span>
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-widest text-on-surface">Security protocol</p>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed font-label">
                    Your application will be routed to the System Administrator for identity verification. Provisioning typically takes 2-4 hours after approval.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  disabled={loading}
                  className="w-full bg-emerald-gradient hover:opacity-90 text-on-primary font-black uppercase tracking-[0.2em] py-4 rounded-xl transition-all shadow-xl shadow-primary/20 active:scale-[0.98] disabled:opacity-50 text-xs"
                  type="submit"
                >
                  {loading ? "Processing..." : "Send Request Access"}
                </button>
              </div>

              <p className="text-center text-sm text-on-surface-variant mt-8 font-medium">
                Already have access? <Link className="text-primary font-black hover:underline decoration-2 underline-offset-4 ml-1" href="/login">Sign In</Link>
              </p>
            </form>
            
            <div className="mt-12 flex items-center justify-between opacity-30">
              <div className="h-px bg-outline-variant flex-1"></div>
              <span className="mx-4 text-[8px] font-black tracking-[0.4em] uppercase whitespace-nowrap">Provisioning Node 4.2</span>
              <div className="h-px bg-outline-variant flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
