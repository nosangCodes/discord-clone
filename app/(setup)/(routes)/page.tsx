import InitialModal from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export default async function SetupPage({}: Props) {
  const profile = await initialProfile();
  const server = await db.server.findFirst({
    where: {
      id: profile.id,
    },
  });

  if (server) {
    return redirect(`/server/${server.id}`);
  }

  return <InitialModal />;
}
