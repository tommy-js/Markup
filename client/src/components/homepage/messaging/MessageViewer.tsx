import React, { useState, useEffect } from "react";
import MessageBox from "./MessageBox";
import { SearchForUser } from "./SearchForUser";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../../../App.scss";

interface Props {
  searching: boolean;
  viewMessages: () => void;
  friends: any;
}

export const MessageViewer: React.FC<Props> = props => {
  function backButton() {
    props.viewMessages();
  }

  if (props.searching) {
    return (
      <div className="message_viewer">
        <SearchForUser />
      </div>
    );
  } else {
    if (props.friends.length > 0) {
      return (
        <div className="message_viewer">
          <Switch>
            {props.friends.map((el: any) => (
              <Route exact path={`/home/${el.id}`}>
                <MessageBox name={el.name} id={el.id} />
              </Route>
            ))}
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="message_viewer">
          <MessageBox />
        </div>
      );
    }
  }
};