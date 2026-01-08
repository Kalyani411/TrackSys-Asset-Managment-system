"use client";

import { useState } from "react";

export type Request = {
  id: number;
  title: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
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

export default function RequestActions({
  requests = [],
}: {
  requests?: Request[];
}) {
  const [filterStatus, setFilterStatus] = useState<
    "PENDING" | "APPROVED" | "REJECTED"
  >("PENDING");

  const [data, setData] = useState<Request[]>(requests);

  const updateStatus = async (
    id: number,
    status: "APPROVED" | "REJECTED"
  ) => {
    await fetch(`/api/request/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      headers: { "Content-Type": "application/json" },
    });

    setData((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status } : req
      )
    );
  };

  const filtered = data.filter(
  (req) =>
    req.status === filterStatus &&
    req.title.toLowerCase().includes("checkout")
);


  return (
    <>
      {/* Status Filters */}
      <h3></h3>
      <div className="flex gap-3 mb-6">
        {["PENDING", "APPROVED", "REJECTED"].map((status) => (
          <button
            key={status}
            onClick={() =>
              setFilterStatus(
                status as "PENDING" | "APPROVED" | "REJECTED"
              )
            }
            className={`px-4 py-2 rounded ${
              filterStatus === status
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Requests */}
      {filtered.length === 0 ? (
        <p className="text-gray-500">No requests found.</p>
      ) : (
        filtered.map((req) => (
          <div
            key={req.id}
            className="border p-5 mb-4 rounded shadow bg-white"
          >
            {/* Asset Name */}
            <h3 className="text-xl font-semibold mb-2">
              {req.asset?.name?? "Asset not available"}
            </h3>

            {/* User & Title */}
            <p>
              <b>User:</b> {req.user.username}
            </p>
            <p>
              <b>Title:</b> {req.title}
            </p>

            {/* Asset Details */}
            <div className="mt-3 bg-gray-100 p-4 rounded">
              <h4 className="font-semibold mb-2">Asset Details</h4>

              <p><b>Code:</b> {req.asset?.code}</p>
              <p><b>Location:</b> {req.asset?.location ?? "-"}</p>
              <p><b>Type:</b> {req.asset?.type ?? "-"}</p>
              <p><b>Asset Status:</b> {req.asset?.status ?? "-"}</p>
              <p><b>Request Status:</b> {req.status}</p>
            </div>

            {/* Actions */}
            {req.status === "PENDING" && (
              <div className="mt-4 flex gap-3">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded"
                  onClick={() =>
                    updateStatus(req.id, "APPROVED")
                  }
                >
                  Approve
                </button>

                <button
                  className="bg-red-600 text-white px-4 py-2 rounded"
                  onClick={() =>
                    updateStatus(req.id, "REJECTED")
                  }
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </>
  );
}
