"use client";

import { FC, PropsWithChildren } from "react";

import { CldUploadWidget } from "next-cloudinary";

declare global {
  let cloudinary: unknown;
}

interface MediaUploadProps {
  onChange: (value: string) => void;
}

const MediaUpload: FC<PropsWithChildren<MediaUploadProps>> = ({
  onChange,
  children,
}) => {
  const handleUpload = (result: unknown) => {
    onChange((result as { info: { secure_url: string } }).info.secure_url);
  };

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="upload"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => (
        <div
          onClick={() => open && open()}
          className="flex items-center justify-center w-24 h-24 bg-zinc-600 rounded-full"
        >
          {children}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUpload;
