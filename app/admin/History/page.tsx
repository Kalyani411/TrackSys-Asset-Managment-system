import { headers } from "next/headers";


export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export type Request = {
  id: number;
  title: string;
  status: RequestStatus;
  requestType: "CHECKOUT" | "RETURN";
  user: {
    username: string;
  };
  asset: {
    name: string;
    code: string;
    type: string;
    location: string;
    status: string;
  } | null;
};

async function getRequests(): Promise<Request[]> {
  const headerList = headers();
  const cookie = (await headerList).get("cookie");

  const res = await fetch("http://localhost:3000/api/request", {
    headers: {
      Cookie: cookie ?? "",
    },
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function AdminDashboard() {
  const requests = await getRequests();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Asset Transaction History
      </h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">No requests found</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-lg">
                    {req.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    User: {req.user.username}
                  </p>

                  {req.asset && (
                    <div className="text-sm text-gray-600 mt-2">
                      <p>Asset: {req.asset.name}</p>
                      <p>Code: {req.asset.code}</p>
                      <p>Type: {req.asset.type}</p>
                      <p>Location: {req.asset.location}</p>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        req.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : req.status === "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                  >
                    {req.status}
                  </span>

                  <p className="text-xs mt-2 text-gray-500">
                    {req.requestType}
                  </p>
                </div>
              </div>

            
              <div className="mt-4">
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
