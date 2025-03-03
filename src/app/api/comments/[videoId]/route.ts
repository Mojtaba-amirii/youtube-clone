import { NextResponse } from "next/server";

import prisma from "@/vendor/db";

interface IParams {
  videoId: string;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<IParams> }
) {
  const { videoId } = await params;
  const { text, channelId } = await request.json();

  if (!text || !channelId || !videoId) {
    return NextResponse.error();
  }

  const comment = await prisma.comment.create({
    data: {
      text,
      videoId,
      channelId,
    },
  });

  return NextResponse.json(comment);
}
