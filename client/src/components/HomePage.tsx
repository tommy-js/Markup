import React, { useContext, useState } from "react";
import { FriendList } from "./FriendList";
import { MessageViewer } from "./MessageViewer";
import { TaskList } from "./TaskList";
import "../App.scss";

export const HomePage: React.FC = () => {
  const [friends, setFriends] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchVector, setSearchVector] = useState("");

  function passFriends(friends: any) {
    setFriends(friends);
  }

  function searchingForFriends(searchEntry: string) {
    setSearching(true);
    setSearchVector(searchEntry);
  }

  function viewMessages() {
    setSearching(false);
  }

  if (friends) {
    return (
      <div className="home_page">
        <FriendList
          searchingForFriends={searchingForFriends}
          passFriends={passFriends}
        />
        <MessageViewer
          friends={friends}
          searching={searching}
          viewMessages={viewMessages}
          searchVector={searchVector}
        />
        <TaskList />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
