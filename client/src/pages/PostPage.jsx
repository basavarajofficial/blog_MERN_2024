import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'flowbite-react';


function PostPage() {
    const { postSlug } = useParams();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(false);
    const [post, setPost] = useState(null);

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
             <Spinner size='xl' />
        </div>
    )

  return (
    <div>
        {post?.title}
    </div>
  )
}

export default PostPage