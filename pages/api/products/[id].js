import dbConnect from '../../../utils/dbConnect';
import Product from '../../../models/Product';

dbConnect();

/**
 * Defines APIs needed to view, edit and delete existing product.
 */
async function Id(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    // Get a product of the given id.
    case 'GET':
      try {
        const product = await Product.findById(id);

        if (!product) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
      // Update a product of the given id.
    case 'PUT':
      try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!product) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
      // Delete a product of the given id.
    case 'DELETE':
      try {
        const deletedProduct = await Product.deleteOne({ _id: id });

        if (!deletedProduct) {
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
}

export default Id;
