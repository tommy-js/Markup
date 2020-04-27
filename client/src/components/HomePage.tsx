import React, { useContext, useState } from "react";
import { FriendList } from "./FriendList";
import { MessageViewer } from "./MessageViewer";
import { TaskList } from "./TaskList";
import "../App.scss";

export const HomePage: React.FC = () => {
  const [searching, setSearching] = useState(false);

  function searchingForFriends() {
    setSearching(true);
  }

  function viewMessages() {
    setSearching(false);
  }

  return (
    <div className="home_page">
      <FriendList searchingForFriends={searchingForFriends} />
      <MessageViewer searching={searching} viewMessages={viewMessages} />
      <TaskList />
    </div>
  );
};
