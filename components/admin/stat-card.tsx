"use client";

import { TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Stat } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ stat }: { stat: Stat }) {
  const { label, value, change, trend, icon: Icon } = stat;
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;

  return (
    <Card className="rounded-2xl">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
            <Icon className="size-5" />
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-medium",
              trend === "up" ? "text-emerald-400" : "text-red-400"
            )}
          >
            <TrendIcon className="size-3.5" />
            {change}
          </span>
        </div>
        <div>
          <p className="font-heading text-3xl font-semibold tracking-tight text-white">
            {value}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
