'use client'
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc'); // default is 'asc'

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products?sort=${sortOrder}`);
      const data = await res.json();

      // Ensure sorting works as expected (e.g., by price manually)
      const sortedProducts = data.sort((a, b) => {
        return sortOrder === 'desc' ? b.price - a.price : a.price - b.price;
      });
      setProducts(sortedProducts);
      setLoading(false);
    }

    fetchProducts();
  }, [sortOrder]);

  // Handle sorting switch
  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8 max-w-7xl">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">All Products</h1>
        <div>
          <label htmlFor="sort" className="mr-2 text-gray-700 dark:text-gray-300">Sort by Price:</label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border rounded-md p-2 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
