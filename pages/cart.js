import { useCart } from "../lib/CartContext";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function CartPage() {
    const { cart, removeFromCart, clearCart } = useCart();

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-4xl font-black text-slate-900 mb-10">Your Bag</h1>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-slate-100">
                        <p className="text-slate-400 text-xl font-bold mb-6">Your bag is empty.</p>
                        <Link href="/products" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-700 transition shadow-lg">
                            Go Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-6">
                            {cart.map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex gap-6 items-center">
                                    <img src={item.images?.[0]} className="w-24 h-24 rounded-2xl object-cover" />
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-black text-slate-900">{item.name}</h3>
                                        <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">{item.category}</p>
                                        <div className="flex gap-4 mt-2 text-xs font-black text-blue-600 uppercase">
                                            {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                                            {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-black text-slate-900">${item.price * item.quantity}</p>
                                        <p className="text-sm text-slate-400 font-bold">Qty: {item.quantity}</p>
                                        <button
                                            onClick={() => removeFromCart(item._id, item.selectedSize, item.selectedColor)}
                                            className="text-red-500 font-bold text-xs uppercase tracking-widest mt-2 hover:text-red-700 transition"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={clearCart}
                                className="text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition pl-4"
                            >
                                Clear Bag
                            </button>
                        </div>

                        <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl h-fit sticky top-24">
                            <h2 className="text-2xl font-black mb-8 border-b border-slate-800 pb-4 uppercase tracking-widest">Order Summary</h2>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between font-bold">
                                    <span className="text-slate-400 uppercase tracking-widest text-xs">Subtotal</span>
                                    <span>${total}</span>
                                </div>
                                <div className="flex justify-between font-bold">
                                    <span className="text-slate-400 uppercase tracking-widest text-xs">Shipping</span>
                                    <span className="text-green-400 uppercase tracking-widest text-xs">Calculated at checkout</span>
                                </div>
                                <div className="flex justify-between font-bold pt-4 border-t border-slate-800 text-xl">
                                    <span className="uppercase tracking-widest">Total</span>
                                    <span className="text-blue-400">${total}</span>
                                </div>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-lg transition shadow-xl uppercase tracking-widest">
                                Checkout Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
