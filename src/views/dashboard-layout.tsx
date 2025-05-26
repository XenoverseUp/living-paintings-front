import { Sidebar } from "@/components/sidebar";
import ThemeProvider from "@/components/ui/theme-provider";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <ThemeProvider>
      <main className="text-foreground bg-background flex items-stretch">
        <Sidebar className="bg-background dark:bg-sidebar w-64 shrink-0" />

        <section className="bg-accent dark:bg-background h-screen grow overflow-y-auto">
          <Outlet />
        </section>
      </main>
    </ThemeProvider>
  );
}
