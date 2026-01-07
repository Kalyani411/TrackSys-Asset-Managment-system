"use server";

import { prisma } from "@/lib/prisma";
import { AssetFormType } from "@/types/type";
import { AssetStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveAsset(
  assetId: number,
  formData: AssetFormType
) {
  if (assetId === 0) {
    await prisma.asset.create({
      data: {
        name: formData.name,
        code: formData.code,
        type: formData.type,
        location: formData.location,
        status: formData.status ?? AssetStatus.ACTIVE,
        value: Number(formData.value),
      },
    });
  } else {
    await prisma.asset.update({
      where: { id: assetId },
      data: {
        name: formData.name,
        code: formData.code,
        type: formData.type,
        location: formData.location,
        status: formData.status,
        value: Number(formData.value),
      },
    });
  }

  revalidatePath("/admin/Assets");
  redirect("/admin/Assets");
}
