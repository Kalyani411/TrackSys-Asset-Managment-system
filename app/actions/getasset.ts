"use server";

import { prisma } from "@/lib/prisma";

export async function getAssetById(assetId: number) {
  if (!assetId || assetId === 0) return null;

  return prisma.asset.findUnique({
    where: { id: assetId },
  });
}
