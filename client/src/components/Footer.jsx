import { Footer } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsGithub, BsTwitter } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { assets } from '../assets/assets';

export default function FooterCom() {
    const { theme } = useSelector(state => state.theme);

    return (
        <Footer container className='border border-t-8 border-teal-500'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                    <div className='mt-5'>
                        <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                            {theme === 'light' ? (
                                <img className='logo' src={assets.logofront_img} alt="Light Logo" />
                            ) : (
                                <img className='logo' src={assets.logo_img} alt="Dark Logo" />
                            )}
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm: mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title='About Us' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href='https://codewithjonas.com'
                                    target='_blank'
                                    rel='noopener noreferrer'>
                                    CodewithJonas
                                </Footer.Link>
                                <Footer.Link
                                    href='/about'
                                    title='About'>
                                    About Us
                                </Footer.Link>
                                <Footer.Link
                                    href='/sign-up'>
                                    Sign Up
                                </Footer.Link>
                                <Footer.Link
                                    href='/about'>
                                    Contact Me
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>

                        <div>
                            <Footer.Title title='Repos' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href='https://github.com/vanpersie22'
                                    target='_blank'
                                    rel='noopener noreferrer'>
                                    GitHub
                                </Footer.Link>
                                <Footer.Link
                                    href='https://www.upwork.com/' target='_blank' rel='noopener noreferrer'
                                    title='About'>
                                    Upwork
                                </Footer.Link>
                                <Footer.Link
                                    href='https://www.linkedin.com/in/ezeali-jonas-a8aa945b' target='blank' rel='noopener noreferrer'>
                                    Linkedin
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='SITE LINKS' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href='#'>
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link
                                    href='#'>
                                    Terms and Conditions
                                </Footer.Link>
                                <Footer.Link
                                    href='#'>
                                    DMCA
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className='w-full sm:flex sm:items-center sm:justify-between'>
                    <Footer.Copyright href='https://writeassignment.online' by='Writeassignment' year={new Date().getFullYear()} />
                    <div className='flex gap-6 sm:mt-4 mt-4 sm:justify-center'>
                        <Footer.Icon href='#' icon={BsFacebook} />
                        <Footer.Icon href='#' icon={BsTwitter} />
                        <Footer.Icon href='#' icon={BsInstagram} />
                        <Footer.Icon href='#' icon={BsGithub} />
                    </div>
                </div>
            </div>
        </Footer>
    );
}
