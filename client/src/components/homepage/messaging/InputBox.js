import React, { useEffect, useState, useContext } from "react";
import "../../../App.scss";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { addMessageMutation } from "../../../queries/queries";
import { userContext } from "../../../App";
import send from "../../../icons/send.png";
import {
  ContextMenu,
  MenuItem,
  ContextMenuTrigger,
  SubMenu
} from "react-contextmenu";
import { Icon } from "./Icon";

function InputBox(props) {
  const [userInput, setUserInput] = useState("");
  const { userVal, setUserVal } = useContext(userContext);

  useEffect(() => {
    console.log(props.convoId);
    console.log(userInput);
  });

  function sendMessage() {
    props.addMessageMutation({
      variables: {
        id: props.convoId,
        userId: userVal.id,
        content: userInput,
        timestamp: Math.round(new Date().getTime() / 1000),
        edited: false
      }
    });
    setUserInput("");
  }

  function checkKey(keyPressed) {
    if (keyPressed.keyCode === 13 && keyPressed.keyCode === 16) {
      return;
    }
    if (keyPressed.keyCode === 13) {
      sendMessage();
    }
  }

  function contextMenu() {
    return (
      <ContextMenu id="input_box_context_menu">
        <SubMenu title={<Icon />}>
          <MenuItem>Icon</MenuItem>
        </SubMenu>
      </ContextMenu>
    );
  }

  return (
    <ContextMenuTrigger id="input_box_context_menu">
      <div className="div_message_input_box">
        <input
          className="input_message_container"
          onChange={e => setUserInput(e.target.value)}
          value={userInput}
          placeholder="Enter text..."
          onKeyDown={e => checkKey(e)}
        />
        <div className="div_message_input_box_button">
          <button
            onClick={() => props.entryButton(!props.val)}
            className="div_message_button div_button_top"
          >
            <img src={props.entryImage} className="send_enter_button" />
          </button>
          <button
            className="div_message_button div_button_bottom"
            onClick={() => sendMessage()}
          >
            <img src={send} className="send_enter_button" />
          </button>
        </div>
        {contextMenu()}
      </div>
    </ContextMenuTrigger>
  );
}

export default compose(
  graphql(addMessageMutation, { name: "addMessageMutation" })
)(InputBox);
