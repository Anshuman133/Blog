import React from 'react'
import { Navbar } from '../component/Navbar'
import { Footer } from '../component/footer'
import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <div className=' font-san '>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
