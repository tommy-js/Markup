import React, { useState } from "react";
import "../App.scss";
import { addMessageMutation } from "../queries/queries";

interface Props {
  addMessageMutation: (variables: object) => void;
}

export const InputBox: React.FC<Props> = () => {
  const [userInput, setUserInput] = useState("");

  function sendMessage() {
    props.addMessageMutation({
      variables: {
        id: Math.floor(Math.random() * 10000000000),
        content: userInput
      }
    });
  }

  return (
    <div className="div_message_input_box">
      <textarea
        className="input_message_container"
        onChange={e => setUserInput(e.target.value)}
      />
      <button onClick={() => sendMessage}>Send</button>
    </div>
  );
};
