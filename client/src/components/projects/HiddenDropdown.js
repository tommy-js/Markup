import React, { useState, useContext } from "react";
import { userContext } from "../../App.tsx";

export function HiddenDropdown(props) {
  const { userVal, setUserVal } = useContext(userContext);
  const [val, setVal] = useState(props.projects[0]);

  function updateSelect(e) {
    setVal(e.target.value);
    let index = props.projects.find(el => el.title === e.target.value);
    let found = index.id;
    props.keepSelectedProject(e.target.value, found);
  }

  return (
    <div className="hidden_dropdown">
      <div className="hover_over_dropdown">
        <select onChange={e => updateSelect(e)} value={val}>
          {props.projects.map(proj => (
            <option>{proj.title}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
