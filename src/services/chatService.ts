import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
const prismaService = new PrismaClient();
export class ChatService {
  async createChat(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const userId = 1;
      const group = await prismaService.group.create({
        data: {
          name,
          messages: {
            connect: { id: userId },
          },
        },
      });
      res.status(201).json(group);
      return;
    } catch (error) {
      res.status(500).json({ error: "Error creating group" });
    }
  }
}
