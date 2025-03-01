"use client";

import { FC } from "react";
import { Video } from "@prisma/client";
import {
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdThumbDown,
  MdThumbUp,
} from "react-icons/md";

import { LikeDislikeStatus, useLikeDislike } from "@/hooks/useLikeDislike";
import { compactNumberFormatter } from "@/utils/numUtils";

interface LikeDislikeButtonProps {
  video: Video;
}

const LikeDislikeButton: FC<LikeDislikeButtonProps> = ({ video }) => {
  const { likeDislikeStatus, toggleLikeDislike } = useLikeDislike({
    videoId: video.id,
  });

  return (
    <div className=" flex items-center gap-1 bg-neutral-800 rounded-full text-white font-medium">
      <button
        type="button"
        title="like"
        className=" pr-3 border-r-2 border-neutral-600 flex items-center gap-3 cursor-pointer hover:bg-neutral-700 rounded-l-full py-2 pl-2"
        onClick={() => toggleLikeDislike("like")}
      >
        {likeDislikeStatus === LikeDislikeStatus.Liked ? (
          <MdThumbUp className=" w-6 h-6" />
        ) : (
          <MdOutlineThumbUp className=" w-6 h-6" />
        )}
        <p className=" cursor-default">
          {compactNumberFormatter(video.likeCount)}
        </p>
      </button>
      <button
        type="button"
        title="dislike"
        className=" pl-2 flex items-center gap-3 cursor-pointer hover:bg-neutral-700 h-full rounded-r-full py-2 pr-3"
        onClick={() => toggleLikeDislike("dislike")}
      >
        {likeDislikeStatus === LikeDislikeStatus.Disliked ? (
          <MdThumbDown className=" w-6 h-6" />
        ) : (
          <MdOutlineThumbDown className=" w-6 h-6" />
        )}
        <p className=" cursor-default">
          {compactNumberFormatter(video.dislikeCount)}
        </p>
      </button>
    </div>
  );
};

export default LikeDislikeButton;
