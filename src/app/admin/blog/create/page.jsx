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
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [gallery, setGallery] = useState([]);
  const [loadingAi, setLoadingAi] = useState(false);

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

  const generateContentWithAI = async () => {
    const input = content?.trim();

    if (!input) {
      alert("Please write something in the editor before clicking AI button.");
      return;
    }

    const prompt = `Please respond to the following instruction or message as a smart AI assistant:\n\n"${input}"`;

    setLoadingAi(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setLoadingAi(false);

      if (data.success) {
        setContent(data.content); // চাইলে append করতেও পারেন
      } else {
        alert("AI failed: " + data.error);
      }
    } catch (err) {
      console.error("AI error:", err);
      setLoadingAi(false);
      alert("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      date: today,
      adminName: "Admin",
      title,
      slug: slug?.trim(),
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
      alert("Blog submission failed");
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

        {/* ✨ AI Generate Button */}
        <div style={{ margin: "20px 0" }}>
          <button
            type="button"
            onClick={generateContentWithAI}
            className="btn"
            disabled={loadingAi}
          >
            {loadingAi ? "Generating..." : "✍️ Generate Content With AI"}
          </button>
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
