"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

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
    <header className={`main-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="logo">
            <Image src="/images/logo.png" alt="logo" width={205} height={36} />
          </Link>

          <nav className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/about">About</Link>
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

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
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
      </div>
    </header>
  );
}
