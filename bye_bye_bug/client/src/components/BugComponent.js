import React from "react";
import "./login.css";

// let allBugs = JSON.parse(window.localStorage.getItem("all-bugs"));
// console.log("bun", allBugs);

const BugComponent = (props) => {
    console.log("bugs", props.bugs, typeof props.bugs);
  return (
    <div>
      {props.bugs.map((x) => (
        <div key={x.id} className="bugDiv">
          Bug name: {x.bugName}, Project name: {x.projectName}, Who to solve:{" "}
          {x.whoToSolve}, Is solved: {x.isSolved},Severity: {x.severity}
          ,Priority: {x.priority}
          Description: {x.description}, Commit link: {x.commitLink}
        </div>
      ))}
    </div>
  );
}

export default BugComponent;
