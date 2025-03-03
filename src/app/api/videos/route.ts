import { NextRequest, NextResponse } from "next/server";

import getCurrentChannel from "@/actions/getCurrentChannel";
import prisma from "@/vendor/db";

export async function GET(request: NextRequest) {
  const searchQuery = request.nextUrl.searchParams.get("searchQuery");

  if (!searchQuery) return NextResponse.error();

  const videos = await prisma.video.aggregateRaw({
    pipeline: [
      {
        $search: {
          index: "default",
          text: {
            query: searchQuery,
            path: {
              wildcard: "*",
            },
          },
        },
      },
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
          createdAt: { $dateToString: { date: "$createdAt" } },
          viewCount: 1,
          thumbnailSrc: 1,
          channel: { $arrayElemAt: ["$channel", 0] },
        },
      },
    ],
  });

  return NextResponse.json(videos);
}

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
