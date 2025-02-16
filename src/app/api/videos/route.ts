import { NextResponse } from "next/server";

import getCurrentChannel from "@/actions/getCurrentChannel";
import prisma from "@/vendor/db";

export async function POST(request: Request) {
  const currentChannel = await getCurrentChannel();

  if (!currentChannel) {
    return NextResponse.error();
  }

  const { id, title, description, thumbnailSrc, videoSrc } =
    await request.json();

  const video = await prisma.video.create({
    data: {
      id,
      title,
      description,
      thumbnailSrc,
      videoSrc,
      channelId: currentChannel?.id,
    },
  });

  return NextResponse.json(video);
}
