// ✅ 4. Create Page: /src/app/admin/project-faq/create/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProjectFaqPage() {
  const router = useRouter();
  const [form, setForm] = useState({ question: "", answer: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/project-faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push("/admin/project-faq");
  };

  return (
    <div className="dashboard-content" style={{ padding: 20 }}>
      <h1 style={{ fontSize: "24px", marginBottom: 20 }}>
        ➕ Add New Project FAQ
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
          Save FAQ
        </button>
      </form>
    </div>
  );
}
