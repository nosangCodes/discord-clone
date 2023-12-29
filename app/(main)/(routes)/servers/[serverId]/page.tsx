import currentProfile from "@/lib/current-ptofile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type Props = {
  params: { serverId: string };
};

export default async function ServerIdPage({ params }: Props) {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      Member: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      Channel: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = server?.Channel?.[0];

  if (initialChannel?.name !== "general") return null;

  if (initialChannel?.id) {
    return redirect(
      `/servers/${params.serverId}/channels/${initialChannel?.id}`
    );
  }

  return redirect("/");
}
