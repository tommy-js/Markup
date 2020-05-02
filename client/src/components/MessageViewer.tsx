import React, { useState, useEffect } from "react";
import MessageBox from "./MessageBox";
import { SearchForUser } from "./SearchForUser";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../App.scss";

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
        <button onClick={() => backButton()}>Back</button>
        <SearchForUser />
      </div>
    );
  } else {
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
  }
};
