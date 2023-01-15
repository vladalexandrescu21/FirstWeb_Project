import React from "react";
import { useState, useEffect } from "react";
import "./login.css";
import BugComponent from "./BugComponent";
import { useNavigate } from "react-router-dom";



const BugColumn = () => {
  const [bugs, setBugs] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    console.log("inside use effect")
    loadBugs();
  }, []);

  
  async function loadBugs() {
    let userInfo = JSON.parse(window.localStorage.getItem("user-info"));
    console.log("email user", userInfo.email);
    let result = await fetch(
      "http://localhost:8080/api/projectBugs?" +
        new URLSearchParams({
          accountEmail: userInfo.email,
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      }
    );
    let allBugs = await result.json();
    console.log("ALL BUGS", allBugs);

    setBugs(allBugs);
  
    localStorage.setItem("all-bugs", JSON.stringify(allBugs));
  }

  function openAddBug(){
    navigate('/addBug', {replace: true});
  }

  

  return (
    <div>
      <div>
       {bugs.length !== 0 && <BugComponent bugs={bugs} />}
        <button className="addBugBtn" onClick={openAddBug}>Add bug</button>
      </div>
    </div>
  );
};

export default BugColumn;
