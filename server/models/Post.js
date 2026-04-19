import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },
    subtitle: {
        type: String,
        default: ""
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },

    category:{
        type:String,
        default:"general"
    },

    image:{
        type:String,
        default:""
    },

    slug:{
        type:String,
        unique:true
    },

    coverImage:{
        type:String,
        default:""
    },
    tags: {
        type: [String],
        default: []
    },
    readingTime: {
        type: Number,
        default: 1
    },
    views: {
        type: Number,
        default: 0
    },

    likes:{
        type:[String],
        default:[]
    }

},{timestamps:true});

postSchema.index({ createdAt: -1 });
postSchema.index({ tags: 1 });
postSchema.index({ title: "text", subtitle: "text", content: "text", tags: "text" });

export default mongoose.model("Post",postSchema);