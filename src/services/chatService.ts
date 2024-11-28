import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
const prismaService = new PrismaClient();
export class ChatService {
  async createChat(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const userId = 4;
      console.log("user id",name)
      const group = await prismaService.group.create({
        data: {
          name,
          members: {
            connect: { id: userId },
          },
        },
      });
      res.status(201).json(group);
    } catch (error) {
      res.status(500).json({ error: "Error creating group" });
    }
  }
}
