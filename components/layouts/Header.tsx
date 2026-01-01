"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  const navClassName = `fixed top-0 mb-3 w-full z-100 transition-all duration-300 ${
    scrolled
      ? "bg-blue-700/90 backdrop-blur-md py-2 shadow-lg"
      : "bg-blue-600 py-4"
  }`;

  return (
    <nav className={navClassName} suppressHydrationWarning>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-white p-1.5 rounded-xl shadow-sm group-hover:rotate-12 transition-transform">
            <Image
              src="/images/profile.jpg"
              width={35}
              height={35}
              alt="logo"
            />
          </div>
          <span className="text-xl font-black text-white tracking-tighter uppercase">
            Portfolio
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white hover:text-blue-100 font-bold text-sm uppercase tracking-widest transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {mounted && (
            <SignedIn>
              <div className="border-l border-white/20 pl-6 ">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "h-9 w-9 border-2 border-white",
                    },
                  }}
                />
              </div>
            </SignedIn>
          )}
        </div>

        {/* Mobile Toggle & User Button Container */}
        <div className="lg:hidden flex items-center gap-4">
          {mounted && (
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-8 w-8 border border-white",
                  },
                }}
              />
            </SignedIn>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-1"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full bg-blue-700 border-t border-white/10 flex flex-col p-8 gap-6 lg:hidden shadow-2xl overflow-hidden"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white text-2xl font-black uppercase tracking-tighter border-b border-white/10 pb-2"
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Header;
