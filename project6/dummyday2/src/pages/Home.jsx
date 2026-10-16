import { useContext } from 'react'
import Navbar from '../components/Navbar'
import { MyStore } from '../context/myStore';
import Cart from "../components/Cart"
import ProductCard from '../components/ProductCard';

function Home() {
    const { productData, isCart } = useContext(MyStore);
    return (
        <>
            <Navbar />
            <div className='w-full h-screen flex flex-wrap gap-2 items-center justify-center'>
                {
                    isCart && productData && productData.map((data) => <ProductCard key={data.id} product={data} />)
                }
                {
                    !isCart && <Cart />
                }

            </div>
        </>
    )
}

export default Home
