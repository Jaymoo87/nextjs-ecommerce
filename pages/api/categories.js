import { MongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Categories';

export default async function handler(req, res) {
  const { method } = req;
  await MongooseConnect();

  if (method === 'GET') {
    res.json(await Category.find());
  }

  if (method === 'POST') {
    const { name } = req.body;
    const categoryData = await Category.create({ name });
    res.json(categoryData);
  }
}
