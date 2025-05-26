import { Sidebar } from "@/components/sidebar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <main className="text-foreground bg-background flex items-stretch">
      <Sidebar className="w-64 shrink-0" />

      <section className="bg-accent h-screen grow overflow-y-auto">
        <Outlet />
      </section>
    </main>
  );
}
