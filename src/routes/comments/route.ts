import { Router } from "express";
import { createComment, updateComment, deleteComment, readCommentsByBlog, readCommentsByUser } from "./handlers";

const router = Router();
//C
router.post('/', createComment);

//R
router.get('/blog/:id', readCommentsByBlog);
router.get('/user/:id', readCommentsByUser);

//U
router.put('/:id', updateComment);

//D
router.delete('/:id', deleteComment)

export default router;