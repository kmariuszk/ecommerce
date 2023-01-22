import dbConnect from '../../utils/dbConnect';

dbConnect();

async function test(req, res) {
    res.json({ test: 'test' });
}

export default test;