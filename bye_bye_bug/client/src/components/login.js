import React from "react";
import "./login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [popupStyle, showPopup] = useState("hide");

  const popup = () => {
    showPopup("login-popup");
    setTimeout(() => showPopup("hide"), 3000);
  };

  // useEffect(() => {
  //   // if (localStorage.getItem("user-info")) {
  //   //   navigate("/login");
  //   // }
  // }, []);

  async function login() {
    console.warn(email, password);
    let item = {email, password}
    let result = await fetch("http://localhost:8080/api/login?" + new URLSearchParams({
        email: item.email,
        password: item.password,
    }), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    //   body: JSON.stringify(item),
    });
    //result = await result.json();
    console.log(result.status);
    if(result.status == 201){
      localStorage.setItem("user-info", JSON.stringify(item));
      console.log("result status", result.status)
      navigate('/projectBugs', {replace: true});
    }
    //navigate("/api/login");
  }
  async function register() {
    navigate("/register", {replace: true});
  }
  return (
    <div className="cover">

      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="loginBtn" onClick={login}>
        Login
      </div>
      <div className="registerBtn" onClick={register}>
        Register
      </div>
      <p className="text">Or login using</p>
      <div className="altLogin">
        <div className="google"></div>
      </div>

      <div className={popupStyle}>
        <h3>Login failed</h3>
        <p>Username or password incorrect</p>
      </div>
    </div>
  );
};

export default Login;
