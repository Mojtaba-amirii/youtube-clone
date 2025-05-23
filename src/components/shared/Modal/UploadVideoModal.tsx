"use client";

import { FC, useContext } from "react";
import { useRouter } from "next/navigation";
import { MdClose, MdUpload } from "react-icons/md";

import Button from "../Button";
import IconButton from "../IconButton";
import MediaUpload from "../MediaUpload";
import { UploadVideoModalContext } from "@/context/UploadVideoModalContext";

interface UploadVideoModalProps {
  onUpload: (value: string) => void;
}

const UploadVideoModal: FC<UploadVideoModalProps> = ({ onUpload }) => {
  const uploadVideoModal = useContext(UploadVideoModalContext);
  const router = useRouter();

  const handleUpload = (value: string) => {
    onUpload(value);
    uploadVideoModal?.onClose();
  };

  return (
    <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-start bg-zinc-800 w-5/6 h-5/6 rounded-xl z-50">
      <div className=" p-3 border-b border-neutral-700 flex justify-between">
        <h1 className=" text-xl">Upload Video</h1>
        <MdClose
          className=" h-6 w-6 cursor-pointer"
          onClick={() => {
            uploadVideoModal?.onClose();
            router.back();
          }}
        />
      </div>

      <div className=" flex flex-col gap-10 justify-center items-center h-full">
        <MediaUpload onChange={handleUpload}>
          <IconButton className=" bg-stone-900">
            <MdUpload className=" h-20 w-20 m-8 text-neutral-400" />
          </IconButton>
        </MediaUpload>

        <div className=" flex flex-col items-center">
          <p>Select files to upload</p>
          <p className=" text-sm text-neutral-400">
            Your videos will be private until you publish them.
          </p>
        </div>

        <MediaUpload onChange={handleUpload}>
          <Button type="box">Select files</Button>
        </MediaUpload>
      </div>
    </div>
  );
};

export default UploadVideoModal;
