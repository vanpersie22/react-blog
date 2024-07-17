import { Button, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard';


const Search = () => {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '', sort: 'desc',
        category: 'uncategorized',
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();

    const location = useLocation();


    console.log(sidebarData)
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');
        if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setSidebarData
                ({
                    ...sidebarData,
                    searchTerm: searchTermFromUrl,
                    category: categoryFromUrl,
                });
        }

        const fetchPosts = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getposts?${searchQuery}`);
            if (!res.ok) {
                setLoading(false);
                return;
            }
            if (res.ok) {
                const data = await res.json();
                setPosts(data.posts);
                setLoading(false);
                if (data.posts.length === 9) {
                    setShowMore(true);
                } else {
                    setShowMore(false);
                }
            }
        };
        fetchPosts();

    }, [location.search]);

    const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
            setSidebarData({ ...sidebarData, searchTerm: e.target.value });
        }
        if (e.target.id === 'sort') {
            const order = e.target.value || 'desc';
            setSidebarData({ ...sidebarData, sort: order });
        }

        if (e.target.id === 'category') {
            const category = e.target.value || 'uncategorized';
            setSidebarData({ ...sidebarData, category });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    };

    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) {
            return;
        }
        if (res.ok) {
            const data = await res.json();
            setPosts([...posts, ...data.posts]);
            if (data.posts.length === 9) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
        }
    };


    return (
        <div className='flex flex-col md:flex-row'>
            <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    <div className="flex items-center gap-2">
                        <label className='whitespace-nowrap font-semibold'>Search:</label>
                        <TextInput placeholder='search....' id='searchTerm' type='text
                ' value={sidebarData.searchTerm} onChange={handleChange} />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className='font-semibold'>Sort:</label>
                        <Select onChange={handleChange} Value={sidebarData.sort} id='sort'>
                            <option value='desc'>Newest</option>
                            <option value='asc'>Oldest</option>

                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className='font-semibold'>Category:</label>
                        <Select onChange={handleChange} Value={sidebarData.category} id='category'>
                            <option value="uncategorized">Select a category</option>
                            <option value="ai">AI</option>
                            <option value="technology">Technology</option>
                            <option value="javascript">Javascript</option>
                            <option value="react">React.js</option>
                            <option value="studyroute">Study Route</option>


                        </Select>
                    </div>
                    <Button className='bg-green-500 dark:bg-teal-500' type='submit'>
                        Search
                    </Button>
                </form>
            </div>
            <div className="w-full">
                <h1 className='text-xl font-semibold sm:border-b 
            border-gray-500  p-3 mt-4'>Search results</h1>
                <div className="p-7 flex flex-wrap gap-4">
                    {
                        !loading && posts.length === 0 && (
                            <p className='text-md text-gray-500'>No posts found</p>
                        )
                    }{
                        loading &&
                        <p className='text-md text-gray-500'>Loading...</p>

                    }{
                        !loading && posts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))
                    }

                    {
                        showMore && (
                            <Button className='bg-green-500 dark:bg-teal-500 p-7 w-full ' onClick={handleShowMore}>
                                Load more
                            </Button>
                        )
                    }

                </div>

            </div>
        </div>
    )
}

export default Search