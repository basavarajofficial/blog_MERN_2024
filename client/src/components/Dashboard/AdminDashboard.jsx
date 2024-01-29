
import { Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

function AdminDashboard() {

  const { currentUser } = useSelector(state => state.user);
  const [blogPosts, setBlogPosts] = useState([]);
  const [ showMore, setShowMore] = useState(true);

  console.log(blogPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if(res.ok){
          setBlogPosts(data.posts);
          if(data.posts.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    if(currentUser.isAdmin) fetchPosts();
  }, [currentUser._id]);

  const showMoreHandler = async () => {
    const startIndex = blogPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setBlogPosts((prev) => [...prev, ...data.posts]);
        if(data.posts.length < 9){
          setShowMore(false)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="table-auto overflow-auto md:mx-auto p-3 scroll-smooth will-change-scroll">
      {currentUser.isAdmin && blogPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>title</Table.HeadCell>
              <Table.HeadCell>catagory</Table.HeadCell>
              <Table.HeadCell className="flex gap-2">
                <span>Edit</span>
                <span>Delete</span>
              </Table.HeadCell>
            </Table.Head>
            {blogPosts?.map((post) => (
              <Table.Body key={post._id} className="divide-y">
                <Table.Row>
                  <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img src={post.image} alt="post image" className=" w-20 h-10 object-cover rounded-md" />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`} className="text-slate-700 font-semibold dark:text-slate-200 text-wrap text-clip">
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.catagory}</Table.Cell>
                  <Table.Cell className="flex gap-2 mx-auto">
                    <Link to={`/update-post/${post._id}`}>
                      <span className="text-violet-400 font-semibold">Edit</span>
                    </Link>
                      <span className="text-red-600 font-semibold cursor-pointer">Delete</span>
                  </Table.Cell>

                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {
            showMore && (
              <button onClick={showMoreHandler} 
                  className="w-full text-teal-400 font-semibold py-7 hover:text-teal-500">
                show more
              </button>
            )
          }
        </> 

      ) : (
        <h1>No Posts created</h1>
      )}
    </div>
  )
}

export default AdminDashboard