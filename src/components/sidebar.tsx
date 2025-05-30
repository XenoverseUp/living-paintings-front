import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router";
import { Separator } from "./ui/separator";
import {
  GalleryHorizontal,
  Library,
  Moon,
  RectangleGoggles,
  Sun,
  Users,
} from "lucide-react";
import { useTheme } from "@/lib/hooks/useTheme";

type SidebarProps = Partial<HTMLDivElement>;

export function Sidebar({ className }: SidebarProps) {
  const { setTheme, theme } = useTheme();

  return (
    <div className={cn(className, "border-r")}>
      <div className="flex h-full flex-col gap-y-6 pt-6 pb-4">
        <div className="px-3">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <NavLink viewTransition to="/" className="block">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <GalleryHorizontal />
                  Gallery
                </Button>
              )}
            </NavLink>
            <NavLink viewTransition to="/about-us" className="block">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <Users />
                  About Us
                </Button>
              )}
            </NavLink>
          </div>
        </div>
        <div className="px-3">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            For You
          </h2>
          <div className="space-y-1">
            <NavLink viewTransition to="/queue" className="block">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <Library />
                  Processing Queue
                </Button>
              )}
            </NavLink>
          </div>
        </div>
        <div className="mt-auto">
          <div className="mb-4 w-full px-4">
            <Link to="/create">
              <Button className="w-full items-center">
                <RectangleGoggles />
                Create VR
              </Button>
            </Link>
          </div>
          <Separator className="mb-4" />
          <div className="flex items-center justify-between px-6">
            <p className="text-muted-foreground text-xs">
              Living Paintings &copy; {new Date().getFullYear()}
            </p>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="cursor-pointer"
            >
              {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
