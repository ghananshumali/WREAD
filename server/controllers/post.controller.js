import Post from "../models/Post.js";
import User from "../models/User.js";
import { getReadingTime } from "../utils/readingTime.js";
import Comment from "../models/Comment.js";

const sanitizeTags = (tags = []) =>
    Array.isArray(tags)
        ? tags
            .map((tag) => String(tag).trim())
            .filter(Boolean)
            .slice(0, 10)
        : [];

const generateSlug = (title = "") => {
    const baseSlug = String(title)
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    const uniqueSuffix = Date.now().toString().slice(-6);
    return `${baseSlug || "post"}-${uniqueSuffix}`;
};

const buildPostPayload = (post) => {
    const likesCount = post.likes?.length || 0;
    const trendingScore = likesCount * 3 + (post.views || 0);
    return {
        ...post,
        likesCount,
        trendingScore
    };
};

const ensureOwnership = (resourceUserId, requesterId) =>
    String(resourceUserId) === String(requesterId);

export const createPost = async (req,res)=>{

    try{
        if (!req.user?.id) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const slug = generateSlug(req.body.title);

        const newPost = new Post({

            ...req.body,
            userId: req.user.id,
            tags: sanitizeTags(req.body.tags),
            readingTime: getReadingTime(req.body.content),

            slug

        });

        const savedPost = await newPost.save();
        const populated = await savedPost.populate("userId", "username profilePicture bio followers following");

        res.status(201).json(buildPostPayload({
            ...populated.toObject(),
            author: populated.userId
        }));

    }catch(error){

        res.status(500).json({ message: error.message });

    }

};



export const getPosts = async (req,res)=>{

try{
const page = Math.max(Number(req.query.page) || 1, 1);
const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
const skip = (page - 1) * limit;
const tag = req.query.tag;
const trending = req.query.trending === "true";
const filters = tag ? { tags: tag } : {};

const sort = trending ? { likes: -1, createdAt: -1 } : { createdAt: -1 };
const [rawPosts, total] = await Promise.all([
Post.find(filters)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("userId", "username profilePicture bio followers following")
    .lean(),
Post.countDocuments(filters)
]);

let enriched = rawPosts.map((post) =>
    buildPostPayload({
        ...post,
        author: post.userId
    })
);
if (trending) {
    enriched = enriched.sort((a, b) => b.trendingScore - a.trendingScore);
}

res.status(200).json({
    posts: enriched,
    pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
    }
});

}catch(error){

res.status(500).json({ message: error.message });

}

};



export const getPost = async (req,res)=>{

try{

const post = await Post.findByIdAndUpdate(
    req.params.postId,
    { $inc: { views: 1 } },
    { new: true }
).populate("userId", "username profilePicture bio followers following");

if (!post) {
    return res.status(404).json({ message: "Post not found" });
}

res.status(200).json({

...buildPostPayload(post.toObject()),
author: post.userId

});

}catch(error){

res.status(500).json({ message: error.message });

}

};

export const getPostBySlug = async (req, res) => {
try {
const post = await Post.findOneAndUpdate(
    { slug: req.params.slug },
    { $inc: { views: 1 } },
    { new: true }
).populate("userId", "username profilePicture bio followers following");

if (!post) {
    return res.status(404).json({ message: "Post not found" });
}

res.status(200).json({
    ...buildPostPayload(post.toObject()),
    author: post.userId
});
} catch (error) {
res.status(500).json({ message: error.message });
}
};



export const deletePost = async (req,res)=>{

    try{
        if (!req.user?.id) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (!ensureOwnership(post.userId, req.user.id)) {
            return res.status(403).json({ message: "You can only delete your own posts" });
        }

        await Post.findByIdAndDelete(req.params.postId);

        res.status(200).json({ message: "Post deleted" });

    }catch(error){

        res.status(500).json({ message: error.message });

    }

};

export const getUserPosts = async (req,res)=>{

try{

const posts = await Post.find({

userId:req.params.userId

})
    .sort({createdAt:-1})
    .populate("userId", "username profilePicture bio followers following")
    .lean();

res.status(200).json(posts.map((post) => ({
    ...buildPostPayload(post),
    author: post.userId
})));

}catch(error){

res.status(500).json({ message: error.message });

}

};

