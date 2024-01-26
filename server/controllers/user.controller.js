import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";


export const updateUser = async (req, res, next) => {
    // req.user -> id from cookie
    // we need check with id of user -> req.params
    const { userId } = req.params;

    
    if(req.user.id !== userId) {
        return next(errorHandler(403, "you are not allowed to modify this user!"));
    }

    const exixtingUser = await User.findOne({_id : userId});

    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(400, "Password must be at least 6 characters"));
        }

        req.body.password = await bcryptjs.hash(req.body.password, 10);
        const usedPassowrd = await bcryptjs.compare(req.body.password, exixtingUser.password);
        if(usedPassowrd){
            return next(errorHandler(400, "Password has not been changed"));
        }
    }

    if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 20){
            return next(errorHandler(400, "username must be between 7 and 20 characters"));
        }
        if(req.body.username.includes(" ")){
            return next(errorHandler(400, "username cannot contain spaces"));
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(400, "username must be lowercase"));
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400, "username can only contain letters and numbers"));
        }
        if(req.body.username == exixtingUser.username){
            return next(errorHandler(400, "Please enter a new username"));
        }
    }
        try {
            const updatedUser = await User.findByIdAndUpdate( req.user.id, {
                $set : {
                    email: req.body.email,
                    username : req.body.username,
                    password : req.body.password,
                    profilePicture : req.body.profilePicture,
                },
            }, { new : true});
    
            const {password, ... rest } = updatedUser._doc;
            res.status(200).json(rest);
        } catch (error) {
            next(error);
            console.log(error);
        }
    }