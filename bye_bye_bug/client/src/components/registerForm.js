import {useState} from 'react';
import React from 'react';
import "./login.css";
import {useNavigate} from 'react-router-dom'

const Register = () => {
    //const [account, setAccount] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[accountType, setAccountType] = useState("");
    const navigate = useNavigate();


















    async function registerBtn() {
        console.warn(email, password, accountType)
        let item = {email, password, accountType}
        let result = await fetch("http://localhost:8080/api/accounts",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });
        navigate('/', {replace: true})
    }




    return(
        <div className="cover">
            <h1>Register</h1>
            <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder='account type' onChange={(e) => setAccountType(e.target.value)} />
            <div className="createAccountBtn" onClick={registerBtn}>Create account</div>
        </div>
    )
}

export default Register;