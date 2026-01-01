import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    const featured = products.filter((p) => p.featured);

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-20 px-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in">
                        Elevate Your <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Style</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                        Discover the latest trends and essential pieces for your wardrobe. High quality, premium designs, delivered to your door.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition shadow-xl">
                        Shop Collection
                    </button>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 px-6 container mx-auto">
                <h2 className="text-3xl font-bold text-slate-800 mb-12 flex items-center gap-4">
                    <span className="h-1 w-12 bg-blue-600 rounded-full"></span>
                    Featured Collections
                </h2>

                {products.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-slate-500 italic">No products found. Add some from the Admin Panel!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="bg-slate-100 border-t py-12 px-6">
                <div className="container mx-auto text-center text-slate-500">
                    <p className="font-semibold mb-2">Hidestyle © 2026</p>
                    <p className="text-sm italic">Created with ❤️ by Antigravity</p>
                </div>
            </footer>
        </div>
    );
}
