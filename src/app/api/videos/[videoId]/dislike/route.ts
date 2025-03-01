import { NextResponse } from "next/server";

import prisma from "@/vendor/db";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  videoId: string;
}

export async function POST(_: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const { videoId } = await params;

  if (!currentUser || !videoId) {
    return NextResponse.error();
  }

  const dislikedVideoIds = [...currentUser.dislikedVideoIds, videoId];

  const video = await prisma.video.update({
    where: {
      id: videoId,
    },
    data: {
      dislikeCount: {
        increment: 1,
      },
    },
  });

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      dislikedVideoIds,
    },
  });

  return NextResponse.json({ user, video });
}

export async function DELETE(_: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const { videoId } = await params;

  if (!currentUser || !videoId) {
    return NextResponse.error();
  }

  const dislikedVideoIds = currentUser.dislikedVideoIds.filter(
    (dislikedVideoId) => dislikedVideoId !== videoId
  );

  const video = await prisma.video.update({
    where: {
      id: videoId,
    },
    data: {
      dislikeCount: {
        decrement: 1,
      },
    },
  });

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      dislikedVideoIds,
    },
  });

  return NextResponse.json({ user, video });
}
