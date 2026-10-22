import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import UserFormPage from './pages/UserFormPage'
import AppContext from "./context/AppContext"
import AppLayout from './layouts/AppLayout'
import UserDirectory from './pages/UserDirectory'
import UserProfile from './pages/UserProfile'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/Register'
import HomePage from './pages/HomePage'
import AuthContextProvider from './context/AuthContext'
import ProductsPage from './pages/ProductsPage'


// children: [
//   {
//     path: "create",
//     element: <UserFormPage />
//   },
//   {
//     path:"users",
//     element:<UserDirectory/>
//   },
//   {
//     path:"users/:userId",
//     element:<UserProfile/>,
//   },
//   {
//     path:"users/:userId/edit",
//     element:<UserFormPage/>
//   },
//   {
//     path:"users/new",
//     element:<UserFormPage/>
//   }
// ]

const router = createBrowserRouter([

  {
    path: "/",
    element: <AppLayout />,
    children:[
      {
        path:'login',
        element:<LoginPage/>
      },
      {
        path:'register',
        element:<RegisterPage/>
      },
      {
        path:"/",
        element:<HomePage/>,
        children: [
          {
            path: "create",
            element: <UserFormPage />
          },
          {
            path:"users",
            element:<UserDirectory/>
          },
          {
            path:"users/:userId",
            element:<UserProfile/>,
          },
          {
            path:"users/:userId/edit",
            element:<UserFormPage/>
          },
          {
            path:"users/new",
            element:<UserFormPage/>
          },
          {
            path:"products",
            element:<ProductsPage/>
          }
        ]
      }
    ]
  }
])


function App() {

  return (
    <AppContext>
      <AuthContextProvider>
       <RouterProvider router={router} />
      </AuthContextProvider>
    </AppContext>
  )
}

export default App
