"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiCopy } from "react-icons/fi";

export default function RecentProjectAdminPage() {
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    fetch("/api/recent-project")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ API response:", data);
        // Adjust based on what your API returns
        const list = data.recentProjects || data.projects || data;
        setRecentProjects(list);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch recent projects:", err);
      });
  }, []);

  const deleteProject = async (id) => {
    if (confirm("Delete this recent project?")) {
      const res = await fetch("/api/recent-project", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setRecentProjects((prev) => prev.filter((p) => p._id !== id));
      } else {
        const error = await res.json();
        alert("❌ Failed to delete: " + error?.error);
      }
    }
  };

  const duplicateProject = async (id) => {
    const res = await fetch("/api/recent-project", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ duplicateId: id }),
    });

    if (res.ok) {
      const newProject = await res.json();
      setRecentProjects((prev) => [newProject, ...prev]);
    } else {
      const error = await res.json();
      alert("❌ Failed to duplicate: " + error?.error);
    }
  };

  return (
    <div className="dashboard-content" style={{ padding: 20 }}>
      <div className="flex-between" style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: "24px" }}>🕘 Featured Projects</h1>
        <Link href="/admin/recent-project/create" className="add-btn">
          <FiPlus /> <span>Add New</span>
        </Link>
      </div>

      <div className="blog-list">
        {recentProjects.length === 0 ? (
          <p>No recent projects found.</p>
        ) : (
          recentProjects.map((project) => (
            <div key={project._id} className="blog-card">
              <div className="blog-info">
                <strong>{project.title}</strong>
                <p>{project.url}</p>
              </div>
              <div className="action-buttons">
                <Link
                  href={`/admin/recent-project/edit/${project._id}`}
                  className="edit-btn"
                >
                  <FiEdit2 /> <span>Edit</span>
                </Link>
                <button
                  onClick={() => duplicateProject(project._id)}
                  className="edit-btn"
                >
                  <FiCopy /> <span>Duplicate</span>
                </button>
                <button
                  onClick={() => deleteProject(project._id)}
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
