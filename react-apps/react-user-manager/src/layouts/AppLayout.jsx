import React from 'react'
import { Outlet } from 'react-router'
import Navbar from "../components/Navbar"


function AppLayout() {
  return (
    <div className='flex gap-2 flex-col'>
      <Outlet/>
    </div>
  )
}

export default AppLayout
