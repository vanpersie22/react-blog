import React from 'react'
import CallToAction from '../components/CallToAction'
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Projects = () => {

  const projects = [
    {
      id: 1,
      name: "Buchimarkethub",
      description: "An e-commerce website using React, Mongodb, Swiper js and Node for backend.",
      imageUrl: assets.buchi_img,
      url: 'https://buchimarkethub.ng'
    },
    {
      id: 2,
      name: "CodeWith Jonas Portfolio",
      description: "A portfolio website built with Three.js, bootstrap 5, and React.",
      imageUrl: assets.port_img,
      url: "https://codewithjonas.com"
    },
    {
      id: 3,
      name: "WriteAssignment.net",
      description: "WriteAssignment website is a platform for academic writing assistance and assignment support. Developed with Next.js, Tailwind.css and flowbite components.",
      imageUrl: assets.write_img,
      url: "https://writeassignment.net"
    },
    {
      id: 4,
      name: "Lo llama",
      description: "LLM Project using llama III and python to predict a University's mode of operation [case study Babcock]",
      imageUrl: assets.llama_img,
      url: "#"
    },
  ];
  
  return (
    <div className='min-h-screen mx-auto max-w-7xl flex flex-col items-center justify-center p-3 gap-6 my-7'>
  <h1 className='text-2xl font-bold'>Projects</h1>
  <p className='text-md text-gray-500'>
    My concluded projects, you can see my paper publications
    <Link to='/publications' className='text-green-500 dark:text-teal-500 hover:underline'> here.</Link> 
  </p>

  <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 "> 
    {projects.map((project) => (
      <div key={project.id} className="p-4 shadow-lg rounded-lg">
        <h3 className="font-bold text-xl">{project.name}</h3>
        <p className='line-clamp-2 p-2 text-gray-500'>{project.description}</p>
        {project.imageUrl && <img src={project.imageUrl} alt={project.name} className="mt-2 rounded" />}
        <Button size='xs' className=' bg-green-500 my-3 font-semibold text-xl' onClick={() => window.open(project.url, "_blank")}>
        See project
        </Button>
      </div>
    ))}
  </div>
  <p className='text-green-500 hover:underline font-semibold cursor-pointer my-5' onClick={()=> window.open('https://github.com/vanpersie22')}>More Projects on Github</p>
  <div className="my-7 pt-7">
    <CallToAction/>
  </div>
</div>
  )
}

export default Projects