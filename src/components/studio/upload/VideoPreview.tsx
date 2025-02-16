"use client";

import IconButton from "@/components/shared/IconButton";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineContentCopy } from "react-icons/md";

interface VideoPreviewProps {
  videoId: string;
  videoSrc: string;
}

const VideoPreview: FC<VideoPreviewProps> = ({ videoId, videoSrc }) => {
  const [videoLink, setVideoLink] = useState<string>("");

  useEffect(() => {
    setVideoLink(`${window.location.host}/video/${videoId}`);
  }, [videoId]);

  const copyLink = () => {
    navigator.clipboard
      .writeText(videoLink)
      .then(() => toast.success("Link copied to clipboard"));
  };

  return (
    <div className=" w-full md:w-2/5 flex flex-col overflow-hidden rounded-md">
      {/* <video
        id={videoId}
        src={VideoSrc}
        controls
        className=" w-full h-full"
      ></video> */}
      <iframe
        src={videoSrc}
        title="video"
        className=" w-full h-full border-none object-cover"
      />

      <div className=" bg-stone-900 p-4 flex justify-between items-center">
        <div className=" w-4/5 truncate">
          <div className=" text-sm text-zinc-400">Video link</div>
          <a href={videoSrc} className=" text-sky-500">
            {videoLink}
          </a>
        </div>

        <IconButton onClick={copyLink}>
          <MdOutlineContentCopy className=" h-6 w-6 text-neutral-400" />
        </IconButton>
      </div>
    </div>
  );
};

export default VideoPreview;
