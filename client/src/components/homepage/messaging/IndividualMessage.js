import React, { useState, useEffect, useContext } from "react";
import edit from "../../../icons/edit.png";
import check from "../../../icons/checkmark.png";
import edited from "../../../icons/edited.png";
import remove from "../../../icons/remove.png";
import menu_button from "../../../icons/message_menu_button.png";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { changeMessageMutation } from "../../../queries/queries";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { userContext } from "../../../App";

function IndividualMessage(props) {
  const [userLabel, setUserLabel] = useState({ label: "" });
  const [time, setTime] = useState("");
  const [hours, setHours] = useState("");
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState(edit);
  const [hasBeenEdited, setHasBeenEdited] = useState(props.edited);
  const [modMessage, setModMessage] = useState(props.message);
  const { userVal, setUserVal } = useContext(userContext);
  const [randomizedKey] = useState(Math.floor(Math.random() * 100000));

  useEffect(() => {
    console.log(props.userId);
    if (props.userId == userVal.id) {
      setUserLabel({ label: "You: " });
    } else {
      setUserLabel({ label: `#${props.userId}:` });
    }
  }, []);

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
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let calcTime;
      if (hours > 12) {
        calcTime = `${hours % 12}:${minutes}PM`;
      } else {
        calcTime = `${hours}:${minutes}AM`;
      }
      setHours(`${calcTime}`);
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

  function contextMenu() {
    if (props.userId == userVal.id) {
      return (
        <ContextMenu id={`message_context_menu${randomizedKey}`}>
          <MenuItem onClick={() => modEdits()}>Edit</MenuItem>
          <MenuItem>Delete</MenuItem>
        </ContextMenu>
      );
    } else {
      return (
        <ContextMenu id={`message_context_menu${randomizedKey}`}>
          <MenuItem>Visit User Profile</MenuItem>
          <MenuItem>Add To Teammates</MenuItem>
        </ContextMenu>
      );
    }
  }

  function returnIcons() {
    if (props.userId == userVal.id) {
      return (
        <div className="inline_align edit_icons">
          <div className="inline_align">
            <span className="menu_button">
              <img src={menu_button} className="edit_image" />
            </span>
          </div>
          <div className="inline_align">
            <span className="message_remove_button">
              <img src={remove} className="edit_image" />
            </span>
            <span className="message_edit_button" onClick={() => modEdits()}>
              <img src={image} className="edit_image" />
            </span>
            {checkEdited()}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <div className="background_individual_message">
      <div className="specific_message_time">{hours}</div>
      <div className="individual_message">
        <ContextMenuTrigger id={`message_context_menu${randomizedKey}`}>
          <div className="message">
            <span>{userLabel.label}</span>
            {checkEditing()}
          </div>

          <div className="right_align">
            {returnIcons()}
            <span className="message_timestamp">{time}</span>
          </div>
        </ContextMenuTrigger>
        {contextMenu()}
      </div>
    </div>
  );
}

export default compose(
  graphql(changeMessageMutation, { name: "changeMessageMutation" })
)(IndividualMessage);
