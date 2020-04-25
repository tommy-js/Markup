import React, { useState } from "react";
import "../App";
import { ClearTaskList } from "./ClearTaskList";

interface Props {
  addTasks: (userInput: string) => void;
  clearTasks: () => void;
}

export const AddTask: React.FC<Props> = props => {
  const [userInput, setUserInput] = useState("");

  function submitAdd() {
    if (userInput.length > 0) {
      props.addTasks(userInput);
      setUserInput("");
    }
  }

  return (
    <div>
      <input
        className="add_task_styles"
        type="text"
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
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
