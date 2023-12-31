import CheckoutWizard from "@/components/CheckoutWizard";
import Layout from "@/components/Layout";
import React,{useContext, useEffect, useState} from "react";
import Link from "next/link";
import { Store } from "@/utils/Store";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getError } from "@/utils/error";
import axios from "axios";
import Cookies from "js-cookie";

function ConfirmOrderScreen() {
    const router = useRouter();
    const {state, dispatch} = useContext(Store);
    const {cart} = state;
    const{cartItems, shippingAddress, paymentMethod}= cart;
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON)/100;

    const itemsPrice = round2(cartItems.reduce((a,c) => a + c.quantity * c.price, 0));
    const taxPrice = round2(itemsPrice * 0.05);
    const shippingPrice = itemsPrice < 250 ? 0 : 15;
    const totalPrice = round2(itemsPrice + taxPrice + shippingPrice);

    useEffect(()=>{
        if(!paymentMethod){
            router.push('/payment');
        }
    },[paymentMethod,router])

    const[loading, setLoading] = useState(false);

    const placeOrderHandler = async() => {
        try{
            setLoading(true);
            const {data} = await axios.post('/api/orders',{
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
            })
            setLoading(false);
            dispatch({type: 'CLEAR_CART_ITEMS'});
            Cookies.set(
                'cart',
                JSON.stringify({...cart, cartItems:[]})
            );
            router.push(`/order/${data._id}`);
        } catch (err) {
            console.log(err)
            setLoading(false);
            return toast.error(getError(err))
        }
    }

    return(
        <Layout title="Confirm Order">
            <CheckoutWizard activeStep={3}/>
            <h1 className="mb-4 text-4xl text-center text-primary">Confirm Order</h1>

            {
                 cartItems?.length === 0 ? 
                 (<div>
                     Cart is Empty,
                     <Link href="/" className="font-bold text-highlight"> Go Shopping!</Link>
                 </div>) :
                 (
                    <div className="grid md:grid-cols-4 md:gap-5">
                        <div className="overflow-x-auto md:col-span-3">
                            <div className="card p-5">
                                <h2 className=" mb-2 text-lg text-highlight font-bold">Shipping Address</h2>
                                <div className="mb-4">
                                    <p>{shippingAddress.fullName}</p>
                                    <p>{shippingAddress.phoneNumber}</p>
                                    <p>{shippingAddress.address}</p>
                                    <p>{shippingAddress.city}</p>
                                    <p>{shippingAddress.country}</p>
                                </div>
                                <div className="flex justify-end">
                                    <Link href="/shipping" className="secondary-button">Edit</Link>
                                </div>
                            </div>
                                
                            <div className="card p-5">
                                <h2 className=" mb-2 text-lg text-highlight font-bold">Payment Method</h2>
                                <div className="flex justify-between">
                                    {paymentMethod}
                                    <Link href="/payment" className="text-center secondary-button">Change</Link>
                                </div>
                            </div>

                            <div className="card p-5 overflow-x-auto">
                                <h2 className=" mb-2 text-lg text-highlight font-bold">Items Ordered</h2>
                                <table className="min-w-full mb-4">
                                    <thead className=" border-b">
                                        <tr>
                                            <th className="px-5 text-left">Item</th>
                                            <th className="p-5 text-right">Quantity</th>
                                            <th className="p-5 text-right">Price</th>
                                            <th className="p-5 text-right">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartItems.map((item)=>(
                                                <tr key={item._id} className="border-b">
                                                    <td>
                                                        <Link href={`/product/${item.slug}`}>
                                                            <p className="flex items-center">
                                                                <Image 
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    width={50}
                                                                    height={50}
                                                                />
                                                                &nbsp;
                                                                {item.name}
                                                            </p>
                                                        </Link>
                                                    </td>
                                                    <td className="p-5 text-right">{item.quantity}</td>
                                                    <td className="p-5 text-right">₦{item.price}</td>
                                                    <td className="p-5 text-right">₦{item.quantity * item.price}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <div className="flex justify-end">
                                    <Link href="/cart" className="text-center secondary-button">Edit Order</Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="p-5 card">
                                <h2 className=" mb-2 text-lg text-highlight font-bold">Order Summary</h2>
                                <ul>
                                    <li>
                                        <div className="mb-2 flex justify-between">
                                            <div>Items</div>
                                            <div>₦{itemsPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="mb-2 flex justify-between">
                                            <div>Tax</div>
                                            <div>₦{taxPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="mb-2 flex justify-between">
                                            <div>Shipping</div>
                                            <div>₦{shippingPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="mb-2 flex justify-between">
                                            <div className="font-bold text-highlight">Total Price</div>
                                            <div>₦{totalPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <button 
                                            className={`w-full ${loading ? "secondary-button cursor-not-allowed": "primary-button"}`} 
                                            onClick={placeOrderHandler}
                                            disabled={loading}>
                                            {loading ? 'loading': 'Place Order'}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }
        </Layout>
    
    )
}
ConfirmOrderScreen.auth = true;
export default dynamic (() => Promise.resolve(ConfirmOrderScreen), {ssr: false});

