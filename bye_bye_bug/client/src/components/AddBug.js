import React from "react";
import { useState } from "react";
import "./login.css";
import {useNavigate} from 'react-router-dom';



const AddBug = () => {
    const navigate = useNavigate();
  // "bugName": "Bug3",
  // "accountEmail": "mirunastefana@yahoo.com",
  // "projectName": "ProiectulCaramida",
  // "whoToSolve": "mirunastefana@yahoo.com",
  // "isSolved": "NO",
  // "severity": "low",
  // "priority": 5,
  // "description": "low bug",
  // "commitLink": "google.com"

  const [bugName, setBugName] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [whoToSolve, setWhoToSolve] = useState("");
  const [isSolved, setIsSolved] = useState("");
  const [severity, setSeverity] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [commitLink, setCommitLink] = useState("");

 async function AddButton(){
    let item = {bugName, accountEmail, projectName, whoToSolve, isSolved, severity, priority, description, commitLink};
    let result = await fetch(
        "http://localhost:8080/api/bugs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(item)
        }
      );
      if(result.status == 201){
        navigate('/projectBugs');
      }
  }
  return (
    <div className="cover">
      <h2>Add a Bug</h2>
      <input
        type="text"
        placeholder="bug name"
        onChange={(e) => setBugName(e.target.value)}
      />
      <input
        type="text"
        placeholder="accountEmail"
        onChange={(e) => setAccountEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="projectName"
        onChange={(e) => setProjectName(e.target.value)}
      />
      <input
        type="text"
        placeholder="whoToSolve"
        onChange={(e) => setWhoToSolve(e.target.value)}
      />
      <input
        type="text"
        placeholder="isSolved"
        onChange={(e) => setIsSolved(e.target.value)}
      />
      <input
        type="text"
        placeholder="severity"
        onChange={(e) => setSeverity(e.target.value)}
      />
      <input
        type="text"
        placeholder="priority"
        onChange={(e) => setPriority(e.target.value)}
      />
      <input
        type="text"
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="commit Link"
        onChange={(e) => setCommitLink(e.target.value)}
      />
      <button className="addBugBtn" onClick={AddButton}>
        Add Bug
      </button>
    </div>
  );
};

export default AddBug;
