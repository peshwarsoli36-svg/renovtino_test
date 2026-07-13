import {
  CalendarCheck,
  CalendarDays,
  LayoutDashboard,
  Scissors,
  Settings,
  Users,
} from "lucide-react";

import type { AdminNavItem } from "@/types";

export const ADMIN_NAV: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, active: true },
  { label: "Afspraken", href: "/admin", icon: CalendarCheck },
  { label: "Kalender", href: "/admin", icon: CalendarDays },
  { label: "Klanten", href: "/admin", icon: Users },
  { label: "Diensten", href: "/admin", icon: Scissors },
  { label: "Instellingen", href: "/admin", icon: Settings },
];
