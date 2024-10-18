import Image from 'next/image';
import React from 'react'

export default async function Products() {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
  
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-4">All Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
              <Image width={100} height={100} src={product.image} alt={product.title} className="w-full h-56 object-cover mb-4" />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-500">${product.price}</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition">
                View Product
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  