import React from "react";
import "./single.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";

export default function single() {
  return (
    <div className="Single">
      <SinglePost />
      <Sidebar />
    </div>
  );
}
