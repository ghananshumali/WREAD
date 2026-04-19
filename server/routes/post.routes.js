import express from "express";
import upload from "../middleware/upload.js";
import { requireAuth } from "../middleware/auth.js";
import { getFollowingPosts } from "../controllers/post.controller.js";
import { getAuthorStats } from "../controllers/post.controller.js";

import {
createPost,
getPosts,
getPost,
getPostBySlug,
deletePost,
updatePost,
getUserPosts,
likePost,
searchPosts,
getTrendingPosts,
getSavedPosts
}
from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create",requireAuth,createPost);

router.get("/all",getPosts);
router.get("/search", searchPosts);
router.get("/trending/list", getTrendingPosts);
router.get("/saved/:userId", getSavedPosts);
router.get("/user/:userId", getUserPosts);

router.get("/slug/:slug", getPostBySlug);
router.get("/stats/:userId", getAuthorStats);
router.get("/:postId",getPost);
router.get("/following/:userId", getFollowingPosts);


router.delete("/:postId",requireAuth,deletePost);

router.put("/:postId",requireAuth,updatePost);

router.put("/like/:postId", requireAuth, likePost);

router.post("/upload", requireAuth, upload.single("image"), (req,res)=>{

res.status(200).json({

image:req.file.filename

});

});

export default router;