import {useEffect, useState} from 'react';
import React from 'react';
import "./login.css";
import {useNavigate} from 'react-router-dom'

const Register = () => {
    //const [account, setAccount] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[accountType, setAccountType] = useState("");
    const[projectName, setProjectName] = useState("");
    const navigate = useNavigate();

    var idList = [];


    async function registerBtn() {
        console.warn(email, password, accountType, projectName)
        let item = {email, password, accountType, projectName}
        let accountResult = await fetch("http://localhost:8080/api/accounts" 
        // + new URLSearchParams({
        //     email: item.email,
        //     password: item.password,
        //     accountType: item.accountType,
        //     projectName: item.projectName
        // })
        ,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });

        localStorage.setItem('user', JSON.stringify(item));

        let projectResult = await fetch("http://localhost:8080/api/register?" + new URLSearchParams({
            email: item.email,
            password: item.password,
            accountType: item.accountType,
            projectName: item.projectName
        }),{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            //body: JSON.stringify(item)
        });

        const data = await projectResult.json();

        console.log("project result", projectResult);
        var headerAccountId = accountResult.headers.get("location");
        console.log(headerAccountId);

        let user = JSON.parse(window.localStorage.getItem("user"));

        // idList.push(data.idList);
        if(data.idList) {
            idList = [...data.idList.split(","), user.email];
        } else {
            idList.push(user.email);
        }
        // idList.push(user.email);

        console.log("idList", idList);

        let project = {idList}

        if(projectResult.status == 201){
            let projectUpdated = await fetch(`http://localhost:8080/api/proiects/${projectName}` ,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(project)
            });
            navigate('/', {replace: true})
        }
        else if(projectResult.status == 404){
            navigate('/createProject', {replace: true})
        }
    }
    
    return(
        <div className="cover">
            <h1>Register</h1>
            <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder='account type' onChange={(e) => setAccountType(e.target.value)} />
            <input type="text" placeholder='project' onChange={(e) => setProjectName(e.target.value)} />
            <div className="createAccountBtn" onClick={registerBtn}>Create account</div>
        </div>
    )
}

export default Register;