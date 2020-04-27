import React, { useState, useEffect } from "react";
import { MessageBox } from "./MessageBox";
import UserSearchBlock from "./UserSearchBlock";
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
        <button onClick={() => backButton()}>Back</button>
        <UserSearchBlock />
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
