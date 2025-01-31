"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Notification from "./../components/Notification";
import Header from "../components/Header";

const Register = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    city: Yup.string().required("City is required"),
    street: Yup.string().required("Street is required"),
    zipcode: Yup.string().required("Zipcode is required"),
    phone: Yup.string().required("Phone is required"),
  });

  const handleRegister = async (values, { setSubmitting, setFieldError }) => {
    try {
      const res = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          username: values.username,
          password: values.password,
          name: {
            firstname: values.firstName,
            lastname: values.lastName,
          },
          address: {
            city: values.city,
            street: values.street,
            number: 1,
            zipcode: values.zipcode,
            geolocation: {
              lat: "-37.3159",
              long: "81.1496",
            },
          },
          phone: values.phone,
        }),
      });

      if (!res.ok) throw new Error("Registration failed");

      const data = await res.json();
      setNotificationMessage("Registration successful!");
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        router.push("/");
      }, 2000);
    } catch (err) {
      setFieldError("general", err.message);
      setNotificationMessage("Registration failed. Please try again.");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-6xl">
      <Header title="Register | My Store" />

      <h1 className="text-3xl font-bold mb-6">Register</h1>

      {showNotification && <Notification message={notificationMessage} />}

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          city: "",
          street: "",
          zipcode: "",
          phone: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ isSubmitting, errors }) => (
          <Form className="max-w-md mx-auto space-y-4">
            {errors.general && (
              <p className="text-red-600 mb-4">{errors.general}</p>
            )}

            <div>
              <label htmlFor="username" className="block mb-2">
                Username
              </label>
              <Field
                name="username"
                type="text"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
              <ErrorMessage
                name="username"
                component="p"
                className="text-red-600"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-600"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <Field
                name="password"
                type="password"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-600"
              />
            </div>

            <div>
              <label htmlFor="firstName" className="block mb-2">
                First Name
              </label>
              <Field
                name="firstName"
                type="text"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
              <ErrorMessage
                name="firstName"
                component="p"
                className="text-red-600"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block mb-2">
                Last Name
              </label>
              <Field
                name="lastName"
                type="text"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
              <ErrorMessage
                name="lastName"
                component="p"
                className="text-red-600"
              />
            </div>

            <div>
              <label htmlFor="city" className="block mb-2">
                City
              </label>
              <Field
                name="city"
                type="text"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
              <ErrorMessage
                name="city"
                component="p"
                className="text-red-600"
              />
            </div>

            <div>
              <label htmlFor="street" className="block mb-2">
                Street
              </label>
              <Field
                name="street"
                type="text"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
              <ErrorMessage
                name="street"
                component="p"
                className="text-red-600"
              />
            </div>

            <div>
              <label htmlFor="zipcode" className="block mb-2">
                Zipcode
              </label>
              <Field
                name="zipcode"
                type="text"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
              <ErrorMessage
                name="zipcode"
                component="p"
                className="text-red-600"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2">
                Phone
              </label>
              <Field
                name="phone"
                type="text"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
              <ErrorMessage
                name="phone"
                component="p"
                className="text-red-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-white py-2 rounded-lg hover:bg-opacity-90"
            >
              {isSubmitting ? "Processing..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
