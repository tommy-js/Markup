import React, { useState, useEffect, useContext } from "react";
import MessageBox from "./MessageBox";
import { SearchForUser } from "./SearchForUser";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { rememberUserContext } from "../../../App";
import "../../../App.scss";

interface Props {
  searching: boolean;
  viewMessages: () => void;
  friends: any;
}

export const MessageViewer: React.FC<Props> = props => {
  const { rememberedUser, setRememberedUser } = useContext(rememberUserContext);
  const history = useHistory();
  function backButton() {
    props.viewMessages();
  }

  useEffect(() => {
    if (rememberedUser.id) {
      let path = `/home/${rememberedUser.id}`;
      history.push(path);
    }
  }, []);

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
