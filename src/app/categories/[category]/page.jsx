'use client';

import { useParams } from 'next/navigation'; 
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';

const CategoryPage = () => {
  const { category } = useParams(); 

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (category) {
      const fetchProductsByCategory = async () => {
        try {
          const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      fetchProductsByCategory();
    }
  }, [category]);

  if (!category) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
              <Header title={category} />

      <h1 className="text-3xl font-bold mb-4 capitalize">{category} Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="border p-4 rounded-lg hover:shadow-lg transition-shadow">
              <Image width={100} height={100} src={product.image} alt={product.title} className="w-full h-48 object-cover mb-2" />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
