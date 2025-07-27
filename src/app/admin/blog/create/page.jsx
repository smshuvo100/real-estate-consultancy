// ✅ src/app/admin/blog/create/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function CreateBlogPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState(""); // ✅ new slug input
  const [category, setCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [gallery, setGallery] = useState([]);

  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "2-digit",
  });

  const uploadImage = async (e, isGallery = false) => {
    const files = Array.from(e.target.files);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        if (isGallery) {
          setGallery((prev) => [...prev, data.url]);
        } else {
          setFeaturedImage(data.url);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      date: today,
      adminName: "Admin",
      title,
      slug: slug?.trim(), // ✅ added
      category,
      shortDesc,
      content,
      featuredImage,
      gallery,
    };

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/blog");
    } else {
      const err = await res.json();
      console.error("❌ Blog submission error:", err);
      alert("Blog submission failed. Check console for details.");
    }
  };

  return (
    <div className="blog-form">
      <h1>Create Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />

        <input
          type="text"
          placeholder="Slug (optional)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
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

        {/* 🖼️ Upload Featured Image */}
        <div className="ad-label-group">
          <label>Upload Featured Image:</label>
          <input type="file" onChange={(e) => uploadImage(e, false)} />
          {featuredImage && (
            <Image src={featuredImage} width={80} height={80} alt="featured" />
          )}
        </div>

        {/* 🖼️ Upload Gallery Images */}
        <div className="ad-label-group">
          <label>Upload Gallery Image(s):</label>
          <input type="file" onChange={(e) => uploadImage(e, true)} multiple />
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {gallery.map((img, idx) => (
              <Image key={idx} src={img} width={80} height={80} alt="" />
            ))}
          </div>
        </div>

        {/* 📝 Rich Text Editor */}
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Blog Content"
        />

        <button type="submit" className="btn">
          Submit Blog
        </button>
      </form>
    </div>
  );
}
