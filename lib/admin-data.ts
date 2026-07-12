import {
  CalendarCheck,
  CalendarDays,
  LayoutDashboard,
  Scissors,
  Settings,
  Users,
} from "lucide-react";

import type { AdminNavItem } from "@/types";

/** Sidebar navigation for the admin panel (routes are placeholders). */
export const ADMIN_NAV: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, active: true },
  { label: "Appointments", href: "/admin", icon: CalendarCheck },
  { label: "Calendar", href: "/admin", icon: CalendarDays },
  { label: "Customers", href: "/admin", icon: Users },
  { label: "Services", href: "/admin", icon: Scissors },
  { label: "Settings", href: "/admin", icon: Settings },
];
