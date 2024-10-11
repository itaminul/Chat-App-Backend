import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
export class UsersService {
  static async createUser(req: Request, res: Response) {
    console.log("req", req);
  }
}
