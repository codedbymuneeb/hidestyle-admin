import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../components/Navbar";
import AdminForm from "../../../components/AdminForm";

export default function EditProduct() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/products/${id}`)
                .then((res) => res.json())
                .then((data) => setProduct(data));
        }
    }, [id]);

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="container mx-auto p-12">
                {product ? <AdminForm product={product} isEdit={true} /> : <p className="text-center py-20">Loading...</p>}
            </div>
        </div>
    );
}
