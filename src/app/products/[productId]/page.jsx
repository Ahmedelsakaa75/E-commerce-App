'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import Header from '@/app/components/Header';

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${params.productId}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [params.productId]);

  if (!product) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl md:px-6 lg:px-8">
                  <Header title={product.title} />

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
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{product.title}</h1>
          <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">${product.price}</p>
          <p className="text-lg text-gray-700 dark:text-gray-300">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
