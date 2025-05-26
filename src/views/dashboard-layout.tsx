import { Sidebar } from "@/components/sidebar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <main className="flex items-stretch">
      <Sidebar className="shrink-0 w-64" />

      <Outlet />
    </main>
  );
}
