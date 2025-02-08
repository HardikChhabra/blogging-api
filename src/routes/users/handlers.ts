import { users } from "../../db/schema";
import { db } from "../../db/index";
import { Request, Response } from "express";

 export async function createUser (req: Request, res: Response) {
     try {
         const [newUser] = await db.insert(users).values(req.body).returning();
         res.status(201).json(newUser);
     } catch (error) {
         res.status(500).send(error);
     }
 }