"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Channel, Video } from "@prisma/client";
import { useSearchParams } from "next/navigation";

import VideoCard from "@/components/shared/VideoCard";

export default function SearchResults() {
  const params = useSearchParams();
  const searchQuery = params.get("searchQuery");
  const [videos, setVideos] = useState<(Video & { channel: Channel })[]>([]);

  useEffect(() => {
    axios
      .get("/api/videos", { params: { searchQuery } })
      .then((data) => {
        setVideos(data.data as unknown as (Video & { channel: Channel })[]);
      })
      .catch(() => toast.error("Could not fetch any videos"));
  }, [searchQuery]);

  return (
    <div className="w-4/5 h-full mx-auto flex flex-col gap-4 items-center py-4">
      {videos.length
        ? videos.map((video) => {
            return (
              <VideoCard
                key={video.id}
                video={video}
                isVertical={false}
                channel={video.channel}
                includeDescription
                channelAvatar
              />
            );
          })
        : "No videos found"}
    </div>
  );
}
