import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        default: 'https://cdn.mos.cms.futurecdn.net/RNrVwVfRiyoKkrr8djHvf9-1200-80.jpg',
    },
    category: {
        type: String,
        default: 'uncategorized',
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    }, { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;