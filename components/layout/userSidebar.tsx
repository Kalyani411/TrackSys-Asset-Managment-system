"use client";

import {
  Box,
  ClipboardList,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-[#0f172a] via-[#020617] to-[#020617] text-slate-200 flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.6)]">

      {/* MENU */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <SidebarItem
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          href="/user"
          active={pathname === "/user"}
        />

        <SidebarItem
          icon={<Box size={18} />}
          label="My Assets"
          href="/user/my-assets"
          active={pathname.startsWith("/user/my-assets")}
        />

        <SidebarItem
          icon={<ClipboardList size={18} />}
          label="Request Asset"
          href="/user/request-asset"
          active={pathname.startsWith("/user/request-asset")}
        />

        <div className="my-6 border-t border-white/5" />

        <SidebarItem
          icon={<Settings size={18} />}
          label="History"
          href="/user/History"
          active={pathname.startsWith("/user/History")}
        />
      </nav>

  
      <div className="px-4 py-4 border-t border-white/5 text-xs text-slate-500 text-center">
        © Asset Tracking System
      </div>
    </aside>
  );
}


function SidebarItem({
  icon,
  label,
  href,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
        ${
          active
            ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/10 text-white shadow-md"
            : "text-slate-400 hover:bg-white/5 hover:text-white"
        }`}
    >
      {/* Active indicator */}
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-indigo-500 rounded-r-full" />
      )}

      {/* Icon bubble */}
      <span
        className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all
          ${
            active
              ? "bg-indigo-600 text-white shadow-lg"
              : "bg-slate-800/70 group-hover:bg-slate-700/70 backdrop-blur"
          }`}
      >
        {icon}
      </span>

      <span className="tracking-wide">{label}</span>
    </Link>
  );
}
