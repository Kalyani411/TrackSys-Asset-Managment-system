
import Link from "next/link";

export interface Asset {
  id: number;
  name: string;
  code: string;
  type: string;
  location: string;
  status: string;
  value: number;
  createdAt?: string;
}

async function getAssets(): Promise<Asset[]> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/assets`, {
    cache: "no-store", 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch assets");
  }

  return res.json();
}

export default async function AssetsPage() {
  const assets = await getAssets();

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Assets</h1>

        <Link
          href="/admin/Assets/0"
          className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Asset
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Code</th>
            <th className="p-2">Type</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {assets.map((a) => (
            <tr key={a.id} className="border">
              <td className="p-2">{a.name}</td>
              <td className="p-2">{a.code}</td>
              <td className="p-2">{a.type}</td>
              <td className="p-2">{a.status}</td>
              <td className="p-2 text-blue-600">
                <Link href={`/admin/Assets/${a.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
