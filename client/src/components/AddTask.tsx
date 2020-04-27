import React, { useState, useContext } from "react";
import "../App";
import { ClearTaskList } from "./ClearTaskList";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { userContext } from "../App";
import { addTaskMutation } from "../queries/queries";

interface Props {
  addTasks: (userInput: string) => void;
  clearTasks: () => void;
  addTaskMutation: (variables: object) => void;
}

const AddTask: React.FC<Props> = props => {
  const [userInput, setUserInput] = useState("");
  const { userVal, setUserVal } = useContext(userContext);

  console.log(userVal);

  function submitAdd() {
    if (userInput.length > 0) {
      props.addTaskMutation({
        variables: {
          content: userInput,
          id: Math.floor(Math.random() * 1000000),
          userid: userVal.id
        }
      });
      props.addTasks(userInput);
      setUserInput("");
    }
  }

  function setUser(input: string) {
    if (input.length < 30) {
      setUserInput(input);
    } else {
      let str = input;
      let substr = str.substring(0, 30);
      setUserInput(substr);
    }
  }

  return (
    <div>
      <input
        className="add_task_styles"
        type="text"
        value={userInput}
        onChange={e => setUser(e.target.value)}
        placeholder="Task"
      />
      <div className="inline_buttons">
        <button className="add_task_buttons" onClick={() => submitAdd()}>
          Add
        </button>
        <ClearTaskList clearTasks={props.clearTasks} />
      </div>
    </div>
  );
};

export default compose(graphql(addTaskMutation, { name: "addTaskMutation" }))(
  AddTask
);
