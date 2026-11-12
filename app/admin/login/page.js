"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import logo from "@/public/gloriouslogo.jpg";

export default function AdminLogin() {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ passcode }) });
    setBusy(false);
    if (res.ok) {
      router.replace("/admin");
      router.refresh();
    } else {
      setError((await res.json().catch(() => ({}))).error || "Sign-in failed");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-xl bg-white p-8 shadow">
        <Image src={logo} alt="Glorious Publications" className="mx-auto w-24 rounded-md" priority />
        <h1 className="text-center text-xl font-semibold">Admin sign-in</h1>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Passcode</span>
          <input type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} required autoFocus autoComplete="current-password" className="w-full rounded-md border border-gray-300 p-2" />
        </label>
        {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
        <button type="submit" disabled={busy} className="w-full rounded-md bg-gray-800 py-2 text-white hover:bg-blue-600 disabled:opacity-60">
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <a href="/" className="block text-center text-sm text-gray-500 hover:underline">Back to the shop</a>
      </form>
    </main>
  );
}
