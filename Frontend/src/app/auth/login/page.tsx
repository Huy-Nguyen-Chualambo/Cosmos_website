"use client";
import React, { useState } from 'react';
import NavBar from '@/components/navbar';
import Link from 'next/link';
import StarsBg from '@/components/stars_bg';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'email') {
      setErrors(prev => ({
        ...prev,
        email: value.includes('@') && value.includes('.') ? '' : 'Invalid email format'
      }));
    }

    if (name === 'password') {
      setErrors(prev => ({
        ...prev,
        password: value.length < 8 ? 'Password must be at least 8 characters' : ''
      }));
    }
  };

  const isFormValid = () => (
  formData.email.length > 0 &&
  formData.password.length >= 8 &&
  !errors.email &&
  !errors.password
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
          credentials :'include'
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          router.push('/dashboard');
        } else {
          const errorData = await response.json();
          setErrors(prev => ({
            ...prev,
            general: errorData.error || 'Invalid email or password'
          }));
        }
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          general: 'Network error occurred'
        }));
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center sm:p-8 md:p-16 lg:p-20 gap-8 sm:gap-12 md:gap-16 font-[family-name:var(--font-geist-sans)] relative">
      <NavBar />
      <StarsBg />

      <div className="flex items-start justify-center w-full mt-5">
        <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Welcome Back!</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg bg-white/5 text-white border border-white/30 focus:border-white/60 focus:outline-none transition-colors"
                required
              />
              {errors.email && (
                <p className="mt-1 text-red-400 text-sm">{errors.email}</p>
              )}
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
              {errors.password && (
                <p className="mt-1 text-red-400 text-sm">{errors.password}</p>
              )}
            </div>

            {errors.general && (
              <p className="text-center text-red-400 text-sm">{errors.general}</p>
            )}

            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full py-3 px-4 font-bold rounded-lg transition-colors ${
                isFormValid()
                  ? 'bg-white hover:bg-gray-300 text-black'
                  : 'bg-gray-500 cursor-not-allowed text-gray-300'
              }`}
            >
              Sign In
            </button>

            <div className="text-center">
              <Link 
                href="/auth/signup" 
                className="text-white/80 hover:text-white text-sm transition-colors"
              >
                Don't have an account? Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;