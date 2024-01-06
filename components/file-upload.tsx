"use client";
import React from "react";
import { UploadDropzone } from "@/lib/uploadThing";
import "@uploadthing/react/styles.css";
import Image from "next/image";
import { FileIcon, X } from "lucide-react";

type Props = {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "serverImage" | "messageFile";
};

export default function FileUpload({ onChange, value, endpoint }: Props) {
  // const temp =
  //   "https://utfs.io/f/24322056-4726-4de5-a8c5-845757008ef5-ehd5rj.jpeg";
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          src={value}
          fill
          className="rounded-full object-cover"
          alt="server image"
        />
        <button
          onClick={() => onChange("")}
          type="button"
          className="absolute -top-0 -right-0 text-white shadow-sm bg-red-600 p-1 rounded-full"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    );
  }
  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          type="button"
          className="absolute -top-2 -right-2 text-white shadow-sm bg-red-600 p-1 rounded-full"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("file uploaded", res);
        onChange(res[0].url);
      }}
      onUploadError={(error: Error) => {
        console.error(error);
      }}
      onUploadProgress={(progress: number) => {
        console.log({ progress });
      }}
    />
  );
}