export const likePost = async (req,res)=>{

try{
if (!req.user?.id) {
    return res.status(401).json({ message: "Authentication required" });
}

const post = await Post.findById(req.params.postId);
if (!post) {
    return res.status(404).json({ message: "Post not found" });
}

if(!post.likes.includes(req.user.id)){

post.likes.push(req.user.id);

}else{

post.likes = post.likes.filter(

id => String(id) !== String(req.user.id)

);

}

await post.save();

res.status(200).json(post.likes);

}catch(error){

res.status(500).json({ message: error.message });

}

};

export const searchPosts = async (req,res)=>{

try{

const query = req.query.q;
if (!query) {
    return res.status(200).json([]);
}

const matchedAuthors = await User.find({
    username: { $regex: query, $options: "i" }
}).select("_id");

const posts = await Post.find({
$or:[
{ title:{ $regex:query,$options:"i" } },
{ subtitle:{ $regex:query,$options:"i" } },
{ tags:{ $regex:query,$options:"i" } },
{ content:{ $regex:query,$options:"i" } },
{ userId: { $in: matchedAuthors.map((author) => author._id) } }
]
})
    .sort({ createdAt: -1 })
    .limit(25)
    .populate("userId", "username profilePicture bio followers following")
    .lean();

res.status(200).json(posts.map((post) => ({
    ...buildPostPayload(post),
    author: post.userId
})));

}catch(error){

res.status(500).json({ message: error.message });

}

};

export const updatePost = async (req,res)=>{

    try{
        if (!req.user?.id) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const existingPost = await Post.findById(req.params.postId);
        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (!ensureOwnership(existingPost.userId, req.user.id)) {
            return res.status(403).json({ message: "You can only edit your own posts" });
        }

        const payload = {};
        if (typeof req.body.title === "string") payload.title = req.body.title.trim();
        if (typeof req.body.subtitle === "string") payload.subtitle = req.body.subtitle;
        if (typeof req.body.content === "string") payload.content = req.body.content;
        if (typeof req.body.category === "string") payload.category = req.body.category;
        if (typeof req.body.coverImage === "string") payload.coverImage = req.body.coverImage;
        if (typeof req.body.image === "string") payload.image = req.body.image;
        if (Array.isArray(req.body.tags)) payload.tags = sanitizeTags(req.body.tags);

        payload.readingTime = getReadingTime(payload.content || existingPost.content);

        const updatedPost = await Post.findByIdAndUpdate(

            req.params.postId,

            {
                $set:payload
            },

            {
                new:true
            }

        );

        const populated = await updatedPost.populate("userId", "username profilePicture bio followers following");
        res.status(200).json({
            ...buildPostPayload(populated.toObject()),
            author: populated.userId
        });

    }catch(error){

        res.status(500).json({ message: error.message });

    }

};

export const getTrendingPosts = async (req, res) => {
    try {
        const limit = Math.min(Math.max(Number(req.query.limit) || 5, 1), 20);
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate("userId", "username profilePicture bio followers following")
            .lean();

        const rankedPosts = posts
            .map((post) => ({
                ...post,
                trendingScore: (post.likes?.length || 0) * 3 + (post.views || 0)
            }))
            .sort((a, b) => b.trendingScore - a.trendingScore)
            .slice(0, limit);

        res.status(200).json(
            rankedPosts.map((post) => ({
                ...buildPostPayload(post),
                author: post.userId
            }))
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSavedPosts = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select("bookmarks");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const posts = await Post.find({ _id: { $in: user.bookmarks } })
            .sort({ createdAt: -1 })
            .populate("userId", "username profilePicture bio followers following")
            .lean();

        res.status(200).json(
            posts.map((post) => ({
                ...buildPostPayload(post),
                author: post.userId
            }))
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAuthorStats = async (req,res)=>{

try{

const posts = await Post.find({
userId:req.params.userId
});

const totalLikes = posts.reduce(
(sum,p)=>sum+(p.likes?.length || 0),
0
);

const totalViews = posts.reduce(
(sum,p)=>sum+(p.views || 0),
0
);

const commentsCount = await Comment.countDocuments({
postId:{ $in: posts.map(p=>p._id) }
});

res.status(200).json({

posts:posts.length,
likes:totalLikes,
views:totalViews,
comments:commentsCount

});

}catch(error){

console.log(error);

res.status(500).json({
message:"Error fetching stats"
});

}

};
export const getFollowingPosts = async (req,res)=>{

try{

const user = await User.findById(req.params.userId);

const posts = await Post.find({

userId:{ $in:user.following }

})

.sort({createdAt:-1});

res.status(200).json(posts);

}catch(error){

res.status(500).json(error.message);

}

};

