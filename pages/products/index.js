import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {
    const router = useRouter();
    const { category, sort } = router.query;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceRange, setPriceRange] = useState(5000);

    useEffect(() => {
        fetchProducts();
    }, [category, sort]);

    const fetchProducts = async () => {
        setLoading(true);
        const query = new URLSearchParams(router.query).toString();
        const res = await fetch(`/api/products?${query}`);
        const data = await res.json();
        setProducts(data);
        setLoading(false);
    };

    const handleSort = (e) => {
        router.push({
            pathname: "/products",
            query: { ...router.query, sort: e.target.value }
        });
    };

    const handleCategory = (cat) => {
        const newQuery = { ...router.query };
        if (cat) {
            newQuery.category = cat;
        } else {
            delete newQuery.category;
        }
        router.push({
            pathname: "/products",
            query: newQuery
        });
    };

    const categories = ["Apparel", "Footwear", "Accessories", "Electronics", "Lifestyle"];

    const filteredProducts = products.filter(p => p.price <= priceRange);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Navbar />

            <div className="container mx-auto px-6 py-8">
                {/* Breadcrumbs */}
                <nav className="flex text-sm text-slate-500 mb-8 items-center gap-2">
                    <button onClick={() => router.push("/")} className="hover:text-blue-600">Home</button>
                    <span>/</span>
                    <span className="font-bold text-slate-900">All Products</span>
                    {category && (
                        <>
                            <span>/</span>
                            <span className="text-blue-600">{category}</span>
                        </>
                    )}
                </nav>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 space-y-8 flex-shrink-0">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Categories</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => handleCategory(null)}
                                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${!category ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-200 text-slate-600'}`}
                                >
                                    All Categories
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => handleCategory(cat)}
                                        className={`block w-full text-left px-3 py-2 rounded-lg transition ${category === cat ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-200 text-slate-600'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Price Range</h3>
                            <div className="px-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="5000"
                                    step="100"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between text-xs text-slate-500 mt-2 font-bold">
                                    <span>$0</span>
                                    <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded">Max: ${priceRange}</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <main className="flex-grow">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                            <div>
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                                    {category ? `${category} Collection` : "All Products"}
                                </h1>
                                <p className="text-slate-500 text-sm mt-1">Showing {filteredProducts.length} results</p>
                            </div>

                            <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Sort by:</span>
                                <select
                                    value={sort || "newest"}
                                    onChange={handleSort}
                                    className="bg-transparent text-sm font-bold text-slate-700 outline-none pr-4 cursor-pointer"
                                >
                                    <option value="featured">Best Selling</option>
                                    <option value="newest">Newest First</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="bg-slate-200 animate-pulse h-[400px] rounded-2xl"></div>
                                ))}
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                                <p className="text-slate-400 text-xl font-medium">No products found for this criteria.</p>
                                <button
                                    onClick={() => handleCategory(null)}
                                    className="mt-4 text-blue-600 font-bold hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredProducts.map(p => (
                                    <ProductCard key={p._id} product={p} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Simple Footer */}
            <footer className="mt-20 bg-slate-900 text-white py-12">
                <div className="container mx-auto px-6 text-center">
                    <p className="font-bold text-xl mb-2">HideStyle</p>
                    <p className="text-slate-400 text-sm">Premium Quality. Modern Aesthetics.</p>
                </div>
            </footer>
        </div>
    );
}
