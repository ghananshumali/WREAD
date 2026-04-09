import express from "express";

import {

createComment,
getComments,
deleteComment

}
from "../controllers/comment.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create",requireAuth,createComment);

router.get("/:postId",getComments);
router.delete("/:commentId", requireAuth, deleteComment);

export default router;