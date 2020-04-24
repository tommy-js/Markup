import React, { useState } from "react";
import "../App.scss";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { addMessageMutation } from "../queries/queries";

function InputBox(props) {
  const [userInput, setUserInput] = useState("");

  function sendMessage() {
    props.addMessageMutation({
      variables: {
        id: Math.floor(Math.random() * 1000000),
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
      <button onClick={() => sendMessage()}>Send</button>
    </div>
  );
}

export default compose(
  graphql(addMessageMutation, { name: "addMessageMutation" })
)(InputBox);
