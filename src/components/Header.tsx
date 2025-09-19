"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

export default function Header() {
  const { isEnglish, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".mobile-menu") && !target.closest(".hamburger")) {
        setIsOpen(false);
      }
    };

    // Handle scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { href: "/", en: "Home", mn: "Эхлэл" },
    { href: "/value", en: "Values", mn: "Үнэ цэн" },
    { href: "/circle", en: "Partnership", mn: "Түншлэл" },
    { href: "/contact", en: "Manager", mn: "Менежер" },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex-shrink-0">
            <Image src="/Logo2.png" alt="logo" width={120} height={120} className="w-20 object-contain h-20 sm:w-24 sm:h-24" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center  gap-[20px] space-x-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <p className="relative  text-white group overflow-hidden h-[24px]">
                  <span className="block transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-1">
                    {isEnglish ? item.en : item.mn}
                  </span>
                  <span className="block absolute left-0 w-full transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-24px]">
                    {isEnglish ? item.en : item.mn}
                  </span>
                </p>
              </Link>
            ))}

            {/* Language Toggle - Desktop */}
            <div className="relative group ml-2">
              <button className="flex items-center space-x-1 text-white hover:text-blue-400 transition-colors p-5 relative">
                <span>{isEnglish ? "Language" : "Хэл"}</span>
                <svg
                  className="w-4 h-4 transform transition-transform duration-200 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute top-full right-0 mt-0 bg-black/90 backdrop-blur-sm rounded-b-lg overflow-hidden shadow-xl transform transition-all duration-300 origin-top scale-y-0 group-hover:scale-y-100 opacity-0 group-hover:opacity-100 min-w-[160px] z-50">
                <button
                  onClick={() => !isEnglish || toggleLanguage()}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-800/80 transition-colors flex items-center space-x-2 ${
                    !isEnglish ? "bg-gray-800/50" : ""
                  }`}
                >
                  <span className="text-sm font-medium">🇲🇳</span>
                  <span className="text-sm">Монгол</span>
                </button>
                <button
                  onClick={() => isEnglish || toggleLanguage()}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-800/80 transition-colors flex items-center space-x-2 ${
                    isEnglish ? "bg-gray-800/50" : ""
                  }`}
                >
                  <span className="text-sm font-medium">🇺🇸</span>
                  <span className="text-sm">English</span>
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hamburger inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-400 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden mobile-menu transition-all  duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-screen" : "max-h-0"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px- min-h-screen bg-black/90  backdrop-blur-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              <div className="block px-3 py-4 text-white hover:bg-gray-800/50 rounded-md transition-colors">{isEnglish ? item.en : item.mn}</div>
            </Link>
          ))}

          {/* Language Toggle - Mobile */}
          <div className="px-3 py-4">
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  if (isEnglish) toggleLanguage();
                  setIsOpen(false);
                }}
                className={`px-4 py-2 rounded-md ${!isEnglish ? "bg-gray-800/50" : "bg-gray-800/20"} text-white`}
              >
                🇲🇳 Монгол
              </button>
              <button
                onClick={() => {
                  if (!isEnglish) toggleLanguage();
                  setIsOpen(false);
                }}
                className={`px-4 py-2 rounded-md ${isEnglish ? "bg-gray-800/50" : "bg-gray-800/20"} text-white`}
              >
                🇺🇸 English
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
