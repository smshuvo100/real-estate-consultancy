// ✅ src/app/admin/sidebar.jsx
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
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);

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
          {/* ✅ Expandable Submenu */}
          <li className={isSubMenuOpen ? "open" : ""}>
            <div
              className="menu-item-with-toggle"
              onClick={() => setSubMenuOpen(!isSubMenuOpen)}
            >
              <span>
                <FiFolder /> Project
              </span>
              <button className="submenu-toggle">
                {isSubMenuOpen ? <FiMinus /> : <FiPlus />}
              </button>
            </div>
            <ul
              className="sub-menu"
              style={{ display: isSubMenuOpen ? "block" : "none" }}
            >
              <li>
                <Link href="/admin/project">All Projects</Link>
              </li>
              <li>
                <Link href="/admin/recent-project">Recent Projects</Link>
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
