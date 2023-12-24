import React from "react";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import InitialModal from "@/components/modals/initial-modal";

type Props = {};

export default async function SetupPage({}: Props) {
  const profile = await initialProfile();
  console.log("🚀 ~ file: page.tsx:12 ~ SetupPage ~ profile:", profile)
  const server = await db.server.findFirst({
    where: {
      profileId: profile.id,
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
}
