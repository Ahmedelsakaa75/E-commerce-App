'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
            <Header title="Categories | My Next.js App" />
      <h1 className="text-3xl font-bold mb-4">Shop by Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category} href={`/categories/${category}`}>
            <div className="border p-4 rounded-lg hover:shadow-lg transition-shadow text-center">
              <h2 className="text-lg font-semibold capitalize">{category}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
