'use client';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Header from '../components/Header';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <Header title="Cart | My Store" />
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="relative w-20 h-20">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300">${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-accent">${totalPrice}</span>
            </div>
            
            <button className="w-full bg-accent text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors">
              Proceed to Buy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;