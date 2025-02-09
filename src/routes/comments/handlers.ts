import { Request, Response } from "express";
import { db } from "../../db/index";
import { blogs, comments, users } from "../../db/schema";
import { and, eq } from "drizzle-orm";
//C
export async function createComment(req: Request, res: Response) {
  try {
    const [newComment] = await db.insert(blogs).values(req.body).returning();
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
    const updatedFeilds = req.body;
    const [updatedComment] = await db
      .update(comments)
      .set(updatedFeilds)
      .where(eq(comments.commentId, req.params.id));
    if (!updatedComment) {
      res
        .status(404)
        .send({ message: "Either blog not found or User not found" });
    } else {
      res.status(200).json(updatedComment);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//D
export async function deleteComment(req: Request, res: Response) {
  try {
    const [deletedComment] = await db
      .delete(comments)
      .where(eq(comments.commentId, req.params.id));
    if (!deletedComment) {
      res.status(404).send({ message: "Comment not found." });
    } else {
      res.status(204).json(deletedComment);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
