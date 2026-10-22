
import { useEffect, useMemo, useState } from "react";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("default");

    const 
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(
                    "https://dummyjson.com/products?limit=30"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                setProducts(data.products);
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const categories = useMemo(
        () => [...new Set(products.map((product) => product.category))],
        [products]
    );

    const filteredProducts = useMemo(() => {
        let result = products.filter((product) => {
            const matchesSearch =
                product.title.toLowerCase().includes(search.toLowerCase()) ||
                product.brand?.toLowerCase().includes(search.toLowerCase());

            const matchesCategory =
                category === "all" || product.category === category;

            return matchesSearch && matchesCategory;
        });

        if (sort === "low") {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sort === "high") {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if (sort === "rating") {
            result = [...result].sort((a, b) => b.rating - a.rating);
        }

        return result;
    }, [products, search, category, sort]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-gray-500">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 text-gray-900">
            {/* Header */}
            <header className="border-b bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-black tracking-tight">
                        Shop<span className="text-blue-600">Ease.</span>
                    </h1>

                    <span className="text-sm text-gray-500">
                        Discover your next favorite
                    </span>
                </div>
            </header>

            {/* Hero */}
            <section className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 lg:px-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
                    Our collection
                </p>

                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                    Find something you love.
                </h2>

                <p className="mt-3 max-w-xl text-gray-500">
                    Explore our collection of products, compare prices, and
                    find the right fit for you.
                </p>
            </section>

            {/* Search and filters */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 sm:flex-row">
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products or brands..."
                        className="min-w-0 flex-1 rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="rounded-lg border bg-white px-4 py-3 outline-none focus:border-blue-500"
                    >
                        <option value="all">All categories</option>
                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </option>
                        ))}
                    </select>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="rounded-lg border bg-white px-4 py-3 outline-none focus:border-blue-500"
                    >
                        <option value="default">Sort: Recommended</option>
                        <option value="low">Price: Low to high</option>
                        <option value="high">Price: High to low</option>
                        <option value="rating">Top rated</option>
                    </select>
                </div>
            </section>

            {/* Product count */}
            <section className="mx-auto max-w-7xl px-4 pb-5 pt-8 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">All products</h3>
                    <p className="text-sm text-gray-500">
                        {filteredProducts.length} products
                    </p>
                </div>
            </section>

            {/* Product grid */}
            <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                {filteredProducts.length === 0 ? (
                    <div className="rounded-xl border border-dashed bg-white py-20 text-center">
                        <h3 className="text-lg font-semibold">No products found</h3>
                        <p className="mt-2 text-gray-500">
                            Try another search or category.
                        </p>
                        <button
                            onClick={() => {
                                setSearch("");
                                setCategory("all");
                            }}
                            className="mt-4 rounded-lg bg-black px-5 py-2 text-white"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredProducts.map((product) => (
                            <article
                                key={product.id}
                                className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="relative flex h-60 items-center justify-center overflow-hidden bg-gray-100 p-5">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        loading="lazy"
                                        className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                                    />

                                    {product.discountPercentage > 0 && (
                                        <span className="absolute left-3 top-3 rounded-md bg-red-600 px-2 py-1 text-xs font-bold text-white">
                                            {Math.round(product.discountPercentage)}% OFF
                                        </span>
                                    )}

                                    <span
                                        className={`absolute right-3 top-3 rounded-md px-2 py-1 text-xs font-medium ${product.stock > 0
                                                ? "bg-white text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {product.availabilityStatus}
                                    </span>
                                </div>

                                <div className="space-y-3 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                        {product.brand || product.category}
                                    </p>

                                    <h4 className="min-h-12 font-semibold leading-6">
                                        {product.title}
                                    </h4>

                                    <p className="line-clamp-2 text-sm text-gray-500">
                                        {product.description}
                                    </p>

                                    <div className="flex items-center gap-1 text-sm">
                                        <span className="text-amber-500">★</span>
                                        <span className="font-semibold">
                                            {product.rating}
                                        </span>
                                        <span className="text-gray-400">/ 5</span>
                                    </div>

                                    <div className="flex items-center justify-between border-t pt-3">
                                        <div>
                                            <p className="text-xl font-bold">
                                                ${product.price.toFixed(2)}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {product.stock} in stock
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                alert(`Selected: ${product.title}`)
                                            }
                                            className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600"
                                        >
                                            View product
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            <footer className="border-t bg-white py-6 text-center text-sm text-gray-500">
                © 2026 ShopEase. Demo storefront.
            </footer>
        </main>
    );
}
