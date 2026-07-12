#!/usr/bin/env node
/**
 * Applies supabase/policies.sql using a direct Postgres connection.
 *
 * Set SUPABASE_DB_PASSWORD in .env.local (Supabase → Settings → Database),
 * or pass DATABASE_URL directly.
 *
 * Usage: npm run db:policies
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import pg from "pg";

const { Client } = pg;

function loadEnvLocal() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // .env.local is optional when vars are already exported.
  }
}

function getConnectionString() {
  if (process.env.DATABASE_URL?.trim()) {
    return process.env.DATABASE_URL.trim();
  }

  const password = process.env.SUPABASE_DB_PASSWORD?.trim();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const ref = url.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

  if (!password || !ref) {
    console.error(
      "Missing database credentials.\n\n" +
        "Add one of the following to .env.local:\n" +
        "  SUPABASE_DB_PASSWORD=your-database-password\n" +
        "  DATABASE_URL=postgresql://postgres.[ref]:[password]@...\n\n" +
        "Or run supabase/policies.sql manually in the Supabase SQL Editor."
    );
    process.exit(1);
  }

  const host =
    process.env.SUPABASE_DB_HOST?.trim() ||
    `db.${ref}.supabase.co`;

  return `postgresql://postgres:${encodeURIComponent(password)}@${host}:5432/postgres`;
}

async function main() {
  loadEnvLocal();

  const sql = readFileSync(
    resolve(process.cwd(), "supabase/policies.sql"),
    "utf8"
  );

  const client = new Client({
    connectionString: getConnectionString(),
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  try {
    await client.query(sql);
    process.stdout.write("Applied supabase/policies.sql successfully.\n");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("Failed to apply policies:", err.message);
  process.exit(1);
});
