import currentProfile from "@/lib/current-ptofile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import NavigationAction from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

type Props = {};

export default async function NavigationSidebar({}: Props) {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  //find all the joined servers of this profile
  const servers = await db.server.findMany({
    where: {
      Member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full w-full text-primary dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <Separator className="mx-auto h-[2px] w-10 bg-zinc-300 dark:bg-zinc-700 rounded-md" />
      <ScrollArea className=" flex-1 w-full">
        {servers.map((server) => (
          <div className="mb-4" key={server.id}>
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="flex items-center mt-auto pb-3 flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]"
            },
          }}
        />
      </div>
    </div>
  );
}
