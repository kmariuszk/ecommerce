import dbConnect from '../../../utils/dbConnect';
import Product from '../../../models/Product';

dbConnect();

async function index(req, res) {
    const { method } = req;

    switch (method) {
        // Get all of the products.
        case 'GET':
            try {
                const products = await Product.find({});

                res.status(200).json({ success: true, data: products });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // Add a new product.
        case 'POST':
            try {
                const product = await Product.create(req.body);

                res.status(201).json({ success: true, data: product });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // Delete all products.
        case 'DELETE':
            try {
                const deletedProducts = await Product.deleteMany();

                if (!deletedProducts) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
};

export default index;