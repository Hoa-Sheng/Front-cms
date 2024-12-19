import React, { useState } from "react";
import PostForm from "./PostForm.js";
import Post from "./PostForm.js";
import "./Feed.css";

function Feed() {
  const [posts, setPosts] = useState([
    { id: 1, content: "Mon premier post !", author: "Alice" },
    { id: 2, content: "Hello, monde !", author: "Bob" },
  ]);

  const addPost = (content) => {
    const newPost = { id: Date.now(), content, author: "Moi" };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="feed">
      <PostForm onAddPost={addPost} />
      {posts.map((post) => (
        <Post key={post.id} content={post.content} author={post.author} />
      ))}
    </div>
  );
}

export default Feed;
