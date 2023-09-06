/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */

import {Store} from "@/utils/Store";
import React, {useContext} from "react";
import Link from "next/link";

export default function ProductItem({ product}) {
    const { state, dispatch } = useContext(Store);
    if(!product){
        return <div>Product not found</div>
    }

    const addToCartHandler = () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug)
        const quantity = existItem ? existItem.quantity + 1 : 1;
        if (product.countInStock < quantity){
            alert('The Product is Out of Stock')
            return
        }
        dispatch({ type: "CART_ADD_ITEM", payload: {...product, quantity} });
    }

  return (
    <div className="card bg-white">
      <Link href={`/product/${product.slug}`}>
        <div className="relative overflow-hidden max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>
      </Link>

      <div className="mt-4 text-center">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-xl font-semibold text-secondary hover:text-highlight">
            {product.name}
          </h2>
        </Link>
        <p className="text-paragraph">{product.brand}</p>
        <p className="text-paragraph font-semibold">₦{product.price}</p>
        <button className="primary-button" onClick={addToCartHandler}>Add to cart</button>
      </div>
    </div>
  );
}
