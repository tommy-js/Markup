import React, { useState, useEffect } from "react";
import edit from "../../../icons/edit.png";

interface Props {
  message: string;
  sender: number;
  userid: number;
  receiver: number;
  timestamp: number;
}

export const IndividualMessage: React.FC<Props> = props => {
  const [messageColor, setMessageColor] = useState();
  const [userLabel, setUserLabel] = useState({ label: "", color: "" });
  const [time, setTime] = useState("");

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

  return (
    <div
      style={{ backgroundColor: messageColor }}
      className="individual_message"
    >
      <div className="message">
        <span style={{ color: userLabel.color }}>{userLabel.label}</span>
        {props.message}
      </div>
      <div className="right_align">
        <span className="message_edit_button">
          <img src={edit} className="edit_image" />
        </span>
        <span className="message_timestamp">{time}</span>
      </div>
    </div>
  );
};
