import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const Card = ({ product }) => {
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-main-light dark:bg-main-dark p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow relative h-full">
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 p-2 text-accent hover:text-red-500 z-10"
        >
          {isInWishlist ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
        </button>

        <div className="relative h-48 mb-4">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        
        <h3 className="font-semibold text-text-light dark:text-text-dark mb-2 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-text-light dark:text-text-dark mb-4">
          ${product.price}
        </p>
        
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="w-full py-2 bg-accent text-white rounded-md hover:bg-opacity-90 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default Card;