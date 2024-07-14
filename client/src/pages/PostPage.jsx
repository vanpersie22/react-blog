import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CallToAction from '../components/CallToAction';


const PostPage = () => {
    const { postSlug } = useParams()
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ post, setPost ] = useState(null);
    


    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`)
                const data = await res.json()
                if (!res.ok) {
                   setError(true)
                     setLoading(false)
                     return;
                }
                if (res.ok) {
                    setPost(data.posts[0]);
                    setLoading(false)
                    setError(false)
                }
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }
        fetchPost();

    }, [postSlug])

    console.log({ loading, post });

if (loading) {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Spinner size='xl'/>
        </div>
    );
}
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h1 className='text-3xl mt-10 p-3 text-center max-w-4xl mx-auto font-serif
        lg:text-4xl'>{post && post.title}</h1>
        <Link to={`/search?category=${post && post.category}` }
        className='self-center mt-4 '>
        <Button className='bg-green-500' pill size='xs'>{post && post.category}</Button>
        </Link>
        <img src={post && post.image} alt={post && post.title} className='mt-8
        p-3 max-h-[600px] w-full object cover'/>
        <div className='flex justify-between p-3 border-b border-slate-300
        text-sm mx-auto w-full max-w-3xl'>
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className='italic'>{post && (post.content.length /1000).toFixed(0)} mins read</span>

        </div>

        <div className='p-3 max-w-3xl mx-auto post-content text-serif' dangerouslySetInnerHTML={{__html: post && post.content }}>

        </div>
        <div className='max-w-4xl mx-auto w-full'>
            <CallToAction/>

        </div>
    </main>
  );
  
}

export default PostPage