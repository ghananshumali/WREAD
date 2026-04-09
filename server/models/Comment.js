import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({

content:{
type:String,
required:true
},

postId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Post",
required:true
},

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
}

},{timestamps:true});

commentSchema.index({ postId: 1, createdAt: -1 });

export default mongoose.model("Comment",commentSchema);