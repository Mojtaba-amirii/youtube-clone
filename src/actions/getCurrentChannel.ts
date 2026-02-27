import { Channel } from "@prisma/client";

import prisma from "@/vendor/db";
import getCurrentUser from "./getCurrentUser";

export default async function getCurrentChannel(): Promise<Channel | null> {
  try {
    const user = await getCurrentUser();

    const query: { userId?: string } = {};

    if (user?.id) {
      query.userId = user.id;
    } else {
      return null;
    }
    const currentChannel = await prisma.channel.findFirst({
      where: query,
    });

    return currentChannel;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to get current channel: ${error}`);
  }
}
