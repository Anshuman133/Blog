import React from 'react'
import { Link } from 'react-router-dom'

export const Projects = () => {
  return (
    <div className='sm:mx-10  md:mx-26 mt-10'>
        {/* Top home */}
       <div className='flex justify-center border-y-2 pb-4 border-gray-400 '>
        <h1 className='lg:text-[270px] md:text-[150px] text-7xl font-sans font-bold leading-none '>PROJECTS</h1>
       </div>

       <div className='flex justify-center mt-10'>
        <Link 
        to={'https://anshumanparida.vercel.app/'}
        className='text-xl '> Portfolio</Link>
       </div>
    </div>
  )
}
