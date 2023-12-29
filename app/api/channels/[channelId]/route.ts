import currentProfile from "@/lib/current-ptofile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { channelId: string } }
) => {
  try {
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!serverId)
      return new NextResponse("Server id is missing", { status: 400 });

    if (!params.channelId)
      return new NextResponse("Channel id is missing", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        Member: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        Channel: {
          delete: {
            id: params.channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.error("[DELETE_CHANNEL_ID]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
