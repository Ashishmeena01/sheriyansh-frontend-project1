import axios from 'axios';
import { createContext, useEffect, useState } from 'react'


const StoreContext = createContext();
function StoreProvider({ children }) {
    const [productData, setProductData] = useState([])
    const [isCart, setIsCart] = useState(true);
   

    async function fetchData() {
        const data = (await axios.get("https://fakestoreapi.com/products")).data;
        setProductData(() => {
            return data.map((val) => {
                return { ...val, count: 0 };
            })
        });
        return;
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <StoreContext.Provider value={{ productData, isCart, setIsCart, setProductData}}>
            {
                children
            }
        </StoreContext.Provider>
    )
}

export { StoreContext }
export default StoreProvider
