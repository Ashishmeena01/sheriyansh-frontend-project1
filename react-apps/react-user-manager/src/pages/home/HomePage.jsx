
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router'

function HomePage() {
    return (
        <div className='bg-background text-foreground flex min-h-screen flex-col md:flex-row'>
            <Navbar />
            <div className="min-w-0 flex-1">
                <Outlet />
            </div>
        </div>
    )
}

export default HomePage
