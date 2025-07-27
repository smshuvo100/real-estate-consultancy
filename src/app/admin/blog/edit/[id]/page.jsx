"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch("/api/blog");
        const allBlogs = await res.json();
        const blog = allBlogs.find((b) => b._id === id);

        if (!blog) return alert("Blog not found");

        setTitle(blog.title || "");
        setSlug(blog.slug || "");
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
        slug: slug?.trim(), // ✅ include slug in update
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
    <div className="blog-form" style={{ padding: 20 }}>
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

        {/* ✅ Upload Featured Image */}
        <div className="ad-label-group" style={{ marginTop: 20 }}>
          <label>Upload Featured Image:</label>
          <input type="file" onChange={(e) => uploadImage(e, false)} />
          {featuredImage && (
            <div
              style={{
                position: "relative",
                display: "inline-block",
                marginTop: 10,
              }}
            >
              <Image
                src={featuredImage}
                alt="Featured"
                width={80}
                height={80}
              />
              <button
                type="button"
                onClick={() => setFeaturedImage("")}
                style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  background: "#d33",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* ✅ Upload Gallery Images */}
        <div className="ad-label-group" style={{ marginTop: 20 }}>
          <label>Upload Gallery Image(s):</label>
          <input type="file" multiple onChange={(e) => uploadImage(e, true)} />
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginTop: 10,
            }}
          >
            {gallery.map((img, idx) => (
              <div
                key={idx}
                style={{ position: "relative", display: "inline-block" }}
              >
                <Image
                  src={img}
                  alt={`Gallery ${idx}`}
                  width={80}
                  height={80}
                />
                <button
                  type="button"
                  onClick={() =>
                    setGallery((prev) => prev.filter((_, i) => i !== idx))
                  }
                  style={{
                    position: "absolute",
                    top: 5,
                    right: -5,
                    background: "#d33",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: 20,
                    height: 20,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Rich Text Editor */}
        <div style={{ margin: "20px 0" }}>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Full Blog Content"
          />
        </div>

        <button type="submit" className="btn">
          Update Blog
        </button>
      </form>
    </div>
  );
}
