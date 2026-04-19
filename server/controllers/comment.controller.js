import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const createComment = async (req,res)=>{

try{
if (!req.user?.id) {
return res.status(401).json({ message: "Authentication required" });
}

const newComment = new Comment({
content: req.body.content,
postId: req.body.postId,
userId: req.user.id
});
if (!req.body.content?.trim()) {
return res.status(400).json({ message: "Comment content is required" });
}

const postExists = await Post.exists({ _id: req.body.postId });
if (!postExists) {
return res.status(404).json({ message: "Post not found" });
}

const savedComment = await newComment.save();
const populated = await savedComment.populate("userId", "username");

res.status(201).json({
...populated.toObject(),
authorName: populated.userId?.username || "Unknown"
});

}catch(error){

res.status(500).json({ message: error.message });

}

};

export const deleteComment = async (req, res) => {
try {
if (!req.user?.id) {
return res.status(401).json({ message: "Authentication required" });
}

const comment = await Comment.findById(req.params.commentId);
if (!comment) {
return res.status(404).json({ message: "Comment not found" });
}

if (String(comment.userId) !== String(req.user.id)) {
return res.status(403).json({ message: "You can only delete your own comment" });
}

await Comment.findByIdAndDelete(req.params.commentId);
res.status(200).json({ message: "Comment deleted" });
} catch (error) {
res.status(500).json({ message: error.message });
}
};

export const getComments = async (req,res)=>{

try{

const comments = await Comment.find({

postId:req.params.postId

})
.sort({createdAt:-1})
.populate("userId", "username")
.lean();

res.status(200).json(
comments.map((comment) => ({
...comment,
authorName: comment.userId?.username || "Unknown"
}))
);

}catch(error){

res.status(500).json({ message: error.message });

}

};