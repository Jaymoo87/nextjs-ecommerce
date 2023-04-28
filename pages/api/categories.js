import { MongooseConnect } from '../../lib/mongoose';
import { Category } from '../../models/Categories';
import { authOptions, isAdminRequest } from './auth/[...nextauth]';

export default async function handler(req, res) {
  const { method } = req;
  await MongooseConnect();
  await isAdminRequest(req, res);

  if (method === 'GET') {
    res.json(await Category.find().populate('parent'));
  }

  if (method === 'POST') {
    const { name, parentCategory, properties } = req.body;
    const categoryData = await Category.create({ name, parent: parentCategory || undefined, properties });
    res.json(categoryData);
  }
  if (method === 'PUT') {
    const { name, parentCategory, properties, _id } = req.body;
    const categoryData = await Category.updateOne({ _id }, { name, parent: parentCategory || undefined, properties });
    res.json(categoryData);
  }

  if (method === 'DELETE') {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json('ok');
  }
}
