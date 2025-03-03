"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { Video } from "@prisma/client";
import { FC, useCallback } from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

import dayjs from "@/vendor/dayjs";
import { compactNumberFormatter } from "@/utils/numUtils";

interface VideoDetailsCardProps {
  video: Video;
}

const VideoDetailsCard: FC<VideoDetailsCardProps> = ({ video }) => {
  const router = useRouter();
  const likeFraction = video.likeCount / (video.likeCount + video.dislikeCount);

  const handleDeleteVideo = useCallback(() => {
    if (confirm("Are you sure you want to delete this video?")) {
      axios
        .delete(`/api/videos/${video.id}`)
        .then(() => {
          toast.success(" Video Deleted Successfully!");
          router.refresh();
        })
        .catch((error) => {
          console.error(error);
          toast.error("An error occurred. Please try again.");
        });
    }
  }, [video.id, router]);

  return (
    <div
      key={video.id}
      className=" flex justify-between items-center gap-6 bg-neutral-800 p-4 rounded-lg"
    >
      <Link href={`/video/${video.id}`}>
        <Image
          src={video.thumbnailSrc}
          alt={`${video.title} thumbnail`}
          width={170}
          height={110}
          className=" aspect-video w-auto"
        />
      </Link>

      <div className=" w-2/5">
        <h3>{video.title}</h3>
        <p className=" text-sm text-neutral-400 line-clamp-2">
          {video.description}
        </p>
      </div>

      <div className=" flex flex-col">
        <p>{dayjs(video.createdAt).format("MMM D, YYYY")}</p>
        <p className=" text-sm text-neutral-400">Published</p>
      </div>

      <div className=" flex flex-col">
        <p>{compactNumberFormatter(video.viewCount)}</p>
        <p className=" text-sm text-neutral-400">Views</p>
      </div>

      <div className="flex flex-col">
        <p>
          {likeFraction > 0.5 ? `${Math.round(likeFraction * 100)}% 👍` : "👎"}
        </p>
        <p className=" text-sm text-neutral-400">{video.likeCount} likes</p>
      </div>

      <MdDelete
        className=" h-6 w-6 cursor-pointer text-red-500"
        onClick={handleDeleteVideo}
      />
    </div>
  );
};

export default VideoDetailsCard;
