import Link from "next/link";
import { useCart } from "../lib/CartContext";

export default function Navbar() {
    const { cartCount } = useCart();

    return (
        <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Hidestyle
                </Link>
                <div className="flex items-center space-x-6">
                    <Link href="/" className="hover:text-blue-400 transition">Home</Link>
                    <Link href="/products" className="hover:text-blue-400 transition">Shop</Link>
                    <Link href="/admin/dashboard" className="text-sm bg-slate-800 px-3 py-1 rounded hover:bg-slate-700 transition">
                        Admin
                    </Link>
                    <Link href="/cart" className="relative group">
                        <span className="hover:text-blue-400 transition">Cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
