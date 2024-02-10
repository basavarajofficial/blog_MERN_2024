import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react"
import {  HiOutlineExclamationCircle } from "react-icons/hi";
import { TiTrash } from "react-icons/ti";
import { useSelector } from "react-redux";

function AdminComments() {


    const [comments, setComments ] = useState([]); 
    const { currentUser } = useSelector(state => state.user);

    const [openModal, setOpenModal] = useState(false);
    const [ commentIdToDelete, setCommentIdToDelete] = useState("");
    const [ showMore, setShowMore] = useState(true);


    useEffect(() => {
        const fetchComments = async() => {
            try {
                const res = await fetch('/api/comment/getAllComments');
            const data = await res.json();
            if (res.ok) {
              setComments(data.comments);
                if (data.comments.length < 9) {
                  setShowMore(false);
                }
              }
            } catch (error) {
                console.log(error.message);
            }
        }
        if(currentUser.isAdmin)  fetchComments();
    },[currentUser._id]);

    const showMoreHandler = async () => {
        const startIndex = comments.length;
        try {
          const res = await fetch(`/api/comment/getAllComments?startIndex=${startIndex}`);
          const data = await res.json();
          if (res.ok) {
            setComments((prev) => [...prev, ...data.comments]);
            if (data.comments.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };


    const deleteComment = async () => {
        
        try {
            const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
                method: 'DELETE',
            });
            const data = await res.json();

            if(res.ok){
              setComments((prev) => prev.filter((user) => user._id !== commentIdToDelete));
                setOpenModal(false)
                setCommentIdToDelete("");
            }else{
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className="table-auto overflow-auto md:mx-auto p-3 scroll-smooth will-change-scroll">
      {currentUser.isAdmin && comments?.length > 0 ? (
        <>
          <Table hoverable className="shadow-md rounded-md">
            <Table.Head >
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Comment</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
              <Table.HeadCell>Post ID</Table.HeadCell>
              <Table.HeadCell>User ID</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments?.map((comment) => (
              <Table.Body key={comment._id} className="divide-y">
                <Table.Row >

                  <Table.Cell>{new Date(comment.createdAt).toLocaleDateString()}</Table.Cell>
                 
                  <Table.Cell className="text-slate-700 line-clamp-2 font-normal text-sm dark:text-slate-200 text-wrap text-clip" >{comment.content}</Table.Cell>
                  
                  {/* <Table.Cell>
                  <img src={comment.profilePicture} alt="post image" className=" w-10 h-10 object-cover rounded-full" />
                  </Table.Cell> */}


                  <Table.Cell className="text-slate-700 font-semibold dark:text-slate-200 text-wrap text-clip">{comment.likesCount}</Table.Cell>
                  <Table.Cell className="text-slate-700 font-semibold dark:text-slate-200 text-wrap text-clip">{comment.postId}</Table.Cell>
                  <Table.Cell className="text-slate-700 font-semibold dark:text-slate-200 text-wrap text-clip">{comment.userId}</Table.Cell>
                  
                  <Table.Cell>
                    <span onClick={() => {
                            setOpenModal(true)
                            setCommentIdToDelete(comment._id)
                            }} className="hover:text-red-600  text-2xl font-bold cursor-pointer ">
                                <abbr title="Delete">
                            <TiTrash className="hover:font-extrabold" />
                                </abbr>
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
        <h1>No Comments available</h1>
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
              Are you sure you want to delete this Comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteComment}>
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

export default AdminComments