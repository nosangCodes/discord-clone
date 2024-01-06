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
    
  } catch (error) {
    console.error("[MESSAGES_POST]", error);
  }
}
