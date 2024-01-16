import currentProfile from "@/lib/current-ptofile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { serverId: string } }
) => {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    if (!params?.serverId)
      return new NextResponse("Server id is missing", { status: 400 });

    const server = await db.server.update({
      where: {
        id: params?.serverId,
        profileId: {
          not: profile.id,
        },
        Member: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        Member: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.error("[Leave_SERVER]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
