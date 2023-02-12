import dbConnect from '../../../utils/dbConnect';
import Category from '../../../models/Category';

dbConnect();

async function index(req, res) {
    const { method } = req;

    switch (method) {
        // Get all of the categories.
        case 'GET':
            try {
                const categories = await Category.find({});

                res.status(200).json({ success: true, data: categories });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // Add a new category.
        case 'POST':
            try {
                console.log("Trying to add a new category!")
                const category = await Category.create(req.body);

                res.status(201).json({ success: true, data: category });
            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false });
            }
            break;
        // Delete all categories.
        case 'DELETE':
            try {
                const deletedCategories = await Category.deleteMany();

                if (!deletedCategories) {
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