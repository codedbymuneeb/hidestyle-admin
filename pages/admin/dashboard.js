import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
    };

    const deleteProduct = async (id) => {
        if (confirm("Delete this product?")) {
            await fetch(`/api/products/${id}`, { method: "DELETE" });
            fetchProducts();
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900">Admin Dashboard</h1>
                    <Link href="/admin/add" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">
                        + Add Product
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-slate-500 font-medium">Loading products...</div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="p-4">Product</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Stock</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {products.map((p) => (
                                    <tr key={p._id} className="hover:bg-blue-50/50 transition">
                                        <td className="p-4 flex items-center gap-4">
                                            <img src={p.images[0] || "/placeholder.png"} className="w-12 h-12 rounded-lg object-cover shadow-sm" />
                                            <span className="font-semibold text-slate-800">{p.name}</span>
                                        </td>
                                        <td className="p-4 text-slate-600">{p.category}</td>
                                        <td className="p-4 font-bold text-blue-600">${p.price}</td>
                                        <td className="p-4 text-slate-500">{p.stock}</td>
                                        <td className="p-4 space-x-2 text-center">
                                            <Link href={`/admin/edit/${p._id}`} className="text-blue-600 hover:text-blue-800 font-bold px-3 py-1 rounded bg-blue-50 hover:bg-blue-100 transition">
                                                Edit
                                            </Link>
                                            <button onClick={() => deleteProduct(p._id)} className="text-red-600 hover:text-red-800 font-bold px-3 py-1 rounded bg-red-50 hover:bg-red-100 transition">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
