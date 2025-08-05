// src/app/admin/founders/page.jsx
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function FounderEditPage() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchFounder = async () => {
      try {
        const res = await fetch("/api/founder");
        const data = await res.json();
        if (data) {
          setName(data.name || "");
          setTitle(data.title || "");
          setDescription(data.description || "");
          setImage(data.image || "");
        }
      } catch (err) {
        console.error("❌ Failed to fetch founder:", err);
      }
    };
    fetchFounder();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      setImage(data.url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name, title, description, image };

    const res = await fetch("/api/founder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Founder updated successfully!");
    } else {
      alert("Update failed!");
    }
  };

  return (
    <div className="dashboard-content" style={{ padding: 20 }}>
      <div className="admin-form">
        <h1 style={{ fontSize: "24px", marginBottom: 20 }}>
          🧑‍💼 Edit Founder Info
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Title"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="ad-label-group" style={{ marginTop: 20 }}>
            <label>Upload Founder Image:</label>
            <input type="file" onChange={handleImageUpload} />
            {image && (
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  marginTop: 10,
                }}
              >
                <Image src={image} alt="Founder" width={100} height={100} />
                <button
                  type="button"
                  onClick={() => setImage("")}
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

          <div style={{ margin: "20px 0" }}>
            <label>Description:</label>
            <ReactQuill
              value={description}
              onChange={setDescription}
              placeholder="Founder description..."
            />
          </div>

          <button className="btn" type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
