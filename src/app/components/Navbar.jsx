'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdSearch, MdLightMode, MdDarkMode, MdShoppingCart } from 'react-icons/md';
import { RiArrowDownSLine } from 'react-icons/ri';
import ThemeSwitch from './ThemeSwitch';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const debounceTimer = setTimeout(async () => {
        try {
          const response = await fetch(`https://fakestoreapi.com/products`);
          const data = await response.json();
          const filteredResults = data.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSearchResults(filteredResults);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }, 500);

      return () => clearTimeout(debounceTimer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <nav className="bg-surface-light dark:bg-surface-dark shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="font-bold text-2xl">Cairo Cart</h1>
            </Link>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button onClick={handleMenuToggle} className="text-text-light dark:text-text-dark">
              {/* Add your hamburger icon here */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark">Home</Link>
            <Link href="/products" className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark">Products</Link>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center"
              >
                Categories
                <RiArrowDownSLine />
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 w-48 bg-surface-light dark:bg-surface-dark bg-opacity-80 shadow-lg rounded-md ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {categories.map((category) => (
                      <Link key={category} href={`/categories/${category}`} className="block px-4 py-2 text-sm text-text-light dark:text-text-dark hover:bg-primary-light dark:hover:bg-primary-dark">
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MdSearch className="absolute right-2 top-2 w-5 h-5 text-gray-500" />
            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md z-50 max-h-60 overflow-auto">
                <ul className="py-2">
                  {searchResults.map((product) => (
                    <li key={product.id} className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                      <Link href={`/products/${product.id}`} className="block text-text-light dark:text-text-dark">
                        {product.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Cart and Auth */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark">
              <MdShoppingCart className="w-6 h-6" />
            </Link>

            {isLoggedIn ? (
              <>
                <Link href="/profile" className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark">
                  {user?.username || 'Profile'}
                </Link>
                <button onClick={handleLogout} className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark">Login</Link>
                <Link href="/register" className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark">Register</Link>
              </>
            )}

            {/* Theme Switch */}
            <ThemeSwitch />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2">
            <Link href="/" className="block px-4 py-2 text-text-light dark:text-text-dark hover:bg-primary-light dark:hover:bg-primary-dark">Home</Link>
            <Link href="/products" className="block px-4 py-2 text-text-light dark:text-text-dark hover:bg-primary-light dark:hover:bg-primary-dark">Products</Link>
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="block w-full text-left px-4 py-2 text-text-light dark:text-text-dark hover:bg-primary-light dark:hover:bg-primary-dark"
              >
                Categories
                <RiArrowDownSLine />
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 w-full bg-surface-light dark:bg-surface-dark bg-opacity-80 shadow-lg rounded-md ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {categories.map((category) => (
                      <Link key={category} href={`/categories/${category}`} className="block px-4 py-2 text-sm text-text-light dark:text-text-dark hover:bg-primary-light dark:hover:bg-primary-dark">
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative mt-2">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MdSearch className="absolute right-2 top-2 w-5 h-5 text-gray-500" />
              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md z-50 max-h-60 overflow-auto">
                  <ul className="py-2">
                    {searchResults.map((product) => (
                      <li key={product.id} className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                        <Link href={`/products/${product.id}`} className="block text-text-light dark:text-text-dark">
                          {product.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex flex-col mt-4 space-y-2">
              <Link href="/cart" className="block px-4 py-2 text-text-light dark:text-text-dark hover:bg-primary-light dark:hover:bg-primary-dark">
                Cart
              </Link>
              {isLoggedIn ? (
                <>
                  <Link href="/profile" className="block px-4 py-2 text-text-light dark:text-text-dark hover:bg-primary-light dark:hover:bg-primary-dark">
                    {user?.username || 'Profile'}
                  </Link>
                  <button onClick={handleLogout} className="block px-4 py-2 text-text-light dark:text-text-dark hover:bg-primary-light dark:hover:bg-primary-dark">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-4 py-2 text-text-light dark:text-text-dark hover:bg-primary-light dark:hover:bg-primary-dark">Login</Link>
                  <Link href="/register" className="block px-4 py-2 text-text-light dark:text-text-dark hover:bg-primary-light dark:hover:bg-primary-dark">Register</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
