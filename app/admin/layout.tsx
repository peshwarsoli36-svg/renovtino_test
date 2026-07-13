import type { Metadata } from "next";

import { SITE } from "@/lib/salon/config";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: `Beheer afspraken en boekingen voor ${SITE.legalName}.`,
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
