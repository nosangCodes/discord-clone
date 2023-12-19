import { initialProfile } from "@/lib/initial-profile";
import { UserButton } from "@clerk/nextjs";
import React from "react";

type Props = {};

export default async function SetupPage({}: Props) {
  const profile = await initialProfile();
  return (
    <div className="flex flex-col gap-2">
      <h1>Create a server</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
