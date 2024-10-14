import { PrismaClient } from "@prisma/client";
const prismaService = new PrismaClient();
import { sendMessages } from "./services/messageService";
import http from "http";
import { disconnect } from "process";
import { Server } from "socket.io";
export const setupSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  const userSocketMap = new Map();

  const disconnect = (socket: any) => {
    console.log(`Client disconnected : ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };
  const sendMessage = async (message: any) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);
    const createdMessage = await prismaService.messages.create(message);
    const messageData = await sendMessages(message);
    const messageDataCheck = await prismaService.messages.findMany({
      where: {
        id: createdMessage.id,
      },
      include: {
        sender: true,
        recipient: true,
      },
    });

    // Now you can emit the message data to the sockets if needed
    if (senderSocketId) {
      // Emit the message to the sender
      io.to(recipientSocketId).emit("recieveMessage", messageData);
      // socket.emit(senderSocketId, messageData);
    }
    if (recipientSocketId) {
      // Emit the message to the recipient
      io.to(senderSocketId).emit("reciveMessage", messageData);
      // socket.emit(recipientSocketId, messageData);
    }

    return messageData;
  };

  io.on("connection", (socket: any) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected ${userId} with socket ID: ${socket.id}`);
    } else {
      console.log("User id not provied");
    }
    socket.on("sendMessage", sendMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
  return io;
};
