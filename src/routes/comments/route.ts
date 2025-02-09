import { Router } from "express";
import {
  createComment,
  updateComment,
  deleteComment,
  readCommentsByBlog,
  readCommentsByUser,
} from "./handlers";
import { validateData } from "../../middleware/validationMiddleware";
import { createCommentSchema, updateCommentSchema } from "../../db/schema";
import { verifyToken } from "../../middleware/authMiddleware";

const router = Router();
//C
router.post("/", verifyToken, validateData(createCommentSchema), createComment);

//R
router.get("/blog/:id", readCommentsByBlog);
router.get("/user/:id", readCommentsByUser);

//U
router.put(
  "/:id",
  verifyToken,
  validateData(updateCommentSchema),
  updateComment
);

//D
router.delete("/:id", verifyToken, deleteComment);

export default router;
