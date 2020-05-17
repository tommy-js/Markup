import React, { useState } from "react";
import { Navbar } from "../navigation/Navbar";
import plus from "../../icons/plus.png";

export const NewProject: React.FC = () => {
  const [tech, setTech] = useState([{ key: 0, input: "" }]);

  function addTech() {
    let newTech = { key: Math.floor(Math.random() * 1000000), input: "" };
    let oldTech = [...tech];
    oldTech.push(newTech);
    setTech(oldTech);
  }

  function removeTech(key: number) {
    let removingTech = tech;
    let filteredTech = removingTech.filter(el => el.key != key);
    setTech(filteredTech);
  }

  return (
    <div>
      <Navbar />
      <div className="new_project_block">
        <div className="project_title_block">
          <input className="new_project_title" placeholder="Title" />
          <p className="appear_on_hover title_appear">
            Tell us the name of your project
          </p>
        </div>
        <div className="project_description_block">
          <textarea
            className="new_project_description"
            placeholder="Description"
          />
          <p className="appear_on_hover description_appear">
            Describe your project to us
          </p>
        </div>
        <div className="new_project_stack_block">
          <input className="new_project_stack" placeholder="stack" />
          <div className="add_tech_button" onClick={() => addTech()}>
            <img className="add_tech_icon" src={plus} />
          </div>
          <p className="appear_on_hover stack_appear">
            If you have a specific stack, let us know so we can help your
            project appear in front of more users
          </p>
        </div>
        <div className="inline_tech">
          {tech.map(el => (
            <div className="new_tech_inputs">
              <input
                className="inner_new_tech"
                key={el.key}
                onChange={e => (el.input = e.target.value)}
                placeholder="technology"
              />
              <button onClick={() => removeTech(el.key)}>x</button>
            </div>
          ))}
          <p className="appear_on_hover tech_appear">
            Tell us about the technologies you're using for this project
          </p>
        </div>
      </div>
    </div>
  );
};
