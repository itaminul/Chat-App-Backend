import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");

const prismaService = new PrismaClient();
export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      console.log("user", username);
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prismaService.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
      res.status(201).json({ message: "user registered successfully", user });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const user = await prismaService.user.findUnique({
        where: {
          username,
        },
      });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "10h",
      });
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}
