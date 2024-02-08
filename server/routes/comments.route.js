import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createComment, deleteComment, editComment, getComments, likeComment } from '../controllers/comments.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createComment );
router.get('/getComments/:postId', getComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId/:userId', verifyToken, deleteComment  );

export default router;

