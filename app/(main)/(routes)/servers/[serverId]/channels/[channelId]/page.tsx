import ChatHeader from "@/components/chat/ChatHeader";
import currentProfile from "@/lib/current-ptofile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type Props = {
  params: {
    serverId: string;
    channelId: string;
  };
};

export default async function ChannelIdPage({ params }: Props) {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        type="channel"
        name={channel.name}
        serverId={params.serverId}
      />
    </div>
  );
}
