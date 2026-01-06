import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Hidestyle
                </Link>
                <div className="space-x-6">
                    <Link href="/" className="hover:text-blue-400 transition">Home</Link>
                    <Link href="/products" className="hover:text-blue-400 transition">Shop</Link>
                </div>
            </div>
        </nav>
    );
}
