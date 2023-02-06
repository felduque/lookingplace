import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  updateComment,
} from "../../controllers/Comment/comment.controller.js";
import { Router } from "express";

const router = Router();

router.post("/comment/createcomment", createComment);
router.get("/comments", getAllComments);
router.get("/comment/:id", getCommentById);
router.delete("/comment/delete/:id", deleteComment);
router.patch("/comment/edit/:id", updateComment);
export default router;
