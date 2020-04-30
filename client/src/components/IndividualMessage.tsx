import React, { useState, useEffect } from "react";

interface Props {
  message: string;
  sender: number;
  userid: number;
  receiver: number;
}

export const IndividualMessage: React.FC<Props> = props => {
  const [messageColor, setMessageColor] = useState();
  const [userLabel, setUserLabel] = useState({ label: "", color: "" });

  useEffect(() => {
    if (props.userid == props.sender) {
      setMessageColor("#ffdfee");
      setUserLabel({ label: "You", color: "#BBBBBB" });
    } else {
      setMessageColor("#e3f7ff");
      setUserLabel({ label: `#${props.sender.toString()}`, color: "#a1a1a1" });
    }
  }, [props.sender]);

  return (
    <div>
      <p
        style={{ backgroundColor: messageColor }}
        className="individual_message"
      >
        <span style={{ color: userLabel.color }}>{userLabel.label}</span>{" "}
        {props.message}
      </p>
    </div>
  );
};
