import { Router } from "express";
import {
  createComment,
  updateComment,
  deleteComment,
  readCommentsByBlog,
  readCommentsByUser,
} from "./handlers.js";
import { validateData } from "../../middleware/validationMiddleware.js";
import { createCommentSchema, updateCommentSchema } from "../../db/schema.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

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
