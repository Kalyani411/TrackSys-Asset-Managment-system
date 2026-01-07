import { headers } from "next/headers";

type PendingRequest = {
  id: number;
  title: "REQUEST" | "RETURN";
  status: "PENDING";
  asset: {
    name: string;
    code: string;
    location: string;
    type: string;
  } | null;
  createdAt: string;
};

async function getPendingRequests(): Promise<PendingRequest[]> {
  try {
    const headerList = headers();
    const cookie = (await headerList).get("cookie");

    const res = await fetch(
      "http://localhost:3000/api/users/request-asset",
      {
        headers: {
          Cookie: cookie ?? "",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Pending request fetch error:", error);
    return [];
  }
}

export default async function PendingRequestsPage() {
  const requests = await getPendingRequests();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Pending Requests</h1>
        <p className="text-gray-500">
          Requests waiting for approval
        </p>
      </div>

      {/* EMPTY STATE */}
      {requests.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-lg font-medium">No pending requests</h2>
          <p className="text-gray-500">
            You don’t have any pending requests
          </p>
        </div>
      )}

      {/* GRID SAME AS MY ASSETS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white border rounded-xl p-5 shadow-sm"
          >
            {/* TOP */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">
                {req.asset?.name ?? "No Asset"}
              </h3>

              <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                PENDING
              </span>
            </div>

            {/* DETAILS */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <b>Code:</b> {req.asset?.code ?? "-"}
              </p>
              <p>
                <b>Category:</b> {req.asset?.type ?? "-"}
              </p>
              <p>
                <b>Location:</b> {req.asset?.location ?? "-"}
              </p>
              <p>
                <b>Requested:</b>{" "}
                {new Date(req.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center mt-4">
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  req.title === "RETURN"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {req.title === "RETURN"
                  ? "Return Request"
                  : "Checkout Request"}
              </span>

              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
