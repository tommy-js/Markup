import React, { useState, useEffect } from "react";
import edit from "../../../icons/edit.png";
import check from "../../../icons/checkmark.png";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { changeMessageMutation } from "../../../queries/queries";

interface Props {
  message: string;
  sender: number;
  userid: number;
  receiver: number;
  timestamp: number;
  id: number;
  changeMessageMutation: (variables: object) => void;
}

const IndividualMessage: React.FC<Props> = props => {
  const [messageColor, setMessageColor] = useState();
  const [userLabel, setUserLabel] = useState({ label: "", color: "" });
  const [time, setTime] = useState("");
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState(edit);
  const [modMessage, setModMessage] = useState(props.message);

  useEffect(() => {
    if (props.userid == props.sender) {
      setMessageColor("#ffdfee");
      setUserLabel({ label: "You: ", color: "#BBBBBB" });
    } else {
      setMessageColor("#e3f7ff");
      setUserLabel({ label: `#${props.sender.toString()}:`, color: "#a1a1a1" });
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
          content: modMessage
        }
      });
      setImage(edit);
    }
  }

  return (
    <div
      style={{ backgroundColor: messageColor }}
      className="individual_message"
    >
      <div className="message">
        <span style={{ color: userLabel.color }}>{userLabel.label}</span>
        {checkEditing()}
      </div>
      <div className="right_align">
        <span className="message_edit_button" onClick={() => modEdits()}>
          <img src={image} className="edit_image" />
        </span>
        <span className="message_timestamp">{time}</span>
      </div>
    </div>
  );
};

export default compose(
  graphql(changeMessageMutation, { name: "changeMessageMutation" })
)(IndividualMessage);
