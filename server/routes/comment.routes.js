import express from "express";
import { createComment, deleteComment, getAllComments, getCommentById, likedOrUnlikeComment, replyToComment } from "../controllers/comment.controller.js";
import { isUserAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:videoId", isUserAuthenticated, createComment);

router.delete("/:commentId", isUserAuthenticated, deleteComment);

router.get("/:videoId", isUserAuthenticated, getAllComments);

router.get("/id/:commentId", isUserAuthenticated, getCommentById);

router.post("/like/:commentId", isUserAuthenticated, likedOrUnlikeComment);

router.post("/reply/:commentId", isUserAuthenticated, replyToComment);

export default router;