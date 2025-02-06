import { Router } from "express";
import { createBlog, deleteBlogById, readBlogById, readBlogByRange, updateBlogById } from "./handlers";

const router = Router();

router.get('/:id', readBlogById);
router.get('/', readBlogByRange);
router.post('/', createBlog);
router.put('/:id', updateBlogById);
router.delete('/:id', deleteBlogById);

export default router;