import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function handleAction(id: number, action: "APPROVE" | "REJECT") {
  "use server";

  const request = await prisma.assetRequest.findUnique({
    where: { id },
    include: { asset: true },
  });

  if (!request || request.requestType !== "RETURN") {
    throw new Error("Invalid return request");
  }

  if (action === "APPROVE") {
    await prisma.$transaction([
      prisma.assetRequest.update({
        where: { id },
        data: { status: "APPROVED" },
      }),
      prisma.asset.update({
        where: { id: request.assetId! },
        data: { status: "ACTIVE" },
      }),
    ]);
  }

  if (action === "REJECT") {
    await prisma.assetRequest.update({
      where: { id },
      data: { status: "REJECTED" },
    });
  }

  revalidatePath("/admin/return-request");
}

export default async function AdminReturnRequests() {
  const requests = await prisma.assetRequest.findMany({
    where: { requestType: "RETURN" },
    include: { user: true, asset: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Return Requests</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requests.map((r) => (
          <div
            key={r.id}
            className="rounded-lg border bg-white p-5 shadow-sm space-y-3"
          >
          
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{r.user.username}</p>
                <Link
                  href={`/admin/return-request/${r.id}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {r.asset?.name ?? "—"}
                </Link>
              </div>

              
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium
                  ${
                    r.status === "PENDING"
                      ? "bg-amber-100 text-amber-700"
                      : r.status === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
              >
                {r.status}
              </span>
            </div>

           
            <div className="text-sm text-slate-600">
              Asset Code: <span className="font-medium">{r.asset?.code}</span>
            </div>

            
            {r.status === "PENDING" ? (
              <div className="flex gap-2 pt-2">
                <form action={handleAction.bind(null, r.id, "APPROVE")}>
                  <button
                    className="px-4 py-1.5 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white text-sm transition"
                  >
                    Approve
                  </button>
                </form>

                <form action={handleAction.bind(null, r.id, "REJECT")}>
                  <button
                    className="px-4 py-1.5 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm transition"
                  >
                    Reject
                  </button>
                </form>
              </div>
            ) : (
              <p className="text-xs text-slate-400 pt-2">
                Action completed
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
