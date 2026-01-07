

import { headers } from "next/headers";
import { DashboardData } from "@/types/type";


export const fetchData = async (): Promise<DashboardData | null> => {
  try {
    const headerList = await headers();
    const cookie = headerList.get("cookie");

    const res = await fetch("http://localhost:3000/api/dashboard", {
      method: "GET",
      headers: {
        Cookie: cookie ?? "",
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    return null;
  }
};

export default async function Dashboard() {
  const data = await fetchData(); 

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">

  
      <div className="grid grid-cols-4 gap-4">
        <Card title="Total Assets" value={data.totalAssets} />
        <Card title="Active" value={data.activeassets} />
        <Card title="Assigned" value={data.assignedAssets} />
        <Card title="Repair" value={data.repairassets} />
      </div>

      
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-lg font-bold mb-2">Assigned vs Available</h2>
        <div className="flex gap-4 items-end">
          <Bar label="Active" value={data.activeassets} />
          <Bar label="Assigned" value={data.assignedAssets} />
          <Bar label="Repair" value={data.repairassets} />
        </div>
      </div>

      
      <div className="p-4 bg-white shadow rounded">
        <h2 className="text-lg font-bold mb-4">Recently Added Assets</h2>

        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Code</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {data.recentAssets.map((asset) => (
              <tr key={asset.id} className="border-b">
                <td className="p-2">{asset.name}</td>
                <td className="p-2">{asset.code}</td>
                <td className="p-2">{asset.type}</td>
                <td className="p-2">
                  {new Date(asset.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white shadow p-4 rounded flex flex-col items-center">
      <p className="text-gray-600">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  const maxHeight = 200;
  const height = Math.min(value * 10, maxHeight);

  return (
    <div className="flex flex-col items-center">
      <div className="w-12 bg-blue-500 rounded" style={{ height }} />
      <p className="mt-1">{label}</p>
    </div>
  );
}