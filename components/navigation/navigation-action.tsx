"use client";
import { Plus } from "lucide-react";
import React from "react";
import ActionTooltip from "@/components/action-tooltip";

type Props = {};

export default function NavigationAction({}: Props) {
  return (
    <div>
      <ActionTooltip side="right" align="center" label="add a server">
        <button className="group flex items-center cursor-pointer">
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] items-center justify-center bg-background dark:bg-neutral-700 group-hover:rounded-[16px] group-hover:bg-emerald-500 transition-all overflow-hidden">
            <Plus className="group-hover:text-white transition text-emerald-500" />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
}
