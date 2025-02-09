import { Router } from "express";
import {
  createBlog,
  deleteBlogById,
  readBlogById,
  readBlogByRange,
  readBlogByTitle,
  readBlogByUser,
  updateBlogById,
} from "./handlers";
import { validateData } from "../../middleware/validationMiddleware";
import {
  createBlogSchema,
  readBlogByTitleSchema,
  readBlogByUserSchema,
  updateBlogSchema,
} from "../../db/schema";
import { verifyToken } from "../../middleware/authMiddleware";

const router = Router();
//C
router.post("/", verifyToken, validateData(createBlogSchema), createBlog);

//R
router.get("/page", readBlogByRange);
router.post("/search/user", validateData(readBlogByUserSchema), readBlogByUser);
router.get("/:id", readBlogById);
router.post(
  "/search/title",
  validateData(readBlogByTitleSchema),
  readBlogByTitle
);

//U
router.put("/:id", verifyToken, validateData(updateBlogSchema), updateBlogById);

//D
router.delete("/:id", verifyToken, deleteBlogById);

export default router;
