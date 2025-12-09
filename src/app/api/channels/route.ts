import { NextResponse } from "next/server";

import prisma from "@/vendor/db";
import getCurrentUser from "@/actions/getCurrentUser";

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
