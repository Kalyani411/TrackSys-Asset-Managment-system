"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-800/90 py-3 text-center">
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-slate-300">
          © {new Date().getFullYear()} TrackSys
        </span>
        <span className="text-[11px] text-slate-400">
          Secure Asset Tracking System
        </span>
      </div>
    </footer>
  );
}

