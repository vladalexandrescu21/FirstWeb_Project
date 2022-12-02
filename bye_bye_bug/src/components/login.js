import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {router} from '../../routes.mjs'
import "./login.css";
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const navigate = useNavigate();

    const [popupStyle, showPopup] = useState("hide")

    const popup = () => {
        showPopup("login-popup");
        setTimeout(() => showPopup("hide"), 3000);
    }

    useEffect(() =>{
        if(localStorage.getItem('user-info')){
            navigate.push("/add");
        }
    }, [])

    async function login() {
        console.warn(email, password)
        let item = {email, password}
        let result = await fetch("http://localhost:3000/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"

            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        localStorage.setItem("user-info",JSON.stringify(result))
        navigate.push("/add");
    }
    return (
        <div className='cover'>
            <h1>Login</h1>
            <input type="text" placeholder='username' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
            <div className="loginBtn" onClick={login}>Login</div>
            <p className="text">Or login using</p>
            <div className='altLogin'>
                <div className='google'></div>
            </div>

            <div className={popupStyle}>
                <h3>Login failed</h3>
                <p>Username or password incorrect</p>
            </div>
        </div>
    )
}

export default Login;