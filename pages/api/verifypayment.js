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
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).send('Order not found');
    }
    const { paymentReference } = order;

    const monoResponse = await axios.post('https://api.withmono.com/v1/payments/verify', {
      reference: paymentReference,
    }, {
      headers: {
        'mono-sec-key': process.env.MONO_SECRET_KEY,
      },
    });


    const status = monoResponse.data.data.status; 
    const payDate = monoResponse.data.data.updated_at; 
    
    
    if (status !== 'successful') {
        order.paymentReference = null;
      }

    order.isPaid = status === 'successful';
    order.paidAt = payDate;
    await order.save();
    await db.disconnect();

    res.status(200).send({ isPaid: order.isPaid });

  } catch (error) {
    
    console.error('Error verifying payment:', error);
    if(error.response && error.response.status === 400){
        res.status(400).send('Bad Request');
    } else {
        res.status(500).send('Server error');
    }
  }
  
};

export default handler;