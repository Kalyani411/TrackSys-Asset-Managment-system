import { prisma } from "@/lib/prisma";
import AssetForm from "@/components/AssetForm/page";
import { saveAsset } from "@/app/actions/saveasset";
import { AssetStatus } from "@prisma/client";
import { AssetFormType } from "@/types/type";


export default async function AssetDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const assetId = Number(id);

  let defaultValues: AssetFormType;

  if (assetId === 0) {
    defaultValues = {
      name: "",
      code: "",
      type: "",
      location: "",
      status: AssetStatus.ACTIVE,
      value: 0,
    };
  } else {
    const asset = await prisma.asset.findUnique({
      where: { id: assetId },
    });

    if (!asset) throw new Error("Asset not found");

    defaultValues = {
      name: asset.name,
      code: asset.code,
      type: asset.type,
      location: asset.location,
      status: asset.status,
      value: asset.value,
    };
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">
        {assetId === 0 ? "Add New Asset" : "Edit Asset"}
      </h1>

      <AssetForm
        defaultValues={defaultValues}
        onSubmit={saveAsset.bind(null, assetId)}
      />
    </div>
  );
}
