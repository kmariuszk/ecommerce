import dbConnect from '../../../utils/dbConnect';
import Category from '../../../models/Category';

dbConnect();

async function index(req, res) {
    const { method } = req;

    switch (method) {
        // Get all of the Categories.
        case 'GET':
            try {
                const Categories = await Category.find({});

                res.status(200).json({ success: true, data: Categories });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // Add a new Category.
        case 'POST':
            try {
                const Category = await Category.create(req.body);

                res.status(201).json({ success: true, data: Category });
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