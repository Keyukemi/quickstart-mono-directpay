import axios from "axios";
import db from "@/utils/db";
import Order from "@/models/Order";
import { getToken } from 'next-auth/jwt';


const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user) {
    return res.status(401).send('Signin Required');
  }

  await db.connect();

  try {
    const orderId = req.query.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).send('Order not found');
    }

    const amount = order.totalPrice * 100;  
    const description = `Payment for order ${order._id}`;
    const reference = `ref-${order._id}-mono-${Date.now()}`; 

    console.log(amount)
    
    
    const response = await axios.post('https://api.withmono.com/v1/payments/initiate', {
      amount,
      description,
      reference,
      type: 'onetime-debit',
      redirect_url: '',  
    }, {
      headers: {
        'mono-sec-key': process.env.MONO_SECRET_KEY
      },
    });

    order.paymentReference = reference;
    await order.save();
    await db.disconnect();
    
    res.status(200).send({ paymentLink: response.data.payment_link });
    
  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).send('Server error');
  }
};

export default handler;