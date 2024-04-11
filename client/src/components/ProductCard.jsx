import { Card } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  console.log(product.paymentIntent.id);
  return (
    <>
      <Link to={`/products/${product.products[0].product.slug}`}>
        <Card
          className="max-w-sm"
          imgAlt={product.products[0].product.title}
          imgSrc={product.products[0].product.images[0]}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 line-clamp-1">
            {product.products[0].product.title}
          </h5>
          <div>
            <p className="">{`Status: ${product.paymentIntent.status}`}</p>
            <p className="text-xl">{`Price: Rs. ${product.paymentIntent.amount}`}</p>
          </div>
          <Link
            to={`/order/${product.paymentIntent.id}`}
            className="button text-center"
          >
            View Order
          </Link>
        </Card>
      </Link>
    </>
  );
}
