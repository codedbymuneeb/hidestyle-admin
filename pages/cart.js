import Link from "next/link";
import { useCart } from "../lib/CartContext";
import Navbar from "../components/Navbar";

export default function CartPage() {
    const { cart, removeFromCart, clearCart, cartTotal } = useCart();

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Navbar />

            <main className="container mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">Your Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
                    {/* Cart Items */}
                    <div className="flex-grow space-y-4">
                        {cart.length === 0 ? (
                            <div className="bg-white p-12 text-center rounded-xl border border-dashed border-slate-200 shadow-sm">
                                <p className="text-slate-500 mb-4 font-medium">Your cart is empty.</p>
                                <Link href="/products" className="text-blue-600 font-bold hover:underline">Continue Shopping</Link>
                            </div>
                        ) : (
                            cart.map((item, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                                    <img src={item.images?.[0] || "https://via.placeholder.com/100"} className="w-20 h-20 object-cover rounded" />
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-slate-800">{item.name}</h3>
                                        <p className="text-sm text-slate-500">${item.price}</p>
                                        <div className="flex gap-4 mt-1 text-[10px] text-slate-400 font-bold uppercase">
                                            {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                                            {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-slate-900">${item.price * item.quantity}</p>
                                        <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                                        <button
                                            onClick={() => removeFromCart(item._id, item.selectedSize, item.selectedColor)}
                                            className="text-red-500 hover:text-red-700 text-xs font-bold uppercase mt-1"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                        {cart.length > 0 && (
                            <button onClick={clearCart} className="text-slate-400 text-sm hover:text-red-500 transition pl-2">Clear Cart</button>
                        )}
                    </div>

                    {/* Order Summary */}
                    {cart.length > 0 && (
                        <div className="w-full lg:w-80 bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-fit">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Order Summary</h3>
                            <div className="space-y-2 border-b pb-4 mb-4 font-medium">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span>${cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600">FREE</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-slate-900 mb-6 font-sans">
                                <span>Total</span>
                                <span>${cartTotal}</span>
                            </div>
                            <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition shadow-md">
                                Checkout Now
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <footer className="bg-slate-100 border-t py-12 px-6 mt-20">
                <div className="container mx-auto text-center text-slate-500">
                    <p className="font-semibold mb-2">Hidestyle © 2026</p>
                </div>
            </footer>
        </div>
    );
}
