// src/app/admin/project/edit/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState(null);
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      // Load amenities
      const aRes = await fetch("/api/amenity");
      const aData = await aRes.json();
      const activeAmenities = (aData.amenities || []).filter((a) => a.isActive);
      setAmenities(activeAmenities);

      // Load projects list and match by id (as your original approach)
      const res = await fetch("/api/project");
      const data = await res.json();
      const project = (data.projects || []).find((p) => p._id === id);
      if (project) {
        setForm({
          ...project,
          // ensure amenities array exists
          amenities: Array.isArray(project.amenities)
            ? project.amenities.map(String)
            : [],
        });
      } else {
        alert("Project not found");
      }
    };
    fetchAll();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleAmenity = (amenityId) => {
    setForm((prev) => {
      const exists = prev.amenities.includes(amenityId);
      const next = exists
        ? prev.amenities.filter((x) => x !== amenityId)
        : [...prev.amenities, amenityId];
      return { ...prev, amenities: next };
    });
  };

  const removeImage = (key, url) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].filter((img) => img !== url),
    }));
  };

  const handleImageUpload = async (e, key, single = false) => {
    const files = Array.from(e.target.files);
    const uploaded = [];

    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) uploaded.push(data.url);
    }

    if (single) {
      setForm((prev) => ({ ...prev, [key]: uploaded[0] || "" }));
    } else {
      setForm((prev) => ({ ...prev, [key]: [...prev[key], ...uploaded] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/project", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push("/admin/project");
    else alert("Project update failed");
  };

  if (!form) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div className="blog-form">
      <h1>Edit Project</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleInputChange}
          className="input"
        />

        <input
          name="slug"
          value={form.slug || ""}
          onChange={handleInputChange}
          placeholder="Slug (optional)"
          className="input"
        />

        <ReactQuill
          value={form.description}
          onChange={(v) => setForm((prev) => ({ ...prev, description: v }))}
        />

        {/* Featured */}
        <div className="ad-label-flex sm">
          <div className="ad-label-group">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={!!form.isFeatured}
              onChange={handleInputChange}
            />
            <label htmlFor="isFeatured">Set Featured Project</label>
          </div>
        </div>

        {/* Property */}
        <input
          name="price"
          value={form.price}
          onChange={handleInputChange}
          className="input"
        />
        <input
          name="bedrooms"
          value={form.bedrooms}
          onChange={handleInputChange}
          className="input"
        />
        <input
          name="bathrooms"
          value={form.bathrooms}
          onChange={handleInputChange}
          className="input"
        />
        <input
          name="sqft"
          value={form.sqft}
          onChange={handleInputChange}
          className="input"
        />
        <input
          name="propertyArea"
          value={form.propertyArea}
          onChange={handleInputChange}
          className="input"
        />
        <input
          name="propertyType"
          value={form.propertyType}
          onChange={handleInputChange}
          className="input"
        />

        {/* ✅ Amenities Checklist */}
        <h2>Amenities</h2>
        <div className="ad-label-flex">
          {amenities.map((a) => (
            <div className="ad-label-group sm" key={a._id}>
              <input
                id={a._id}
                type="checkbox"
                checked={form.amenities.includes(a._id)}
                onChange={() => toggleAmenity(a._id)}
              />
              <label htmlFor={a._id} key={a._id}>
                {a.name}
              </label>
            </div>
          ))}
        </div>

        {/* Address + Map */}
        <input
          name="address"
          value={form.address}
          onChange={handleInputChange}
          className="input"
        />
        <input
          name="mapIframe"
          value={form.mapIframe}
          onChange={handleInputChange}
          className="input"
        />

        {/* Images */}
        {["featuredImages", "sidebarImages", "gallery"].map((key) => (
          <div className="ad-label-group" key={key}>
            <label>Upload {key}</label>
            <input
              type="file"
              multiple
              onChange={(e) => handleImageUpload(e, key)}
            />
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {(form[key] || []).map((url, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <Image src={url} width={80} height={80} alt={key} />
                  <button
                    type="button"
                    onClick={() => removeImage(key, url)}
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
        ))}

        {/* Floorplan */}
        <h2>Floorplan Info</h2>
        <input
          name="unit"
          value={form.unit}
          onChange={handleInputChange}
          className="input"
        />
        <input
          name="suite"
          value={form.suite}
          onChange={handleInputChange}
          className="input"
        />
        <input
          name="balconySize"
          value={form.balconySize}
          onChange={handleInputChange}
          className="input"
        />
        <input
          name="total"
          value={form.total}
          onChange={handleInputChange}
          className="input"
        />

        <div className="ad-label-group">
          <label>Upload Floorplan Image:</label>
          <input
            type="file"
            onChange={(e) => handleImageUpload(e, "image", true)}
          />
          {form.image && (
            <div style={{ position: "relative", display: "inline-block" }}>
              <Image
                src={form.image}
                width={120}
                height={120}
                alt="floorplan"
              />
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
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
          )}
        </div>

        <button type="submit" className="btn">
          Update Project
        </button>
      </form>
    </div>
  );
}
