import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export type AuthUser = {
  id: number;
  email: string;
  role: string;
};

export type AuthRequest = Request & { user?: AuthUser };

export function createToken(user: AuthUser): string {
  const secret = process.env.JWT_SECRET ?? "dev_secret_change_me";
  return jwt.sign(user, secret, { expiresIn: "7d" });
}

export function authRequired(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.header("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.slice(7);
  try {
    const secret = process.env.JWT_SECRET ?? "dev_secret_change_me";
    req.user = jwt.verify(token, secret) as AuthUser;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

