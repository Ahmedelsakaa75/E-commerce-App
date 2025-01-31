'use client';

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!user) {
    return <p className="text-center">You need to log in to view this page.</p>;
  }

  return (
    <div className="container mx-auto py-10">
                  <Header title="Profile | My Store" />
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="max-w-md mx-auto">
        <p className="mb-4">Username: {user.username}</p>
        <p>Email: {user.email}</p> 
      </div>
    </div>
  );
};

export default Profile;
