"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {};

export default function LeaveServerModal({}: Props) {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { server } = data;

  const isModalOpen = isOpen && type === "leaveServer";

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/servers/${server?.id}/leave`);

      onClose();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="text-black bg-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to leave{" "}
            <span className="text-indigo-500 font-semibold">
              {server?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={loading} variant={"ghost"} onClick={onClose}>
              Cancel
            </Button>
            <Button variant={"primary"} disabled={loading} onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
