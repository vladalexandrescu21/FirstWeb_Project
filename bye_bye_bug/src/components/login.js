import React from 'react';
import "./login.css";

const Login = () => {
    return (
        <div className='cover'>
            <h1>Login</h1>
            <input type="text" placeholder='username' />
            <input type="password" placeholder='password' />
        </div>
    )
}

export default Login;