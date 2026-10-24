
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from './page/login'
import Register from './page/register'
import Home from './page/home'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "register",
    element: <Register />
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
