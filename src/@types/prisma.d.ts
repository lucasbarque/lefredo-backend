import { PrismaClient } from '@prisma/client';

declare global {
  interface GlobalThis {
    prisma?: PrismaClient;
  }
}
export {};
