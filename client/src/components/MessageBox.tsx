import React, { useState } from "react";
import { IndividualMessage } from "./IndividualMessage";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import InputBox from "./InputBox.js";
import "../App.scss";

interface Props {
  name: String;
  id: Number;
}

export const MessageBox: React.FC<Props> = props => {
  const messages = ["Hey there!", "How are you doing today?", "Good, and you?"];
  const [userMessages, setUserMessages] = useState();

  console.log("loaded messagebox");

  return (
    <div className="message_box">
      {messages.map(messages => (
        <IndividualMessage message={messages} />
      ))}
      {props.name}
      <InputBox userId={props.id} />
    </div>
  );
};
