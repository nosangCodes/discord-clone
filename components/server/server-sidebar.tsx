import currentProfile from "@/lib/current-ptofile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";
import React from "react";
import ServerHeader from "./server-header";
import { redirect } from "next/navigation";

type Props = {
  serverId: string;
};

export default async function ServerSidebar({ serverId }: Props) {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      Channel: {
        orderBy: {
          createdAt: "asc",
        },
      },
      Member: {
        include: {
          profile: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const textChannels = server?.Channel.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const videoChannels = server?.Channel.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const audioChannels = server?.Channel.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );

  const memebers = server?.Member.filter(
    (member) => member.profileId !== profile.id
  );
  
  if (!server) return redirect("/");

  const role = server?.Member.find(
    (member) => member.profileId === profile.id
  )?.role;


  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F4F5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
}
