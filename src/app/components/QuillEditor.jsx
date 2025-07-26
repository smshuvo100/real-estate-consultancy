"use client";

import { useState } from "react";
import QuillEditor from "@/app/components/QuillEditor";

export default function BlogEditorPage() {
  const [content, setContent] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Blog</h1>
      <QuillEditor value={content} onChange={setContent} />
      <pre>{content}</pre>
    </div>
  );
}
