import React, { useContext, useState, useEffect } from "react";
import { FriendList } from "./contacts/FriendList";
import { MessageViewer } from "./messaging/MessageViewer";
import { TaskList } from "./tasks/TaskList";
import { Navbar } from "../navigation/Navbar";
import { userContext } from "../../App";
import { useHistory } from "react-router-dom";
import "../../App.scss";

export const HomePage: React.FC = () => {
  const [friends, setFriends] = useState([]);
  const { userVal, setUserVal } = useContext(userContext);
  const [searching, setSearching] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!userVal.username) {
      let path = "/";
      history.push(path);
    }
  });

  function passFriends(friends: any) {
    setFriends(friends);
  }

  function searchingForFriends() {
    setSearching(true);
  }

  function viewMessages() {
    setSearching(false);
  }

  if (friends) {
    return (
      <div className="home_page">
        <Navbar />
        <div className="fixed_under">
          <FriendList
            searchingForFriends={searchingForFriends}
            passFriends={passFriends}
          />
          <MessageViewer
            friends={friends}
            searching={searching}
            viewMessages={viewMessages}
          />
          <TaskList />
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
