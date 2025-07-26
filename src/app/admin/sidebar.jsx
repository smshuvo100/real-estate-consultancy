// ✅ src/app/admin/sidebar.jsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiMenu,
  FiLogOut,
  FiHome,
  FiFileText,
  FiFolder,
  FiX,
} from "react-icons/fi";
import Image from "next/image";

export default function Sidebar({ isOpen, toggle, close }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        {/* Logo */}
        <Link href="/admin/dashboard" className="logo">
          <Image src="/images/logo.png" alt="logo" width={205} height={36} />
        </Link>
        <button className="toggle-btn mobile-only" onClick={close}>
          <FiX />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link href="/admin/dashboard">
              <FiHome /> Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/blog">
              <FiFileText /> Blog
            </Link>
          </li>
          <li>
            <Link href="/admin/project">
              <FiFolder /> Project
            </Link>
          </li>
        </ul>
      </nav>

      <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
}
