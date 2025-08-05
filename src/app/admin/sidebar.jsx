"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiLogOut,
  FiHome,
  FiFileText,
  FiFolder,
  FiX,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import Image from "next/image";

export default function Sidebar({ isOpen, toggle, close }) {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(""); // NEW

  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? "" : menu));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* ✅ Logo + Mobile Close Button */}
      <div className="sidebar-header">
        <Link href="/admin/dashboard" className="logo">
          <Image src="/images/logo.png" alt="logo" width={205} height={36} />
        </Link>
        <button
          className="toggle-btn mobile-only"
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
        >
          <FiX />
        </button>
      </div>

      {/* ✅ Navigation */}
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link href="/admin/dashboard">
              <FiHome /> <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/blog">
              <FiFileText /> <span>Blog</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/project">
              <FiFolder /> <span>Project</span>
            </Link>
          </li>

          {/* ✅ About Submenu */}
          <li className={openDropdown === "about" ? "open" : ""}>
            <div
              className="menu-item-with-toggle"
              onClick={() => toggleDropdown("about")}
            >
              <span>
                <FiFolder /> About
              </span>
              <button className="submenu-toggle">
                {openDropdown === "about" ? <FiMinus /> : <FiPlus />}
              </button>
            </div>
            <ul
              className="sub-menu"
              style={{ display: openDropdown === "about" ? "block" : "none" }}
            >
              <li>
                <Link href="/admin/about-tabs">About Tabs</Link>
              </li>
              <li>
                <Link href="/admin/founders">Founders</Link>
              </li>
              <li>
                <Link href="/admin/our-team">Our Team</Link>
              </li>
            </ul>
          </li>

          {/* ✅ Faq Submenu */}
          <li className={openDropdown === "faqs" ? "open" : ""}>
            <div
              className="menu-item-with-toggle"
              onClick={() => toggleDropdown("faqs")}
            >
              <span>
                <FiFolder /> Faqs
              </span>
              <button className="submenu-toggle">
                {openDropdown === "faqs" ? <FiMinus /> : <FiPlus />}
              </button>
            </div>
            <ul
              className="sub-menu"
              style={{ display: openDropdown === "faqs" ? "block" : "none" }}
            >
              <li>
                <Link href="/admin/property-faq">Property Faq</Link>
              </li>
              <li>
                <Link href="/admin/investor-faq">Investor Faq</Link>
              </li>
              <li>
                <Link href="/admin/project-faq">Project Faq</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* ✅ Logout */}
      <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut /> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
