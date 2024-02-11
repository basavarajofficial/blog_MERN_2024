import { Select, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from '../components/PostCard';
import {  HiArrowLeft, HiPlus } from 'react-icons/hi';
function SearchPage() {
    const [sidebarData, setSidebarData ]= useState({
        searchTerm : "",
        sort : 'desc',
        category : "uncategorized",
    });

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromURL = urlParams.get("searchTerm");
        const sortFromUrl = urlParams.get("sort");
        const categoryFromUrl = urlParams.get("category");

      if(searchTermFromURL || sortFromUrl || categoryFromUrl){
        setSidebarData({
            ...sidebarData, 
            searchTerm : searchTermFromURL,
            sort : sortFromUrl,
            category : categoryFromUrl
        })
      }

      const fetchPosts = async () => {
        setLoading(true);
        const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getPosts?${searchQuery}`);
            if(res.ok){
                const data = await res.json();
                setPosts(data.posts)
                setLoading(false);
                if(data.posts.length === 9){
                    setShowMore(true);
                }else{
                    setShowMore(false);
                }
            }else{
                setLoading(false);
                return;
            }
        }

      fetchPosts();
    }, [location.search]);

    const handleChange = (e) => {
        if(e.target.id === 'searchTerm'){
            setSidebarData({...sidebarData, 
            searchTerm: e.target.value})
        }
        if(e.target.id === 'sort'){
            const order = e.target.value || 'desc';
            setSidebarData({...sidebarData, sort : order})
        }
        if(e.target.id === 'category'){
            const category = e.target.value || 'uncategorized';
            setSidebarData({...sidebarData, category});
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    const handleShowMore = async() => {
        const numOfPosts = posts.length;
        const startIndex = numOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getPosts?${searchQuery}`);
        if(!res.ok){
            return;
        }
        if(res.ok){
            const data = await res.json();
            setPosts([...posts, ...data.posts]);
            if(data.posts.length === 9 ){
                setShowMore(true);
            }else{
                setShowMore(false);
            }
        }
    }


  return (
    <div className='max-w-7xl mx-auto'>
        <button onClick={() => navigate("/")} className='dark:bg-gray-400 bg-blue-500 py-2 px-4 rounded-full hover:scale-110 text-slate-100 dark:text-slate-900 font-semibold mt-4'><HiArrowLeft /> </button>
        <div >
            <form onSubmit={handleSubmit} className='flex w-full flex-wrap justify-center items-center gap-4 mb-10 mt-8'>
                <div>
                    <label>Search Term:</label>
                    <TextInput type='text'
                        id='searchTerm'
                        value={sidebarData.searchTerm}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Sort:</label>
                    <Select onChange={handleChange} 
                    value={sidebarData.sort} 
                    defaultValue={'desc'}
                    id='sort'
                    >
                        <option value="desc" >Latest</option>
                        <option value="asc" >Oldest</option>
                    </Select>
                </div>
                <div>
                    <label>Category:</label>
                    <Select onChange={handleChange} 
                    value={sidebarData.category} 
                    id='category'
                    >
                        <option value="" >unselect</option>
                        <option value="uncategorized" >Uncategorized</option>
                        <option value="web-development" >Web Development</option>
                        <option value="reactjs" >React Js</option>
                        <option value="javascript" >JavaScript</option>
                        <option value="nextjs" >Next Js</option>
                        <option value="mongodb" >MongoDB</option>
                        <option value="html" >HTML</option>
                        <option value="css" >CSS</option>
                    </Select>
                </div>
                <button type='submit' className='bg-gray-600 py-2 px-4 mt-6 dark:text-teal-300 text-slate-200 rounded-md'>apply filter</button>
         
            </form>
        </div>

        <div>
            <div>
                {!loading && posts.length === 0 && <h1 className=' flex text-center justify-center mt-8 text-xl bg-gray-400 text-slate-200 p-10 rounded-lg dark:text-slate-700'>No Posts Found</h1>}
            </div>
            <div>
                {loading && <h1 className=' flex text-center justify-center mt-8 text-xl bg-gray-400 text-slate-200 p-10 rounded-lg dark:text-slate-700'>Loading...</h1>}
            </div>
            <div className='flex flex-wrap w-full mx-auto justify-center gap-6 my-16 '>
                {posts?.map((post) => <PostCard key={post._id} post={post} /> )}
                {showMore && (
                      <button className="group flex justify-center py-2 px-4 dark:bg-gray-600 dark:text-teal-400 w-fit mt-10 mb-12 bg-[#3f75ff] rounded-full text-slate-100"
                       onClick={handleShowMore} >
                      <span className="flex justify-center items-center gap-1"> show more <HiPlus className="group-hover:pl-3 w-fit transition-all duration-300" /></span>
                    </button>
                )}
            </div>
        </div>
    </div>
  )
}

export default SearchPage