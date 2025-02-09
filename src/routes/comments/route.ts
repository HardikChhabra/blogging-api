import { Router } from "express";
import { createComment, updateComment, deleteComment, readCommentsByBlog, readCommentsByUser } from "./handlers";
import { validateData } from "../../middleware/validationMiddleware";
import { createCommentSchema, updateCommentSchema } from "../../db/schema";

const router = Router();
//C
router.post('/', validateData(createCommentSchema), createComment);

//R
router.get('/blog/:id', readCommentsByBlog);
router.get('/user/:id', readCommentsByUser);

//U
router.put('/:id', validateData(updateCommentSchema), updateComment);

//D
router.delete('/:id', deleteComment)

export default router;