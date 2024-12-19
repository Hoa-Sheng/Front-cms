import React from "react";
import "./Post.css";

function Post({ content, author }) {
  return (
    <div className="post">
      <h4>{author}</h4>
      <p>{content}</p>
    </div>
  );
}

export default Post;
