import { Request, Response, NextFunction } from "express";
import { ChatService } from "../services/chatService";
const chateService = new ChatService();
export class ChatController {
  async createGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const group = await chateService.createChat(req, res, next);
      return group;
    } catch (error) {
      next(error);
    }
  }
}
