import React, { useState } from "react";
import "./PostForm.css";

function PostForm({ onAddPost }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onAddPost(content);
      setContent("");
    }
  };

  return (
    <form className="postForm" onSubmit={handleSubmit}>
      <textarea
        placeholder="Quoi de neuf ?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button type="submit">Poster</button>
    </form>
  );
}

export default PostForm;
