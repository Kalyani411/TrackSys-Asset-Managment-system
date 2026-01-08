"use client";

import { Request } from "@/app/admin/page";

export default function ReturnRequest({
  requests,
}: {
  requests: Request[];
}) {
  if (!requests || requests.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No request history found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((req) => (
        <div
          key={req.id}
          className="bg-white border rounded-lg p-4"
        >
          {/* TOP */}
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">
              {req.asset?.name ?? "No Asset"}
            </h3>

            {/* REQUEST TYPE */}
            <span
              className={`text-xs px-3 py-1 rounded-full ${
                req.title === "RETURN"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {req.title}
            </span>
          </div>

          {/* DETAILS */}
          <div className="text-sm text-gray-600 mt-2 space-y-1">
            <p>
              <b>User:</b> {req.user.username}
            </p>

            <p
              className={
                req.status === "APPROVED"
                  ? "text-green-600"
                  : req.status === "REJECTED"
                  ? "text-red-600"
                  : "text-yellow-600"
              }
            >
              <b>Status:</b> {req.status}
            </p>

            {req.asset && (
              <>
                <p><b>Code:</b> {req.asset.code}</p>
                <p><b>Location:</b> {req.asset.location}</p>
              </>
            )}
          </div>

          {/* FOOTER */}
          <div className="text-xs text-gray-400 mt-2">
            Request ID: #{req.id}
          </div>
        </div>
      ))}
    </div>
  );
}
