import currentProfile from "@/lib/current-ptofile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { serverId: string } }
) => {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params?.serverId)
      return new NextResponse("Server Id is missing", { status: 400 });

    const server = await db.server.update({
      where: {
        id: params?.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("Update Server", error);
    return new NextResponse("Internal Server erroe", { status: 500 });
  }
};
export const DELETE = async (
  req: Request,
  { params }: { params: { serverId: string } }
) => {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params?.serverId)
      return new NextResponse("Server Id is missing", { status: 400 });

    const server = await db.server.delete({
      where: {
        id: params?.serverId,
        profileId: profile.id,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVER ID DELETE]", error);
    return new NextResponse("Internal Server erroe", { status: 500 });
  }
};
