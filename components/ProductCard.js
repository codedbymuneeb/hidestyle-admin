export default function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-slate-100">
            <div className="h-64 overflow-hidden relative group">
                <img
                    src={product.images[0] || "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.featured && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded shadow-sm">
                        Featured
                    </span>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-800 truncate">{product.name}</h3>
                <p className="text-slate-500 text-sm mb-2">{product.category}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">${product.price}</span>
                    <span className="text-slate-400 text-sm">{product.stock} in stock</span>
                </div>
            </div>
        </div>
    );
}
