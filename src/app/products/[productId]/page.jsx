import React from 'react';
import Image from 'next/image';

export default async function ProductPage({ params }) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.productId}`);
  const product = await res.json();

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 lg:px-8 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2">
          <Image
            className="rounded-lg shadow-md"
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{product.title}</h1>
          <p className="text-2xl text-gray-800 dark:text-gray-300 font-semibold mb-4">${product.price}</p>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">{product.description}</p>
          <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
