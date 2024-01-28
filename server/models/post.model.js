import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    slug : {
        type : String,
        required : true,
        unique : true
    },
    image : {
        type : String,
        default : "https://img.freepik.com/free-photo/online-blog_53876-123696.jpg?size=626&ext=jpg&ga=GA1.1.946239694.1706313600&semt=ais"
    },
    catagory : {
        type : String,
        default : 'uncategorized'
    }
}, {timestamps : true});

const Post = mongoose.model('Post', postSchema);
export default Post;