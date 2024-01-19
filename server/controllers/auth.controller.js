import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";


export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password || username.length === "" || email.length === "" || password.length === ""){
        return res.status(400).json({message: "all fields required!"});
    }

    const existingUsername = await User.findOne({username});
    const existingUser = await User.findOne({email});

    if(existingUsername){
        return res.status(400).json({message : "username already exists in our database!"});
    }

    if(existingUser){
        return res.status(400).json({message : "email already exists in our database!"});
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
        res.status(500).json({message:error.message});
    }
}