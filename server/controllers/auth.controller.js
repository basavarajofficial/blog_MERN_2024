import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";


export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password || username.length === "" || email.length === "" || password.length === ""){
        next(errorHandler(400, "All fields are required!"));
    }

    const existingUsername = await User.findOne({username});
    const existingUser = await User.findOne({email});

    if(existingUsername){
        next(errorHandler(400, "username already exists in our database!"));
    }

    if(existingUser){
        next(errorHandler(400, "email already exists in our database!"));
    }
    

    
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password : hashedPassword,
    });
    try {
        await newUser.save();
        res.status(200).json({message: "signup successfully!"});
    } catch (error) {
        next(error)
    }
}