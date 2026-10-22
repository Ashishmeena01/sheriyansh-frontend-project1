
import { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";

function CartCard({item}){
    const {setProductData} = useContext(StoreContext)

    function updateQuantity(c) {
        setProductData((prevCart) =>
            prevCart.map((item1) =>
                item1.id === item.id
                    ? {
                        ...item1,
                        count: item1.count + c
                    }
                    : item1
            )
        );
    }

    return (<div
        key={item.id}
        className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm sm:flex-row sm:items-center"
    >
        <img
            src={item.image}
            alt={item.title}
            className="h-28 w-28 object-contain"
        />

        <div className="flex-1">
            <h2 className="font-semibold">{item.title}</h2>

            <p className="mt-2 text-lg font-bold">
                ${item.price.toFixed(2)}
            </p>

            <div className="mt-3 flex items-center gap-3">
                <button
                    onClick={() => updateQuantity(-1)}
                    className="rounded border px-3 py-1"
                >
                    -
                </button>

                <span>{item.count}</span>

                <button
                    onClick={() => updateQuantity( 1)}
                    className="rounded border px-3 py-1"
                >
                    +
                </button>
            </div>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-end">
            <p className="font-bold">
                ${(item.price * item.count).toFixed(2)}
            </p>

            <button
                onClick={() => updateQuantity(-item.count)}
                className="text-sm text-red-600 hover:underline"
            >
                Remove
            </button>
        </div>
    </div>)
}



function Cart() {
    const { productData, setProductData } = useContext(StoreContext)

    

 
    const itemsQuantity = productData.filter((val)=> val.count  > 1 ).length;

    const total = productData.reduce(
        (sum, item) => sum + item.price * item.count,
        0
    );

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-6 text-3xl font-bold">
                    Shopping Cart ({itemsQuantity} items)
                </h1>

                <div className="space-y-4">
                    {productData.map((item) => {
                        if(item.count <= 0) return;  
                        return <CartCard item={item}/>}
                    )}
                </div>

                {productData.length === 0 ? (
                    <p className="mt-8 text-center text-gray-500">
                        Your cart is empty.
                    </p>
                ) : (
                    <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
                        <div className="flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button
                            onClick={() => alert("Proceeding to checkout!")}
                            className="mt-5 w-full rounded-lg bg-black py-3 text-white hover:bg-gray-800"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
