"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { COPY } from "@/lib/salon/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminLoginForm() {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(
          typeof data.error === "string"
            ? data.error
            : COPY.admin.login.wrongCode
        );
        return;
      }

      window.location.href = "/admin";
    } catch {
      setError("Er is iets misgegaan. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="admin-access-code" className="text-muted-foreground">
          {COPY.admin.login.code}
        </Label>
        <Input
          id="admin-access-code"
          name="code"
          type="password"
          autoComplete="off"
          placeholder="Voer toegangscode in"
          className="h-11"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      {error ? (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={loading || !code.trim()}
        className="h-11 w-full rounded-full font-semibold tracking-wide"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Controleren…
          </>
        ) : (
          COPY.admin.login.submit
        )}
      </Button>
    </form>
  );
}
