import User from "../models/User.js";
import Post from "../models/Post.js";


// GET USER PROFILE

export const getUser = async (req,res)=>{

try{

const user = await User.findById(req.params.userId).select("-password").lean();
if (!user) {
return res.status(404).json({ message: "User not found" });
}

res.status(200).json(user);

}catch(error){

res.status(500).json({ message: error.message });

}

};

export const searchUsers = async (req,res)=>{

try{

const query = req.query.q || "";

const users = await User.find({

username:{ $regex:query, $options:"i" }

})

.select("username profilePicture bio followers following")

.limit(10);

res.status(200).json(users);

}catch(error){

res.status(500).json(error.message);

}

};

export const followUser = async (req,res)=>{

try{
if (!req.user?.id) {
return res.status(401).json({ message: "Authentication required" });
}

const targetUserId = req.params.id;
if (String(req.user.id) === String(targetUserId)) {
return res.status(400).json({ message: "Cannot follow yourself" });
}

const user = await User.findById(req.user.id);

const targetUser = await User.findById(targetUserId);
if (!user || !targetUser) {
return res.status(404).json({ message: "User not found" });
}


if(!targetUser.followers.some((id) => String(id) === String(req.user.id))){

targetUser.followers.push(req.user.id);

user.following.push(targetUserId);

}else{

targetUser.followers = targetUser.followers.filter(

id => String(id) !== String(req.user.id)

);

user.following = user.following.filter(

id => String(id) !== String(targetUserId)

);

}


await user.save();

await targetUser.save();

res.status(200).json({

followers:targetUser.followers.length,
isFollowing:targetUser.followers.some((id) => String(id) === String(req.user.id))

});

}catch(error){

res.status(500).json({ message: error.message });

}

};



// BOOKMARK POST

export const bookmarkPost = async (req,res)=>{

try{
if (!req.user?.id) {
return res.status(401).json({ message: "Authentication required" });
}

const user = await User.findById(req.user.id);
if (!user) {
return res.status(404).json({ message: "User not found" });
}

const postId = req.body.postId;
if (!postId) {
return res.status(400).json({ message: "postId is required" });
}

const postExists = await Post.exists({ _id: postId });
if (!postExists) {
return res.status(404).json({ message: "Post not found" });
}

if(!user.bookmarks.some((id) => String(id) === String(postId))){

user.bookmarks.push(postId);

}else{

user.bookmarks = user.bookmarks.filter(

id => String(id) !== String(postId)

);

}

await user.save();

res.status(200).json(user.bookmarks);

}catch(error){

res.status(500).json({ message: error.message });

}

};



// GET BOOKMARKED POSTS IDS

export const getBookmarks = async (req,res)=>{

try{

const user = await User.findById(req.params.userId).select("bookmarks");
if (!user) {
return res.status(404).json({ message: "User not found" });
}

res.status(200).json(user.bookmarks);

}catch(error){

res.status(500).json({ message: error.message });

}

};

export const updateProfile = async (req, res) => {
try {
if (!req.user?.id || String(req.user.id) !== String(req.params.userId)) {
return res.status(403).json({ message: "You can only edit your own profile" });
}

const payload = {
username: req.body.username,
bio: req.body.bio,
profilePicture: req.body.profilePicture
};

Object.keys(payload).forEach((key) => payload[key] === undefined && delete payload[key]);

const updated = await User.findByIdAndUpdate(
req.params.userId,
{ $set: payload },
{ new: true, runValidators: true }
).select("-password");

res.status(200).json(updated);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

export const getFollowers = async (req,res)=>{

try{

const user = await User.findById(req.params.userId)

.populate("followers","username profilePicture");

res.status(200).json(user.followers);

}catch(error){

res.status(500).json(error.message);

}

};


export const getFollowing = async (req,res)=>{

try{

const user = await User.findById(req.params.userId)

.populate("following","username profilePicture");

res.status(200).json(user.following);

}catch(error){

res.status(500).json(error.message);

}

};