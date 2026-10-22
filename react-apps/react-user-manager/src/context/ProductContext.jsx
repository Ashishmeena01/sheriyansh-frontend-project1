import { useContext } from "react";



const ProductContext = useContext();

function ProductContextProvider({children}) {

  return (
    <ProductContext.Provider value={{ deleteUser, setUserData, userData }}>
        {children}
    </ProductContext.Provider>
  )
}

export default ProductContextProvider
