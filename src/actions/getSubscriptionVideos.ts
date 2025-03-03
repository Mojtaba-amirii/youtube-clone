import { Channel, Video } from "@prisma/client";

import prisma from "@/vendor/db";
import getCurrentUser from "./getCurrentUser";

export default async function getSubscriptionVideos(): Promise<
  (Video & { channel: Channel })[]
> {
  const currentUser = await getCurrentUser();

  try {
    const videos = await prisma.video.findMany({
      where: {
        channelId: {
          in: currentUser?.subscribedChannelIds,
        },
      },
      include: {
        channel: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    return videos;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
