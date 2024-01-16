import currentProfilePages from "@/lib/current-ptofile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });
  try {
    const profile = await currentProfilePages(req);
    const { content, fileUrl } = await req.body;
    const { serverId, channelId } = req.query;

    if (!profile) return res.status(401).json({ error: "Unauthorized" });
    if (!serverId)
      return res.status(400).json({ error: "Server Id is missing" });
    if (!channelId)
      return res.status(400).json({ error: "Channel Id is missing" });
    if (!content) return res.status(400).json({ error: "Content is missing" });

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        Member: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        Member: true,
      },
    });

    if (!server?.id)
      return res.status(404).json({ message: "Server not found!" });

    const channel = await db.channel.findFirst({
      where: {
        serverId: serverId as string,
        id: channelId as string,
      },
    });

    if (!channel?.id)
      return res.status(404).json({ message: "Channel not found!" });

    const member = server.Member.find(
      (member) => member.profileId === profile.id
    );

    if (!member) {
      return res.status(404).json({ message: "Member not found!" });
    }

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    // also emit socket
    const channelKey = `chat:${channelId}:messages`;
    res?.socket?.server?.io.emit(channelKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.error("[MESSAGES_POST]", error);
  }
}
