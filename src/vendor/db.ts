import { PrismaClient } from "@prisma/client";

const PrismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingletonType = ReturnType<typeof PrismaClientSingleton>;

const globalForPrisma = global as unknown as {
  prisma: PrismaClientSingletonType | undefined;
};

const prisma = globalForPrisma.prisma ?? PrismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
