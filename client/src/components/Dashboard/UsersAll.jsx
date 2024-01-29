import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { HiBadgeCheck, HiOutlineExclamationCircle, HiXCircle } from "react-icons/hi";
import { TiUserDeleteOutline } from "react-icons/ti";
import { useSelector } from "react-redux";

function UsersAll() {


    const [users, setUsers ] = useState([]); 
    const { currentUser } = useSelector(state => state.user);

    const [openModal, setOpenModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState("");
    const [ showMore, setShowMore] = useState(true);


    useEffect(() => {
        const fetchUsers = async() => {
            try {
                const res = await fetch('/api/user/getusers');
            const data = await res.json();
            if (res.ok) {
                setUsers(data.usersWithoutPassword);
                if (data.usersWithoutPassword.length < 9) {
                  setShowMore(false);
                }
              }
            } catch (error) {
                console.log(error.message);
            }
        }
        if(currentUser.isAdmin)  fetchUsers();
    },[currentUser._id]);

    const showMoreHandler = async () => {
        const startIndex = users.length;
        try {
          const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
          const data = await res.json();
          if (res.ok) {
            setUsers((prev) => [...prev, ...data.usersWithoutPassword]);
            if (data.usersWithoutPassword.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };


    const deleteUserHandle = async () => {
        
        try {
            const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
                method: 'DELETE',
            });
            const data = await res.json();

            if(res.ok){
                setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
                setOpenModal(false)
                setUserIdToDelete("");
            }else{
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className="table-auto overflow-auto md:mx-auto p-3 scroll-smooth will-change-scroll">
      {currentUser.isAdmin && users?.length > 0 ? (
        <>
          <Table hoverable className="shadow-md rounded-md">
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>username</Table.HeadCell>
              <Table.HeadCell>email</Table.HeadCell>
              <Table.HeadCell>admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users?.map((user) => (
              <Table.Body key={user._id} className="divide-y">
                <Table.Row>

                  <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                 
                  <Table.Cell>
                  <img src={user.profilePicture} alt="post image" className=" w-10 h-10 object-cover rounded-full" />
                  </Table.Cell>

                  <Table.Cell className="text-slate-700 font-semibold dark:text-slate-200 text-wrap text-clip" >{user.username}</Table.Cell>

                  <Table.Cell className="text-slate-700 font-semibold dark:text-slate-200 text-wrap text-clip">{user.email}</Table.Cell>

                  <Table.Cell className="text-xl">{user.isAdmin ? <HiBadgeCheck  color="green" /> : <HiXCircle color="red" />}</Table.Cell>
                  
                  <Table.Cell>
                    <span onClick={() => {
                            setOpenModal(true)
                            setUserIdToDelete(user._id)
                            }} className="hover:text-red-600  text-2xl font-bold cursor-pointer ">
                                <abbr title="Delete">
                            <TiUserDeleteOutline className="hover:font-extrabold" />
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
        <h1>No users available</h1>
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
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteUserHandle}>
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

export default UsersAll