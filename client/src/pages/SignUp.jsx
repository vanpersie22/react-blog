import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Label } from 'flowbite-react';
import { TextInput } from 'flowbite-react';

const SignUp = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
        <Link to="/" className='font-semibold dark:text-white text-3xl'>

<span className='px-2 py-1 bg-gradient-to-r from-green-500
 via-green-500 to-green-500 rounded-lg text-white 
 noto-sans-body-text'>Write</span>Assignment
</Link>
            <p className='text-sm mt-5 noto-sans-body-text'>
              Next step to defining your path. We can help you solve any programming assignment, semester works, class works, sign up to get started now 🥰.
            </p>
      </div>

      <div className='flex-1'>
        <form className='flex flex-col gap-4' >
          <div >
            <Label value='Username'/>
            <TextInput type='text' placeholder='Enter your username' id='username' />
          </div>
          <div>
            <Label value='Email'/>
            <TextInput type='text' placeholder='@email' id='email' />
          </div>
          <div>
            <Label value='Password'/>
            <TextInput type='text' placeholder='Enter your password' id='password' />
          </div>
          <Button gradientDuoTone='PurpleToBlue' className="noto-sans-button-text border border-green-500">Sign Up</Button>
        
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span>Have an account?</span>
          <Link to='/sign-in' className='text-green-500'>Sign In</Link>
        </div>
      </div>
        
    </div>
    </div>
  )
}

export default SignUp