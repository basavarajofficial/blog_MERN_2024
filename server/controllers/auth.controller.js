import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler, successHandler } from "../utils/error.js";


export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password || username.length === "" 
            || email.length === "" || password.length === ""){
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
    
    
    const hashedPassword =  await bcryptjs.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password : hashedPassword,
    });
    try {
        await newUser.save();
        // res.status(200).json({message: "signup successfully!"});
        next(successHandler(200, "signup successfully!"));
    } catch (error) {
        next(error);
    }
}



//* sign-in

export const signin = async(req, res, next) => {
    const {email, password} = req.body;
    
    
    try {
        if( !email || !password || email.length === "" || password.length === ""){
            next(errorHandler(400, "All fields are required!"));
        }
    const user = await User.findOne({email});
    if(!user){
        next(errorHandler(400, "email not registered!"));
    }
    const matchPassword = await bcryptjs.compare(password, user.password);

    if(!matchPassword){
        next(errorHandler(400, "password is incorrect!"));
    }
    
    next(successHandler(200, "signin successful!"));
    } catch (error) {
        next(error);
    }
}