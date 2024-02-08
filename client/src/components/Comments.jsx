/* eslint-disable react/prop-types */

import { useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Textarea } from 'flowbite-react'
import { useEffect, useState } from 'react';
import Comment from './Comment';

function Comments({postId}) {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const navigate = useNavigate();

    const {currentUser } = useSelector(state => state.user);

    useEffect(() => {
       const getComments = async () => {
        try {
            const res = await fetch(`/api/comment/getComments/${postId}`);
            if(res.ok){
                const data = await res.json();
                setComments(data);
            }
        } catch (error) {
            console.log(error.message);
        }
       }
       getComments();
    }, [postId]);

    const submitComment = async (e) => {
        e.preventDefault();
        
        try {
            const res = await  fetch('/api/comment/create' , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body : JSON.stringify({content : comment,postId, userId : currentUser._id,  })
            })
            const data = await res.json();
            
            if(res.ok){
                setComment("");
                setComments([data, ...comments]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const likeCommentHandler = async(commentId) => {
        try {
            if(!currentUser){
                navigate('/signin');
                return;
            }
            const res = await fetch(`/api/comment/likeComment/${commentId}`,{
                method : 'PUT'
            });
            
            if(res.ok){
                const data = await res.json();
                setComments(comments.map((comment) => 
                    comment._id === commentId ? {
                        ...comment,
                        likes : data.likes,
                        likesCount : data.likesCount
                    } : comment
                    )
                )
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }



    //* Edit Comment
    const editComment = async (comment, editedContent) => {
        setComments(
            comments.map((c) => 
                c._id === comment._id ? {...c, content : editedContent} : c 
            )
        );
    }



    //* delete comment
    const deleteComment = async (commentId) => {
        setComments(
            comments.filter((c) => c._id !== commentId)
        );
    }


  return (
    <div className='max-w-2xl mx-auto w-full  p-3'>
        {currentUser ? (
                <div className='w-full flex gap-2'>
                <span>Signed in as </span>
                <div className='flex'>
                    <img className='w-6 h-6 object-cover rounded-full' src={currentUser.profilePicture} alt="" />
                    <Link to={'/dashboard?tab=profile'}>
                        <span>@{currentUser.username}</span>
                    </Link>
                </div>
            </div>
            ) : (
                <div>
                    <p className='sm:text-lg text-sm font-semibold'>Want to share your thoughts on this?</p>
                    <Link to={'/signin'} className='hover:underline text-teal-500 dark:text-teal-300'>
                        click here to sign in
                    </Link>
                </div>
            )}

            <hr className='my-2' />
                {currentUser && (
            <form onSubmit={submitComment}
             className='border border-teal-400 rounded-lg p-2 mt-5' >
                <Textarea onChange={(e) => setComment(e.target.value)}
                value={comment}
                className='rounded-md' placeholder='add your comment...' maxLength='200' rows="3" 
                 />
                <div className='w-full flex justify-between my-5 items-center'>
                    <p className='mx-5'>{comment.length}/200</p>
                    <Button type='submit' disabled={!comment} className='rounded-full'>Comment</Button>
                </div>
            </form>
            )}
            {comments?.length === 0  ? (<p className='my-10'>No Comments yet!</p>) : (
                <>
                <div>
                    <p className='my-10 '>Comments : <span className='border border-gray-400 p-2 rounded-full'>{comments.length}</span></p>
                </div>
                {
                    comments.map((comment) => 
                        <Comment key={comment._id} comment={comment} onEdit={editComment} onDelete={deleteComment}  likeCommentHandler={likeCommentHandler} />
                    )
                }
                </>
            )}
    </div>
  )
}

export default Comments