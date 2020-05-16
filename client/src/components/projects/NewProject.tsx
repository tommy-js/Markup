import React, { useState } from "react";
import { Navbar } from "../navigation/Navbar";

export const NewProject: React.FC = () => {
  const [tech, setTech] = useState([{ key: 0 }]);

  function addTech() {
    let newTech = { key: Math.floor(Math.random() * 10000) };
    let oldTech = [...tech];
    oldTech.push(newTech);
    setTech(oldTech);
    console.log(tech);
  }

  return (
    <div>
      <Navbar />
      <div className="new_project_block">
        <input className="new_project_title" placeholder="Title" />
        <textarea
          className="new_project_description"
          placeholder="Description"
        />
        <input className="new_project_stack" placeholder="stack" />
        <button onClick={() => addTech()}>Add specific tech</button>
        {tech.map(el => (
          <input key={el.key} />
        ))}
      </div>
    </div>
  );
};
