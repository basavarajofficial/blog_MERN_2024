import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import { useSelector} from 'react-redux';
import { HiPencil } from 'react-icons/hi';



function PostPage() {
    const { postSlug } = useParams();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(false);
    const [post, setPost] = useState(null);

    const { currentUser } = useSelector(state => state.user);

    // if(currentUser.isAdmin && post?.userId === currentUser._id){
    //     console.log(currentUser);
    //     console.log(post);
    // }



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
                setPost(data.posts[0]);
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

    
    if(loading) return (
        <div className='flex justify-center items-center min-h-screen'>
             <Spinner size='xl' /> Loading...
        </div>
    )

  return (
    <main className='min-h-screen max-w-5xl flex p-3 flex-col mx-auto'>

        { currentUser && currentUser?.isAdmin && (
            <Link to={`/update-post/${post?._id}`}>
                <Button className='rounded-full w-10 h-10 absolute top-15 right-5 ' ><HiPencil className=' md:text-xl' /></Button>
            </Link>
        )}

        <div className='head-section px-2'>
            <h1 className='md:text-5xl sm:text-5xl text-4xl font-semibold flex items-start py-6'>{post?.title}</h1>
            <p className='font-bold'>~ {new Date(post?.createdAt).toLocaleDateString()}</p>
            <div className='flex align-middle justify-between'>
                <Link to={`/search?catagory=${post?.catagory}`}  >
                    <Button pill size='xs' color='success' className='self-center mt-4' >#{post?.catagory}</Button>
                </Link>
                <span  className='float-end text-sm bg-[#96f9e8] p-2 dark:text-slate-700 rounded-full font-semibold mb-3'>{(post?.content.length / 1000).toFixed(0)} min read</span>
            </div>
        </div>
        <div className="image-section my-6" >
            <img src={post?.image} loading='lazy'  className='w-full max-h-[500px] object-cover rounded-xl' />
        </div>
        <div className='p-2 max-w-3xl mx-auto'>
            <div className='post-content  flex flex-col' dangerouslySetInnerHTML={{__html : post?.content}}>

            </div>
        </div>
    </main>
    
  )
}

export default PostPage