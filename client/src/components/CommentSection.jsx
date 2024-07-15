import { Alert, Button, Modal, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Comment from './Comment'
import { useNavigate } from 'react-router-dom'


const CommentSection = ({ postId }) => {
    const { currentUser } = useSelector(state => state.user)
    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState('')
    const [comments, setComments] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [commentToDelete, setCommentToDelete] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 220) {
            return;
        }
        try {
            const res = await fetch(`/api/comment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comment,
                    postId,
                    userId: currentUser._id,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setComment('');
                setCommentError(null);
                setComments([data, ...comments]);
            }

        } catch (error) {
            setCommentError('error.message');
        }

    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comment/getPostComments/${postId}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchComments();
    }, [postId]);

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/sign-in')
                return;
            }
            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: 'PUT',
            });
            if (res.ok) {
                const data = await res.json();
                setComments(comments.map((comment) =>
                    comment._id === commentId ? {
                        ...comment,
                        likes: data.likes,
                        numberOfLikes: data.likes.length,
                    } : comment
                ));
            }

        } catch (error) {
            console.log(error.message)
        }

    }

    const handleEdit = async (comment, editedContent) => {
        setComments(comments.map((c) =>
            c._id === comment._id ? { ...c, content: editedContent } : c
        ))
    }

    const handleDelete = async (commentId) => {
        setShowModal(false);
        try {
            if (!currentUser) {
                navigate('/sign-in')
                return;
            }
            const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                const data = await res.json();
                setComments(comments.filter((comment) => comment._id !== commentId))
            }
        } catch (error) {
            console.log(error.message)
        }
    };
    return (
        <div className='max-w-3xl mx-auto w-full p-3'>
            {currentUser ? (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                    <p>Alright! take a bite 🍪</p>

                    <Link to={'/dashboard?tab=profile'}
                        className='text-md text-green-600 hover:underline'>
                        @{currentUser.username}
                    </Link>
                    <img className='h-7 w-7 object-cover rounded-full' src={currentUser.profilePicture} alt="" />


                </div>
            ) :
                (
                    <div className='text-sm text-green-500 flex my-5 items-center'>
                        <p className='mr-2'>You must sign in to take a bite 🍪</p>
                        <Link to='/sign-in'>
                            <button className='bg-green-500 text-white p-2 rounded-full'>Sign in</button>
                        </Link>
                    </div>
                )
            }

            {
                currentUser && (
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3 border border-green-500
                    dark: border border-teal-500 p-3 rounded-md'>
                        <Textarea className='p-3 border border-gray-200 
                        rounded-md' placeholder='Add a comment...'
                            rows='3' maxLength='200'
                            onChange={(e) => setComment(e.target.value)}
                            value={comment} />
                        <div className='flex justify-between items-center mt-5'>
                            <p className='text-gray-500 text-xs'>{220 - comment
                                .length} characters remaining</p>

                            <Button type='submit' className='bg-green-500 text-white p-2 rounded-md'>Post Comment</Button>

                        </div>
                    </form>
                )}
            {comments.length === 0 ? (
                <p className='text-sm my-5 '>No comments yet</p>
            ) : (
                <>
                    <div className='text-sm my-5 flex items-center gap-1'>
                        <p>Comments</p>
                        <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                            <p>{comments.length}</p>
                        </div>
                    </div>
                    {
                        comments.map((comment) => (
                            <Comment key={comment._id} comment={comment}
                                onLike={handleLike}
                                onEdit={handleEdit}
                                onDelete={() => {
                                    setShowModal(true);
                                    setCommentToDelete(comment._id);
                                }}
                            />

                        ))
                    }
                </>


            )}
            <Modal show={showModal} onClose={() => setShowModal(false)}
                popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <h1 className='text-center text-2xl font-semibold'>Delete Account</h1>
                    <p className='text-center text-sm text-gray-500'>Want to remove comment?</p>
                    <div className='flex justify-between mt-5'>
                        <Button color='failure' onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button onClick={() => handleDelete(commentToDelete)} color='success'>Delete</Button>
                    </div>

                </Modal.Body>

            </Modal>
        </div>
    )
}

export default CommentSection