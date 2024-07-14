import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaCheck, FaTimes } from 'react-icons/fa';


const DashUsers = () => {
    const { currentUser } = useSelector(state => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModel, setShowModel] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState('');

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/user/getusers`);
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    if (data.users.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if(currentUser.isAdmin) {
            fetchUsers();
        }
    }, [currentUser._id, currentUser.isAdmin]);

    const handleShowMore = async () => {
        const startIndex = users.length;
        try {
            const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
            const data = await res.json();
            if (res.ok) {
                setUsers((prev) => [...prev, ...data.users]);
                if (data.users.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDeleteUser = async () => {

        try {
            const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (res.ok) {
                setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
                setShowModel(false);
            }
            else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
    scrollbar-track-slate-100 scrollbar-thumb-slate-300 
    dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && users.length > 0 ? (
                <>
                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Date created</Table.HeadCell>
                            <Table.HeadCell>User Image</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Admin</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                        </Table.Head>
                    {users.map((user) => (
                        <Table.Body className='divide-y' key={user._id}>
                            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>
                                 
                                    <img src={user.profilePicture} alt={user} 
                                    className='w-10 h-10 bg-gray-500 object-cover rounded-full' />
                                   
                                </Table.Cell>
                                <Table.Cell>
                                    {user.username}
                                    
                                    </Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.isAdmin ?(<FaCheck className='text-green-500' />) : (<FaTimes className='text-red-500' />)}</Table.Cell>
                                <Table.Cell>
                                    <span
                                    onClick={()=>{
                                        setShowModel(true);
                                        setUserIdToDelete(user._id);
                                    }} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                    </Table>
                    {showMore && (
                        <button onClick={handleShowMore} className='w-full bg-teal-500 text-white px-5 py-2 rounded-md mt-3 self-center'>Show More</button>
                    )}
                </>
            ) : (
                <p>No user yet</p>
            )}
             <Modal show={showModel} onClose={()=>setShowModel(false)} 
            popup size='md'>
                <Modal.Header/>
                <Modal.Body>
                    <h1 className='text-center text-2xl font-semibold'>Delete User</h1>
                    <p className='text-center text-sm text-gray-500'>Are you sure you want to delete this user?</p>
                    <div className='flex justify-between mt-5'>
                        <Button color='failure' onClick={()=>setShowModel(false)}>Cancel</Button>
                        <Button onClick={handleDeleteUser} color='success'>Delete</Button>
                    </div>

                </Modal.Body>

            </Modal>
        </div>
    )
};


export default DashUsers;