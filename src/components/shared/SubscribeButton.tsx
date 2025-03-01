"use client";

import { FC } from "react";

import useSubscribe from "@/hooks/useSubscribe";
import Button from "./Button";

interface SubscribeButtonProps {
  channelId: string;
}

const SubscribeButton: FC<SubscribeButtonProps> = ({ channelId }) => {
  const { hasSubscribed, toggleSubscribed } = useSubscribe({ channelId });

  return (
    <Button
      type={hasSubscribed ? "rounded-dark" : "rounded-sm"}
      className=" hover:bg-neutral-500"
      onClick={toggleSubscribed}
    >
      {hasSubscribed ? "Subscribed" : "Subscribe"}
    </Button>
  );
};

export default SubscribeButton;
