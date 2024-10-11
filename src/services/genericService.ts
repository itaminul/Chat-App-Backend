import { PrismaClient } from "@prisma/client";
const prismaService = new PrismaClient();
export class GenericService {
  async insertRecord<T extends keyof typeof prismaService>() {}
}
