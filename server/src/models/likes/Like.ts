import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  postId: {
    type: String,
    ref: "Post",
    required: true,
  },
},{
  timestamps: true,
});

const Like = mongoose.model("Like", LikeSchema);

export default Like;