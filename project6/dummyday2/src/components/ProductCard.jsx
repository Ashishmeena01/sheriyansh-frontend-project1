import { useContext } from "react";
import { MyStore } from "../context/myStore";
import { useNavigate } from "react-router-dom";

function ProductCard({product}) {
    const { setProductData} = useContext(MyStore);
    const navigate = useNavigate();

    return (
        <div  className="w-full max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-md transition hover:shadow-xl">
            {/* Product Image */}
            <div onClick={() => navigate(`/product/${product.id}`)}>
                <div className="flex h-52 items-center justify-center">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-contain"
                    />
                </div>

                {/* Product Details */}
                <p className="mt-4 text-sm capitalize text-gray-500">
                    {product.category}
                </p>

                <h2 className="mt-2 line-clamp-2 text-lg font-semibold text-gray-900">
                    {product.title}
                </h2>

                <p className="mt-3 line-clamp-2 text-sm text-gray-600">
                    {product.description}
                </p>

                {/* Price and Rating */}
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                    </span>

                    <span className="text-sm text-yellow-600">
                        ★ {product.rating.rate} ({product.rating.count})
                    </span>
                </div>

             </div>
            {!product.count && <button
                onClick={() => {
                    setProductData((val) => {
                        return val.map((val1) => {
                            if (val1.id === product.id) {
                                return {
                                    ...val1,
                                    count: val1.count + 1
                                }
                            }
                            return val1;
                        })
                    })
                }}
                className="mt-5 flex gap-2 items-center justify-center w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800"
            >
                Add to Cart  
            </button>}

            {product.count>0 && <div className="w-full flex items-center justify-center gap-2">
                <button onClick={() => {
                    setProductData((val) => {
                        return val.map((val1) => {
                            if (val1.id === product.id) {
                                return {
                                    ...val1,
                                    count: val1.count + 1
                                }
                            }
                            return val1;
                        })
                    })
                }}>add</button>
                <span>{product.count}</span>
                <button
                    onClick={() => {
                        setProductData((val) => {
                            return val.map((val1) => {
                                if (val1.id === product.id) {
                                    return {
                                        ...val1,
                                        count: val1.count > 0 ? val1.count - 1 : 0
                                    }
                                }
                                return val1;
                            })
                        })
                    }}
                >remove
                </button>
            </div>}

        </div>
    );
}

export default ProductCard;
