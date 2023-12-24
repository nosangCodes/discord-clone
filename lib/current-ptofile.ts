import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
export default async function currentProfile() {
  try {
    const { userId } = auth();
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
