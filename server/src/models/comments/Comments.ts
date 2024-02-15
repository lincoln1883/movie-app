import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    comment: {
        type: String,        
        required: true
    }
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
