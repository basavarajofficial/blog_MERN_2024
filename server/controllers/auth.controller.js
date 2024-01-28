import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
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
    
    if( !email || !password || email.length === "" || password.length === ""){
        next(errorHandler(400, "All fields are required!"));
    }
    
    try {
    const user = await User.findOne({email});
    if(!user){
        return next(errorHandler(400, "email not registered!"));
    }
    
    const matchPassword = await bcryptjs.compare(password, user.password);

    if(!matchPassword){
        return next(errorHandler(400, "password is incorrect!"));
    }

    const token = jwt.sign({id : user._id}, process.env.SECRET_KEY);

    const {password : pass, ...rest} = user._doc;

    res.status(200).cookie("access_token", token, {
        httpOnly :true,
    }).json(rest);

    // next(successHandler(200, "signin successful!"));
    } catch (error) {
        next(error);
    }
}



export const google = async(req, res, next) => {
    const {name, email, googlePhotoURL} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id : user._id}, process.env.SECRET_KEY);

            const {password : pass, ...rest} = user._doc;
            res.status(200).cookie("access_token", token, {
                httpOnly :true,
            }).json(rest);
        }else{
            const generatedPassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);
            
            const hashedPassword = await bcryptjs.hash(generatedPassword, 10);

            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') +
                            Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoURL,
              });
            await newUser.save();
            const token = jwt.sign({id : newUser._id}, process.env.SECRET_KEY);

            const {password : pass, ...rest} = newUser._doc;
            res.status(200).cookie("access_token", token, {
                httpOnly :true,
            }).json(rest);
        }

    } catch (error) {
        next(error)
    }
}



