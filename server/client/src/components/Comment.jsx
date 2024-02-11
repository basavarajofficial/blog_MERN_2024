/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import moment from 'moment';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useSelector} from 'react-redux';
import {Button,  Modal,  Textarea } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";


function Comment({comment,  likeCommentHandler, onEdit,  onDelete }) {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

     // * to delete post
     const [openModal, setOpenModal] = useState(false);
     const [commentIdToDelete, setCommentIdToDelete] = useState('');

    const {currentUser } = useSelector(state => state.user);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res =await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if(res.ok){
                    setUser(data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getUser();
    }, [comment]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    }

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method : 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body : JSON.stringify({
                    content : editedContent,
                }),
            });

            if(res.ok){
                onEdit(comment, editedContent);
                setIsEditing(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteCommentHandle = async () => {
        if(!currentUser){
            return;
        }
        try {
            const res = await fetch(`http://localhost:5173/api/comment/deleteComment/${comment._id}`,{
                method: 'DELETE'
            });
            if(res.ok){
                onDelete(commentIdToDelete)
                setOpenModal(false)
            }

       } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className=" flex w-full gap-4 mt-4">
        <div>
            <img src={user.profilePicture} alt="" className="sm:min-w-8 sm:min-h-8 max-w-5 rounded-full" />
        </div>
        <div className="flex flex-col gap-1 ">
            <div className="flex gap-2">
                <span className="font-semibold">@{user.username}</span>
                <span className="text-sm items-center">{ moment(comment.createdAt).fromNow() }</span>
            </div>

           { isEditing ? (
            <div className="w-96">
              <Textarea 
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className='mb-2' placeholder='add your comment...'
               />
              <div className='w-full flex justify-between my-5 items-center'>
                  <p className='mx-5'>{comment.content.length}/200</p>
                  <div className="flex gap-2">
                    <Button type='button' className='rounded-full' onClick={() => setIsEditing(false)}>cancel</Button>
                    <Button type='submit' className='rounded-full' onClick={handleSave}>save</Button>
                  </div>
              </div>
              </div>
           ) : (
            <>
             <p className="text-gray-500 dark:text-slate-400">{comment.content}</p>
            <div className="flex items-center align-middle mt-2 mb-5 gap-2">
                <button type="button" onClick={() => likeCommentHandler(comment._id)}>
                    {/* <AiOutlineLike className={`hover:text-blue-500  */}
                    {currentUser && comment?.likes?.includes(currentUser?._id) ?  <AiFillLike className="text-blue-500"  /> : <AiOutlineLike className="hover:text-blue-500" /> }
                </button>
                <span>{comment.likesCount}</span>
            
            {
             currentUser && (comment.userId === currentUser?._id || currentUser.isAdmin ) &&  
                <div className="flex gap-1">
                    <button className="text-xs border w-fit border-blue-300 rounded-full px-1 cursor-pointer" onClick={handleEdit} >Edit</button>
                    <button className="text-xs border w-fit border-blue-300 rounded-full px-1 cursor-pointer" onClick={() => {
                        setOpenModal(true)
                        setCommentIdToDelete(comment._id)
                    }} >Delete</button>
                </div>
            }
            </div>
            </>
           ) }
        </div>

        {/** delete comment */  }
        {/*  modal for delete user */}
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteCommentHandle}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  )
}

export default Comment;