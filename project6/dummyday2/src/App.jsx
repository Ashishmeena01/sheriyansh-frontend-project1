
import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Products from './components/Products'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedPage from './pages/ProtectedPage'


function App() {

  return (
    <>
      <Routes>
        <Route path='/'  element={<ProtectedPage/>}>
          <Route index element={<Home />}></Route>
        </Route>
        <Route path='product/:id' element={<Products />}></Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </>
  )
}



export default App
