import React from "react";
import { MessageBox } from "./MessageBox";
import "../App.scss";

interface Props {
  searching: boolean;
  viewMessages: () => void;
}

export const MessageViewer: React.FC<Props> = props => {
  function backButton() {
    props.viewMessages();
  }

  if (props.searching) {
    return (
      <div className="message_viewer">
        <p>Searching</p>
        <button onClick={() => backButton()}>Back</button>
      </div>
    );
  } else {
    return (
      <div className="message_viewer">
        <h1 className="message_viewer_header">Your Messages</h1>
        <MessageBox />
      </div>
    );
  }
};
