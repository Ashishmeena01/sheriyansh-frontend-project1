import { useContext } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import { MyStore } from './context/myStore'
import Cart from './components/Cart'


function App() {
  const { productData, isCart} = useContext(MyStore);

  return (
    <>
      <Navbar />
      <div className='w-full h-screen flex flex-wrap gap-2 items-center justify-center'>
        {
          isCart && productData && productData.map((data)=><ProductCard key={data.id}  product={data}/>)
        }
       { 
         !isCart && <Cart/>
       }
        
      </div>
    </>
  )
}



export default App
