import React from "react";
import { Hash } from "lucide-react";
import MobileToggle from "@/components/mobile-toggle";
import UserAvatar from "@/components/user-avatar";

type Props = {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageurl?: string;
};

export default function ChatHeader({ name, serverId, type, imageurl }: Props) {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      {type === "conversation" && imageurl && <UserAvatar className="mr-2 md:h-8 md:w-8" src={imageurl} />}
      <p className="font-semibold text-base text-black dark:text-white">
        {name}
      </p>
    </div>
  );
}
