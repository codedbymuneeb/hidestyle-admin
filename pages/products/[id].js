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
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="container mx-auto px-6 py-12">
                {/* Breadcrumbs */}
                <nav className="flex text-xs text-slate-400 mb-8 items-center gap-2 uppercase tracking-widest font-bold">
                    <button onClick={() => router.push("/")} className="hover:text-blue-600">Home</button>
                    <span>/</span>
                    <button onClick={() => router.push("/products")} className="hover:text-blue-600">Shop</button>
                    <span>/</span>
                    <span className="text-slate-900">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Image Gallery */}
                    <div className="space-y-4 sticky top-24">
                        <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-100 shadow-inner group">
                            <img
                                src={product.images?.[activeImage] || "https://via.placeholder.com/600"}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {product.images?.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`w-24 h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${activeImage === idx ? 'border-blue-600 scale-95 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8">
                        <div>
                            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-3 block">{product.category}</span>
                            <h1 className="text-5xl font-black text-slate-900 leading-tight mb-4">{product.name}</h1>

                            <div className="flex items-center gap-4">
                                <span className="text-4xl font-black text-blue-600">${product.price}</span>
                                {product.oldPrice && (
                                    <div className="flex flex-col">
                                        <span className="text-lg text-slate-400 line-through font-bold">${product.oldPrice}</span>
                                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-black uppercase">Save {discount}%</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description Short */}
                        <p className="text-slate-600 text-lg leading-relaxed">
                            {product.description?.substring(0, 200)}...
                        </p>

                        {/* Variants */}
                        <div className="space-y-6 py-6 border-y border-slate-100">
                            {product.sizes?.length > 0 && (
                                <div>
                                    <label className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3 block">Select Size</label>
                                    <div className="flex gap-3 flex-wrap">
                                        {product.sizes.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-6 py-3 rounded-xl font-bold transition-all border-2 ${selectedSize === size ? 'border-slate-900 bg-slate-900 text-white shadow-xl' : 'border-slate-100 text-slate-600 hover:border-slate-300'}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {product.colors?.length > 0 && (
                                <div>
                                    <label className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3 block">Select Color</label>
                                    <div className="flex gap-4 flex-wrap">
                                        {product.colors.map(color => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                style={{ backgroundColor: color.toLowerCase() }}
                                                className={`w-10 h-10 rounded-full border-4 transition-all ${selectedColor === color ? 'border-blue-600 scale-125 shadow-lg' : 'border-white ring-1 ring-slate-200 hover:scale-110'}`}
                                                title={color}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3 block">Quantity</label>
                                <div className="flex items-center gap-4 bg-slate-50 w-fit rounded-2xl p-1 border border-slate-100">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 flex items-center justify-center font-bold text-slate-500 hover:text-slate-900 transition"
                                    > - </button>
                                    <span className="w-8 text-center font-black text-slate-900">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 flex items-center justify-center font-bold text-slate-500 hover:text-slate-900 transition"
                                    > + </button>
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
                                className="flex-grow bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:translate-y-[-2px] active:translate-y-[0px] flex items-center justify-center gap-3"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Add to Cart
                            </button>
                            <button className="p-5 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors text-slate-400 hover:text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>

                        {/* Stock status */}
                        <div className="flex items-center gap-2 text-sm font-bold">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-slate-500 uppercase tracking-widest">{product.stock} pieces left in stock</span>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-24">
                    <div className="flex gap-12 border-b border-slate-100 mb-8">
                        {["description", "size guide", "reviews"].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-sm font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {tab}
                                {activeTab === tab && <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-blue-600 rounded-full"></span>}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-4xl min-h-[200px]">
                        {activeTab === "description" && (
                            <div className="text-slate-600 leading-loose text-lg whitespace-pre-line">
                                {product.description}
                                <br /><br />
                                <h4 className="font-black text-slate-800 uppercase tracking-widest mb-4">Features</h4>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Premium Quality Materials</li>
                                    <li>Sustainable manufacturing process</li>
                                    <li>Tested for durability</li>
                                    <li>Ergonomic design for maximum comfort</li>
                                </ul>
                            </div>
                        )}
                        {activeTab === "size guide" && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest">
                                            <th className="p-4 border">Size</th>
                                            <th className="p-4 border">Chest (in)</th>
                                            <th className="p-4 border">Waist (in)</th>
                                            <th className="p-4 border">Length (in)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-600 font-bold">
                                        <tr><td className="p-4 border font-black text-slate-900">S</td><td className="p-4 border">36-38</td><td className="p-4 border">30-32</td><td className="p-4 border">27.5</td></tr>
                                        <tr className="bg-slate-50/50"><td className="p-4 border font-black text-slate-900">M</td><td className="p-4 border">38-40</td><td className="p-4 border">32-34</td><td className="p-4 border">28.5</td></tr>
                                        <tr><td className="p-4 border font-black text-slate-900">L</td><td className="p-4 border">40-42</td><td className="p-4 border">34-36</td><td className="p-4 border">29.5</td></tr>
                                        <tr className="bg-slate-50/50"><td className="p-4 border font-black text-slate-900">XL</td><td className="p-4 border">42-44</td><td className="p-4 border">36-38</td><td className="p-4 border">30.5</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === "reviews" && (
                            <div className="space-y-8">
                                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-4xl font-black text-slate-900 mb-1">4.9</p>
                                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Average Rating</p>
                                    </div>
                                    <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition">Write a Review</button>
                                </div>
                                <div className="py-4">
                                    <p className="text-slate-400 italic">No reviews yet. Be the first to review this product!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-32">
                        <div className="flex justify-between items-end mb-10">
                            <div>
                                <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-2 block">You Might Also Like</span>
                                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Complete the Look</h2>
                            </div>
                            <button onClick={() => router.push("/products")} className="text-slate-900 font-black uppercase text-xs tracking-widest border-b-2 border-slate-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition">View All</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map(p => (
                                <ProductCard key={p._id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <footer className="mt-32 bg-slate-900 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <p className="font-extrabold text-3xl mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">HideStyle</p>
                    <p className="text-slate-400 text-sm max-w-md mx-auto mb-10">The ultimate destination for modern fashion. Elevate your everyday style with our premium collections.</p>
                    <div className="flex justify-center gap-8 text-xs font-bold uppercase tracking-widest">
                        <a href="#" className="hover:text-blue-400 transition underline underline-offset-8">Shop</a>
                        <a href="#" className="hover:text-blue-400 transition">About</a>
                        <a href="#" className="hover:text-blue-400 transition">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
