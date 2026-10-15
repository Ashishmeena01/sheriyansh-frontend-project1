import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from "./context/myStore.jsx"
import { BrowserRouter, RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ContextProvider>
          <App />
      </ContextProvider>
    </BrowserRouter>
)
