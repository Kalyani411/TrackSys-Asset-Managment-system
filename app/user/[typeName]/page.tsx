import { headers } from "next/headers";
import CheckoutButton from "@/components/ui/checkoutButton";

interface GroupedAsset {
  id:number;
  name: string;
  location: string;
  type: string;
  code: number;
  _count: {
    id: number;
  };
}

async function getAssetsByType(
  typeName: string
): Promise<GroupedAsset[]> {
  try {
    const headerList = headers();
    const cookie = (await headerList).get("cookie");

    const res = await fetch(
      `http://localhost:3000/api/category/${typeName}`,
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
    console.error("Category fetch error:", error);
    return [];
  }
}

export default async function AssetByTypePage({
  params,
}: {
  params: Promise<{ typeName: string }>;
}) {
  const { typeName } = await params;
  const assets = await getAssetsByType(typeName);
    console.log("?>>>>",assets)
return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">

      {/* ================= LEFT: ASSET TIMELINE ================= */}
      <div className="xl:col-span-3">
        <h1 className="text-4xl font-bold mb-8 capitalize text-slate-800">
          {typeName} Inventory
        </h1>

        {assets.length === 0 ? (
          <p className="text-gray-500">No assets found</p>
        ) : (
          <div className="space-y-8">
            {assets.map((asset) => (
              <div
                key={`${asset.name}-${asset.location}-${asset.type}`}
                className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex gap-6"
              >
                {/* Timeline Indicator */}
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 ring-4 ring-indigo-100" />
                  <div className="flex-1 w-px bg-indigo-200 mt-2" />
                </div>

                {/* Card Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">
                        {asset.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {asset.type} · {asset.location}
                      </p>
                    </div>

                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        asset._count.id > 0
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {asset._count.id > 0
                        ? `${asset._count.id} Available`
                        : "Out of Stock"}
                    </span>
                  </div>

                  <div className="flex justify-end mt-6">
                    <CheckoutButton
                      asset={asset}
                      disabled={asset._count.id === 0}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= RIGHT: SUMMARY PANEL ================= */}
      <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Inventory Overview
        </h2>

        <div className="space-y-5 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Category</span>
            <span className="font-semibold">{typeName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Asset Types</span>
            <span className="font-semibold">{assets.length}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Total Available</span>
            <span className="font-semibold text-emerald-600">
              {assets.reduce((a, b) => a + b._count.id, 0)}
            </span>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t text-xs text-gray-400">
          Live inventory · Auto-updated
        </div>
      </div>

    </div>
  </div>
);

}