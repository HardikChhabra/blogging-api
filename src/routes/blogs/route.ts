import { Router } from "express";
import { createBlog, deleteBlogById, readBlogById, readBlogByRange, readBlogByTitle, readBlogByUser, updateBlogById } from "./handlers";

const router = Router();
//C
router.post('/', createBlog);

//R
router.get('/page', readBlogByRange);
router.post('/search/user', readBlogByUser);
router.get('/:id', readBlogById);
router.post('/search/title', readBlogByTitle);

//U
router.put('/:id', updateBlogById);

//D
router.delete('/:id', deleteBlogById);

export default router;