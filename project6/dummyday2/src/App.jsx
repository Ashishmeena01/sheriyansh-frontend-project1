
import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './components/ProductPage'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './pages/ProtectedRoute'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoute />}>
          <Route index element={<Home />}></Route>
        </Route>
        <Route path='product/:id' element={<ProductPage />}></Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </>
  )
}



export default App
