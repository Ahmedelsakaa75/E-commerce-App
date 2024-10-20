import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const Card = ({ product }) => {
  return (
    <div className="flex flex-col justify-between h-full bg-gray-50 dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
      <div className="flex-grow">
        <Image
          className="w-full h-56 object-contain mb-4 rounded-lg"
          src={product.image}
          alt={product.title}
          width={100}
          height={100}
        />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{product.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">${product.price}</p>
      </div>
      <Link href={`/products/${product.id}`}>
        <button className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300">
          View Product
        </button>
      </Link>
    </div>
  );
};

export default Card;
