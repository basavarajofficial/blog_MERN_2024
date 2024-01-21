import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    profilePicture : {
        type : String,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Dprofile&psig=AOvVaw0xy3vO4nC10ud2yXgAmYxl&ust=1705911762734000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOj0n9qG7oMDFQAAAAAdAAAAABAD"
    }
    },
    {timestamps: true}
);
const User = mongoose.model('User', userSchema);
export default User;