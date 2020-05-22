import React, { useState, useEffect } from "react";
import { Navbar } from "../navigation/Navbar";
import plus from "../../icons/plus.png";
import deleted from "../../icons/delete.png";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { addProjectMutation } from "../../queries/queries";
import { SuccessfulProject } from "./SuccessfulProject";

interface Props {
  addProjectMutation: (variables: object) => void;
}

const NewProject: React.FC<Props> = props => {
  const [tech, setTech] = useState([{ key: 0, input: "" }]);
  const [positions, setPositions] = useState([{ key: 0, input: "" }]);
  const [checked, setChecked] = useState(false);
  const [validSubmit, setValidSubmit] = useState(false);
  const [visible, setVisible] = useState("none");
  const [soFar, setSoFar] = useState();
  const [total, setTotal] = useState();
  const [stack, setStack] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [successfulProj, setSuccessfulProj] = useState(false);

  useEffect(() => {
    if (checked) {
      setVisible("inline-block");
    } else {
      setVisible("none");
    }
  }, [checked]);

  function addTech() {
    let newTech = { key: Math.floor(Math.random() * 1000000), input: "" };
    let oldTech = [...tech];
    oldTech.push(newTech);
    setTech(oldTech);
  }

  function castTechValue(e: any, id: number) {
    let foundItem: any = tech.find((el: any) => el.key === id);
    let originTech = [...tech];
    let index = originTech.indexOf(foundItem);
    originTech[index].input = e.target.value;
    setTech(originTech);
  }

  function removeTech(key: number) {
    let removingTech = [...tech];
    let filteredTech = removingTech.filter(el => el.key != key);
    setTech(filteredTech);
  }

  function addPosition() {
    let newPos = { key: Math.floor(Math.random() * 1000000), input: "" };
    let oldPos = [...positions];
    oldPos.push(newPos);
    setPositions(oldPos);
  }

  function castPosValue(e: any, id: number) {
    let foundItem: any = positions.find((el: any) => el.key === id);
    let originPosition = [...positions];
    let index = originPosition.indexOf(foundItem);
    originPosition[index].input = e.target.value;
    setPositions(originPosition);
  }

  function removePosition(key: number) {
    let removingPosition = [...positions];
    let filteredPosition = removingPosition.filter(el => el.key != key);
    setPositions(filteredPosition);
  }

  function submitForm() {
    console.log(validSubmit);
    setSuccessfulProj(true);
    props.addProjectMutation({
      variables: {
        timestamp: Math.round(new Date().getTime() / 1000),
        total: total,
        joined: soFar,
        stack: stack,
        content: content,
        title: title,
        id: Math.floor(Math.random() * 100000)
      }
    });
  }

  function openPositions() {
    if (checked) {
      return (
        <div>
          {positions.map(el => (
            <div className="new_tech_inputs">
              <input
                className="inner_new_tech"
                key={el.key}
                value={el.input}
                onChange={e => castPosValue(e, el.key)}
                placeholder="position"
              />
              <div
                className="delete_button"
                onClick={() => removePosition(el.key)}
              >
                <img className="delete_button_image" src={deleted} />
              </div>
            </div>
          ))}
          <p className="appear_on_hover positions_appear">
            Specific positions you're looking to fill...
          </p>
        </div>
      );
    } else {
      return (
        <p className="appear_on_hover positions_appear">
          General positions filled so far...
        </p>
      );
    }
  }

  function main() {
    if (successfulProj === false) {
      return (
        <div>
          <Navbar />
          <div className="new_project_block">
            <h2 style={{ color: "pink" }}>New Project</h2>
            <div className="project_title_block">
              <input
                className="new_project_title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title"
              />
              <p className="appear_on_hover title_appear">
                Tell us the name of your project
              </p>
            </div>
            <div className="project_description_block">
              <textarea
                className="new_project_description"
                placeholder="Description"
                value={content}
                onChange={e => setContent(e.target.value)}
              />
              <p className="appear_on_hover description_appear">
                Describe your project to us. Include information such as
                expected timeline, technologies used, size of the project, and
                development pace.
              </p>
            </div>
            <div className="project_listing_block">
              <h2>Is this a personal project or a group one?</h2>
              <input type="checkbox" />
              <p className="appear_on_hover listing_appear">
                If you list your project as personal it will not be visible to
                those searching and will not be available to join
              </p>
            </div>
            <div className="new_project_stack_block">
              <input
                className="new_project_stack"
                placeholder="stack"
                value={stack}
                onChange={e => setStack(e.target.value)}
              />
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
                    value={el.input}
                    onChange={e => castTechValue(e, el.key)}
                    placeholder="technology"
                  />
                  <div
                    className="delete_button"
                    onClick={() => removeTech(el.key)}
                  >
                    <img className="delete_button_image" src={deleted} />
                  </div>
                </div>
              ))}
              <p className="appear_on_hover tech_appear">
                Tell us about the technologies you're using for this project
              </p>
            </div>
            <div className="new_project_positions_block">
              <h2>Enter number of currently filled positions</h2>
              <h4>
                Toggle to show whether you're looking for generalists or
                specialists
              </h4>
              <div className="positions_open">
                <input
                  className="new_project_stack"
                  type="number"
                  placeholder="0"
                  value={soFar}
                  onChange={e => setSoFar(e.target.value)}
                />
                <input
                  className="new_project_stack"
                  type="number"
                  placeholder="n"
                  value={total}
                  onChange={e => setTotal(e.target.value)}
                />
                <input type="checkbox" onChange={() => setChecked(!checked)} />
                <div
                  className="add_tech_button"
                  style={{ display: visible }}
                  onClick={() => addPosition()}
                >
                  <img className="add_tech_icon" src={plus} />
                </div>
              </div>
              {openPositions()}
            </div>
            <div
              onClick={() => submitForm()}
              className="submit_project_button_block"
            >
              <button className="submit_project_button" disabled={validSubmit}>
                Submit Project
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <SuccessfulProject />
        </div>
      );
    }
  }

  return <div>{main()}</div>;
};

export default compose(
  graphql(addProjectMutation, { name: "addProjectMutation" })
)(NewProject);
