import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {  RequestStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { name, location } = await req.json();

    const asset = await prisma.asset.findFirst({
      where: {
        name,
        location,
        status: "ACTIVE",
      },
    });

    if (!asset) {
      return NextResponse.json(
        { error: "Out of stock" },
        { status: 400 }
      );
    }

    await prisma.asset.update({
      where: { id: asset.id },
      data: { status: "ACTIVE" },
    });

    await prisma.assetRequest.update({
      where: { id: asset.id },
      data: { status: RequestStatus.PENDING },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
