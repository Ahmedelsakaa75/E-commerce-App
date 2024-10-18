import React from 'react'

export default async function Cart() {
    const res = await fetch('https://fakestoreapi.com/carts/user/1');
    const cart = await res.json();
  
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          {cart.products?.map((item) => (
            <div key={item.productId} className="mb-4">
              <h2 className="text-lg">{item.title}</h2>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <button className="mt-2 bg-red-600 text-white py-1 px-4 rounded">Remove</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  