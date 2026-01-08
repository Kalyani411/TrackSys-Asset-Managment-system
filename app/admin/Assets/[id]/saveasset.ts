"use server";

import { prisma } from "@/lib/prisma";
import { AssetFormType } from "@/types/type";
import { AssetStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveAsset(assetId: number, data: AssetFormType) {
  if (assetId === 0) {
    await prisma.asset.create({
      data: {
        ...data,
        status: data.status ?? AssetStatus.ACTIVE,
      },
    });
  } else {
    await prisma.asset.update({
      where: { id: assetId },
      data,
    });
  }

  revalidatePath("/admin/assets");
  redirect("/admin/assets");
}
