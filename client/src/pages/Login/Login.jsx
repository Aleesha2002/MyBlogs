import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  //console.log(Context);
  //console.log(userRef.current.value);
  //console.log(passwordRef.current.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      console.log(res.data);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  const handleLogin = () => {
    if (user) {
    }
  };
  //console.log(error);
  console.log(isFetching);
  return (
    <div className="first">
      <div className="body1 ">
        <div className="login1">
          <img className="loginImg" src="images/Login_page.jpg" alt="" />
        </div>
        <div className="login">
          <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              className="loginInput"
              placeholder="Enter you username..."
              ref={userRef}
            />
            <label>Password</label>
            <input
              type="text"
              className="loginInput"
              placeholder="Enter you password..."
              ref={passwordRef}
            />
            <button
              className="loginButton"
              type="submit"
              disabled={isFetching}
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
          <button className="loginButton registerButton">
            <Link className="link" to="/signup">
              Sign Up
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
