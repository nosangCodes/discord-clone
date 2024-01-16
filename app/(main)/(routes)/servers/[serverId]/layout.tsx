import ServerSidebar from "@/components/server/server-sidebar";
import currentProfile from "@/lib/current-ptofile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    serverId: string;
  };
};

export default async function ServerIdLayout({ children, params }: Props) {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const server = await db.server.findUnique({
    where: {
      id: params?.serverId,
      Member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) return redirect("/");

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 fixed inset-y-0">
        <ServerSidebar serverId={params?.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}
