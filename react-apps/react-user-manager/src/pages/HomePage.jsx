import React from 'react'
import Navbar from '../components/Navbar'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../context/AuthContext'

function HomePage() {
    let { loggedInUser } = useAuth();

    if(!loggedInUser){
        return <Navigate to={"/login"}/>
    }
    return (
        <div className='flex gap-2'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default HomePage