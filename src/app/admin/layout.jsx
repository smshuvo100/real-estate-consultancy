// ✅ src/app/admin/layout.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./sidebar";
import "./style.css";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const overlayRef = useRef();
  const router = useRouter();

  // ✅ Redirect if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  // ✅ Responsive sidebar logic
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="admin-layout">
      {/* ☰ Toggle Button (mobile only) */}
      <button className="global-toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div ref={overlayRef} className="overlay" onClick={closeSidebar} />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} close={closeSidebar} />

      {/* Main Content */}
      <main className="main-content">{children}</main>
    </div>
  );
}
