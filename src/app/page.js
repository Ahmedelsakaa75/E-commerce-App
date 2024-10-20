'use client';

import { useEffect, useState } from 'react';
import CategoriesPage from './categories/page';
import Hero from './components/Hero';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Header from './components/Header';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }

    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products?limit=8');
        const data = await res.json();
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4">

    <Header title="Home | My Next.js App" />

      {user && (
        <div className="py-4">
          <h1 className="text-2xl font-semibold">
            Hi, {user.username} 👋
          </h1>
        </div>
      )}

            {/* Featured Products Section */}
            <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <Slider {...settings}>
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
            <div className="p-4 text-center">
              <Image width={100} height={100} src={product.image} alt={product.title} className="h-40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-700">${product.price}</p>
            </div>
            </Link>
          ))}
        </Slider>
      </section>

      {/* Categories Section */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">Browse Categories</h2>
        <CategoriesPage />
      </section>

      <Hero />



    </div>
  );
};

export default HomePage;
