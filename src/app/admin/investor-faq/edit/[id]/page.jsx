// src/app/admin/investor-faq/edit/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditInvestorFaqPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    question: "",
    answer: "",
    _id: "",
  });

  // ✅ Fetch specific FAQ
  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await fetch("/api/investor-faq");
        const data = await res.json();
        const list = data?.faqs || data || [];
        const faq = list.find((item) => item._id === id);
        if (!faq) return alert("FAQ not found");
        setForm(faq);
      } catch (err) {
        alert("Failed to fetch FAQ");
      }
    };

    if (id) fetchFaq();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/investor-faq", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/investor-faq");
    } else {
      alert("❌ Failed to update FAQ");
    }
  };

  return (
    <div className="dashboard-content" style={{ padding: 20 }}>
      <h1 style={{ fontSize: "24px", marginBottom: 20 }}>
        ✏️ Edit Investor FAQ
      </h1>
      <form onSubmit={handleSubmit} className="blog-form">
        <input
          name="question"
          placeholder="Question"
          value={form.question}
          onChange={handleChange}
          className="input"
        />

        <textarea
          name="answer"
          placeholder="Answer"
          value={form.answer}
          onChange={handleChange}
          className="input"
          rows={6}
        ></textarea>

        <button type="submit" className="btn">
          Update FAQ
        </button>
      </form>
    </div>
  );
}
