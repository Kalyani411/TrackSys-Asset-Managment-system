import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

async function handleAction(
  id: number,
  action: "APPROVE" | "REJECT"
) {
  "use server";

  await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/return-request/${id}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    }
  );

  revalidatePath("/admin/return-request");
  revalidatePath(`/admin/return-request/${id}`);
}

export default async function ReturnRequestDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ FIX
  const requestId = Number(id);

  const request = await prisma.assetRequest.findUnique({
    where: { id: requestId },
    include: { user: true, asset: true },
  });

  if (!request || request.requestType !== "RETURN") {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Return Request Details
      </h1>

      <div className="bg-white border rounded-lg p-6 space-y-4 shadow">
        <p><b>User:</b> {request.user.username}</p>
        <p><b>Asset:</b> {request.asset?.name}</p>
        <p><b>Asset Code:</b> {request.asset?.code}</p>
        <p><b>Status:</b> {request.status}</p>

        {request.status === "PENDING" && (
          <div className="flex gap-4 mt-6">
            <form action={handleAction.bind(null, requestId, "APPROVE")}>
              <button className="px-4 py-2 bg-green-600 text-white rounded">
                Accept Return
              </button>
            </form>

            <form action={handleAction.bind(null, requestId, "REJECT")}>
              <button className="px-4 py-2 bg-red-600 text-white rounded">
                Reject Return
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
