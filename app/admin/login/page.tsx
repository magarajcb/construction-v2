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
    <main className="flex min-h-screen items-center justify-center bg-[#080808] px-6 text-white">
      <div className="w-full max-w-md border border-white/10 bg-[#101010] p-8">

        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center bg-[#d6ff3f] text-black">
            <LockKeyhole size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              GLOARO ADMIN
            </h1>

            <p className="text-sm text-white/40">
              Authorized access only
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm text-white/60">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-white/10 bg-black px-4 py-3 outline-none focus:border-[#d6ff3f]"
              placeholder="admin@gloaro.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/60">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-white/10 bg-black px-4 py-3 outline-none focus:border-[#d6ff3f]"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d6ff3f] px-5 py-3 font-bold text-black transition hover:bg-white disabled:opacity-50"
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>

        </form>
      </div>
    </main>
  );
}