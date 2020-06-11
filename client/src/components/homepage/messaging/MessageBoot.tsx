import React, { useEffect } from "react";
import IndividualMessage from "./IndividualMessage.js";
import "../../../App.scss";

interface Props {
  messageArray: any;
  userVal: object;
}

export const MessageBoot: React.FC<Props> = props => {
  useEffect(() => {
    let element: any = document.getElementById("message_id");
    element.scrollTop = element.scrollHeight;
  }, [props.messageArray]);

  return (
    <div className="container">
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
  );
};
