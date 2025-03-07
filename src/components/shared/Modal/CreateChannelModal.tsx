"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useContext, useTransition } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Input from "../Input";
import Button from "../Button";
import MediaUpload from "../MediaUpload";
import Avatar, { AvatarSize } from "../Avatar";
import { CreateChannelModalContext } from "@/context/CreateChannelModalContext";

const CreateChannelModal = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const createChannelModal = useContext(CreateChannelModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      handle: "",
      imageSrc: "",
    },
  });

  const imageSrc = watch("imageSrc");

  const handleImageUpload = (value: string) => {
    setValue("imageSrc", value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    startTransition(async () => {
      try {
        axios.post("/api/channels", data);
        toast.success("Channel created successfully");
        createChannelModal?.onClose();
        router.refresh();
      } catch (error: unknown) {
        console.error(error);
        toast.error("Failed to create channel");
        throw new Error("Failed to create channel");
      }
    });
  };

  return createChannelModal?.isOpen ? (
    <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-800 p-8 rounded-xl flex flex-col justify-center items-center space-y-4 w-3/5 max-w-2xl">
      <h1 className=" text-xl p-3 border-b border-neutral-700">
        How you&apos;ll appear
      </h1>
      <div className=" flex flex-col items-center space-y-4 ">
        <Avatar size={AvatarSize.Large} imageSrc={imageSrc} />
        <MediaUpload onChange={handleImageUpload}>
          <Button
            type="primary"
            onClick={() => {
              console.log("Upload Image");
            }}
          >
            Upload Image
          </Button>
        </MediaUpload>

        <Input
          id="name"
          label="name"
          disabled={isPending}
          register={register}
          errors={errors}
          pattern={{
            value: /^[a-zA-Z0-9]*$/,
            message: "Please enter a valid name",
          }}
          required
          className=" w-3/4"
        />

        <Input
          id="handle"
          label="handle"
          disabled={isPending}
          register={register}
          errors={errors}
          pattern={{
            value: /^[a-z0-9_-]{3,16}$/,
            message: "Please enter a valid handle format",
          }}
          required
          className=" w-3/4"
        />
      </div>
      <div className=" p-3 border-t border-neutral-700 flex justify-end items-end gap-3 space-y-4">
        <Button type="primary" onClick={handleSubmit(onSubmit)}>
          Create Channel
        </Button>
        <Button type="secondary" onClick={createChannelModal?.onClose}>
          Cancel
        </Button>
      </div>
    </div>
  ) : null;
};

export default CreateChannelModal;
