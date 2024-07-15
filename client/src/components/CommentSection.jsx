import { Alert, Button, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Comment from './Comment'


const CommentSection = ({ postId }) => {
    const { currentUser } = useSelector(state => state.user)
    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState('')
    const [comments, setComments] = useState([])

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
        

    return (
        <div className='max-w-3xl mx-auto w-full p-3'>
            {currentUser ? (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                    <p>Take a bite 🍪</p>

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
                            <Comment key={comment._id} comment={comment} />
                            
                           ))
                        }
                        </>
                       
                        
                    )}
                
        </div>
    )
}

export default CommentSection