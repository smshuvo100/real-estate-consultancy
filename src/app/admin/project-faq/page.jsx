// ✅ 3. Admin List Page: /src/app/admin/project-faq/page.jsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiCopy } from "react-icons/fi";

export default function ProjectFaqAdminPage() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch("/api/project-faq")
      .then((res) => res.json())
      .then((data) => setFaqs(data || []));
  }, []);

  const deleteFaq = async (id) => {
    if (!confirm("Delete this FAQ?")) return;
    const res = await fetch("/api/project-faq", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setFaqs((prev) => prev.filter((faq) => faq._id !== id));
  };

  const duplicateFaq = async (id) => {
    const res = await fetch("/api/project-faq", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ duplicateId: id }),
    });
    if (res.ok) {
      const newFaq = await res.json();
      setFaqs((prev) => [newFaq, ...prev]);
    }
  };

  return (
    <div className="dashboard-content" style={{ padding: 20 }}>
      <div className="flex-between" style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: "24px" }}>❓ Project FAQ</h1>
        <Link href="/admin/project-faq/create" className="add-btn">
          <FiPlus /> <span>Add New</span>
        </Link>
      </div>

      <div className="blog-list">
        {faqs.length === 0 ? (
          <p>No FAQs found.</p>
        ) : (
          faqs.map((faq) => (
            <div key={faq._id} className="blog-card">
              <div className="blog-info">
                <strong>{faq.question}</strong>
                <p>{faq.answer}</p>
              </div>
              <div className="action-buttons">
                <Link
                  href={`/admin/project-faq/edit/${faq._id}`}
                  className="edit-btn"
                >
                  <FiEdit2 /> <span>Edit</span>
                </Link>
                <button
                  onClick={() => duplicateFaq(faq._id)}
                  className="edit-btn"
                >
                  <FiCopy /> <span>Duplicate</span>
                </button>
                <button
                  onClick={() => deleteFaq(faq._id)}
                  className="delete-btn"
                >
                  <FiTrash2 /> <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
