import prisma from "@/vendor/db";
import { Video } from "@prisma/client";

interface increaseVideoViewCountParams {
  videoId?: string;
}

export default async function increaseVideoViewCount(
  params: increaseVideoViewCountParams
): Promise<Video | null> {
  try {
    const { videoId } = params;

    if (!videoId) {
      throw new Error("videoId is required");
    }

    const video = await prisma.video.update({
      where: { id: videoId },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return video;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
