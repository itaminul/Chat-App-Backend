import { NextFunction, Request, Response } from "express";
import { UsersService } from "../services/userService";
import { sendMessages } from "../services/messageService";
const userService = new UsersService();
export class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    return await userService.createUser(req, res, next);
  }
  async mess(req: Request, res: Response, next: NextFunction) {
    console.log("dafa");
     await sendMessages(req)
  }
}
