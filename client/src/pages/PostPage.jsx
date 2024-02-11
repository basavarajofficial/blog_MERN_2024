import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import { useSelector} from 'react-redux';
import { HiArrowLeft, HiArrowSmRight, HiPencil } from 'react-icons/hi';
import Comments from '../components/Comments';
import PostCard from '../components/PostCard';




function PostPage() {
    const { postSlug } = useParams();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(false);
    const [post, setPost] = useState(null);
    const [recentPost, setRecentPost] = useState([]);


    const { currentUser } = useSelector(state => state.user);

    const navigate = useNavigate()


    useEffect(() => {
        const fetchPosts = async () => {
        try {
            setLoading(true);
            setErrors(null);

            const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
            const data = await res.json();
            if(!res.ok){
                setErrors(true);
                setLoading(false);
            }else{
                setPost(data?.posts[0]);
                setErrors(false);
                setLoading(false);
            }
        } catch (error) {
            setErrors(true);
            setLoading(false);
        }
    }
    fetchPosts();
    }, [postSlug]);

    useEffect(() => {
        try {
            const fetchRecentPosts = async () => {
                const res = await fetch(`/api/post/getposts?limit=3`);
                const data = await res.json();
                if(res.ok){
                    setRecentPost(data.posts);
                }
            }
            fetchRecentPosts()
        } catch (error) {
            console.log(error);
        }
    },[]);

    
    if(loading) return (
        <div className='flex justify-center items-center min-h-screen'>
             <Spinner size='xl' /> Loading...
        </div>
    )

  return (
    <>
    <main className='min-h-screen max-w-5xl flex p-3 flex-col mx-auto'>

        { currentUser && currentUser?.isAdmin && (
            <Link to={`/update-post/${post?._id}`}>
                <Button className='rounded-full md:w-10 md:h-10 w-7 h-7 absolute top-15 right-5 ' ><HiPencil className=' md:text-xl' /></Button>
            </Link>
        )}

        <button onClick={() => navigate("/")} className='dark:bg-gray-400 w-fit bg-blue-500 py-2 px-4 rounded-full hover:scale-110 text-slate-100 dark:text-slate-900 font-semibold mt-4'><HiArrowLeft /> </button>

        <div className='head-section px-2'>
            <h1 className='md:text-5xl sm:text-4xl text-3xl font-semibold flex items-start py-6'>{post?.title}</h1>
            <p className='font-bold'>- {new Date(post?.createdAt).toLocaleDateString()}</p> 
            <div className='flex align-middle justify-between'>
                <Link to={`/search?catagory=${post?.catagory}`}  >
                    <Button pill size='xs' color='success' className='self-center mt-4' >#{post?.category}</Button>
                </Link>
                <span  className='w-15 h-8 p-2 rounded-2xl text-center text-xs bg-[#96f9e8] text-slate-700 font-semibold'>{(post?.content.length / 1000).toFixed(0)} min read</span>
            </div>
        </div>
        <div className="image-section my-6" >
            <img src={post?.image} loading='lazy'  className='w-full max-h-[500px] object-cover rounded-xl' />
        </div>
        <hr/>
        <div className='p-2 max-w-3xl mx-auto'>
            <div className='post-content  flex flex-col' dangerouslySetInnerHTML={{__html : post?.content}}>

            </div>
        </div>
        <hr className='my-5' />
        <Comments postId={post?._id} />
        <hr className='my-5' />

        
        </main>
        <div className='flex flex-col justify-center items-center mb-5 p-4'>
            <h1 className='text-2xl w-full text-center my-10 font-semibold'>Recent articles</h1>
            <div className='flex flex-wrap gap-5 justify-center'>
            {
                recentPost && 
                recentPost.map((post) => <PostCard key={post._id} post={post} /> )
            }
            </div>
            <Link to={'/search'} className="group flex justify-center py-2 px-4 dark:bg-gray-600 dark:text-teal-400 w-fit mt-10 mb-12 bg-[#3f75ff] rounded-full text-slate-100" >
              <span className="flex justify-center items-center gap-1"> View all Posts <HiArrowSmRight className="group-hover:pl-3 w-fit transition-all duration-300" /></span>
            </Link>
        </div>
        </>
    
  )
}

export default PostPage