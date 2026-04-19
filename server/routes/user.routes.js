import express from "express";

import {

getUser,
bookmarkPost,
getBookmarks,
followUser,
updateProfile,
getFollowers,
getFollowing
}
from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { searchUsers } from "../controllers/user.controller.js";

const router = express.Router();


// ADD / REMOVE BOOKMARK

router.put("/bookmark/:userId", requireAuth, bookmarkPost);


// GET USER BOOKMARKS

router.get("/bookmarks/:userId", getBookmarks);
router.get("/followers/:userId", getFollowers);

router.get("/following/:userId", getFollowing);

router.put("/follow/:id", requireAuth, followUser);
router.put("/:userId", requireAuth, updateProfile);

// GET USER INFO
router.get("/search", searchUsers);
router.get("/:userId", getUser);


export default router;