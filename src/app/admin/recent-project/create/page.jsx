"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreateRecentProjectPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    url: "",
    bgImage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    if (data.success) {
      setForm((prev) => ({ ...prev, bgImage: data.url }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/recent-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push("/admin/recent-project");
    else alert("Recent Project creation failed");
  };

  return (
    <div className="blog-form">
      <h1>Create Recent Project</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleInputChange}
          className="input"
        />

        <input
          name="url"
          placeholder="URL"
          value={form.url}
          onChange={handleInputChange}
          className="input"
        />

        <div className="ad-label-group">
          <label>Upload Background Image</label>
          <input type="file" onChange={handleImageUpload} />
          {form.bgImage && (
            <Image src={form.bgImage} width={120} height={120} alt="bg" />
          )}
        </div>

        <button type="submit" className="btn">
          Submit Recent Project
        </button>
      </form>
    </div>
  );
}
