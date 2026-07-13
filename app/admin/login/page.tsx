import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/lib/salon/config";
import { COPY } from "@/lib/salon/content";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { Logo } from "@/components/common/logo";

export const metadata: Metadata = {
  title: "Admin Login",
  description: `Inloggen op het ${SITE.name} beheerpaneel.`,
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Logo href="/" />
          <p className="text-sm text-muted-foreground">{COPY.admin.login.title}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-2xl sm:p-8">
          <h1 className="font-heading text-xl font-semibold tracking-tight text-white">
            {COPY.admin.login.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {COPY.admin.login.subtitle}
          </p>
          <div className="mt-6">
            <AdminLoginForm />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/" className="text-white/80 hover:text-white">
            ← {COPY.admin.backToSite}
          </Link>
        </p>
      </div>
    </div>
  );
}
