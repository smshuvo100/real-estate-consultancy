"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`main-header ${scrolled ? "scrolled" : ""}`}
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="logo">
            <Image src="/images/logo.png" alt="logo" width={205} height={36} />
          </Link>

          <nav className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/about">About</Link>
            {/* <Link href="/why-choose-us"> Why Choose Us</Link> */}
            <Link href="/services">Services</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact" className="btn-sm">
              Enquire Now
            </Link>
          </nav>

          <button className="menu-toggle" onClick={() => setMenuOpen(true)}>
            <FiMenu />
          </button>
        </div>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="overlay"
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu open"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <button className="close-btn" onClick={() => setMenuOpen(false)}>
              <FiX />
            </button>
            <nav>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link href="/projects" onClick={() => setMenuOpen(false)}>
                Projects
              </Link>
              <Link href="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
              <Link href="/why-choose-us" onClick={() => setMenuOpen(false)}>
                Why Choose Us
              </Link>
              <Link href="/blog" onClick={() => setMenuOpen(false)}>
                Blog
              </Link>
              <Link href="/faq" onClick={() => setMenuOpen(false)}>
                FAQ
              </Link>
              <Link
                href="/contact"
                className="btn"
                onClick={() => setMenuOpen(false)}
              >
                Enquire Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
