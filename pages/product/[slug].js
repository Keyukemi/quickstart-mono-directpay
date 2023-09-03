import Layout from "@/components/Layout";
import data from "@/utils/data";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BiArrowBack } from 'react-icons/bi';


export default function ProductScreen(){
    const {query} = useRouter()
    const {slug} = query; 
    const product = data.products.find(x => x.slug === slug)
    if(!product){
        return <div>Product not found</div>
    }

    return(
       <Layout title={product.name}>
            <div className="mb-4">
                <Link href="/" className="flex item-center gap-4">
                    <BiArrowBack size={24} 
                    className=" bg-tertiary p-1 hover:bg-secondary active:bg-paragraph text-highlight rounded-full"/> 
                    Back to Products
                </Link>
            </div>
            <div className="grid md:grid-cols-4 md:gap-3">
                <div className="md:col-span-2">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={640}
                        height={640}
                        layout="responsive"
                    />
                </div>
                <div>
                    <ul>
                        <li>
                            <h1 className="text-lg">{product.name}</h1>
                        </li>
                        <li>Category:{product.category}</li>
                        <li>Brand:{product.brand}</li>
                        <li>{product.rating} of {product.numReviews} reviews</li>
                        <li>Description:{product.description}</li>
                    </ul>
                </div>
                <div>
                    <div className="card p-5 bg-white">
                        <div className="mb-2 flex justify-between ">
                            <div>Price</div>
                            <div>${product.price}</div>
                        </div>
                        <div className="mb-2 flex justify-between ">
                            <div>Status</div>
                            <div>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</div>
                        </div>
                        <button className="primary-button w-full">Add to cart</button>
                    </div>
                </div>
            </div>
       </Layout>
    )
}