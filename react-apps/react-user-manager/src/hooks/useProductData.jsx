import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { getProducts } from '../api/productsApi';

function useProductData() {
    const q = useQuery({
        queryKey:["productData"],
        queryFn:getProducts,
    })
    
    return q;
}

export default useProductData
