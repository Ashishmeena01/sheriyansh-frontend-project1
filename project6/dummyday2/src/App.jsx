
import './App.css'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Products from './components/Products'

function App() {

  return (
    <>
    <Routes>
     <Route index element={<Home/>}></Route>
     <Route path='product/:id' element={<Products/>}></Route>
    </Routes>
    </>
  )
}



export default App
