import { Channel } from "@prisma/client";

import prisma from "@/vendor/db";

interface GetChannelByIdParams {
  channelId?: string;
}

export default async function getChannelById(
  params: GetChannelByIdParams
): Promise<Channel | null> {
  try {
    const { channelId } = params;

    const query: { id?: string } = {};

    if (channelId) {
      query.id = channelId;
    }

    const channel = await prisma.channel.findFirst({
      where: query,
    });

    return channel;
  } catch (error: unknown) {
    console.error("Error in getChannelById: ", error);
    throw new Error(String(error));
  }
}
