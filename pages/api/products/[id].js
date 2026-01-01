import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/Product";

export default async function handler(req, res) {
    await dbConnect();
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case "GET":
            const product = await Product.findById(id);
            res.status(200).json(product);
            break;

        case "PUT":
            try {
                const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
                res.status(200).json(updated);
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
            break;

        case "DELETE":
            await Product.findByIdAndDelete(id);
            res.status(204).end();
            break;

        default:
            res.status(405).json({ error: `Method ${method} not allowed` });
    }
}
