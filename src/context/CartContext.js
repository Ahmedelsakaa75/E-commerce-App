'use client';

import { createContext, useContext, useState } from 'react';
import Notification from './../app/components/Notification';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState({ message: '', visible: false });

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);

    setNotification({ message: `${product.title} added to cart!`, visible: true });

    setTimeout(() => {
      setNotification({ ...notification, visible: false });
    }, 3000);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
      {notification.visible && <Notification message={notification.message} />}
    </CartContext.Provider>
  );
};
