// ✅ /src/app/admin/blog/edit/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [gallery, setGallery] = useState([]);

  // ✅ Fetch blog by ID
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch("/api/blog");
        const allBlogs = await res.json();
        const blog = allBlogs.find((b) => b._id === id);

        if (!blog) return alert("Blog not found");

        setTitle(blog.title || "");
        setCategory(blog.category || "");
        setShortDesc(blog.shortDesc || "");
        setContent(blog.content || "");
        setFeaturedImage(blog.featuredImage || "");
        setGallery(Array.isArray(blog.gallery) ? blog.gallery : []);
      } catch (err) {
        console.error("❌ Failed to fetch blog:", err);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  // ✅ Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/blog", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        category,
        shortDesc,
        content,
        featuredImage,
        gallery,
      }),
    });

    if (res.ok) {
      router.push("/admin/blog");
    } else {
      const err = await res.json();
      console.error("❌ Update error:", err);
      alert("Blog update failed");
    }
  };

  return (
    <div className="blog-form">
      <h1>Edit Blog</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
        />

        <textarea
          placeholder="Short Description"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          className="input"
        />

        {/* ✅ Featured Image */}
        <input
          type="text"
          placeholder="Featured Image URL"
          value={featuredImage}
          onChange={(e) => setFeaturedImage(e.target.value)}
          className="input"
        />

        {/* ✅ Gallery */}
        <input
          type="text"
          placeholder="Gallery (comma separated)"
          value={gallery.join(",")}
          onChange={(e) =>
            setGallery(e.target.value.split(",").map((url) => url.trim()))
          }
          className="input"
        />

        {/* ✅ Replace Editor with textarea */}
        <textarea
          placeholder="Full Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input"
          rows={10}
        />

        <button type="submit" className="btn">
          Update Blog
        </button>
      </form>
    </div>
  );
}
