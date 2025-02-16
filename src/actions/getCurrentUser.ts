import { getServerSession } from "next-auth";

import prisma from "@/vendor/db";

export default async function getCurrentUser() {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    return currentUser;
  } catch (error) {
    console.error(error);
    return null;
  }
}
