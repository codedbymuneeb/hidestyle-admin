import Link from "next/link";
import { useCart } from "../lib/CartContext";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 flex flex-col h-full transform hover:-translate-y-2">
            <Link href={`/products/${product._id}`} className="relative h-72 overflow-hidden block">
                <img
                    src={product.images?.[0] || "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.featured && (
                        <span className="bg-yellow-400 text-slate-900 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            Featured
                        </span>
                    )}
                    {discount > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            -{discount}%
                        </span>
                    )}
                </div>

                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-2">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{product.category}</span>
                    <Link href={`/products/${product._id}`}>
                        <h3 className="text-lg font-bold text-slate-800 hover:text-blue-600 transition truncate mt-1">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                <div className="mt-auto flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        {product.oldPrice && (
                            <span className="text-xs text-slate-400 line-through">${product.oldPrice}</span>
                        )}
                        <span className="text-xl font-extrabold text-blue-600">${product.price}</span>
                    </div>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                        className="bg-slate-900 hover:bg-blue-600 text-white p-3 rounded-xl transition-colors duration-300 shadow-lg group/btn"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
