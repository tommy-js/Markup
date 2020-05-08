import React, { useState, useContext } from "react";
import "../../../App.scss";
import { ClearTaskList } from "./ClearTaskList";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { userContext } from "../../../App";
import { addTaskMutation } from "../../../queries/queries";

interface Props {
  clearTasks: () => void;
  addTaskMutation: (variables: object) => void;
}

const AddTask: React.FC<Props> = props => {
  const [userInput, setUserInput] = useState("");
  const { userVal, setUserVal } = useContext(userContext);

  function submitAdd() {
    let id = Math.floor(Math.random() * 1000000);
    if (userInput.length > 0) {
      props.addTaskMutation({
        variables: {
          content: userInput,
          id: id,
          userId: userVal.id
        }
      });
      setUserInput("");
    }
  }

  function setUser(input: string) {
    if (input.length < 90) {
      setUserInput(input);
    } else {
      let str = input;
      let substr = str.substring(0, 90);
      setUserInput(substr);
    }
  }

  function changeInput(e: any) {
    if (e.key === `Enter`) {
      submitAdd();
    } else {
      return;
    }
  }

  return (
    <div>
      <input
        className="add_task_styles"
        type="text"
        value={userInput}
        onChange={e => setUser(e.target.value)}
        onKeyDown={e => changeInput(e)}
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
