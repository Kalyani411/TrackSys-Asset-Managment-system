"use client";

import Link from "next/link";
import { Plus, Bell, Activity } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSignOut } from "@/app/actions/signout";


type NavbarProps = {
  userName: string;
};
export default function Navbar({ userName="user" }: NavbarProps) {
  const pathname = usePathname();
 const isLoginPage = pathname === "/login";
const { SignOut } = useSignOut();
  const pageTitle =
    pathname.includes("request")
      ? "Request Inventory"
      : pathname.includes("assets")
      ? "My Assets"
      : "Dashboard";

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className="
          flex items-center justify-between
          h-16 px-8
          bg-gradient-to-r from-slate-700 to-slate-600
          border-b border-white/10
          shadow-md
        "
      >
        {/* Left – Brand */}
        <div className="flex items-center gap-3">
          <Activity className="text-emerald-400" size={20} />
          <span className="text-white font-semibold tracking-wide text-lg">
            TrackSys
          </span>
        </div>

        {/* Center – Status + Page */}
        <div className="hidden md:flex items-center gap-4 text-sm text-slate-200">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            System Active
          </span>
          <span className="opacity-40">|</span>
          <span className="font-medium">{pageTitle}</span>
        </div>

        {/* Right – Actions */}
       {/* Right – Actions */}
<div className="flex items-center gap-3">
  {!isLoginPage && (
    <>
      <Link
        href="/user/request"
        className="
          flex items-center gap-2
          rounded-md bg-emerald-500
          px-4 py-1.5
          text-sm font-medium text-black
          hover:bg-emerald-400 transition
        "
      >
        <Plus size={16} />
        Request
      </Link>

      <button className="p-2 rounded-md text-slate-200 hover:bg-white/10">
        <Bell size={18} />
      </button>

    <button
  onClick={SignOut}
  title="Logout"
  className="
  h-10 w-10
  rounded-full
  bg-gradient-to-r from-emerald-400 to-green-500
  flex items-center justify-center
  text-sm font-bold text-white
  shadow
  hover:opacity-90
  transition
"

>
  {userName.charAt(0).toUpperCase()}
</button>




    </>
  )}
</div>

      </div>
    </header>
  );
}
