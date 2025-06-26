"use client";
import React, { useState } from 'react';
import NavBar from '@/components/navbar';
import Link from 'next/link';
import StarsBg from '@/components/stars_bg';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'email') {
      setErrors(prev => ({
        ...prev,
        email: value.includes('@') ? '' : 'Email have to include @'
      }));
    }

    if (name === 'password') {
      setErrors(prev => ({
        ...prev,
        password: value.length < 8 
          ? 'Password must be at least 8 characters'
          : formData.confirmPassword && value !== formData.confirmPassword
          ? 'Passwords do not match'
          : ''
      }));
    }

    if (name === 'confirmPassword') {
      setErrors(prev => ({
        ...prev,
        password: value !== formData.password ? 'Passwords do not match' : ''
      }));
    }
  };

  const isFormValid = () => {
    return (
      formData.name.length > 0 &&
      formData.email.length > 0 &&
      formData.password.length >= 8 &&
      formData.password === formData.confirmPassword &&
      !errors.email &&
      !errors.password
    );
  };

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        const response = await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Sign up successful:', data);
          // Redirect to login page after successful signup
          window.location.href = '/auth/login';
        } else {
          const errorData = await response.json();
          console.error('Sign up failed:', errorData);
          // Handle validation errors from backend
          if (errorData.email) {
            setErrors(prev => ({ ...prev, email: errorData.email[0] }));
          }
          // Add other error handlers as needed
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center sm:p-8 md:p-16 lg:p-20 gap-8 sm:gap-12 md:gap-16 font-[family-name:var(--font-geist-sans)] relative">
      <NavBar />
      <StarsBg />

      {/* Sign up form */}
      <div className="flex items-start justify-center w-full mt-5">
        <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/5 text-white border border-white/30 focus:border-white/60 focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/5 text-white border border-white/30 focus:border-white/60 focus:outline-none transition-colors"
                required
              />
              {errors.email && <p className="mt-1 text-red-400 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/5 text-white border border-white/30 focus:border-white/60 focus:outline-none transition-colors"
                required
              />
              {errors.password && <p className="mt-1 text-red-400 text-sm">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/5 text-white border border-white/30 focus:border-white/60 focus:outline-none transition-colors"
                required
              />
              {errors.password && <p className="mt-1 text-red-400 text-sm">{errors.password}</p>}
            </div>
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full py-3 px-4 font-bold rounded-lg transition-colors ${
                isFormValid()
                  ? 'bg-white hover:bg-gray-300 text-black'
                  : 'bg-gray-500 cursor-not-allowed text-gray-300'
              }`}
            >
              Sign Up
            </button>
            <div className="text-center">
              <Link 
                href="/auth/login" 
                className="text-white/80 hover:text-white text-sm transition-colors"
              >
                Already have an account? Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;