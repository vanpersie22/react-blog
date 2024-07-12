import { Button, FileInput, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>New Post</h1>
        <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type='text' placeholder='Title' required id='title'
                className='flex-1'/>
                <select className='text-black'>
                    <option value="uncategorized">Select a category</option>
                    <option value="ai">AI</option>
                    <option value="technology">Technology</option>
                    <option value="javascript">Javascript</option>
                    <option value="react">React.js</option>
                    <option value="studyroute">Study Route</option>


                </select>
            </div>
            <div className='flex gap-4 items-centern justify-between 
            border-4 border-teal-500 border-dotted p-3'>
                <FileInput type="file" accept='image/*'/>
                <Button type='button' 
                gradientDuoTone='PurpleToBlue' size='sm' 
                outline className="noto-sans-button-text border border-green-500">
                        Upload image 
                    </Button>
            </div>
            <ReactQuill theme="snow" placeholder='write text here' 
            className='h-72 mb-12' />
            <Button type='submit' 
                gradientDuoTone='PurpleToBlue' size='md' 
                className="noto-sans-button-text 
                border border-green-500 bg-green-500 text-white">
                        Publish
                    </Button>
        </form>
       
    </div>
  )
}

export default CreatePost