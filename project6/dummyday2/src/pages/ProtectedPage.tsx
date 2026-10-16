import React, { ReactNode } from 'react'
import { useNavigate,Navigate, Outlet } from 'react-router-dom';

function ProtectedPage({ children ,}:{children:ReactNode}) {
    let authenticated = false;
    let navigate = useNavigate();

    // if(!authenticated) return <Navigate to={"/login"}/>;
    return  (
        <div>
            <Outlet/>
        </div>
    )

}

export default ProtectedPage
