import React, { useEffect } from "react";
import IndividualMessage from "./IndividualMessage";
import "../../../App.scss";

interface Props {
  sortedArray: any;
  userVal: object;
}

export const MessageBoot: React.FC<Props> = props => {
  useEffect(() => {
    let element: any = document.getElementById("message_id");
    element.scrollTop = element.scrollHeight;
  }, [props.sortedArray]);

  return (
    <div className="container">
      <div id="message_id" className="message_container">
        {props.sortedArray.map((messages: any) => (
          <IndividualMessage
            userid={props.userVal}
            receiver={messages.to}
            sender={messages.from}
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
