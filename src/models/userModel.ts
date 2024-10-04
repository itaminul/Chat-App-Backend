import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
class UsersModel {
  static async createUser(req: Request, res: Response) {
    console.log("req", req);
    
  }
}

module.exports = UsersModel