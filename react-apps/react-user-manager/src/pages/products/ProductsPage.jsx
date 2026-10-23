
import useProductData from "../../hooks/useProductData";
import ProductCard from "../../components/ProductCard";




export default function ProductsPage() {

    const { isLoading, data, error } = useProductData();

    if (isLoading) {
        return (
            <main className="flex min-h-[50vh] w-full items-center justify-center px-4">
                <p className="text-lg text-muted-foreground">Loading products...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex min-h-[50vh] w-full items-center justify-center px-4">
                <p className="text-muted-foreground" role="alert">Could not load products: {error.message}</p>
            </main>
        );
    }

    const products = data.products;

    return (
        <main className="bg-background text-foreground min-h-screen w-full min-w-0">
            {/* Header */}
            <header className="border-border bg-card border-b">
                <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
                    <h1 className="text-2xl font-black tracking-tight">
                        Shop<span className="text-primary">Ease.</span>
                    </h1>

                    <span className="text-muted-foreground hidden text-sm sm:block">
                        Discover your next favorite
                    </span>
                </div>
            </header>

            {/* Hero */}
            <section className="mx-auto max-w-screen-2xl px-4 pb-6 pt-8 sm:px-6 sm:pb-8 sm:pt-10 lg:px-10">
                <p className="text-primary mb-3 text-sm font-semibold uppercase tracking-widest">
                    Our collection
                </p>

                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                    Find something you love.
                </h2>

                <p className="text-muted-foreground mt-3 max-w-xl">
                    Explore our collection of products, compare prices, and
                    find the right fit for you.
                </p>
            </section>


            {/* Product count */}
            <section className="mx-auto max-w-screen-2xl px-4 pb-4 pt-5 sm:px-6 lg:px-10">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">All products</h3>
                    <p className="text-muted-foreground text-sm">
                        {products.length} {products.length === 1 ? "product" : "products"}
                    </p>
                </div>
            </section>

            {/* Product grid */}
            <section className="mx-auto max-w-screen-2xl px-4 pb-12 sm:px-6 lg:px-10">
                {products.length === 0 ? (
                    <div className="border-border bg-card rounded-xl border border-dashed py-20 text-center">
                        <h3 className="text-lg font-semibold">No products found</h3>
                        <p className="text-muted-foreground mt-2">
                            Try another search or category.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {products.map((product) => {
                             return <ProductCard key={product.id} product={product}/>
                        })}
                    </div>
                )}
            </section>

            <footer className="border-border bg-card text-muted-foreground border-t py-6 text-center text-sm">
                © 2026 ShopEase. Demo storefront.
            </footer>
        </main>
    );
}
