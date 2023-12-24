import { db } from "@/lib/db";
import currentProfile from "@/lib/current-ptofile";

import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type Props = {
  params: { inviteCode: string };
};

export default async function InviteCodePage({ params }: Props) {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }
  if (!params.inviteCode) return redirect("/");

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      Member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer?.id) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      Member: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (server.id) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
}
