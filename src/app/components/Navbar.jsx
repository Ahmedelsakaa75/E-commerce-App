'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdSearch, MdShoppingCart } from 'react-icons/md';
import { RiArrowDownSLine } from 'react-icons/ri';
import ThemeSwitch from './ThemeSwitch';
import { FaHeart } from 'react-icons/fa';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-main-light dark:bg-main-dark border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-accent">
            My Store
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-text-light dark:text-text-dark hover:text-accent">
              Products
            </Link>
            
            <div className="relative">
              <button
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="flex items-center gap-1 text-text-light dark:text-text-dark hover:text-accent"
              >
                Categories <RiArrowDownSLine />
              </button>
              {isDropdownOpen && (
                <div 
                  className="absolute top-full mt-2 w-48 bg-main-light dark:bg-main-dark border shadow-lg rounded-lg p-2 z-50"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/categories/${category}`}
                      className="block px-4 py-2 text-text-light dark:text-text-dark hover:bg-accent/10 rounded-md"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-48 px-4 py-2 rounded-lg bg-white/90 dark:bg-black/90 border focus:border-accent focus:ring-1 focus:ring-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MdSearch className="absolute right-3 top-3 text-accent" />
            </div>
          </div>

          <div className="flex items-center gap-4">

          <Link href="/wishlist" className="text-text-light dark:text-text-dark hover:text-accent">
  <FaHeart className="text-xl" />
</Link>
            <Link href="/cart" className="text-text-light dark:text-text-dark hover:text-accent">
              <MdShoppingCart className="text-xl" />
            </Link>
            
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-text-light dark:text-text-dark hover:text-accent">
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" className="text-text-light dark:text-text-dark hover:text-accent">
                  Login
                </Link>
                <Link href="/register" className="text-accent font-medium">
                  Register
                </Link>
              </>
            )}
            
            <ThemeSwitch />
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-text-light dark:text-text-dark"
            >
              ☰
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link href="/products" className="block py-2 text-text-light dark:text-text-dark hover:text-accent">
              Products
            </Link>
            <div className="border-t my-2"></div>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/categories/${category}`}
                  className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-md text-text-light dark:text-text-dark hover:bg-accent/10"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;