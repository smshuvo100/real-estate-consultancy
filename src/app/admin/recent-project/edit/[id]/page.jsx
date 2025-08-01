"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

export default function EditRecentProjectPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    url: "",
    bgImage: "",
  });

  // fetch project data
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/recent-project");
      const data = await res.json();
      const project = data.find((p) => p._id === id);
      if (project) {
        setForm(project);
      } else {
        alert("Recent Project not found");
      }
    };
    fetchData();
  }, [id]);

  // input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // image upload
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

  // image remove
  const handleRemoveImage = () => {
    setForm((prev) => ({ ...prev, bgImage: "" }));
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/recent-project", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/admin/recent-project");
    } else {
      alert("Update failed");
    }
  };

  return (
    <div className="blog-form">
      <h1>Edit Recent Project</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="input"
        />

        <input
          type="text"
          name="url"
          value={form.url}
          onChange={handleInputChange}
          placeholder="URL"
          className="input"
        />

        <div className="ad-label-group">
          <label>Upload Background Image:</label>
          <input type="file" onChange={handleImageUpload} />
          {form.bgImage && (
            <div style={{ position: "relative", display: "inline-block" }}>
              <Image
                src={form.bgImage}
                width={150}
                height={100}
                alt="background"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                style={{
                  position: "absolute",
                  top: 5,
                  right: -10,
                  background: "#d33",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
          )}
        </div>

        <button type="submit" className="btn">
          Update Project
        </button>
      </form>
    </div>
  );
}
