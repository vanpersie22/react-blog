import { Navbar, Button, TextInput, Dropdown, Avatar, Modal } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { logOutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';
import { assets } from '../assets/assets';

export default function Header() {
    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);
    const { theme } = useSelector(state => state.theme);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

    const handleLogOut = async () => {
        try {
            const res = await fetch('/api/user/logout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(logOutSuccess());
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
        setIsModalOpen(false); // Close the modal after search
    };

    return (
        <Navbar className='border-b-2 mylogo'>
            <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                {theme === 'light' ? (
                    <img className='logo' src={assets.logofront_img} alt="Light Logo" />
                ) : (
                    <img className='logo' src={assets.logo_img} alt="Dark Logo" />
                )}
            </Link>
            <form onSubmit={handleSubmit}>
                <TextInput type="text" placeholder="Search" rightIcon={AiOutlineSearch} 
                className='hidden lg:inline' value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} />
            </form> 

            <Button className='w-12 h-10 lg:hidden' color='green' pill onClick={() => setIsModalOpen(true)}>
                <AiOutlineSearch />
            </Button>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Modal.Header>Search</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <TextInput type="text" placeholder="Search" rightIcon={AiOutlineSearch} 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} />
                        <Button type="submit" color='green' className='mt-4'>Search</Button>
                    </form>
                </Modal.Body>
            </Modal>

            <div className='flex gap-2 md:order-2'>
    <Button className='w-12 h-10 sm:inline border-none flex items-center justify-center' color='gray' pill onClick={() => dispatch(toggleTheme())}>
        {theme === 'light' ? <FaSun /> : <FaMoon />}
    </Button>
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt='user-avatar'
                                img={currentUser.profilePicture}
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>
                                {currentUser.email}
                            </span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>
                                Profile
                            </Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogOut}>
                            Sign Out
                        </Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to='/sign-in'>
                        <Button gradientDuoTone='PurpleToBlue' className="noto-sans-button-text border border-green-500">
                            Sign In
                        </Button>
                    </Link>
                )}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={'div'} className='noto-sans-body-text'>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={'div'}>
                    <Link to='/about'>About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/projects"} as={'div'}>
                    <Link to='/projects'>Projects</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/publications"} as={'div'}>
                    <Link to='/publications'>Publications</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}