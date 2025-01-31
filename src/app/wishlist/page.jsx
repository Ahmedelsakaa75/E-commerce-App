'use client';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const totalPrice = wishlistItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const addAllToCart = () => {
    wishlistItems.forEach(item => addToCart(item));
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">Your wishlist is empty.</p>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6">
            {wishlistItems.map((item) => (
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
                  <Link href={`/products/${item.id}`} className="font-semibold hover:text-accent">
                    {item.title}
                  </Link>
                  <p className="text-gray-600 dark:text-gray-300">${item.price}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="px-4 py-2 bg-accent text-white rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-4">
                <button
                  onClick={addAllToCart}
                  className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Add All to Cart
                </button>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">Total Value:</p>
                <p className="text-xl font-bold text-accent">${totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;