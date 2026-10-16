import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import StoreProvider from "./context/StoreContext.jsx"
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import AuthProvider from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <StoreProvider>
                <App />
            </StoreProvider>
        </AuthProvider>
    </BrowserRouter>
)
