import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState, type ReactNode } from "react";

import { Sidebar } from "./sidebar";
import { useLocation } from "react-router";

interface Props {
  children: ReactNode;
}

export default function AppSidebar({ children }: Props) {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  useEffect(() => setOpen(false), [location]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left">
        <Sidebar className="bg-background h-full border-none" />
      </SheetContent>
    </Sheet>
  );
}
