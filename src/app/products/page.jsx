'use client'
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Head from 'next/head';
import Header from '../components/Header';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products?sort=${sortOrder}`);
      const data = await res.json();

      const sortedProducts = data.sort((a, b) => sortOrder === 'desc' ? b.price - a.price : a.price - b.price);
      setProducts(sortedProducts);
      setLoading(false);
    }

    fetchProducts();
  }, [sortOrder]);

  return (
    <div className="min-h-screen bg-main-bg dark:bg-dark-bg p-4 md:p-8">
      <Header title="All Products | My Store" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-primary-text dark:text-dark-text">
            All Products
          </h1>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full md:w-48 p-2 rounded-md border bg-card-bg dark:bg-dark-card text-primary-text dark:text-dark-text"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
