import React, { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const { user } = useContext(Context);
  const preset_key = "Blog-app";
  const cloud_name = "dzreededb";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  // const submitImage = (event) => {
  //   const data = new FormData();
  //   const file = event.target.files[0];
  //   data.append("file", file);
  //   data.append("upload_preset", preset_key);
  //   data.append("cloud_name", cloud_name);

  //   axios
  //     .post(
  //       `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
  //       FormData
  //     )
  //     .then((res) => setImage(res.data.secure_url))
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <div className="write">
      {/* {file && ( */}
      <img
        src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGlicmFyeXxlbnwwfHwwfHw%3D&w=1000&q=80"
        // src={URL.createObjectURL(file)}
        alt=""
        className="writeImg"
      />
      {/* )} */}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-square-plus fa-2xl"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            // onChange={(e) => setFile(e.target.files[0])}
            // onChange={(e) => submitImage(e.target.files[0])}
            // onClick={submitImage}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story"
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
