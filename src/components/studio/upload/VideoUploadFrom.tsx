"use client";

import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import Image from "next/image";

import MediaUpload from "@/components/shared/MediaUpload";
import TextArea from "@/components/shared/TextArea";
import { FaRegSquarePlus } from "react-icons/fa6";

interface VideoUploadFromProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  changeValue: (id: string, value: string) => void;
  thumbnailSrc: string;
  isLoading: boolean;
}

const VideoUploadFrom: FC<VideoUploadFromProps> = ({
  register,
  errors,
  changeValue,
  thumbnailSrc,
  isLoading,
}) => {
  return (
    <div className=" w-full md:w-3/5 flex flex-col gap-6">
      <TextArea
        id="title"
        label="Title (required)"
        register={register}
        errors={errors}
        changeValue={changeValue}
        disabled={isLoading}
        required
      />
      <TextArea
        id="description"
        label="Description (required)"
        register={register}
        errors={errors}
        changeValue={changeValue}
        disabled={isLoading}
        required
      />

      <div>
        <label htmlFor="" className=" block mb-2">
          Thumbnail
        </label>
        <MediaUpload
          onChange={(value) => !isLoading && changeValue("thumbnailSrc", value)}
        >
          {thumbnailSrc ? (
            <Image
              src={thumbnailSrc}
              alt="thumbnail"
              width={192}
              height={112}
              className={` h-28 w-48 rounded-md object-cover overflow-hidden ${
                isLoading ? "opacity-50" : "cursor-pointer"
              }`}
            />
          ) : (
            <div
              className={` h-28 w-48 rounded-md bg-zinc-800 flex items-center justify-center border ${
                isLoading ? "opacity-50" : "cursor-pointer"
              } ${
                errors["thumbnailSrc"] ? "border-red-500" : "border-zinc-500"
              }`}
              id="thumbnailSrc"
              {...register("thumbnailSrc", { required: true })}
            >
              <FaRegSquarePlus
                className={`h-6 w-6 ${
                  errors["thumbnailSrc"] ? " text-red-500" : "text-neutral-400"
                }`}
              />
            </div>
          )}
        </MediaUpload>
      </div>
    </div>
  );
};

export default VideoUploadFrom;
