import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		title: {
			type: String,
			max: 100,
			required: true,
		},
		movieId: {
			type: String,
			required: true,
		},
		overview: {
			type: String,
			max: 500,
      required: true,
		},
		poster_path: {
			type: String,
      required: true,
		},
		release_date: {
			type: String,
      required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
    reviews: {
			type: String,
			max: 500,
			required: true,
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment",
				required: true,
			},
		],
		likes: [
			{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
				required: true,
			},
		],
	},
	{
		timestamps: true,
	}
);

const Post = mongoose.model("Post", PostSchema);

export default Post;