"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-black bg-opacity-80 p-4 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center ml-4 sm:ml-10">
            <Image
              className="dark:invert"
              src="/planet-svgrepo-com.svg"
              alt="Planet logo"
              width={30}
              height={15}
              priority
            />
            <span className="text-white text-xl sm:text-2xl font-bold ml-2">Cosmos</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/wikiObjects" className="text-gray-300 hover:text-white transition-colors">
              Wiki Objects
            </Link>
            <Link href="/resources" className="text-gray-300 hover:text-white transition-colors">
              Resources
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Learn More Button */}
          <div className="hidden md:block mr-4 sm:mr-8">
            <Link
              href="/auth/signup"
              className="bg-white text-[#04080F] px-4 sm:px-6 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm sm:text-base"
            >
              Explore Universe
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-300 hover:text-white transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-gray-300 hover:text-white transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/wikiObjects" 
                className="text-gray-300 hover:text-white transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Wiki Objects
              </Link>
              <Link 
                href="/resources" 
                className="text-gray-300 hover:text-white transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
              <div className="px-4 pt-2">
                <Link
                  href="/auth/signup"
                  className="block text-center bg-white text-[#04080F] px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Explore Universe
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}