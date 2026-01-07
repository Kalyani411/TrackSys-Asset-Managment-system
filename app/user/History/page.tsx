import { headers } from "next/headers";

type History = {
  id: number;
  title: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  requestType: "CHECKOUT" | "RETURN";
  createdAt: string;
  asset: {
    name: string;
    type: string;
    location: string;
  } | null;
};

async function getUserHistory(): Promise<History[]> {
  const headerList = headers();
  const cookie = (await headerList).get("cookie");

  const res = await fetch("http://localhost:3000/api/history", {
    headers: { Cookie: cookie ?? "" },
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function UserHistoryPage() {
  const history = await getUserHistory();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        My Request History
      </h1>

      {history.length === 0 ? (
        <p className="text-gray-500">No history found</p>
      ) : (
        <div className="space-y-4">
          {history.map((h) => (
            <div
              key={h.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{h.title}</p>

                  <p className="text-sm text-gray-600">
                    Asset: {h.asset?.name ?? "—"}
                  </p>

                  <p className="text-sm text-gray-600">
                    Type: {h.asset?.type ?? "—"}
                  </p>

                  <p className="text-sm text-gray-600">
                    Location: {h.asset?.location ?? "—"}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold
                      ${
                        h.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : h.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {h.status}
                  </span>

                  <p className="text-xs mt-2 text-gray-500">
                    {h.requestType}
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-3">
                {new Date(h.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
