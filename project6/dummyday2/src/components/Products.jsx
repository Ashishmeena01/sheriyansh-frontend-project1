
import { useContext, useEffect, useState } from "react";
import {
    ShoppingCart,
    ArrowLeft,
    Plus,
    Minus,
    ShieldCheck,
    Truck,
} from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MyStore } from "../context/myStore";

export default function ProductPage() {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const {id} = useParams();
    const {setProductData} = useContext(MyStore);

    
    const handleAddToCart = () => {
        
        setProductData((val) => {
            return val.map((val1) => {
                if (val1.id === product.id) {
                    return {
                        ...val1,
                        count: quantity
                    }
                }
                return val1;
            })
        })
   
        setAdded(true);
    };
    
    const fetchProduct = async () =>{
        const data = (await axios.get(`https://fakestoreapi.com/products/${id}`)).data;
        console.log(data);
        setProduct(data);
    }
    
    useEffect(()=>{
        fetchProduct();
    },[])
    
    if(!id || !product) return <div className="w-full h-screen flex items-center justify-center">No product to show</div>
    return (
        <main className="min-h-screen bg-white px-5 py-8 text-neutral-900 sm:px-10 lg:px-20">
            <div className="mx-auto max-w-7xl">
                {/* Back Button */}
                <button
                    onClick={() => window.history.back()}
                    className="mb-8 flex items-center gap-2 text-sm text-neutral-500 hover:text-black"
                >
                    <ArrowLeft size={17} />
                    Back
                </button>

                <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* Product Image */}
                    <div className="flex min-h-[380px] items-center justify-center overflow-hidden rounded-2xl bg-neutral-100 p-8 sm:min-h-[550px]">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="max-h-[480px] w-full object-contain mix-blend-multiply"
                        />
                    </div>

                    {/* Product Details */}
                    <section className="flex flex-col justify-center">
                        <span className="mb-4 w-fit rounded-full bg-neutral-100 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-600">
                            {product.category}
                        </span>

                        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                            {product.title}
                        </h1>

                        <p className="mt-5 text-3xl font-medium">
                            ${Number(product.price).toFixed(2)}
                        </p>

                        <div className="my-8 h-px bg-neutral-200" />

                        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider">
                            Description
                        </h2>

                        <p className="max-w-xl text-base leading-7 text-neutral-600">
                            {product.description}
                        </p>

                        {/* Quantity */}
                        <div className="mt-8">
                            <label className="mb-3 block text-sm font-medium">
                                Quantity
                            </label>

                            <div className="flex w-fit items-center rounded-lg border border-neutral-300">
                                <button
                                    onClick={() =>
                                        setQuantity((q) => Math.max(1, q - 1))
                                    }
                                    disabled={quantity <= 1}
                                    aria-label="Decrease quantity"
                                    className="p-3 hover:bg-neutral-100 disabled:opacity-40"
                                >
                                    <Minus size={16} />
                                </button>

                                <span className="min-w-12 text-center text-sm">
                                    {quantity}
                                </span>

                                <button
                                    onClick={() => setQuantity((q) => q + 1)}
                                    aria-label="Increase quantity"
                                    className="p-3 hover:bg-neutral-100"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-black px-6 py-4 font-medium text-white transition hover:bg-neutral-800 active:scale-[0.99]"
                        >
                            <ShoppingCart size={19} />
                            {added
                                ? `Added ${quantity} to Cart`
                                : `Add to Cart — $${(
                                    Number(product.price) * quantity
                                ).toFixed(2)
                                } `}
                        </button>

                        {/* Benefits */}
                        <div className="mt-8 grid gap-5 border-t border-neutral-200 pt-6 sm:grid-cols-2">
                            <div className="flex items-center gap-3">
                                <Truck size={21} className="shrink-0 text-neutral-500" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Delivery available
                                    </p>
                                    <p className="mt-1 text-xs text-neutral-500">
                                        Shipping details at checkout
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <ShieldCheck
                                    size={21}
                                    className="shrink-0 text-neutral-500"
                                />
                                <div>
                                    <p className="text-sm font-medium">
                                        Secure checkout
                                    </p>
                                    <p className="mt-1 text-xs text-neutral-500">
                                        Shop with confidence
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}