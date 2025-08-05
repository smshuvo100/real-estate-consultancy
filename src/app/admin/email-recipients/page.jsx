"use client";

import { useEffect, useState } from "react";

export default function EmailRecipientsPage() {
  const [email, setEmail] = useState("");
  const [recipients, setRecipients] = useState([]);

  // Fetch emails
  useEffect(() => {
    fetch("/api/email-recipient")
      .then((res) => res.json())
      .then((data) => setRecipients(data))
      .catch((err) => console.error("❌ Failed to fetch emails:", err));
  }, []);

  // Add email
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/email-recipient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        type: "universal", // ✅ Add this line
      }),
    });

    if (res.ok) {
      const newEmail = await res.json();
      setRecipients((prev) => [newEmail, ...prev]);
      setEmail("");
    } else {
      alert("❌ Failed to add email");
    }
  };

  // Delete
  const deleteEmail = async (id) => {
    if (!confirm("Delete this email?")) return;

    const res = await fetch("/api/email-recipient", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setRecipients((prev) => prev.filter((e) => e._id !== id));
    } else {
      alert("❌ Failed to delete email");
    }
  };

  return (
    <div className="dashboard-content email-recipients" style={{ padding: 20 }}>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>📧 Email Recipients</h1>

      <form
        onSubmit={handleSubmit}
        className="blog-form"
        style={{ marginBottom: 30 }}
      >
        <input
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn">
          Add Email
        </button>
      </form>

      <ul className="blog-list">
        {recipients.map((item) => (
          <li key={item._id} className="blog-card">
            <span>{item.email}</span>
            <button
              className="delete-btn"
              onClick={() => deleteEmail(item._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
