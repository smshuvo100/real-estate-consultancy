// ✅ src/app/admin/sidebar.jsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLogOut, FiHome, FiFileText, FiFolder, FiX } from "react-icons/fi";
import Image from "next/image";

export default function Sidebar({ isOpen, toggle, close }) {
  const router = useRouter();

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
