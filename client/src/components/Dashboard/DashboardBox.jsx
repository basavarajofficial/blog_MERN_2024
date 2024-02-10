import { useEffect, useState } from 'react';
import { HiArrowNarrowUp, HiChatAlt2, HiDocument, HiDocumentAdd, HiDocumentDuplicate, HiUserGroup } from 'react-icons/hi';
import { Button } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
function DashboardBox() {
    const { currentUser }= useSelector(state => state.user);

   const [users, setUsers] = useState([]);
   console.log(users);
   const [comments, setComments] = useState([]);
   const [posts, setPosts] = useState([]);
   const [totalUsers, setTotalUsers] = useState(0);
   const [totalComments, setTotalComments] = useState(0);
   const [totalPosts, setTotalPosts] = useState(0);
   const [lastMonthUsers, setLastMonthUsers] = useState(0)
   const [lastMonthPosts, setLastMonthPosts] = useState(0)
   const [lastMonthComments, setLastMonthComments]= useState(0);

   useEffect(() => {
    const fetchUsers = async() => {
     try {
       const res = await fetch('/api/user/getusers?limit=6');
       if(res.ok){
         const data = await res.json();
         setUsers(data.usersWithoutPassword);
         setTotalUsers(data.totalUsers);
         setLastMonthUsers(data.lastMonthUsers);
       }
     } catch (error) {
      console.log(error);
     }
    }
    const fetchPosts = async() => {
      try {
        const res = await fetch(`/api/post/getPosts?limit=6`);
        if(res.ok){
          const data = await res.json();
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
       console.log(error);
      }
    }
    const fetchComments = async() => {
      try {
        const res = await fetch('/api/comment/getAllComments');
        if(res.ok){
          const data = await res.json();
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
       console.log(error);
      }
    }
    if(currentUser.isAdmin){
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
   }, [currentUser]);

    if(!currentUser.isAdmin) return;

  return (
    <div className='p-3 flex flex-col items-center justify-center'>

      <div className='flex gap-5 flex-wrap justify-center items-center p-4  mt-10'>

      <Link to={'/dashboard?tab=users'}>
      <div className='w-96 sm:max-w-96  shadow-lg dark:bg-teal-300 dark:text-slate-800 flex border justify-between p-6 text-lg rounded-md'>
        <div className='flex flex-col gap-2'>
          <h3>TOTAL USERS</h3>
          <p className='text-2xl px-4'>{totalUsers}</p>
          <p className='text-sm font-semibold flex justify-start items-center gap-1'> {lastMonthUsers > 0 &&   <HiArrowNarrowUp /> } {lastMonthUsers} Last month</p>
        </div>
        <HiUserGroup className='w-14 h-14 p-3 border-2 text-slate-100 bg-teal-600 rounded-full' />
      </div>
      </Link>

      <Link to={'/dashboard?tab=posts'}>
      <div className='w-96 sm:max-w-96  shadow-lg dark:bg-teal-300 dark:text-slate-800 flex border justify-between p-6 text-lg rounded-md'>
        <div className='flex flex-col gap-2'>
          <h3>TOTAL POSTS</h3>
          <p className='text-2xl px-4'>{totalPosts}</p>
          <p className='text-sm font-semibold flex justify-start items-center gap-1'> {lastMonthPosts > 0 && <HiArrowNarrowUp />}  {lastMonthPosts} Last month</p>
        </div>
        <HiDocumentDuplicate className='w-14 h-14 p-3 border-2 text-slate-100 bg-blue-600 rounded-full' />
      </div>
      </Link>

      <Link to={'/dashboard?tab=comments'}>
      <div className='w-96 sm:max-w-96  shadow-lg dark:bg-teal-300 dark:text-slate-800 flex border justify-between p-6 text-lg rounded-md'>
        <div className='flex flex-col gap-2'>
          <h3>TOTAL COMMENTS</h3>
          <p className='text-2xl px-4'>{totalComments}</p>
          <p className='text-sm font-semibold flex justify-start items-center gap-1'> {lastMonthComments > 0 && <HiArrowNarrowUp /> }  {lastMonthComments} Last month</p>
        </div>
        <HiChatAlt2 className='w-14 h-14 p-3 border-2 text-slate-100 bg-green-500 rounded-full' />
      </div>
      </Link>
      
      </div>


      <div  className='flex flex-wrap gap-4 my-12 justify-center w-full'>

      <div className='dark:bg-teal-300 bg-gray-200 text-gray-800 inline  rounded-lg p-4 w-full sm:max-w-96 h-fit shadow-lg'>
        <div className='flex justify-between items-center w-full'>
          <p className='text-lg font-semibold'>Recent users</p>
        <Link to={'/dashboard?tab=users'}>
          <Button className='mx-auto my-5'>See all</Button>
        </Link>
        </div>
        {
          users && users.length > 0 && 
          users.map((user) => 
            <div key={user._id} className='flex my-4 '>
              <div className='flex gap-2'>
              <img src={user.profilePicture} alt="profile" className='w-14 h-14 rounded-full' />
              <div>
               <p className='text-lg font-semibold'> {user.username}</p>
               <p> {user.email}</p>
              </div>
              </div>
            </div>
          )
        }
       
      </div>

      
      <div className='dark:bg-teal-300 bg-gray-200 text-gray-800  rounded-lg p-4 h-fit w-full sm:max-w-[700px] shadow-lg'>
      <div className='flex justify-between items-center w-full'>
          <p className='text-lg font-semibold'>Recent Comments</p>
        <Link to={'/dashboard?tab=comments'}>
          <Button className='mx-auto my-5'>See all</Button>
        </Link>
        </div>
        <div className='flex gap-2 justify-between font-semibold w-full px-4'>
        <h1>COMMENT CONTENT</h1>  
        <h1>LIKES</h1>  
        </div>
        {
          comments && comments.length > 0 && 
          comments.map((comment) => 
            <div key={comment._id} className='flex my-4  '>
              
                <div className='flex gap-2 justify-between w-full px-4'>
                  <p className='line-clamp-2'>{comment.content}</p>
                  <p className='text-lg mr-7'> {comment?.likesCount}</p>
                </div>
              
            </div>
          )
        }
        
      </div>

      <div className='dark:bg-teal-300 bg-gray-200 text-gray-800  rounded-lg p-4 h-fit w-full sm:max-w-[700px] shadow-lg'>
      <div className='flex justify-between items-center w-full'>
          <p className='text-lg font-semibold'>Recent users</p>
        <Link to={'/dashboard?tab=posts'}>
          <Button className='mx-auto my-5'>See all</Button>
        </Link>
        </div>
        {
          posts && posts.length > 0 && 
          posts.map((post) => 
            <div key={post._id} className='flex my-4 '>
              <Link to={`/post/${post.slug}`}>
                <div className='flex gap-2'>
                  <img src={post?.image} alt="profile" className='max-w-28 max-h-16 min-w-24 min-h-12 rounded-md object-cover' />
                <div>
                  <p className='text-lg line-clamp-2'> {post?.title}</p>
                  <p className='font-serif'> #{post?.catagory}</p>
                </div>
                </div>
              </Link>
            </div>
          )
        }
        
      </div>


     

      </div>
    </div>
  )
}

export default DashboardBox
