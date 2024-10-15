import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prismaService = new PrismaClient();
export class UsersService {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const results = await prismaService.user.create({
        data: {
          username,
          password,
        },
      });
      res.status(201).json(results);
    } catch (error) {
      next(error);
    }
  }
}
