"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
const [error, setError] = useState<string>("");


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
     setError("");
    await signIn("credentials", {
  redirect: true,
  username: form.username,
  password: form.password,
   
});


  };

  return (
  <div
    className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
    style={{
      backgroundImage: "url('/ats.png')", 
    }}
  >
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>

    {/* Login Card */}
    <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10
      bg-white/10 backdrop-blur-xl shadow-2xl p-8">

      {/* Brand */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white tracking-wide">
          Track<span className="text-emerald-400">Sys</span>
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          Login to your account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg
            bg-slate-900/60 text-white placeholder-slate-400
            border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg
            bg-slate-900/60 text-white placeholder-slate-400
            border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-lg font-medium
            bg-emerald-500 hover:bg-emerald-600
            text-black transition"
        >
          Log in
        </button>
      </form>

      {/* Footer */}
      {/* Footer */}
<p className="text-center text-xs text-slate-400 mt-6">
  Secure Asset Tracking System
</p>
{error && (
  <p className="mt-2 text-center text-sm text-red-400 font-medium">
    Username or password is wrong
  </p>
)}

    </div>
  </div>
);
}