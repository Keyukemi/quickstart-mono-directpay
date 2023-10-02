import Layout from "@/components/Layout";
import { getError } from "@/utils/error";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function reducer(state, action){
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...state, loading: false, error:''};
        case 'FETCH_SUCCESS':
            return {...state, loading: false, order:action.payload, error:''};
        case 'FETCH_FAIL':
            return {...state, loading: false, error:action.payload};
        case 'PAY_REQUEST':
            return{...state, payLoading: true};
        case 'PAY_SUCCESS':
            return{...state, payLoading: false, paySuccessful: true};
        case 'PAY_FAIL':
            return{...state, payLoading: false, payError: action.payload};
        case 'PAY_RESET':
            return{...state, payLoading: false, paySuccessful: false, payError: ''};
            
        default: return state
    }
}


function OrderScreen(){
    const router = useRouter();
    const {query} = router;
    const orderId = query.id;
    const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);

    const [{loading, error, order, payLoading}, dispatch] = useReducer(reducer,{
        loading: true,
        order:{},
        error: null,
        payLoading: false,  
        paySuccessful: false,
        payError: '', 
    })

    const {shippingAddress = {}, paymentMethod, orderItems = [], itemsPrice, taxPrice,
    shippingPrice, totalPrice, paymentStatus, paidAt, isDelivered, deliveredAt} = order || {};
  

    useEffect(() => {
        const fetchOrder = async () => {
          try {
            dispatch({ type: 'FETCH_REQUEST' });
            const { data } = await axios.get(`/api/orders/${orderId}`)
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
          }
        }
        if (orderId && (!order._id || (order._id && order._id !== orderId))) {
          fetchOrder();
        }
      }, [order, orderId, router.asPath])
      
  

    const handleMonoPayment = async () => {
        setIsVerifyingPayment(true)
        try {
            dispatch({ type: 'PAY_REQUEST' }); 
            const { data } = await axios.get(`/api/initiatepayment?id=${orderId}`);
            window.open(data.paymentLink, "_blank");
            dispatch({ type: 'PAY_SUCCESS' }); 
        } catch (error) {
            console.error('Error initiating payment:', error);
            dispatch({ type: 'PAY_FAIL', payload: error.message });  
        } finally {
            setIsVerifyingPayment(false); 
        }
    };
        
        
    const handleCashOnDelivery = () => {
        router.push('/');
    };

    if (!paymentMethod) {
        return <div>Loading...</div>;
    }
    
    return(
        <Layout title={`Order${orderId}`}>
            {isVerifyingPayment && <div>Verifying your payment...</div>}
            <h1 className="mb-4 text-4xl text-center text-primary">{`Order ${orderId}`}</h1>
            {loading ? (<div>Loading</div>): error ? (<div className="alert-error">{error}</div>):
            (<div className="grid md:grid-cols-4 md:gap-5">
                <div className="overflow-x-auto md:col-span-3">
                    <div className="card p-5">
                        <h2 className=" mb-2 text-lg text-highlight font-bold">Shipping Address</h2>
                        <div className="mb-4">
                            <p>{shippingAddress?.fullName}</p>
                            <p>{shippingAddress?.phoneNumber}</p>
                            <p>{shippingAddress?.address}</p>
                            <p>{shippingAddress?.city}</p>
                            <p>{shippingAddress?.country}</p>
                        </div>
                        <div className="flex">
                            {isDelivered ? (
                                <div className="alert-success">Delivered at {deliveredAt}</div>
                            ): (
                                <div className="alert-error">Not delivered</div>
                            )}
                        </div>
                    </div>

                    <div className="card p-5 ">
                        <h2 className=" mb-2 text-lg text-highlight font-bold">Payment Method</h2>
                        <div> {paymentMethod} </div>
                        <div className="flex">
                            { paymentStatus === 'successful' ? (
                                    <div className="alert-success">Paid at {paidAt}</div>
                                ):(
                                    <div className="alert-error">Not Paid</div>
                                )
                            }
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
                                { orderItems.map((item)=>(
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
                                {paymentStatus === 'successful' ? (
                                    <div className="w-full text-headline bg-primary px-4 py-2 rounded-full mt-2 text-center ">
                                        Payment Completed
                                    </div>
                                ) : (
                                    <>
                                        {paymentMethod === "Pay with Mono" && (
                                            <button 
                                                className={`w-full ${payLoading ? "secondary-button cursor-not-allowed" : "secondary-button"}`} 
                                                onClick={handleMonoPayment}
                                                disabled={payLoading}
                                            >
                                                {payLoading ? "Loading..." : "Pay with Mono"}
                                            </button>
                                        )}
                                        {paymentMethod === "Cash On Delivery" && (
                                            <button 
                                                className="w-full secondary-button" 
                                                onClick={handleCashOnDelivery}
                                            >
                                                Cash on Delivery
                                            </button>
                                        )}
                                    </>
                                )}
                            </li>

                        </ul>
                    </div>
                </div>

            </div>)}
        </Layout>
    )
}
OrderScreen.auth = true;
export default OrderScreen;
