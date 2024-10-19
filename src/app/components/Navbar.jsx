'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdSearch, MdLightMode, MdDarkMode } from 'react-icons/md';
import { RiMenu3Line } from 'react-icons/ri';
import ThemeSwitch from './ThemeSwitch';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Fetch categories from FakeStore API
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

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="bg-surface-light dark:bg-surface-dark shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/">
              <img className="h-8 w-8" src="/logo.svg" alt="Logo" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark">Home</Link>
            <Link href="/products" className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark">Products</Link>
            <Link href="/cart" className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark">Cart</Link>
            <Link href="/account" className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark">Account</Link>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center"
              >
                Categories
                <svg className="ml-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 w-48 bg-surface-light dark:bg-surface-dark shadow-lg rounded-md ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {categories.map((category) => (
                      <Link key={category} href={`/products?category=${category}`} className="block px-4 py-2 text-sm text-text-light dark:text-text-dark hover:bg-primary-light dark:hover:bg-primary-dark">
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dark Mode and Search Buttons */}
          <div className="flex items-center space-x-4">
            <button onClick={handleSearchToggle} className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark">
              <MdSearch className="w-6 h-6" />
            </button>

            {/* Dark Mode Toggle */}
            <ThemeSwitch />

            <button className="md:hidden" onClick={handleMenuToggle}>
              <RiMenu3Line className="w-6 h-6 text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="py-4 space-y-1">
              <Link href="/" className="block text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark">Home</Link>
              <Link href="/products" className="block text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark">Products</Link>
              <Link href="/cart" className="block text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark">Cart</Link>
              <Link href="/account" className="block text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark">Account</Link>

              {/* Categories Mobile Dropdown */}
              <div className="relative">
                <button
                  onClick={handleDropdownToggle}
                  className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center"
                >
                  Categories
                  <svg className="ml-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute mt-2 w-48 bg-surface-light dark:bg-surface-dark shadow-lg rounded-md ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {categories.map((category) => (
                        <Link key={category} href={`/products?category=${category}`} className="block px-4 py-2 text-sm text-text-light dark:text-text-dark hover:bg-primary-light dark:hover:bg-primary-dark">
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="bg-surface-light dark:bg-surface-dark border-b border-gray-200 p-4">
            <div className="max-w-7xl mx-auto">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
                placeholder="Search for products..."
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
