// ✅ src/app/admin/project/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiCopy } from "react-icons/fi";

export default function ProjectAdminPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/api/project")
      .then((res) => res.json())
      .then((data) => setProjects(data.projects));
  }, []);

  const deleteProject = async (id) => {
    if (confirm("Delete this project?")) {
      const res = await fetch("/api/project", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setProjects(projects.filter((p) => p._id !== id));
      } else {
        const error = await res.json();
        alert("❌ Failed to delete project: " + error?.error);
      }
    }
  };

  const duplicateProject = async (id) => {
    const res = await fetch("/api/project", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ duplicateId: id }),
    });

    if (res.ok) {
      const newProject = await res.json();
      setProjects((prev) => [newProject, ...prev]);
    } else {
      const error = await res.json();
      alert("❌ Failed to duplicate project: " + error?.error);
    }
  };

  return (
    <div className="dashboard-content" style={{ padding: 20 }}>
      <div className="flex-between" style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: "24px" }}>🏗️ Manage Projects</h1>
        <Link href="/admin/project/create" className="add-btn">
          <FiPlus /> <span>Add New</span>
        </Link>
      </div>

      <div className="blog-list">
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="blog-card">
              <div className="blog-info">
                <strong>{project.title}</strong>
                <p>{project.description?.slice(0, 180)}...</p>
              </div>
              <div className="action-buttons">
                <Link
                  href={`/admin/project/edit/${project._id}`}
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
