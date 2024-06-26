import { Navbar, Button, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'



export default function Header() {
    const path = useLocation().pathname
    return (
        <Navbar className='border-b-2'>
            <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                Write<span className='px-2 py-1 bg-gradient-to-r from-green-500 via-green-500 to-white-300 rounded-lg text-white'>My</span>Assignment
            </Link>
            <form className="relative">
                <input type="text" placeholder="Search" className='rounded-lg p-2 mx-2 pl-10 hidden lg:inline' />
                <AiOutlineSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hidden lg:inline" size={20} />
            </form>
            <button className='w-12 h-10 lg:hidden' color='green' >
                <AiOutlineSearch />
            </button>
            <div className='flex gap-2 md:order-2'>
                <button className='w-12 h-10 sm:inline' color='green'>
                    <FaMoon />
                </button>
                <Link to='/sign-in'>
                    <button className='bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg outline-green p-2'>
                        Sign In
                    </button>
                </Link>
               <Navbar.Toggle/>
            </div>
            <Navbar.Collapse>
                  <Navbar.Link active={path === "/"} as ={'div'}>
                  <Link to='/'>
                  Home
                  </Link>
                  </Navbar.Link>
                    <Navbar.Link active={path === "/about"} as ={'div'}>
                    <Link to='/about'>About
                    </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === "/projects"}as ={'div'}>
                    <Link to='/projects'>Projects
                    </Link>
                    </Navbar.Link>
                </Navbar.Collapse>
        </Navbar>

    )
}