import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prismaService = new PrismaClient();
export class UsersService {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const { name, userName, password, email, address, phone, groupId } =
        req.body;
      const results = await prismaService.users.create({
        data: { name, userName, password, email, address, phone, groupId },
      });
      res.status(201).json(results);
    } catch (error) {
      next(error);
    }
  }
}
