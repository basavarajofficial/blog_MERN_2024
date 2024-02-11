import { useEffect, useState } from "react"
import { HiArrowSmRight } from "react-icons/hi"
import { Link } from "react-router-dom"
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async() => {
      try {
        const res = await fetch(`/api/post/getPosts?limit=9`);
        if(res.ok){
          const data = await res.json();
          setPosts(data.posts);
        }

        
      } catch (error) {
       console.log(error);
      }
    }
    fetchPosts();
  }, []);


  return (
    
    <div className="max-w-7xl flex flex-col justify-center items-center mx-auto">
      <div className="bg-[#3f75ff] dark:bg-gray-600 text-slate-200 m-4 rounded-lg lg:p-28 p-4 sm:p-10 shadow-lg mb-10 mt-20">
        <h1 className="text-3xl lg:text-6xl font-semibold uppercase">Welcome to my blog</h1>
        <p className="text-gray-200 text-xs sm:text-lg py-4">Here you will find a veriety of articles and contents such as web development, software engineering and programming languages</p>
        <Link to={'/search'} className="group flex justify-center py-4 dark:text-teal-400 w-fit text-lg" >
          <span className="flex justify-center items-center gap-1"> View all Posts <HiArrowSmRight className="group-hover:pl-3 w-fit transition-all duration-300" /></span>
        </Link>
      </div>

      <div className='flex flex-col justify-center items-center mb-5 p-4'>
            <h1 className='text-2xl w-full text-center my-10 font-semibold'>Recent articles</h1>
            <div className='flex flex-wrap mb-8 gap-5 gap-y-8 justify-center'>
            {   posts.length > 0 ?
                posts?.map((post) => <PostCard key={post._id} post={post} /> )

                : <h1>No Posts Added</h1>
            }
            </div>

            {posts.length === 9 && (
            <Link to={'/search'} className="group flex justify-center py-2 px-4 dark:bg-gray-600 dark:text-teal-400 w-fit mt-10 mb-12 bg-[#3f75ff] rounded-full text-slate-100" >
              <span className="flex justify-center items-center gap-1"> View all Posts <HiArrowSmRight className="group-hover:pl-3 w-fit transition-all duration-300" /></span>
            </Link>
            )}
        </div>

    </div>
  )
}

export default Home