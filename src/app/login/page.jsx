'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Notification from './../components/Notification';
import Header from '../components/Header';

const Login = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    try {
      const res = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      if (!res.ok) throw new Error('Login failed');
      
      const data = await res.json();
      localStorage.setItem('token', data.token);
      setNotificationMessage('Login successful!');
      setShowNotification(true);
      
      setTimeout(() => {
        setShowNotification(false);
        router.push('/'); 
      }, 2000);
    } catch (err) {
      setFieldError('general', err.message);
      setNotificationMessage('Login failed. Please try again.');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-6xl">
                  <Header title="Login | My Next.js App" />

      <h1 className="text-3xl font-bold mb-6">Login</h1>

      {/* Pop-up Notification */}
      {showNotification && <Notification message={notificationMessage} />}

      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting, errors }) => (
          <Form className="max-w-md mx-auto space-y-4">
            {errors.general && <p className="text-red-600 mb-4">{errors.general}</p>}

            {/* Username */}
            <div>
              <label htmlFor="username" className="block mb-2">Username</label>
              <Field
                name="username"
                type="text"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
              <ErrorMessage name="username" component="p" className="text-red-600" />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-2">Password</label>
              <Field
                name="password"
                type="password"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
              <ErrorMessage name="password" component="p" className="text-red-600" />
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
