import React from 'react'

export default async function Categories() {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    const categories = await res.json();
  
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-4">Categories</h1>
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category} className="p-4 bg-white rounded shadow-md">
              <a href={`/categories/${category}`} className="text-blue-600 hover:underline">
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
