import React, { useContext, useState } from "react";
import "./settings.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Context } from "../../context/Context";
import axios from "axios";

export default function settings() {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username: username,
      email: email,
      password: password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_Success", payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Account</span>
          <span className="settingsDeleteTitle">Delete account</span>
        </div>
        <form action="" className="settingsForm" onSubmit={handleSubmit}>
          <label htmlFor="">profilePicture</label>
          <div className="settingsProfilePic">
            <img
              // src="https://us.123rf.com/450wm/tomertu/tomertu1711/tomertu171100465/89971836-image-of-open-antique-book-on-wooden-table-with-glitter-overlay.jpg?ver=6"
              src={file ? URL.createObjectURL(file) : user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsProfilePicIcon fa-solid fa-circle-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email-id</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
