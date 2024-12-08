import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface RequestWithUser extends Request {
    userId?: number; // Adjust type according to your user ID type (e.g., string)
}

export const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

    if (!token) {
         res.sendStatus(401); // Unauthorized
         return
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, payload) => {
        if (err) {
             res.sendStatus(403); // Forbidden
             return;
        }

        // Attach userId to request
        req.userId = (payload as JwtPayload).userId; // Cast to JwtPayload to access userId
        next();
    });
};

/*

interface AuthenticatedRequest extends Request {
  userId?: number;
}

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  userId?: number; 
}


interface CustomJwtPayload extends JwtPayload {
  userId: number; 
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token

  if (!token) {
    res.sendStatus(401); // Unauthorized
    return;
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "asdfgdas5654525afeagfaeg",
    (err, user) => {
      if (err) {
        res.sendStatus(403);
        return;
      }
      req.userId = (user as CustomJwtPayload)?.userId;
      next();
    }
  );
};
*/