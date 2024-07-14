import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-green-500 
        dark:border border-teal-500 justify-center items-center rounded-tl-3xl
        rounded-br-3xl text-center'>
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className='text-2xl'>
                Need help with any coding project/class assignments?
            </h2>
            <p className='text-gray-500 my-2'>
                Check out our amazing plans || get in touch with us now
            </p>
            <Button className="bg-green-500 noto-sans-button-text border border-green-500 rounded-tl-xl
            rounded-bl-none">
                <a href='https://codewithjonas.com/' target = '_blank'
                rel='noopener noreferrer'>
                        Get in touch !
                </a>
                    </Button>
        </div>
        <div className='p-7 flex-1'>
            <img src="https://upskillie.com/blog/assets/Coding-Coffee.jpg" alt="" />
        </div>

    </div>
  )
}

export default CallToAction