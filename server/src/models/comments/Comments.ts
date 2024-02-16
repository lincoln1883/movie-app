import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
		movieId: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
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
