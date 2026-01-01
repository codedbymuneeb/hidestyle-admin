import Navbar from "../../components/Navbar";
import AdminForm from "../../components/AdminForm";

export default function AddProduct() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="container mx-auto p-12">
                <AdminForm />
            </div>
        </div>
    );
}
