import { Sidebar } from 'flowbite-react'
import React from 'react'
import { HiArrowSmRight, HiUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { logOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

const DashSidebar = () => {
  const location = useLocation()
  const [tab, setTab] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  const handleLogOut = async () => {
    try {
      const res = await fetch('/api/user/logout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else
        dispatch(logOutSuccess());
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab === 'profile'}
              icon={HiUser} label={"User"} labelColor="dark" as='div'>
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight} onClick={handleLogOut} className='cursor-pointer'>
            Log Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar