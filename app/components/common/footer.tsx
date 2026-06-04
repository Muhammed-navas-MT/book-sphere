"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    explore: [
      { label: "Featured Books", href: "/#featured" },
      { label: "All Collection", href: "/books" },
      { label: "Reading Benefits", href: "/#benefits" },
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
    ],
    support: [
      { label: "Contact Us", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Branding Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              BookSphere
            </span>
          </Link>
          <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
            Discover a hand-curated catalog of literature. Empower your vocabulary, grow your knowledge, and find your next favorite story.
          </p>
          {/* Social Badges */}
          <div className="flex items-center gap-3 pt-2">
            {[
              { 
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                  </svg>
                ), 
                href: "#", 
                label: "Facebook" 
              },
              { 
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                ), 
                href: "#", 
                label: "Twitter" 
              },
              { 
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                ), 
                href: "#", 
                label: "Instagram" 
              },
              { 
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                ), 
                href: "#", 
                label: "GitHub" 
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-9 h-9 flex items-center justify-center bg-white border border-gray-200 text-gray-500 rounded-xl hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-all duration-200 hover:-translate-y-0.5"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="font-bold text-gray-800 text-sm mb-4 uppercase tracking-wider">
            Explore
          </h3>
          <ul className="space-y-3">
            {links.explore.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-purple-600 text-sm transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h3 className="font-bold text-gray-800 text-sm mb-4 uppercase tracking-wider">
            Company
          </h3>
          <ul className="space-y-3">
            {links.company.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-purple-600 text-sm transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h3 className="font-bold text-gray-800 text-sm mb-4 uppercase tracking-wider">
            Support
          </h3>
          <ul className="space-y-3">
            {links.support.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-purple-600 text-sm transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright block */}
      <div className="max-w-7xl mx-auto px-6 border-t border-gray-200/60 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-medium">
        <p>&copy; {currentYear} BookSphere. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Made with <Heart className="w-3.5 h-3.5 text-purple-500 fill-purple-500 animate-pulse" /> for book lovers everywhere.
        </p>
      </div>
    </footer>
  );
}
