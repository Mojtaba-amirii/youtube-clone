import { Channel, Comment } from "@prisma/client";

import prisma from "@/vendor/db";

interface GetCommentsByVideoIdParams {
  videoId?: string;
}

export default async function getCommentsByVideoId(
  params: GetCommentsByVideoIdParams
): Promise<(Comment & { channel: Channel })[] | null> {
  try {
    const { videoId } = await params;
    const query: { videoId?: string } = {};

    if (videoId) {
      query.videoId = videoId;
    }

    const comments = await prisma.comment.findMany({
      where: query,
      include: {
        channel: true,
      },
      orderBy: [{ createdAt: "desc" }],
    });

    return comments;
  } catch (error) {
    console.error(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
