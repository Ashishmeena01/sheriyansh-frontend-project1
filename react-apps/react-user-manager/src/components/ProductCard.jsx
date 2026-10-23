
const ProductCard = ({ product }) => {
    const {
        title,
        description,
        category,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        sku,
        shippingInformation,
        availabilityStatus,
        reviews,
        images,
        thumbnail,
    } = product;

    const discountedPrice = (
        price * (1 - discountPercentage / 100)
    ).toFixed(2);

    const productImage = images?.[0] || thumbnail;

    return (
        <article
            className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
            {/* Product Image */}
            <div className="bg-muted relative flex h-52 shrink-0 items-center justify-center p-5 sm:h-56">
                <span
                    className="bg-secondary text-secondary-foreground absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold"
                >
                    {availabilityStatus}
                </span>

                <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {discountPercentage}% OFF
                </span>

                <img
                    src={productImage}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-contain grayscale transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Product Information */}
            <div className="flex flex-1 flex-col p-4 sm:p-5">
                <p className="text-primary text-xs font-semibold uppercase tracking-widest">
                    {brand || category}
                </p>

                <h2 className="text-foreground mt-2 line-clamp-2 text-lg font-bold">
                    {title}
                </h2>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-2">
                    <span className="text-muted-foreground">★</span>
                    <span className="text-foreground text-sm font-semibold">
                        {rating}
                    </span>
                    <span className="text-muted-foreground text-sm">
                        ({reviews?.length || 0} reviews)
                    </span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mt-3 line-clamp-3 text-sm leading-6">
                    {description}
                </p>

                {/* Pricing */}
                <div className="mt-4 flex items-center gap-3">
                    <span className="text-foreground text-2xl font-bold">
                        ${discountedPrice}
                    </span>

                    {discountPercentage > 0 && (
                        <span className="text-muted-foreground text-sm line-through">
                            ${price.toFixed(2)}
                        </span>
                    )}
                </div>

                {/* Product Details */}
                <div className="text-muted-foreground mt-4 space-y-2 border-t border-border pt-4 text-sm">
                    <p>📦 Stock: {stock}</p>
                    <p>🚚 {shippingInformation}</p>
                    <p className="truncate">SKU: {sku}</p>
                </div>

                {/* Add to Cart */}
                <button
                    type="button"
                    disabled={stock <= 0 || availabilityStatus !== "In Stock"}
                    className="mt-auto w-full rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
                >
                    {stock <= 0 || availabilityStatus !== "In Stock"
                        ? "Out of Stock"
                        : "Add to Cart"}
                </button>
            </div>
        </article>
    );
};

export default ProductCard;
