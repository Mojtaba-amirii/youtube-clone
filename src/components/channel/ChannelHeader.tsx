"use client";

import { Channel } from "@prisma/client";
import { FC, useContext } from "react";
import Link from "next/link";

import { CurrentUserContext } from "@/context/CurrentUserContext";
import Avatar, { AvatarSize } from "../shared/Avatar";
import { compactNumberFormatter } from "@/utils/numUtils";
import Button from "../shared/Button";

interface ChannelHeaderProps {
  channel: Channel;
  videoCount: number;
}

const ChannelHeader: FC<ChannelHeaderProps> = ({ channel, videoCount }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className=" flex flex-col justify-between items-center md:flex-row gap-6 md:gap-0 px-24 py-6">
      <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center md:items-start">
        <Avatar size={AvatarSize.Large} imageSrc={channel.imageSrc} />
        <div className=" flex flex-col pt-4 gap-4 md:gap-0">
          <h1 className=" text-2xl text-center md:text-start">
            {channel.name}
          </h1>
          <div className=" flex flex-col md:flex-row items-center gap-1 md:gap-3 text-stone-400">
            <p className=" font-medium">{`@${channel.handle}`}</p>
            <span>{`${compactNumberFormatter(
              channel.subscriberCount
            )} subscribers`}</span>
            <span>{`${compactNumberFormatter(videoCount)} videos`}</span>
          </div>
        </div>
      </div>
      {channel.userId === currentUser?.id ? (
        <Link href="/studio">
          <Button type="rounded-dark">Manage Videos</Button>
        </Link>
      ) : (
        <div>Subscribe now</div>
      )}
    </div>
  );
};

export default ChannelHeader;
