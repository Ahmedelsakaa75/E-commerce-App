'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Loading from '@/app/loading';

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlistItems.some(item => item.id === product?.id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${params.productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [params.productId]);

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (!product) return <Loading />;

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 aspect-square relative bg-main-light dark:bg-main-dark rounded-xl p-4">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-text-light dark:text-text-dark">
            {product.title}
          </h1>
          
          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold text-accent">
              ${product.price}
            </p>
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
              {product.category}
            </span>
          </div>

          <p className="text-text-light dark:text-text-dark leading-relaxed">
            {product.description}
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 py-3 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={handleWishlist}
              className="p-3 aspect-square flex items-center justify-center bg-main-light dark:bg-main-dark border rounded-lg hover:bg-accent/10 transition-colors"
            >
              {isInWishlist ? (
                <FaHeart className="text-accent" size={24} />
              ) : (
                <FaRegHeart className="text-accent" size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}