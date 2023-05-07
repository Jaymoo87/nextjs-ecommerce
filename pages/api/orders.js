import { MongooseConnect } from '../../lib/mongoose';
import { Order } from '../../models/Order';

export default async function handler(req, res) {
  await MongooseConnect();
  res.json(await Order.find().sort({ createdAt: -1 }));
}
