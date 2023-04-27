import { MongooseConnect } from '../../lib/mongoose';
import { Category } from '../../models/Categories';

export default async function handler(req, res) {
  const { method } = req;
  await MongooseConnect();

  if (method === 'GET') {
    res.json(await Category.find().populate('parent'));
  }

  if (method === 'POST') {
    const { name, parentCategory } = req.body;
    const categoryData = await Category.create({ name, parent: parentCategory });
    res.json(categoryData);
  }
}
