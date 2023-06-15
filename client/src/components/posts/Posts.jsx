import React from "react";
import "./posts.css";
import Post from "../post/Post";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post key={posts._id} post={p} />
      ))}
    </div>
  );
}
//key={Posts._id}
