"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Login failed");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-page px-6 text-ink">
      <div className="w-full max-w-md border border-line bg-card p-8">

        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center bg-accent text-primary">
            <LockKeyhole size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              ARUN ADMIN
            </h1>

            <p className="text-sm text-subtle">
              Authorized access only
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm text-muted">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line bg-white px-4 py-3 outline-none focus:border-accent"
              placeholder="admin@arunbuilders.in"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-muted">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-line bg-white px-4 py-3 outline-none focus:border-accent"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent px-5 py-3 font-bold text-primary transition hover:bg-primary hover:text-white disabled:opacity-50"
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>

        </form>
      </div>
    </main>
  );
}