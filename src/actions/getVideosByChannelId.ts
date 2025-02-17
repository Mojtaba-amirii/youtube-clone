import { Video } from "@prisma/client";

import prisma from "@/vendor/db";

interface GetVideosByChannelIdParams {
  channelId?: string;
}

export default async function getVideosByChannelId(
  params: GetVideosByChannelIdParams
): Promise<Video[]> {
  try {
    const { channelId } = params;

    const query: { channelId?: string } = {};

    if (channelId) {
      query.channelId = channelId;
    }

    const videos = await prisma.video.findMany({
      where: query,
    });

    return videos || [];
  } catch (error: unknown) {
    console.error("Error in getVideosByChannelId: ", error);
    throw new Error(String(error));
  }
}
