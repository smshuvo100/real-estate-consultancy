// ✅ src/app/admin/blog/page.jsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then(setBlogs);
  }, []);

  const deleteBlog = async (id) => {
    if (confirm("Delete this blog?")) {
      await fetch(`/api/blog/${id}`, { method: "DELETE" });
      setBlogs(blogs.filter((b) => b._id !== id));
    }
  };

  return (
    <div>
      <h1>Manage Blogs</h1>
      <Link href="/admin/blog/create">➕ Add New</Link>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <strong>{blog.title}</strong>
            <br />
            <Link href={`/admin/blog/edit/${blog._id}`}>✏️ Edit</Link>
            <button onClick={() => deleteBlog(blog._id)}>🗑 Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
