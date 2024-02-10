import Comment from "../models/comments.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
    try {
        const { content, userId, postId} = req.body;
        if(userId !== req.user.id){
            return next(errorHandler(403, "Not Allowed!!"));
        }

        const newComment = new Comment({
            content,
            userId,
            postId
        })
        await newComment.save();
        res.status(200).json(newComment);
    } catch (error) {
        next(error);
    }
      
}

export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({postId :  req.params.postId}).sort({createdAt : -1});
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
}


export const likeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(403, "Comment not found"));
        }
        const userIndex = comment.likes.indexOf(req.user.id);
        if(userIndex === -1){
            comment.likesCount += 1;
            comment.likes.push(req.user.id);
        }else{
            comment.likesCount -= 1;
            comment.likes.splice(userIndex, 1);
        }

        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
}

export const editComment =  async(req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(403, "Comment not found"));
        }
        if(comment.userId !== req.user.id && !req.user.isAdmin){
            return next(errorHandler(403, "You do not have permission to edit this comment"));
        }

        const editedComment = await Comment.findByIdAndUpdate(req.params.commentId, {
            content : req.body.content,
        }, { new : true});

        res.status(200).json(editedComment);
    } catch (error) {
        next(error)
    }
}


export const deleteComment = async (req, res, next) => {
    
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(403, "Comment not found"));
        }
        const { commentId } = req.params;
        if( comment.userId !== req.user.id && !req.user.isAdmin ){
            return next(errorHandler(403, "Not authorized to delete"));
        }
        
        await Comment.findByIdAndDelete(commentId);
        res.status(200).json("Comment deleted!");
        
    } catch (error) {
        next(error);
    }
}


//** get all comments to show in admin dashboard */


export const getAllComments = async (req, res, next) => {
    if(!req.user.isAdmin){
        next(errorHandler(403, "You do not have admin access"));
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const comments = await Comment.find()
        .sort({createdAt: sortDirection})
        .skip(startIndex)
        .limit(limit);

        const totalComments = await Comment.countDocuments();

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthComments = await Comment.countDocuments({
            createdAt : { $gt : oneMonthAgo },
        })

        // const usersWithoutPassword = users.map((user) => {
        //     const { password , ...rest } = user._doc;
        //     return rest;
        // })

        res.status(200).json({
            comments,
            totalComments,
            lastMonthComments
        });
    } catch (error) {
        next(error);
    }
}