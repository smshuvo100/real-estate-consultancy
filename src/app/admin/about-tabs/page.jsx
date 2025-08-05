"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// 📝 Load ReactQuill dynamically (client-only)
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

import "react-quill-new/dist/quill.snow.css";

// --- Modal Component
function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="about-tabs modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

// --- Main Page
export function AboutAdminPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const res = await fetch("/api/about-tab");
        const data = await res.json();
        setRows(data || []);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTabs();
  }, []);

  const startEdit = (row) => {
    const baseCounters =
      Array.isArray(row.counters) && row.counters.length === 3
        ? row.counters
        : [
            { title: "Happy Customers", num: "200+" },
            { title: "Properties For Clients", num: "10k+" },
            { title: "Years of Experience", num: "16+" },
          ];

    setEditing({
      ...row,
      counters: baseCounters.map((c) => ({
        title: c?.title ?? "",
        num: typeof c?.num === "string" ? c.num : String(c?.num ?? ""),
      })),
    });
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setEditing(null);
  };

  const updateCounter = (index, key, value) => {
    setEditing((prev) => {
      const next = [...prev.counters];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, counters: next };
    });
  };

  const save = async (e) => {
    e.preventDefault();

    const payload = {
      _id: editing._id,
      title: editing.title?.trim() || "Untitled",
      content: editing.content || "",
      counters: (editing.counters || []).slice(0, 3).map((c) => ({
        title: (c.title || "").trim(),
        num: (c.num || "").trim(),
      })),
    };

    try {
      const res = await fetch("/api/about-tab", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const updated = await res.json();

      if (!res.ok) throw new Error(updated.error || "Failed to update");

      setRows((prev) => prev.map((r) => (r._id === updated._id ? updated : r)));
      close();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading) return <div className="about-tabs container">Loading...</div>;

  return (
    <div className="about-tabs container">
      <div className="about-header">
        <h1 className="about-title">🏷️ About Tabs</h1>
      </div>

      <div className="table-wrap">
        <table className="about-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th className="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r._id}>
                <td>{i + 1}</td>
                <td>
                  <strong>{r.title}</strong>
                </td>
                <td className="actions">
                  <button className="btn edit-btn" onClick={() => startEdit(r)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal
        open={open}
        title={`Edit: ${editing?.title || ""}`}
        onClose={close}
      >
        {editing && (
          <form onSubmit={save} className="form">
            {/* Title */}
            <div className="form-group">
              <label className="label">Title</label>
              <input
                className="input"
                value={editing.title}
                onChange={(e) =>
                  setEditing({ ...editing, title: e.target.value })
                }
                required
              />
            </div>

            {/* ReactQuill Editor for Content */}
            <div className="form-group">
              <label className="label">Content</label>
              <ReactQuill
                theme="snow"
                value={editing.content}
                onChange={(value) =>
                  setEditing((prev) => ({ ...prev, content: value }))
                }
                placeholder="Enter content..."
              />
            </div>

            {/* Counters */}
            <div className="counter-grid">
              {[0, 1, 2].map((idx) => (
                <div className="counter-row" key={idx}>
                  <div className="form-group">
                    <label className="label">Counter Title {idx + 1}</label>
                    <input
                      className="input"
                      value={editing.counters[idx]?.title || ""}
                      onChange={(e) =>
                        updateCounter(idx, "title", e.target.value)
                      }
                      placeholder={
                        idx === 0
                          ? "Happy Customers"
                          : idx === 1
                          ? "Properties For Clients"
                          : "Years of Experience"
                      }
                    />
                  </div>
                  <div className="form-group w-140">
                    <label className="label">Number (text) {idx + 1}</label>
                    <input
                      className="input"
                      type="text"
                      value={editing.counters[idx]?.num || ""}
                      onChange={(e) =>
                        updateCounter(idx, "num", e.target.value)
                      }
                      placeholder={
                        idx === 1 ? "10k+" : idx === 0 ? "200+" : "16+"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="form-actions">
              <button type="button" className="btn" onClick={close}>
                Cancel
              </button>
              <button type="submit" className="btn edit-btn">
                Save
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

export { AboutAdminPage };
export default AboutAdminPage;
