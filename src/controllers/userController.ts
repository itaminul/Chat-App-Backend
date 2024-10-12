import { NextFunction, Request, Response } from "express";
import { UsersService } from "../services/userService";
const userService = new UsersService();
export class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    return await userService.createUser(req, res, next);
  }
}
