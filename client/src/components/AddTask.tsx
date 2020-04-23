import React, { useState } from "react";

interface Props {
  addTasks: (userInput: string) => void;
}

export const AddTask: React.FC<Props> = props => {
  const [userInput, setUserInput] = useState("");

  function submitAdd() {
    props.addTasks(userInput);
    setUserInput("");
  }

  return (
    <div>
      <input
        type="text"
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
        placeholder="Task"
      />
      <button onClick={() => submitAdd()}>Add</button>
    </div>
  );
};
