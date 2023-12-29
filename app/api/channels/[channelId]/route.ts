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

export const PATCH = async (
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

    const { name, type } = await req.json();
    if (name === "general")
      return new NextResponse(
        "Forbidden, 'general' channel cannot be deleted",
        { status: 400 }
      );
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
          update: {
            where: {
              id: params.channelId,
              name: {
                not: "general",
              },
              type,
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.error("[CHANNEL ID PATCH]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
