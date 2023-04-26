import { MongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';

export default async function handler(req, res) {
  const { method } = req;
  await MongooseConnect();

  if (method === 'POST') {
    const { title, description, price } = req.body;
    const productData = await Product.create({
      title,
      description,
      price,
    });
    res.json(productData);
  } else {
    return null;
  }
}
