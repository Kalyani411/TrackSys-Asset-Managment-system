"use client";

import { useEffect, useState } from "react";

type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";

interface Request {
  id: number;
  asset: {
    name: string;
  };
  status: RequestStatus;
  createdAt: string;
}

export default function MyRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRequests() {
      try {
        const res = await fetch("/api/requests/user", {
          cache: "no-store",
        });

        const data = await res.json();
        setRequests(data);
      } catch (error) {
        console.error("Failed to load requests", error);
      } finally {
        setLoading(false);
      }
    }

    loadRequests();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Requests</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-6 py-3">Asset</th>
              <th className="text-left px-6 py-3">Request Date</th>
              <th className="text-left px-6 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-6 text-gray-500"
                >
                  No requests found
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr
                  key={req.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {req.asset.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={req.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- STATUS BADGE ---------- */

function StatusBadge({ status }: { status: RequestStatus }) {
  const styles = {
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}
