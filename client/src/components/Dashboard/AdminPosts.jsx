
import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { HiOutlineExclamationCircle, HiPencilAlt, HiPlusCircle, HiTrash } from "react-icons/hi";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

function AdminPosts() {

  const { currentUser } = useSelector(state => state.user);
  const [blogPosts, setBlogPosts] = useState([]);
  const [ showMore, setShowMore] = useState(true);
    // * to delete post
    const [openModal, setOpenModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

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

  const deletePostHandle = async() => {
    setOpenModal(false);
   try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = res.json();
      if(!res.ok){
        console.log(data.message);
        return;
      }
      if(res.ok){
        setBlogPosts((prev) => 
          prev.filter((post) => post._id !== postIdToDelete)
        );
        setPostIdToDelete("");
      }
   } catch (error) {
    console.log(error);
   }
  }

  return (
    <div className="table-auto overflow-auto md:mx-auto p-3 scroll-smooth will-change-scroll">
    
      {currentUser.isAdmin && blogPosts.length > 0 ? (
        <>
         <Link to={'/create-post'} className="group/item flex justify-end mx-5 my-3">
            <Button className=" h-9 w-9 sm:h-12 sm:w-12  rounded-full hover:w-32 sm:hover:w-40  ">
                <span className="hidden group-hover/item:inline-block text-[12px] sm:text-[16px] group-hover/item:text-slate-200">create a post</span>
                <HiPlusCircle className="text-lg sm:text-xl  " />
            </Button>
          </Link>

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
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell className="flex gap-5 items-center mx-auto text-lg sm:text-xl md:text-2xl">
                    <Link to={`/update-post/${post._id}`}>
                      <span className="text-violet-400  hover:text-teal-500 font-semibold">
                        <HiPencilAlt />
                      </span>
                    </Link>
                      <span onClick={() => {
                        setOpenModal(true)
                        setPostIdToDelete(post._id)
                        }} className="text-red-400 hover:text-red-600 font-semibold cursor-pointer">
                          <HiTrash />
                        </span>
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
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deletePostHandle}>
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

export default AdminPosts;