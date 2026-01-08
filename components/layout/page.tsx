"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  History,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/Dashboard",
    },
    {
      name: "All Request",
      icon: ClipboardList,
      href: "/admin",
    },
     {
      name: "Return Request",
      icon: Package,
      href: "/admin/return-request",
    },
    {
      name: "Assets",
      icon: Package,
      href: "/admin/Assets",
    },
    {
      name: "History",
      icon: History,
      href: "/admin/History",
    },
  ];

  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-[#0B1C36] via-[#071225] to-[#040B17] text-white flex flex-col px-4 py-6">

     
      <div className="mb-8 px-2">
        <h1 className="text-lg font-semibold tracking-wide text-blue-200">
          Admin Panel
        </h1>
      </div>

     
      <nav className="flex-1 space-y-2">
        {menu.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all
                ${
                  isActive
                    ? "bg-white/10 text-white shadow-lg"
                    : "text-blue-200 hover:bg-white/5"
                }`}
            >
             
              <div
                className={`flex items-center justify-center w-9 h-9 rounded-lg
                  ${
                    isActive
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-white/5 text-blue-300"
                  }`}
              >
                <Icon size={18} />
              </div>

              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
