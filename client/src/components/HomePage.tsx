import React, { useContext, useState } from "react";
import { FriendList } from "./FriendList";
import { MessageViewer } from "./MessageViewer";
import { TaskList } from "./TaskList";
import { Navbar } from "./Navbar";
import "../App.scss";

export const HomePage: React.FC = () => {
  const [friends, setFriends] = useState([]);
  const [searching, setSearching] = useState(false);

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
