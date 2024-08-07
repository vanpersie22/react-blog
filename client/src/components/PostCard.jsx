import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({ post }) => {
  return (
    <div className='group relative  w-full border border-gray-300 dark:border-teal-500    hover:border-2 h-[360px] overflow-hidden
    rounded-lg sm:w-[360px] transition-all'>
        <Link to={`/post/${post.slug}`}>
        <img className='h-[180px] w-full
        object-cover group-hover:h-[200px] transition-all 
        duration-300 z-20' src={post.image} alt="post-cover" />
        </Link>
        <div className="p-3 flex flex-col gap-2">
    <p className='text-md font-semibold line-clamp-2'>{post.title}</p>
    <span className='italic text-sm bg-green-100 text-green-800 dark:bg-teal-700 dark:text-teal-100 py-1 px-2 rounded-full'>{post.category}</span>
    <Link to={`/post/${post.slug}`} className='z-10 group-hover:bottom-0
    absolute bottom-[-00px] left-0 right-0 border border-green-500
    text-green-500 dark:border-teal-500 dark:text-teal-500 hover:bg-green-500 hover:text-white 
    dark:hover:bg-teal-500 dark:hover:text-white transition-all
    duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'>
    Read More...
    </Link>
</div>
        
    </div>
  )
}

export default PostCard