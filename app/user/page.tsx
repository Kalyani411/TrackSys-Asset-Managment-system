

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { headers } from "next/headers";
import Categorycard from "@/components/categorycards/page";
  export const fetchData = async () => {

    const headerList = await headers();
    const cookie = await headerList.get("cookie")

    const res = await fetch("http://localhost:3000/api/request/user",{
      method: "GET",
      headers:{
        Cookie: cookie??""
      },
      cache:"no-store"
    });
    if (!res.ok) return;
    const data = await res.json();

    return data

  };

export default async function UserDashboard() {

  const session = await getServerSession(authOptions)
  const data = await fetchData();

console.log("session>>>>",session);
console.log("data>>",data)

  return (
    <div className="p-5">
      <Categorycard/>
    </div>
  );
}