/* eslint-disable react/prop-types */


import { Link } from "react-router-dom";

function PostCard({post}) {
  return (
    <div className="group relative  dark:bg-[#0d2136] border-gray-500 h-[400px] pb-5 rounded-lg shadow-lg w-full sm:w-[380px] overflow-hidden">
    <Link to={`/post/${post.slug}`}>
    <img loading="lazy" src={post?.image} alt="post-image" 
    className="h-[260px] w-full  rounded-md object-cover pb-2 
      group-hover:h-[220px] transition-all duration-300" />
      </Link>
    <div className="flex flex-col p-3 justify-center gap-2">
      <h5 className="line-clamp-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
        {post.title}
      </h5>
      <p className="font-normal flex justify-between text-gray-700 p-2 dark:text-gray-400 pt-2">
        <span> #{post?.category}</span>
        <span> {new Date(post?.createdAt).toLocaleDateString()}</span>
       
      </p>
      <Link to={`/post/${post.slug}`} 
      className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 py-2 bg-teal-700 hover:bg-teal-500 rounded-md !rounded-t-none text-center transition-all duration-300 text-slate-200  m-2" 
      >
        read more
      </Link>
      </div>
    </div>
  );
}

export default PostCard;