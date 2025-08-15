// ✅ src/app/admin/project/create/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function CreateProjectPage() {
  const router = useRouter();

  const [amenities, setAmenities] = useState([]);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    isFeatured: false,
    featuredImages: [],
    sidebarImages: [],
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    propertyArea: "",
    propertyType: "",
    // ✅ new field for selected amenities
    amenities: [],
    address: "",
    mapIframe: "",
    gallery: [],
    unit: "",
    suite: "",
    balconySize: "",
    total: "",
    image: "",
  });

  useEffect(() => {
    const loadAmenities = async () => {
      const res = await fetch("/api/amenity");
      const data = await res.json();
      setAmenities((data.amenities || []).filter((a) => a.isActive));
    };
    loadAmenities();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const toggleAmenity = (id) => {
    setForm((prev) => {
      const exists = prev.amenities.includes(id);
      const next = exists
        ? prev.amenities.filter((x) => x !== id)
        : [...prev.amenities, id];
      return { ...prev, amenities: next };
    });
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push("/admin/project");
    else alert("Project creation failed");
  };

  return (
    <div className="blog-form">
      <h1>Create Project</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleInputChange}
          className="input"
        />

        <input
          name="slug"
          placeholder="Slug (optional)"
          value={form.slug}
          onChange={handleInputChange}
          className="input"
        />

        <ReactQuill
          theme="snow"
          value={form.description}
          onChange={(v) => setForm({ ...form, description: v })}
        />

        {/* Featured */}
        <div className="ad-label-flex sm">
          <div className="ad-label-group">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={form.isFeatured}
              onChange={handleInputChange}
            />
            <label htmlFor="isFeatured">Set Featured Project</label>
          </div>
        </div>

        {/* Property fields */}
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleInputChange}
          className="input"
        />
        <input
          name="bedrooms"
          placeholder="Bedrooms"
          value={form.bedrooms}
          onChange={handleInputChange}
          className="input"
        />
        <input
          name="bathrooms"
          placeholder="Bathrooms"
          value={form.bathrooms}
          onChange={handleInputChange}
          className="input"
        />
        <input
          name="sqft"
          placeholder="Sq ft"
          value={form.sqft}
          onChange={handleInputChange}
          className="input"
        />
        <input
          name="propertyArea"
          placeholder="Property Area"
          value={form.propertyArea}
          onChange={handleInputChange}
          className="input"
        />
        <input
          name="propertyType"
          placeholder="Property Type"
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
          placeholder="Address"
          value={form.address}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="text"
          name="mapIframe"
          placeholder="Map iframe"
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
                <div key={i}>
                  <Image src={url} width={80} height={80} alt={key} />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Floorplan */}
        <h2>Floorplan Info</h2>
        <input
          name="unit"
          placeholder="Unit"
          value={form.unit}
          onChange={handleInputChange}
          className="input"
        />
        <input
          name="suite"
          placeholder="Suite"
          value={form.suite}
          onChange={handleInputChange}
          className="input"
        />
        <input
          name="balconySize"
          placeholder="Balcony Size"
          value={form.balconySize}
          onChange={handleInputChange}
          className="input"
        />
        <input
          name="total"
          placeholder="Total"
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
            <Image src={form.image} width={120} height={120} alt="floorplan" />
          )}
        </div>

        <button type="submit" className="btn">
          Submit Project
        </button>
      </form>
    </div>
  );
}
