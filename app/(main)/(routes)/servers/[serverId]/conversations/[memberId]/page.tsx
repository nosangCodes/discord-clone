import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import currentProfile from "@/lib/current-ptofile";
import { db } from "@/lib/db";
import { getOrCreateConversation } from "@/lib/conversation";
import ChatHeader from "@/components/chat/ChatHeader";

type Props = {
  params: {
    memberId: string;
    serverId: string;
  };
};

export default async function MemberIdPage({ params }: Props) {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) return redirect("/");

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;
  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageurl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        type="conversation"
        serverId={params.serverId}
      />
    </div>
  );
}
