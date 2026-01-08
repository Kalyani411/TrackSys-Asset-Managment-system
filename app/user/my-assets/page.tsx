import { headers } from "next/headers";
import { Search } from "lucide-react";
import Link from "next/link";
import RequestReturnButton from "@/components/Request/returnRequest";

type Asset = {
  id: number;
  name: string;
  code: string;
  type: string;
  location: string;
  status: "ASSIGNED";
  createdAt: string;
};

async function getMyAssets(): Promise<Asset[]> {
  try {
    const headerList = headers();
    const cookie = (await headerList).get("cookie");

    const res = await fetch("http://localhost:3000/api/users/my-asset", {
      headers: {
        Cookie: cookie ?? "",
      },
      cache: "no-store",
    });

    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("My assets fetch error:", error);
    return [];
  }
}

export default async function MyAssetsPage() {
  const assets = await getMyAssets();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">My Assets</h1>
        <p className="text-gray-500">
          Assets currently assigned to you
        </p>
      </div>

      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="font-medium">📦 Assigned Assets</div>

        <div className="relative w-72">
          <Search
            size={18}
            className="absolute left-3 top-2.5 text-gray-400"
          />
          <input
            placeholder="Search assets"
            disabled
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-white opacity-70 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Empty State */}
      {assets.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-lg font-medium">
            No assigned assets
          </h2>
          <p className="text-gray-500 mb-4">
            You don’t have any assets assigned yet
          </p>

          <Link
            href="/user/request-asset"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Request Asset
          </Link>
        </div>
      )}

      {/* Asset Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white rounded-xl border p-5 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{asset.name}</h3>
              <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                ASSIGNED
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p><b>Code:</b> {asset.code}</p>
              <p><b>Category:</b> {asset.type}</p>
              <p><b>Location:</b> {asset.location}</p>
              <p>
                <b>Assigned:</b>{" "}
                {new Date(asset.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-3 mt-4">
              {/* View works via Link */}
              

              {/* Request Return works via Button */}
              <RequestReturnButton assetId={asset.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
