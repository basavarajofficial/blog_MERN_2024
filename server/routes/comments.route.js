import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createComment, getComments } from '../controllers/comments.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createComment );
router.get('/getComments/:postId', getComments);

export default router;