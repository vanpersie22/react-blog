import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashPosts = () => {
    const { currentUser } = useSelector(state => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModel, setShowModel] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

    useEffect(() => {

        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                    if (data.posts.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if(currentUser.isAdmin) {
            fetchPosts();
        }
    }, [currentUser._id, currentUser.isAdmin]);

    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
            const data = await res.json();
            if (res.ok) {
                setUserPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDeletePost = async () => {
        setShowModel(false);
        try {
            const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
                method: 'DELETE',
            
            }
        );
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            }
            else {
                setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
            }
        } catch (error) {
            console.log(error.message);
        }

    }

    return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
    scrollbar-track-slate-100 scrollbar-thumb-slate-300 
    dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && userPosts.length > 0 ? (
                <>
                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Date Uploaded</Table.HeadCell>
                            <Table.HeadCell>Image</Table.HeadCell>
                            <Table.HeadCell>Title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                            <Table.HeadCell>
                                <span className=''>Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                    {userPosts.map((post) => (
                        <Table.Body className='divide-y' key={post._id}>
                            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                <Table.Cell>{new Date(post.createdAt).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>
                                    <Link to={`/post/${post.slug}`}>
                                    <img src={post.image} alt={post.title} className='w-20 h-10 bg-gray-500 object-cover' />
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link className='font-medium text-gray-500 dark:text-white' to={`/post/${post.slug}`}>{post.title}
                                    </Link>
                                    
                                    </Table.Cell>
                                <Table.Cell>{post.category}</Table.Cell>
                                <Table.Cell>
                                    <span
                                    onClick={()=>{
                                        setShowModel(true);
                                        setPostIdToDelete(post._id);
                                    }} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link className='text-teal-500' to={`/update-post/${post._id}`}>
                                    <span>Edit</span>
                                    </Link>
                                    
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
                <p>No posts yet</p>
            )}
             <Modal show={showModel} onClose={()=>setShowModel(false)} 
            popup size='md'>
                <Modal.Header/>
                <Modal.Body>
                    <h1 className='text-center text-2xl font-semibold'>Delete Account</h1>
                    <p className='text-center text-sm text-gray-500'>Are you sure you want to delete this post?</p>
                    <div className='flex justify-between mt-5'>
                        <Button color='failure' onClick={()=>setShowModel(false)}>Cancel</Button>
                        <Button onClick={handleDeletePost} color='success'>Delete</Button>
                    </div>

                </Modal.Body>

            </Modal>
        </div>
    )
};


export default DashPosts;