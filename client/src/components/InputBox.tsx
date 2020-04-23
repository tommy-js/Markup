import React, { useState } from "react";
import "../App.scss";

export const InputBox: React.FC = () => {
  const [userInput, setUserInput] = useState("");

  return (
    <div className="div_message_input_box">
      <textarea
        className="input_message_container"
        onChange={e => setUserInput(e.target.value)}
      />
      <button>Send</button>
    </div>
  );
};
