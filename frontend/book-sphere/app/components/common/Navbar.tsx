"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Books", href: "/books" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm py-4"
            : "bg-white border-b border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-purple-200 group-hover:scale-105 transition-transform duration-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              BookSphere
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 hover:text-purple-600 relative py-1 ${
                    isActive ? "text-purple-600" : "text-gray-600"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-full animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Hand Side visual controls */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/books"
              className="p-2.5 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition duration-200"
              aria-label="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              href="/books"
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-purple-100 hover:shadow-purple-200 hover:-translate-y-0.5 active:translate-y-0 transition duration-200"
            >
              Explore All Books
            </Link>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center gap-4 md:hidden">
            <Link
              href="/books"
              className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition duration-200"
              aria-label="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition duration-200"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu Panel */}
      <div
        className={`fixed top-[73px] right-0 bottom-0 z-40 w-64 bg-white border-l border-gray-100 shadow-xl p-6 md:hidden flex flex-col justify-between transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Navigation
          </p>
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-semibold py-2 px-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-purple-50 text-purple-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-purple-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-3 pt-6 border-t border-gray-100">
          <Link
            href="/books"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full text-center block px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold shadow-md transition"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    </>
  );
}
