import db from "@/utils/db";
import Order from "@/models/Order";
import { getToken } from 'next-auth/jwt';


const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user) {
    return res.status(401).send('Signin Required');
  }

  await db.connect();
  const order = await Order.findById(req.query.id);
  await db.disconnect();

  res.send(order)

};
export default handler;