import { NextResponse } from "next/server";

import prisma from "@/vendor/db";
import getCurrentChannel from "@/actions/getCurrentChannel";

interface IParams {
  videoId?: string;
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<IParams> }
) {
  const currentChannel = await getCurrentChannel();

  if (!currentChannel) {
    return NextResponse.error();
  }

  const video = await prisma.video.delete({
    where: {
      id: (await params).videoId,
    },
  });

  return NextResponse.json(video);
}
