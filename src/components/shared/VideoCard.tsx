import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Channel, Video } from "@prisma/client";

import dayjs from "@/vendor/dayjs";
import Avatar, { AvatarSize } from "./Avatar";
import { compactNumberFormatter } from "@/utils/numUtils";

interface VideoCardProps {
  channel?: Channel;
  channelAvatar?: boolean;
  video: Video;
  includeDescription?: boolean;
  isVertical?: boolean;
}

const VideoCard: FC<VideoCardProps> = ({
  channel,
  channelAvatar = false,
  video,
  includeDescription = false,
  isVertical = true,
}) => {
  return (
    <Link href={`/video/${video.id}`}>
      <div
        className={` flex items-start ${
          isVertical ? " flex-col" : " flex-row"
        } gap-2 cursor-pointer overflow-hidden`}
      >
        <div
          className={` relative aspect-video ${
            isVertical ? "w-full h-fit" : " w-2/5 h-fit"
          } `}
        >
          <Image
            className=" object-cover rounded-lg h-full w-full"
            src={video.thumbnailSrc}
            alt={`Thumbnail for ${video.title}`}
            width={196}
            height={110}
            priority
          />
        </div>

        <div
          className={`flex gap-2 items-start ${
            isVertical ? " w-full" : " w-3/5"
          }`}
        >
          {channel && channelAvatar && isVertical ? (
            <Avatar className=" mt-1" imageSrc={channel.imageSrc} />
          ) : undefined}
        </div>

        <div className="flex flex-col">
          <h3
            className={` line-clamp-2 ${
              isVertical ? " text-lg" : " text-sm font-medium"
            }`}
          >
            {video.title}
          </h3>
          {channel && (
            <div className=" flex gap-2 items-center">
              {channelAvatar && !isVertical ? (
                <Avatar
                  size={AvatarSize.extraSmall}
                  className=" my-1"
                  imageSrc={channel.imageSrc}
                />
              ) : undefined}
              <p className=" text-neutral-400 text-sm whitespace-nowrap">
                {channel.name}
              </p>
            </div>
          )}
          <p className=" text-neutral-400 text-sm">
            {compactNumberFormatter(video.viewCount)} views •
            {dayjs(video.createdAt).fromNow()}
          </p>
          {includeDescription &&
            video.description.split("\n").map((line, index) =>
              line === "" ? (
                <br key={index} />
              ) : (
                <p key={index} className=" text-neutral-400 text-sm">
                  {line}
                </p>
              ),
            )}
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
