import React from "react";
import { IndividualMessage } from "./IndividualMessage";
import { InputBox } from "./InputBox";
import "../App.scss";

export const MessageBox: React.FC = () => {
  const messages = ["Hey there!", "How are you doing today?", "Good, and you?"];

  return (
    <div className="message_box">
      {messages.map(messages => (
        <IndividualMessage message={messages} />
      ))}
      <InputBox />
    </div>
  );
};
