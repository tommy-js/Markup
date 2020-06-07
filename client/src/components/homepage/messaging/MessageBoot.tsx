import React, { useEffect } from "react";
import IndividualMessage from "./IndividualMessage";
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
            userId={props.userVal}
            receiver={messages.to}
            edited={messages.edited}
            key={Math.floor(Math.random() * 10000)}
            message={messages.content}
            timestamp={messages.timestamp}
            id={messages.id}
          />
        ))}
      </div>
    </div>
  );
};
