import { PrismaClient } from "@prisma/client";

const PrismaService = new PrismaClient();
module.exports = { PrismaService };
