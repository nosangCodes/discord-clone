"use client";
import Image from "next/image";
import React from "react";
import ActionTooltip from "../action-tooltip";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  imageUrl: string;
  name: string;
};

export default function NavigationItem({ id, name, imageUrl }: Props) {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip label={name} align="center" side="right">
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 rounded-r-full bg-primary transition-all w-[4px]",
            params.serverId !== id && "group-hover:h-[20px]",
            params.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] bg-primary rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params.serverId === id &&
              "rounded-[16px] bg-primary/10 text-primary"
          )}
        >
          <Image
            className="object-cover"
            fill
            src={imageUrl}
            alt="Server image"
          />
        </div>
      </button>
    </ActionTooltip>
  );
}
