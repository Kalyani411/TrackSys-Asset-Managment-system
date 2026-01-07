"use client";

import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

export function useSignOut() {
  const SignOut = async () => {
    toast.loading("Signing out...", { id: "logout" });

    await signOut({ redirect: false });

    toast.success("You have been logged out", { id: "logout" });

    setTimeout(() => {
      window.location.href = "/login";
    }, 1200);
  };

  return { SignOut };
}
