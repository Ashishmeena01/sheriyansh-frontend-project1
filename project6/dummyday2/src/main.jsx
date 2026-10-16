import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from "./context/myStore.jsx"
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import AuthProvider from './context/auth.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <ContextProvider>
                <App />
            </ContextProvider>
        </AuthProvider>
    </BrowserRouter>
)
