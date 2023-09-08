import db from "@/utils/db";
import Order from "@/models/Order";
import { getSession } from "next-auth/react";

const handler = async(req, res)=>{
    const session = await getSession({req});
    console.log('bread and butter');
    console.log(session);
    console.log(req.response);

    if (!session){
        return res.status(401).send('Signin Required');
    }
    const {user} = session;
    await db.connect();
    const newOrder = new Order({
        ...req.body,
        user: user._id,
    });
    const order = await newOrder.save();
    res.status(201).send(order);
}

export default handler;