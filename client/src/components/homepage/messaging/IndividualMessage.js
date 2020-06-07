import React, { useState, useEffect } from "react";
import edit from "../../../icons/edit.png";
import check from "../../../icons/checkmark.png";
import edited from "../../../icons/edited.png";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { changeMessageMutation } from "../../../queries/queries";
import { Menu, Item, MenuProvider } from "react-contexify";

const IndividualMessage = props => {
  const [userLabel, setUserLabel] = useState({ label: "" });
  const [time, setTime] = useState("");
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState(edit);
  const [hasBeenEdited, setHasBeenEdited] = useState(props.edited);
  const [modMessage, setModMessage] = useState(props.message);

  useEffect(() => {
    if (props.userid == props.sender) {
      setUserLabel({ label: "You: " });
    } else {
      setUserLabel({ label: `#${props.userId.toString()}:` });
    }
  }, [props.sender]);

  useEffect(() => {
    let timer = Math.round(new Date().getTime() / 1000);
    let passedTime = timer - props.timestamp;
    if (passedTime < 60) {
      setTime("1 minute");
    } else if (passedTime < 120) {
      setTime("2 minutes");
    } else if (passedTime < 180) {
      setTime("3 minutes");
    } else if (passedTime < 240) {
      setTime("4 minutes");
    } else if (passedTime < 300) {
      setTime("5 minutes");
    } else {
      let date = new Date(props.timestamp * 1000);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      setTime(`${month}/${day}/${year}`);
    }
  }, []);

  function checkEditing() {
    if (editing) {
      return (
        <div className="inner_message_container">
          <textarea
            className="change_message_input"
            value={modMessage}
            onChange={e => setModMessage(e.target.value)}
          />
        </div>
      );
    } else {
      return <div className="inner_message_container">{props.message}</div>;
    }
  }

  function modEdits() {
    setEditing(!editing);
    console.log(props.id);
    if (editing === false) {
      setImage(check);
    } else if (editing === true) {
      props.changeMessageMutation({
        variables: {
          id: props.id,
          content: modMessage,
          edited: true
        }
      });
      setImage(edit);
    }
  }

  function checkEdited() {
    if (hasBeenEdited) {
      return (
        <div className="check_edited">
          <img className="check_edited_image" src={edited} />
          <span className="edited_span">edited</span>
        </div>
      );
    }
  }

  function testing() {
    console.log("working context menu");
  }

  function contextMenu() {
    return (
      <Menu id="message_context_menu">
        <Item onClick={() => testing()}>Edit Message</Item>
      </Menu>
    );
  }

  return (
    <div className="individual_message">
      <MenuProvider id="message_context_menu">
        <div className="message">
          <span>{userLabel.label}</span>
          {checkEditing()}
        </div>
        <div className="right_align">
          <span className="message_edit_button" onClick={() => modEdits()}>
            <img src={image} className="edit_image" />
          </span>
          <span className="message_timestamp">{time}</span>
          {checkEdited()}
        </div>
      </MenuProvider>
      {contextMenu()}
    </div>
  );
};

export default compose(
  graphql(changeMessageMutation, { name: "changeMessageMutation" })
)(IndividualMessage);
