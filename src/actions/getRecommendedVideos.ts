import { Channel, Video } from "@prisma/client";

import prisma from "@/vendor/db";

interface getRecommendedVideosParams {
  video: Video | null;
}

export async function getRecommendedVideos(
  params: getRecommendedVideosParams
): Promise<(Video & { channel: Channel })[]> {
  const { video } = await params;

  try {
    const videos = (await prisma.video.aggregateRaw({
      pipeline: [
        {
          $search: {
            index: "default",
            moreLikeThis: {
              like: [
                {
                  description: video?.description,
                  title: video?.title,
                },
              ],
            },
          },
        },
        { $limit: 10 },
        {
          $lookup: {
            from: "channel",
            localField: "channelId",
            foreignField: "_id",
            as: "channel",
          },
        },
        {
          $project: {
            _id: 0,
            id: { $toString: "$_id" },
            title: 1,
            description: 1,
            createdAt: 1,
            viewCount: 1,
            thumbnailSrc: 1,
            channel: { $arrayElemAt: ["$channel", 0] },
          },
        },
      ],
    })) as unknown as (Video & { channel: Channel })[];

    return videos.filter((v) => v.id !== video?.id);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
