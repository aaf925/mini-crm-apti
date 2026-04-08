"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials. Access denied.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-sans selection:bg-primary/30 min-h-screen flex items-center justify-center relative overflow-hidden w-full">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCfj-XqME1u5Kg7GzzO52dAOhYV4xZjyxWbU1XbpHfQkPefnx-_ZZ2WxL0BfA4LyakNwEOgJoMiyNE_vGZWGJ2NeJfnWqLtHVjgdoXzb7aK4E8O3eeHCzbgcRRn3j-pKmP7VMdac7DtLoDMqvgMQI7mMYEQ4m24cdr0GmW8Gk9Rb3Ugf8JbJr_VCNqTrLPDDJrG2fGR8ox0jWwDBQBmUWDl-tF16XLejcuHnliNjZjHxs5UJh4dSDJCZRgQtKa5RJrhDn5y6msiWdsj')]"></div>
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>

      <main className="w-full max-w-md px-6 z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-container rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-on-primary font-bold">hub</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-primary uppercase">ERP Nexus</h1>
          </div>
          <p className="text-on-surface-variant text-sm font-medium uppercase tracking-widest leading-none">Enterprise Resource Portal</p>
        </div>

        <div className="bg-surface-container-low p-8 rounded-xl shadow-2xl border border-outline-variant/10 backdrop-blur-md">
          <div className="mb-8">
            <h2 className="text-xl font-bold tracking-tight text-on-surface lowercase first-letter:uppercase">Secure access</h2>
            <p className="text-on-surface-variant text-sm mt-1">Authenticate with your corporate credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-error-container/20 border border-error/20 p-3 rounded-lg text-error text-xs font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant ml-1" htmlFor="email">
                Corporate email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">alternate_email</span>
                </div>
                <input
                  className="block w-full pl-11 pr-4 py-3.5 bg-surface-container-highest border-none rounded-lg text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all"
                  id="email"
                  name="email"
                  placeholder="name@erpnexus.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="password">
                  Password
                </label>
                <a className="text-xs font-medium text-primary hover:text-primary-fixed-dim transition-colors" href="#">
                  Forgot Password?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">lock_open</span>
                </div>
                <input
                  className="block w-full pl-11 pr-4 py-3.5 bg-surface-container-highest border-none rounded-lg text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all"
                  id="password"
                  name="password"
                  placeholder="••••••••••••"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 px-1">
              <input
                className="w-4 h-4 rounded border-none bg-surface-container-highest text-primary focus:ring-primary/40 focus:ring-offset-background cursor-pointer"
                id="remember"
                type="checkbox"
              />
              <label className="text-sm text-on-surface-variant cursor-pointer select-none" htmlFor="remember">
                Trust this device for 30 days
              </label>
            </div>

            <button
              disabled={loading}
              className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-lg shadow-lg shadow-primary/10 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              type="submit"
            >
              {loading ? "Authenticating..." : "Sign In"}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center">
            <div className="w-full h-[1px] bg-outline-variant/10 mb-6"></div>
            <p className="text-sm text-on-surface-variant">
              Unauthorized account?
              <Link className="text-primary font-bold ml-1 hover:underline underline-offset-4 decoration-primary/40" href="/register">
                Request Access
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 text-center opacity-60">
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-on-surface-variant mb-1">security</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">256-bit AES</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-on-surface-variant mb-1">sync_alt</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Active Sync</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-on-surface-variant mb-1">verified_user</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">ISO 27001</span>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-6 w-full text-center pointer-events-none">
        <p className="text-[11px] text-on-surface-variant/30 font-medium tracking-[0.2em] uppercase">ERP Nexus v4.2 Industrial Architecture © 2024</p>
      </footer>
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </div>
  );
}
