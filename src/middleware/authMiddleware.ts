import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { object } from "zod";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ error: "Access Denied!" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded != "object" || !decoded?.userId) {
      res.status(401).json({ error: "Access Denied!" });
      return;
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
}
