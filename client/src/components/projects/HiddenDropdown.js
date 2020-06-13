import React, { useContext } from "react";
import { userContext } from "../../App.tsx";

export function HiddenDropdown(props) {
  const { userVal, setUserVal } = useContext(userContext);

  return (
    <div className="hidden_dropdown">
      <div className="hover_over_dropdown">
        <select>
          {props.projects.map(proj => (
            <option>{proj.title}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
