import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import VendorSlideOver from "@/components/vendors/VendorSlideOver";
import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="h-full bg-surface text-on-surface flex overflow-hidden w-full">
      <Sidebar aria-label="Navegación principal" user={session.user} />
      <div className="flex-1 flex flex-col min-h-0 md:pl-64 h-full relative w-full">
        <Topbar />
        <main className="flex-1 overflow-y-auto w-full">
          {children}
        </main>
      </div>
      <Suspense fallback={null}>
        <VendorSlideOver />
      </Suspense>
    </div>
  );
}
