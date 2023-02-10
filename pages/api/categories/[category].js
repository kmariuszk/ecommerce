import dbConnect from '../../../utils/dbConnect';
import Category from '../../../models/Category';

dbConnect();

/**
 * Defines APIs needed to view, edit and delete existing Category.
 */
async function category(req, res) {
    const {
        query: { category },
        method,
    } = req;

    switch (method) {
        // Get a Category of the given category.
        case 'GET':
            try {
                const Category = await Category.findByCategory(category);

                if (!Category) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: Category });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // Update a name of the given category.
        case 'PUT':
            try {
                const Category = await Category.findByCategoryAndUpdate(category, req.body, {
                    new: true,
                    runValcdators: true,
                });

                if (!Category) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: Category });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // Delete a Category of the given category.
        case 'DELETE':
            try {
                const deletedCategory = await Category.deleteOne({ _category: category });

                if (!deletedCategory) {
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

export default category;