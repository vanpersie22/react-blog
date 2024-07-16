import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import PostCard from '../components/PostCard'
import { Button } from 'flowbite-react'

const Home = () => {
  const [posts, setPosts] = useState([]);


  useEffect (() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getposts');
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className='text-3xl font-bold lg:text-5xl'>Welcome to <span className='text-2xl font-bold lg:text-5xl text-green-500 dark:text-teal-500'>WriteAssignment</span> </h1>
        <p className='text-gray-500 text-sm sm:text-sm'>Your ultimate destination for expert academic writing assistance and assignment support. Our mission is to provide you with the tools, resources, and guidance you need to excel in your academic journey.</p>

        <Link to='/search' className='text-xs sm:text-sm text-green-500 dark:text-teal-500 font-bold 
        hover:underline'>
        View articles
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-800">
        <CallToAction />
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {
          posts && posts.length > 0 && (
            <div className=" flex flex-col gap-6 mt-6">
              <h2 className='text-2xl font-semibold text-center underline decoration-green-300 dark:decoration-teal-300 decoration-4 underline-offset-8'>Latest Articles</h2>
              <div className="flex flex-wrap gap-4">
                {
                  posts.map((post)=>(
                    <PostCard key={post._id} post={post} />    
                  ))
                }
                
              </div>
              <Link to={'/search'} className='text-lg text-green-500 dark:text-teal-500 
              hover:underline self-center mt-5'>
             <Button className='bg-green-500 dark:bg-teal-500'> View more articles</Button>
              </Link>
            </div>
          )
        }
        
      </div>
    </div>
  )
}

export default Home