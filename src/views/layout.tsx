import AppSidebar from "@/components/app-sidebar";
import { Sidebar } from "@/components/sidebar";
import ThemeProvider from "@/components/ui/theme-provider";
import { Amphora, PanelRightClose } from "lucide-react";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <ThemeProvider>
      <main className="text-foreground bg-background flex h-svh flex-col items-stretch md:flex-row">
        <Sidebar className="bg-sidebar hidden w-64 shrink-0 md:block" />

        <header className="relative flex h-16 shrink-0 items-center border-b px-4 md:hidden">
          <AppSidebar>
            <PanelRightClose size={20} className="text-muted-foreground" />
          </AppSidebar>
          <h1 className="pointer-events-none absolute inset-0 m-auto flex h-fit w-fit items-center gap-2 text-lg font-semibold tracking-tight text-stone-800">
            <Amphora />
            Living Paintings
          </h1>
        </header>

        <section className="bg-background grow md:h-screen md:overflow-y-auto">
          <Outlet />
        </section>
      </main>
    </ThemeProvider>
  );
}
