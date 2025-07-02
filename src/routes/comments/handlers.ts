import { Request, Response } from "express";
import { db } from "../../db/index.js";
import { comments } from "../../db/schema.js";
import { eq } from "drizzle-orm";

//C
export async function createComment(req: Request, res: Response) {
  try {
    const userId = req.userId;
    const [newComment] = await db
      .insert(comments)
      .values({ ...req.cleanBody, userId })
      .returning();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).send(error);
  }
}

//R
export async function readCommentsByBlog(req: Request, res: Response) {
  try {
    const blogId: string = req.params.id!;
    const blogComments = await db
      .select()
      .from(comments)
      .where(eq(comments.blogId, blogId));
    if (blogComments.length == 0) {
      res.status(204);
    } else {
      res.status(200).json(blogComments);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
export async function readCommentsByUser(req: Request, res: Response) {
  try {
    const userId: string = req.params.id!;
    const userComments = await db
      .select()
      .from(comments)
      .where(eq(comments.userId, userId));
    if (userComments.length == 0) {
      res.status(204);
    } else {
      res.status(200).json(userComments);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//U
export async function updateComment(req: Request, res: Response) {
  try {
    const updatedFeilds = req.cleanBody;
    const [user] = await db
      .select({
        userId: comments.userId,
      })
      .from(comments)
      .where(eq(comments.commentId, req.params.id));
    if (!user) {
      res.status(404).send({ message: "Comment not found." });
      return;
    }
    if (user.userId != req.userId) {
      res.status(401).json({ error: "Not Autherized!" });
      return;
    }
    const [updatedComment] = await db
      .update(comments)
      .set(updatedFeilds)
      .where(eq(comments.commentId, req.params.id));
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).send(error);
  }
}

//D
export async function deleteComment(req: Request, res: Response) {
  try {
    const [user] = await db
      .select({
        userId: comments.userId,
      })
      .from(comments)
      .where(eq(comments.commentId, req.params.id));
    if (!user) {
      res.status(404).send({ message: "Comment not found." });
      return;
    }
    if (user.userId != req.userId) {
      res.status(401).json({ error: "Not Autherized!" });
      return;
    }
    const [deletedComment] = await db
      .delete(comments)
      .where(eq(comments.commentId, req.params.id));
    res.status(204).json(deletedComment);
  } catch (error) {
    res.status(500).send(error);
  }
}
