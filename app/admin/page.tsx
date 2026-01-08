

import { headers } from "next/headers";
import RequestActions from "@/components/Request/requestAction";
export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";
export type Request = {
  id: number;
  title: string;
  status: RequestStatus;
  user: {
    username: string;
  };
  asset: {
    code: string;
    name: string;
    location: string;
    type: string;
    status: string;
  } | null;
};

async function getRequests(): Promise<Request[]> {
  try {
    const headerList = await headers();
    const cookie = headerList.get("cookie");

    const res = await fetch("http://localhost:3000/api/request", {
      headers: {
        Cookie: cookie ?? "",
      },
      cache: "no-store",
    });

    if (!res.ok) return [];

    return res.json();
  } catch (error) {
    console.error("Request fetch error:", error);
    return [];
  }
}

export default async function AdminDashboard() {
  const requests = (await getRequests()) ?? []; 

  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <RequestActions requests={requests} />
    </div>
  );
}
