import React, { useState } from "react";
import "../App";

interface Props {
  addTasks: (userInput: string) => void;
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
    <div className="inline_buttons">
      <input
        className="add_task_styles"
        type="text"
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
        placeholder="Task"
      />
      <button className="add_task_buttons" onClick={() => submitAdd()}>
        Add
      </button>
    </div>
  );
};
