// src/app/admin/investor-faq/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiCopy } from "react-icons/fi";

export default function InvestorFaqAdminPage() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch("/api/investor-faq")
      .then((res) => res.json())
      .then((data) => {
        const list = data.faqs || data;
        setFaqs(list);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch investor faqs:", err);
      });
  }, []);

  const deleteFaq = async (id) => {
    if (!confirm("Delete this FAQ?")) return;

    try {
      const res = await fetch("/api/investor-faq", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setFaqs((prev) => prev.filter((faq) => faq._id !== id));
      } else {
        const error = await res.json();
        alert("❌ Failed to delete: " + (error?.error || "Unknown error"));
      }
    } catch (err) {
      alert("❌ Error deleting FAQ.");
      console.error(err);
    }
  };

  const duplicateFaq = async (id) => {
    try {
      const res = await fetch("/api/investor-faq", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duplicateId: id }),
      });

      if (res.ok) {
        const newFaq = await res.json();
        setFaqs((prev) => [newFaq, ...prev]);
      } else {
        let error = {};
        try {
          error = await res.json();
        } catch (err) {
          error = { error: "Unknown error or empty response." };
        }
        alert("❌ Failed to duplicate: " + error?.error);
      }
    } catch (err) {
      alert("❌ Error duplicating FAQ.");
      console.error(err);
    }
  };

  return (
    <div className="dashboard-content" style={{ padding: 20 }}>
      <div className="flex-between" style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: "24px" }}>💼 Investor FAQ</h1>
        <Link href="/admin/investor-faq/create" className="add-btn">
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
                  href={`/admin/investor-faq/edit/${faq._id}`}
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
