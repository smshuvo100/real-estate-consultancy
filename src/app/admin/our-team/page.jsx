// ✅ /src/app/admin/our-team/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiCopy } from "react-icons/fi";

export default function OurTeamAdminPage() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((data) => setTeam(data))
      .catch((err) => console.error("❌ Failed to fetch team:", err));
  }, []);

  const deleteMember = async (id) => {
    if (confirm("Delete this team member?")) {
      const res = await fetch("/api/team", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setTeam((prev) => prev.filter((m) => m._id !== id));
      } else {
        const error = await res.json();
        alert("❌ Failed to delete: " + error?.error);
      }
    }
  };

  const duplicateMember = async (id) => {
    const res = await fetch("/api/team", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ duplicateId: id }),
    });

    if (res.ok) {
      const newMember = await res.json();
      setTeam((prev) => [newMember, ...prev]);
    } else {
      const error = await res.json();
      alert("❌ Failed to duplicate: " + error?.error);
    }
  };

  return (
    <div className="dashboard-content" style={{ padding: 20 }}>
      <div className="flex-between" style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: "24px" }}>👥 Our Team</h1>
        <Link href="/admin/our-team/create" className="add-btn">
          <FiPlus /> <span>Add New</span>
        </Link>
      </div>

      <div className="blog-list">
        {team.length === 0 ? (
          <p>No team members found.</p>
        ) : (
          team.map((member) => (
            <div key={member._id} className="blog-card">
              <div className="blog-info">
                <strong>{member.name}</strong>
                <p>{member.title}</p>
              </div>
              <div className="action-buttons">
                <Link
                  href={`/admin/our-team/edit/${member._id}`}
                  className="edit-btn"
                >
                  <FiEdit2 /> <span>Edit</span>
                </Link>
                <button
                  onClick={() => duplicateMember(member._id)}
                  className="edit-btn"
                >
                  <FiCopy /> <span>Duplicate</span>
                </button>
                <button
                  onClick={() => deleteMember(member._id)}
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
