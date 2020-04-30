import React, { useState, useContext } from "react";
import "../App.scss";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { addMessageMutation } from "../queries/queries";
import { userContext } from "../App";
import send from "../icons/send.png";
import enter from "../icons/enter.png";

function InputBox(props) {
  const [userInput, setUserInput] = useState("");
  const { userVal, setUserVal } = useContext(userContext);

  function sendMessage() {
    props.addMessageMutation({
      variables: {
        id: Math.floor(Math.random() * 1000000),
        content: userInput,
        from: userVal.id,
        to: props.userId,
        timestamp: Math.round(new Date().getTime() / 1000)
      }
    });
    setUserInput("");
  }

  return (
    <div className="div_message_input_box">
      <textarea
        className="input_message_container"
        onChange={e => setUserInput(e.target.value)}
        value={userInput}
        placeholder="Enter text..."
      />
      <div className="div_message_input_box_button">
        <button className="div_message_button div_button_top">
          <img src={enter} className="send_enter_button" />
        </button>
        <button
          className="div_message_button div_button_bottom"
          onClick={() => sendMessage()}
        >
          <img src={send} className="send_enter_button" />
        </button>
      </div>
    </div>
  );
}

export default compose(
  graphql(addMessageMutation, { name: "addMessageMutation" })
)(InputBox);
