import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
		postId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
    likes: {
      type: Number,
      default: 0,
    },
	},
	{
		timestamps: true,
	}
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
