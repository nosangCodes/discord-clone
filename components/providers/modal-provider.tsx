"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "../modals/create-server-modal";

type Props = {};

export default function ModalProvdier({}: Props) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
    </>
  );
}
