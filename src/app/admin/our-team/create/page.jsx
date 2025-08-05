"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreateTeamMemberPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      setForm((prev) => ({ ...prev, image: data.url }));
    }
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/our-team");
    } else {
      alert("❌ Failed to create team member");
    }
  };

  return (
    <div className="blog-form">
      <h1>Create Team Member</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="input"
        />

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title (e.g., CEO)"
          className="input"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Short Description"
          className="input"
          rows={4}
        />

        <div className="ad-label-group">
          <label>Upload Team Member Image</label>
          <input type="file" onChange={handleImageUpload} />
          {form.image && (
            <div style={{ position: "relative", display: "inline-block" }}>
              <Image src={form.image} width={120} height={120} alt="Team" />
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
          Submit Team Member
        </button>
      </form>
    </div>
  );
}
