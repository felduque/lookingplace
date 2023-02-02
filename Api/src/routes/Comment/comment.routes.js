import {
    createComment
} from "../../controllers/Comment/comment.controller.js";
import { Router } from "express";

const router = Router();

router.post("/comment/createcomment", createComment);
export default router;
