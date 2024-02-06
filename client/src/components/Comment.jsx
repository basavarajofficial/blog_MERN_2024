/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import moment from 'moment';

function Comment({comment, currentUser }) {
    const [user, setUser] = useState({})

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
    }, [comment])
  return (
    <div className=" flex gap-4 mt-4">
        <div>
            <img src={user.profilePicture} alt="" className="sm:min-w-8 sm:min-h-8 max-w-5 rounded-full" />
        </div>
        <div className="flex flex-col gap-1 ">
            <div className="flex gap-2">
                <span className="font-semibold">@{user.username}</span>
                <span className="text-sm items-center">{ moment(comment.createdAt).fromNow() }</span>
            </div>
            <p className="text-gray-400">{comment.content}</p>
            <div>
            {comment.userId === currentUser?._id &&  
                <div className="flex gap-1 mt-2 mb-5">
                    <span className="text-sm border w-fit border-blue-300 rounded-full p-1 px-2 cursor-pointer" >Edit</span>
                    <span className="text-sm border w-fit border-blue-300 rounded-full p-1 px-2 cursor-pointer" >Delete</span>
                </div>
            }
            </div>
           
        </div>

    </div>
  )
}

export default Comment;