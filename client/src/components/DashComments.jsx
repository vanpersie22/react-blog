import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const DashComments = () => {
    const { currentUser } = useSelector(state => state.user);
    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModel, setShowModel] = useState(false);
    const [commentIdToDelete, setCommentIdToDelete] = useState('');

    useEffect(() => {

        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comment/getcomments`);
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
        };
        if(currentUser.isAdmin) {
            fetchComments();
        }
    }, [currentUser._id, currentUser.isAdmin]);

    const handleShowMore = async () => {
        const startIndex = comments.length;
        try {
            const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
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
    }

    const handleDeleteComment = async () => {
        setShowModel(false);

        try {
            const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (res.ok) {
                setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
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
            {currentUser.isAdmin && comments.length > 0 ? (
                <>
                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Date created</Table.HeadCell>
                            <Table.HeadCell>Comment content</Table.HeadCell>
                            <Table.HeadCell>Number of likes</Table.HeadCell>
                            <Table.HeadCell>PostId</Table.HeadCell>
                            <Table.HeadCell>UserId</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                        </Table.Head>
                    {comments.map((comments) => (
                        <Table.Body className='divide-y' key={comments._id}>
                            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                <Table.Cell>{new Date(comments.createdAt).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>
                                 
                                    {comments.content}
                                   
                                </Table.Cell>
                                <Table.Cell>
                                    {comments.numberOfLikes}
                                    
                                    </Table.Cell>
                                <Table.Cell>{comments.postId}</Table.Cell>
                                <Table.Cell>{comments.userId}
                                
                                </Table.Cell>
                                <Table.Cell>
                                    <span
                                    onClick={()=>{
                                        setShowModel(true);
                                        setCommentIdToDelete(comments._id);
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
                <p>No comment yet</p>
            )}
             <Modal show={showModel} onClose={()=>setShowModel(false)} 
            popup size='md'>
                <Modal.Header/>
                <Modal.Body>
                    <h1 className='text-center text-2xl font-semibold'>Delete comment</h1>
                    <p className='text-center text-sm text-gray-500'>Are you sure you want to delete this comment?</p>
                    <div className='flex justify-between mt-5'>
                        <Button color='failure' onClick={()=>setShowModel(false)}>Cancel</Button>
                        <Button onClick={handleDeleteComment} color='success'>Delete</Button>
                    </div>

                </Modal.Body>

            </Modal>
        </div>
    )
};


export default DashComments;