
import { Navigate, Outlet } from 'react-router'
import { useAuth } from './context/AuthContext';

function ProtectedPage() {
    const { loggedInUser, isAuthLoading } = useAuth();
    if (isAuthLoading) {
        return <div className="text-muted-foreground p-8" role="status">Checking your session...</div>;
    }
    if (!loggedInUser) {
        return <Navigate to="/login" replace />
    }
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default ProtectedPage
