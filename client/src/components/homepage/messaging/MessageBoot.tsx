import React, { useEffect } from "react";
import IndividualMessage from "./IndividualMessage.js";
import "../../../App.scss";

interface Props {
  messageArray: any;
  userVal: object;
}

export const MessageBoot: React.FC<Props> = props => {
  useEffect(() => {
    connectToBottom();
  }, []);

  useEffect(() => {
    connectToBottom();
  }, [props.messageArray]);

  function connectToBottom() {
    let element: any = document.getElementById("message_id");
    let container: any = document.getElementById("container");
    element.scrollTop = element.scrollHeight;
  }

  return (
    <div id="container" className="container">
      <div className="message_cont_bottom_align">
        <div id="message_id" className="message_container">
          {props.messageArray.map((messages: any) => (
            <IndividualMessage
              userId={messages.userId}
              messageId={messages.messageId}
              edited={messages.edited}
              key={messages.timestamp}
              message={messages.content}
              timestamp={messages.timestamp}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
