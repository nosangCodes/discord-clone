import currentProfile from "@/lib/current-ptofile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 400 });

    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("Server id is missing", { status: 401 });

    const { name, type }: { name: string; type: ChannelType } =
      await req.json();

    if (name.toLocaleLowerCase() === "general") {
      return new NextResponse("name cannot be 'general'", { status: 400 });
    }

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
          create: {
            profileId: profile.id,
            name,
            type,
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.error("CREATE_CHANNEL_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
