import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/Product";

export default async function handler(req, res) {
    await dbConnect();
    const { method } = req;

    switch (method) {
        case "GET":
            const { category, sort } = req.query;
            let filter = {};
            if (category) filter.category = category;

            let sortOptions = { createdAt: -1 };
            if (sort === "price-asc") sortOptions = { price: 1 };
            if (sort === "price-desc") sortOptions = { price: -1 };
            if (sort === "newest") sortOptions = { createdAt: -1 };
            if (sort === "featured") sortOptions = { featured: -1 };

            const products = await Product.find(filter).sort(sortOptions);
            res.status(200).json(products);
            break;

        case "POST":
            try {
                const product = await Product.create(req.body);
                res.status(201).json(product);
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
            break;

        default:
            res.status(405).json({ error: `Method ${method} not allowed` });
    }
}
