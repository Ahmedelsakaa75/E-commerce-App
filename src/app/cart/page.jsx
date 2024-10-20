'use client'; 
import React from 'react';
import { useCart } from '@/context/CartContext';
import Header from '../components/Header';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
            <Header title="Cart | My Next.js App" />
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title}</h2>
              <p className="text-gray-500 dark:text-gray-300 mb-4">${item.price}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="w-full bg-red-600 dark:bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-300 ease-in-out"
              >
                Remove from Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
