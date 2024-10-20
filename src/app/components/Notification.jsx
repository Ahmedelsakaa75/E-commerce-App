import React from 'react';
import { motion } from 'framer-motion';

const Notification = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg"
    >
      {message}
    </motion.div>
  );
};

export default Notification;
