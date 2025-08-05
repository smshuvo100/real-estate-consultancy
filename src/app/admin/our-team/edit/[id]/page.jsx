"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function EditTeamMemberPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    title: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    const fetchTeam = async () => {
      const res = await fetch("/api/team");
      const data = await res.json();
      const member = data.find((m) => m._id === id);
      if (!member) return alert("Team member not found");
      setForm(member);
    };
    fetchTeam();
  }, [id]);

  const handleInputChange = (e) => {
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
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/our-team");
    } else {
      alert("Update failed");
    }
  };

  return (
    <div className="blog-form">
      <h1>Edit Team Member</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleInputChange}
          className="input"
        />
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleInputChange}
          className="input"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
          className="input"
          rows={5}
        ></textarea>

        <div className="ad-label-group" style={{ marginTop: 20 }}>
          <label>Upload Image:</label>
          <input type="file" onChange={handleImageUpload} />

          {form.image && (
            <div
              style={{
                position: "relative",
                display: "inline-block",
                marginTop: "10px",
              }}
            >
              <Image
                src={form.image}
                width={120}
                height={120}
                alt="Team"
                style={{ borderRadius: "8px", display: "block" }}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                style={{
                  position: "absolute",
                  top: "0",
                  right: "-8px",
                  background: "#d33",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  fontSize: "16px",
                  lineHeight: "1",
                  textAlign: "center",
                  cursor: "pointer",
                  zIndex: 10,
                }}
              >
                ×
              </button>
            </div>
          )}
        </div>

        <button type="submit" className="btn">
          Update Member
        </button>
      </form>
    </div>
  );
}
