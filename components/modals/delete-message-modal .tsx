"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import qs from "query-string";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

type Props = {};

export default function DeleteMessageModal({}: Props) {
  const { isOpen, onClose, type, data } = useModal();
  const [loading, setLoading] = useState(false);
  const { apiUrl, query } = data;

  const isModalOpen = isOpen && type === "deleteMessage";

  const onConfirm = async () => {
    try {
      setLoading(true);
      console.log("here");
      const url = qs.stringifyUrl({
        url: apiUrl as string,
        query,
      });
      await axios.delete(url);
      onClose();
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
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br />
            This message will be permanently deleted
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
