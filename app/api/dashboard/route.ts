import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"; 

// export async function GET() {
//   try {
    
//     const assets = await prisma.asset.findMany({
//       orderBy: { createdAt: "desc" },
//     });

//     const totalAssets = assets.length;
//     const activeassets = assets.filter(a => a.status === "ACTIVE").length;
//     const assignedAssets = assets.filter(a => a.status === "ASSIGNED").length;
//    const repairassets = assets.filter(a => a.status === "REPAIR").length;

//     const recentAssets = assets.slice(0, 5).map(a => ({
//       id: a.id,
//       name: a.name,
//       code: a.code,
//       type: a.type,
//       createdAt: a.createdAt.toISOString(),
//     }));

//     const data = {
//       totalAssets,
//       activeassets,
//       assignedAssets,
//       repairassets,
//       recentAssets,
//     };

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
//   }
// }


export async function GET() {
  try {
    const [
      totalAssets,
      activeassets,
      assignedAssets,
      repairassets,
      recentAssets,
    ] = await Promise.all([
      prisma.asset.count(),
      prisma.asset.count({ where: { status: "ACTIVE" } }),
      prisma.asset.count({ where: { status: "ASSIGNED" } }),
      prisma.asset.count({ where: { status: "REPAIR" } }),
      prisma.asset.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          code: true,
          type: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      totalAssets,
      activeassets,
      assignedAssets,
      repairassets,
      recentAssets,
    });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
