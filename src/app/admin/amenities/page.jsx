"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AmenitiesAdminPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: "", image: "", isActive: true });
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const res = await fetch("/api/amenity");
    const data = await res.json();
    setList(data.amenities || []);
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (data.success) {
      setForm((prev) => ({ ...prev, image: data.url }));
    } else {
      alert("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const payload = editing ? { ...form, _id: editing } : form;

    const res = await fetch("/api/amenity", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setForm({ name: "", image: "", isActive: true });
      setEditing(null);
      load();
    } else {
      alert("Save failed");
    }
  };

  const handleEdit = (item) => {
    setEditing(item._id);
    setForm({
      name: item.name,
      image: item.image || "",
      isActive: !!item.isActive,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this amenity?")) return;
    const res = await fetch("/api/amenity", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) load();
    else alert("Delete failed");
  };

  return (
    <div className="blog-form">
      <h1>Add Amenities</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <input
          className="input"
          placeholder="Amenity name (e.g., Elevator)"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
        />

        <div className="ad-label-group">
          <label>Image (optional)</label>
          <input type="file" onChange={handleUpload} />
          {uploading && <span>Uploading...</span>}
          {form.image && (
            <div style={{ marginTop: 10 }}>
              <Image src={form.image} width={80} height={80} alt="amenity" />
            </div>
          )}
        </div>
        <div className="ad-label-flex">
          <div className="ad-label-group sm" style={{ marginTop: 10 }}>
            <input
              type="checkbox"
              id="isActive"
              checked={form.isActive}
              onChange={(e) =>
                setForm((p) => ({ ...p, isActive: e.target.checked }))
              }
            />
            <label htmlFor="isActive">Active</label>
          </div>
        </div>

        <button type="submit" className="btn">
          {editing ? "Update Amenity" : "Add Amenity"}
        </button>
        {editing && (
          <button
            type="button"
            className="btn"
            style={{ marginLeft: 10, background: "#555" }}
            onClick={() => {
              setEditing(null);
              setForm({ name: "", image: "", isActive: true });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {list.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #2a2a2a",
              borderRadius: 12,
              padding: 12,
              background: "#1f1f1f",
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div>
                {item.image ? (
                  <Image
                    src={item.image}
                    width={56}
                    height={56}
                    alt={item.name}
                  />
                ) : (
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      background: "#333",
                      borderRadius: 8,
                    }}
                  />
                )}
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>{item.name}</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>
                  {item.isActive ? "Active" : "Inactive"}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button
                className="btn"
                type="button"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button
                className="btn"
                type="button"
                style={{ background: "#d33" }}
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
