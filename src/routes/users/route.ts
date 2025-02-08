import { Router } from "express";
import { createUser } from "./handlers";

const router = Router();
//C
router.post('/', createUser);

export default router;