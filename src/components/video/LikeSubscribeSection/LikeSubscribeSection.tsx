"use client";

import Link from "next/link";
import { FC, useContext } from "react";
import { Channel, Video } from "@prisma/client";

import Button from "@/components/shared/Button";
import LikeDislikeButton from "./LikeDislikeButton";
import { compactNumberFormatter } from "@/utils/numUtils";
import Avatar, { AvatarSize } from "@/components/shared/Avatar";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import SubscribeButton from "@/components/shared/SubscribeButton";

interface LikeSubscribeSectionProps {
  channel: Channel;
  video: Video;
}

const LikeSubscribeSection: FC<LikeSubscribeSectionProps> = ({
  channel,
  video,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className=" flex justify-between items-center">
      <div className=" flex items-center gap-3">
        <Link href={`/channel/${channel.id}`}>
          <Avatar size={AvatarSize.Medium} imageSrc={channel.imageSrc} />
        </Link>

        <div className=" flex flex-col justify-between mr-2">
          <Link href={`/channel/${channel.id}`}>
            <h2 className=" text-lg">{channel.name}</h2>
          </Link>
          <p className=" text-sm text-neutral-400">
            {compactNumberFormatter(channel.subscriberCount)} subscribers
          </p>
        </div>
      </div>

      {channel.id === currentUser?.id ? (
        <Link href="/studio">
          <Button type="rounded-dark">Manage Videos</Button>
        </Link>
      ) : (
        <SubscribeButton channelId={channel.id} />
      )}

      <LikeDislikeButton video={video} />
    </div>
  );
};

export default LikeSubscribeSection;
