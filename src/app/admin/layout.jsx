"use client";
import { useEffect, useRef, useState } from "react";

import Sidebar from "./sidebar";
import "./style.css";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const overlayRef = useRef();

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
      <button
        className="global-toggle-btn desktop-hidden"
        onClick={toggleSidebar}
      >
        ☰
      </button>
      {isSidebarOpen && (
        <div ref={overlayRef} className="overlay" onClick={closeSidebar} />
      )}
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={toggleSidebar}
        close={closeSidebar}
      />
      <main className="main-content">{children}</main>
    </div>
  );
}
