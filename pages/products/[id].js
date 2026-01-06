import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { useCart } from "../../lib/CartContext";

export default function ProductDetail() {
    const router = useRouter();
    const { id } = router.query;
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/products/${id}`);
            const data = await res.json();
            setProduct(data);
            if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
            if (data.colors?.length > 0) setSelectedColor(data.colors[0]);

            // Fetch related products (same category)
            const relatedRes = await fetch(`/api/products?category=${data.category}`);
            const relatedData = await relatedRes.json();
            setRelatedProducts(relatedData.filter(p => p._id !== id).slice(0, 4));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="container mx-auto p-20 text-center text-slate-400 font-bold animate-pulse text-2xl">
                Elevating Style...
            </div>
        </div>
    );

    if (!product) return <div>Product not found</div>;

    const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            <main className="container mx-auto px-6 py-12">
                {/* Breadcrumbs */}
                <nav className="flex text-sm text-slate-500 mb-8 items-center gap-2">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <span>/</span>
                    <Link href="/products" className="hover:text-blue-600">Shop</Link>
                    <span>/</span>
                    <span className="font-bold text-slate-800">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm">
                            <img
                                src={product.images?.[activeImage] || "https://via.placeholder.com/600"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {product.images?.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition ${activeImage === idx ? 'border-blue-600' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                >
                                    <img src={img} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-blue-600 font-semibold text-sm mb-1">{product.category}</p>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>
                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-bold text-blue-600">${product.price}</span>
                                {product.oldPrice && (
                                    <span className="text-xl text-slate-400 line-through">${product.oldPrice}</span>
                                )}
                            </div>
                        </div>

                        <p className="text-slate-600 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="py-6 border-y border-slate-100 space-y-4">
                            {product.sizes?.length > 0 && (
                                <div>
                                    <label className="text-sm font-bold text-slate-800 mb-2 block">Size</label>
                                    <div className="flex gap-2">
                                        {product.sizes.map(size => (
                                            <button
                                                key={size}
                                                className="px-4 py-2 border rounded-lg hover:border-blue-600 transition"
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="text-sm font-bold text-slate-800 mb-2 block">Quantity: {product.stock} available</label>
                                <div className="flex items-center border rounded-lg w-fit">
                                    <button className="px-3 py-1 border-r hover:bg-slate-50 text-slate-500"> - </button>
                                    <span className="px-6 py-1 font-bold">1</span>
                                    <button className="px-3 py-1 border-l hover:bg-slate-50 text-slate-500"> + </button>
                                </div>
                            </div>
                        </div>

                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg"
                        >
                            Buy This Now
                        </button>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-20">
                        <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">You Might Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(p => (
                                <ProductCard key={p._id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <footer className="bg-slate-100 border-t py-12 px-6 mt-20">
                <div className="container mx-auto text-center text-slate-500">
                    <p className="font-semibold mb-2">Hidestyle © 2026</p>
                </div>
            </footer>
        </div>
    );
}
