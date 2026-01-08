import AssetForm from "@/components/ui/assetForm";
import { saveAsset } from "@/app/actions/saveasset";
import { getAssetById } from "@/app/actions/getasset";
import { AssetStatus } from "@prisma/client";
import { AssetFormType } from "@/types/type";
import { notFound } from "next/navigation";

export default async function AssetDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const assetId = Number(id);

  if (Number.isNaN(assetId)) notFound();

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
    const asset = await getAssetById(assetId);
    if (!asset) notFound();

    defaultValues = {
      name: asset.name ?? "",
      code: asset.code ?? "",
      type: asset.type ?? "",
      location: asset.location ?? "",
      status: asset.status ?? AssetStatus.ACTIVE,
      value: asset.value ?? 0,
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
