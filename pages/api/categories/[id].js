import dbConnect from '../../../utils/dbConnect';
import Category from '../../../models/Category';

dbConnect();

/**
 * Defines APIs needed to view, edit and delete existing Category.
 */
async function id(req, res) {
    const {
        query: { id },
        method,
    } = req;

    switch (method) {
        // Get a name of the given category.
        case 'GET':
            try {
                const category = await Category.findById(id);

                if (!category) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: category.name });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // Update a name of the given category.
        case 'PUT':
            try {
                const category = await Category.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValcdators: true,
                });

                if (!category) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: category });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // Delete a category of the given id.
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

export default id;