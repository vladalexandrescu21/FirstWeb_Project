import {useEffect, useState} from 'react';
import React from 'react';
import Register from './registerForm'
import "./login.css";
import {useNavigate} from 'react-router-dom'

const Proiect = (props) => {
    const[name, setName] = useState("");
    const[repoLink, setRepoLink] = useState("");
    var idListArray = [];
    var bugListArray = ["nimic"];
    const navigate = useNavigate();

    useEffect(() => {
        let user = JSON.parse(window.localStorage.getItem("user"));
        console.log("user", user);
    }, [])

    async function createProjectBtn() {
        //console.warn(email, password, accountType, proiect)
        let user = JSON.parse(window.localStorage.getItem("user"));

        // let idHeader = await fetch("http://localhost:8080/api/createProject?" + new URLSearchParams({
        //     name: item.name,
        //     repoLink: item.repoLink,
        // }),{
        //     method: 'GET',
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "application/json"
        //     },
        // })
        // console.log("id header", idHeader);
        idListArray.push(user.email);

        var idList = String(idListArray);
        var bugList = String(bugListArray);
        let item = {name, repoLink, idList, bugList}
        let result = await fetch("http://localhost:8080/api/proiects" 
        // + new URLSearchParams({
        //     name: item.name,
        //     repositoryLink: item.repoLink,
        // })
        ,{
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
            <h1>Create project</h1>
            <input type="text" placeholder='name' onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder='repository link' onChange={(e) => setRepoLink(e.target.value)} />
            <div className="createAccountBtn" onClick={createProjectBtn}>Create project</div>
        </div>
    )
}

export default Proiect;