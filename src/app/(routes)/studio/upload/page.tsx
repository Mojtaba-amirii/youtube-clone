"use client";

import { useContext, useEffect, useMemo, useTransition } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import axios from "axios";

import UploadVideoModal from "@/components/shared/Modal/UploadVideoModal";
import { UploadVideoModalContext } from "@/context/UploadVideoModalContext";
import Button from "@/components/shared/Button";
import VideoUploadFrom from "@/components/studio/upload/VideoUploadFrom";
import VideoPreview from "@/components/studio/upload/VideoPreview";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function UploadPage() {
  useProtectedRoute();

  const [isPending, startTransition] = useTransition();
  const uploadVideoModal = useContext(UploadVideoModalContext);
  const router = useRouter();

  const videoId = useMemo(() => {
    const uuidString = uuid();
    return uuidString.replace(/-/g, "");
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => uploadVideoModal?.onOpen(), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      thumbnailSrc: "",
      videoSrc: "",
    },
  });

  const thumbnailSrc: string = watch("thumbnailSrc");
  const videoSrc: string = watch("videoSrc");

  const changeValue = (id: string, value: string) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    startTransition(async () => {
      axios
        .post("/api/videos", data)
        .then(() => {
          toast.success("Video uploaded successfully");
          router.push("/studio");
        })
        .catch(() => {
          toast.error("Failed to upload video");
        });
    });
  };

  return (
    <>
      {uploadVideoModal?.isOpen && (
        <UploadVideoModal
          onUpload={(value) => changeValue("videoSrc", value)}
        />
      )}

      <div className=" flex flex-col px-8 pt-4">
        <div className=" flex justify-between">
          <h1 className=" text-2xl">Video details</h1>
          <span className=" flax gap-4">
            <Button type="secondary" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              type="box"
              className=" text-black"
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </Button>
          </span>
        </div>

        <div className=" flex flex-col md:flex-row gap-6 md:gap-2 mt-6">
          <VideoUploadFrom
            register={register}
            errors={errors}
            changeValue={changeValue}
            thumbnailSrc={thumbnailSrc}
            isLoading={isPending}
          />
          {videoSrc ? (
            <VideoPreview videoSrc={videoSrc} videoId={videoId} />
          ) : null}
        </div>
      </div>
    </>
  );
}
