import { Request, Response, NextFunction } from "express";
import { ChatService } from "../services/chatService";
const chateService = new ChatService();

import { PrismaClient } from "@prisma/client";
const prismaService = new PrismaClient();

export class ChatController {
  async createGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const group = await chateService.createChat(req, res, next);
      res.status(201).json(group);
    } catch (error) {
      next(error);
    }
  }

  async getGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = 1;
      const groups = await prismaService.group.findMany({
        where: {
          id: userId
        },
      });
      res.json(groups);
    } catch (error) {
      res.status(500).json({ error: "Error fetching groups" });
    }
  }
}
