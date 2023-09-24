import axios from "axios";
import db from "@/utils/db";
import Order from "@/models/Order";
import { getToken } from 'next-auth/jwt';


const handler = async (req, res) => {
  console.log('Handler Start');
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
    console.log('Order:', order);
    console.log('Generated Reference:', reference);
    

    
    const response = await axios.post('https://api.withmono.com/v1/payments/initiate', {
      amount,
      description,
      reference,
      type: 'onetime-debit',
      redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/order/${orderId}`,  
    }, {
      headers: {
        'mono-sec-key': process.env.MONO_SECRET_KEY
      },
    });

    console.log('Redirect URL:', `${process.env.NEXT_PUBLIC_APP_URL}/order/${orderId}`);

    order.paymentReference = reference;

   
    await order.save();
    console.log('Order saved with reference:', order);
    
    await db.disconnect();

    res.status(200).send({ paymentLink: response.data.payment_link });

    console.log('Mono Response:', response.data);
    console.log('Handler End');

  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).send('Server error');
  }
};

export default handler;