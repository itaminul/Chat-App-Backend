import { PrismaClient } from "@prisma/client";
const prismaService = new PrismaClient();
import http from "http";
import { disconnect } from "process";
import { Server } from "socket.io";
export const setupSocket = (server: http.Server) => {
};
