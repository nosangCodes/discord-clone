"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { useOrifin } from "@/hooks/use-origin";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {};

export default function InviteModal({}: Props) {
  const { isOpen, onClose, type, data } = useModal();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const { server } = data;
  const origin = useOrifin();

  const inviteLink = `${origin}/invite/${server?.inviteCode}`;
  const isModalOpen = isOpen && type === "invite";

  const onCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onGenerateNewLink = () => {
    console.log("clicked");
    try {
      setLoading(true);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("finally");
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    console.log("loading", loading);
  }, [loading]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="text-black bg-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="text-xs font-bold text-zinc-500 dark:text-secondary/70">
            SERVER INVITE LINK
          </Label>
          <div className="flex items-center gap-x-2 mt-2 ">
            <Input
              disabled={loading}
              className="bg-zinc-300/50 border-0 focus-visible:right-0 text-black focus-visible:ring-offset-0"
              value={inviteLink}
            />
            <Button disabled={loading} onClick={onCopy} size={"icon"}>
              {copied ? (
                <Check className="w-4 h-4 text-green-700" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            disabled={loading}
            onClick={onGenerateNewLink}
            variant={"link"}
            size={"sm"}
            className="text-xs text-zinc-500 mt-4"
          >
            Generate a new link
            <RefreshCcw
              className={cn("w-4 h-4 ml-2", loading && "animate-spin")}
            />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
