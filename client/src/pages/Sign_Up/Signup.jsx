import React from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
  return (
    <div className="first">
      <div className="body1 ">
        <div className="signUp1">
          <img className="signUpImg" src="images/signup_page.jpg" alt="" />
        </div>
        <div className="signUp">
          <form className="signUpForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter you username..."
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email-id</label>
            <input
              type="email"
              placeholder="Enter you email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="text"
              placeholder="Enter you password..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="signUpButton" type="submit">
              Sign Up
            </button>
          </form>
          <button className="signUpButton loginButton">
            <Link className="link" to="/login">
              Login
            </Link>
          </button>
          {error && (
            <span style={{ color: "red", marginTop: "10px" }}>
              Something went wrong
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
