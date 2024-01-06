import { db } from "@/lib/db";
import { NextApiRequest } from "next";
import { getAuth } from "@clerk/nextjs/server";
export default async function currentProfilePages(req: NextApiRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) return null;

    const profile = await db.profile.findUnique({
      where: {
        userId,
      },
    });

    return profile;
  } catch (error) {
    console.error(
      "🚀 ~ file: current-ptofile.ts:8 ~ currentProfile ~ error:",
      error
    );
    return null;
  }
}
