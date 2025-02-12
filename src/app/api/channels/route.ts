import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrent";
import prisma from "@/vendor/db";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, handle, imageSrc } = await request.json();

  const channel = await prisma.channel.create({
    data: {
      name,
      handle,
      imageSrc,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(channel, { status: 201 });
}
