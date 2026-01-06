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
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <span>/</span>
                    <span className="font-bold text-slate-800">Shop</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Categories</h3>
                            <div className="space-y-1">
                                <button
                                    onClick={() => handleCategory(null)}
                                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${!category ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 text-slate-600'}`}
                                >
                                    All
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => handleCategory(cat)}
                                        className={`block w-full text-left px-3 py-2 rounded-lg transition ${category === cat ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 text-slate-600'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Price</h3>
                            <input
                                type="range"
                                min="0"
                                max="5000"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-2">
                                <span>$0</span>
                                <span>Max: ${priceRange}</span>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <main className="flex-grow">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-slate-800">
                                {category || "All Products"}
                            </h1>
                            <select
                                value={sort || "newest"}
                                onChange={handleSort}
                                className="bg-white border rounded-lg px-3 py-2 text-sm outline-none"
                            >
                                <option value="newest">Newest</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>
                        </div>

                        {loading ? (
                            <div className="text-center py-20 text-slate-500">Loading products...</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map(p => (
                                    <ProductCard key={p._id} product={p} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            <footer className="bg-slate-100 border-t py-12 px-6 mt-20">
                <div className="container mx-auto text-center text-slate-500">
                    <p className="font-semibold mb-2">Hidestyle © 2026</p>
                </div>
            </footer>
        </div>
    );
}
