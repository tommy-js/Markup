import React from "react";
import { MessageBox } from "./MessageBox";
import "../App.scss";

export const MessageViewer: React.FC = () => {
  return (
    <div className="message_viewer">
      <h1 className="message_viewer_header">Your Messages</h1>
      <MessageBox />
    </div>
  );
};
