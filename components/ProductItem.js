/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import Link from "next/link";

export default function ProductItem({ product }) {
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
          <h2 className="text-xl font-semibold text-secondary hover:text-paragraph">
            {product.name}
          </h2>
        </Link>
        <p className="text-highlight">{product.brand}</p>
        <p className="text-highlight font-semibold">${product.price}</p>
        <button className="primary-button">Add to cart</button>
      </div>
    </div>
  );
}
