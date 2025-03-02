import { Channel } from "@prisma/client";

import prisma from "@/vendor/db";
import getCurrentUser from "./getCurrentUser";

export default async function getCurrentSubscriptions(): Promise<Channel[]> {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return [];
    }

    const subscriptions = await prisma.channel.findMany({
      where: {
        id: {
          in: user.subscribedChannelIds,
        },
      },
    });

    return subscriptions;
  } catch (error) {
    console.error(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
